import React from "react";
import "./Calendar.css";
import {withRouter} from "react-router-dom";
import {
    Calendar,
    momentLocalizer,
  } from 'react-big-calendar';
import moment from "moment";
import ical from 'ical';
import {sourceStr} from '../../data/coursesCalendarString';

import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment)
class ScheduleCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source_file: "src/data/couresCalendar.ics",
            events: [
              ]
        }
    }

    parseEventsFromICS(source) {
        // Eventually should be parsed from file on server side, since fs cant run in browser
        //var data = ical.parseFile(source)

        var data = ical.parseICS(sourceStr)
        for (var k in data) {
            // Range of Dates to query against, to handle potentially infinitely recurring events
            var rangeStart = moment("2017-01-01");
            var rangeEnd = moment("2020-12-31");
        
        
            var event = data[k]
            if (event.type === 'VEVENT') {
        
                var title = event.summary;
                var startDate = moment(event.start);
                var endDate = moment(event.end);
        
                // Calculate the duration of the event for use with recurring events.
                var duration = parseInt(endDate.format("x")) - parseInt(startDate.format("x"));
        
                // If No recurrences
                if (typeof event.rrule === 'undefined')
                {
                    this.state.events.push(
                        {'title': title,
                        'start': startDate.toDate(),
                        'end': endDate.toDate(),
                        'allDay?': false
                        }
                    )
                    // console.log('title:' + title);
                    // console.log('startDate:' + startDate.format('MMMM Do YYYY, h:mm:ss a'));
                    // console.log('endDate:' + endDate.format('MMMM Do YYYY, h:mm:ss a'));
                    // console.log('duration:' + moment.duration(duration).humanize());
                    // console.log();
                }
        
                // Recurring event case
                else if (typeof event.rrule !== 'undefined')
                {
                    // For recurring events, get the set of event start dates that fall within our range
                    var dates = event.rrule.between(
                      rangeStart.toDate(),
                      rangeEnd.toDate(),
                      true,
                      function(date, i) {return true;}
                    )
        
                    // Any particular recurring evennt outside our range could have been edited to be inside our range
                    // So, add all recurring events to our list
                    if (event.recurrences !== undefined)
                    {
                        for (var r in event.recurrences)
                        {
                            // Only add dates that weren't already in the range we added from the rrule
                            if (moment(new Date(r)).isBetween(rangeStart, rangeEnd) !== true)
                            {
                                dates.push(new Date(r));
                            }
                        }
                    }
        
                    // Loop through the set of date entries to prune ones that don't entirely fit in our range
                    for(var i in dates) {
        
                        var date = dates[i];
                        var curEvent = event;
                        var showRecurrence = true;
                        var curDuration = duration;
        
                        startDate = moment(date);
        
                        // Use just the date of the recurrence to look up overrides and exceptions (i.e. chop off time information)
                        var dateLookupKey = date.toISOString().substring(0, 10);
        
                        // For each date that we're checking, it's possible that there is a recurrence override for that one day.
                        if ((curEvent.recurrences !== undefined) && (curEvent.recurrences[dateLookupKey] !== undefined))
                        {
                            // We found an override, so for this recurrence, use a potentially different title, start date, and duration.
                            curEvent = curEvent.recurrences[dateLookupKey];
                            startDate = moment(curEvent.start);
                            curDuration = parseInt(moment(curEvent.end).format("x")) - parseInt(startDate.format("x"));
                        }
                        // If there's no recurrence override, check for an exception date.  Exception dates represent exceptions to the rule.
                        else if ((curEvent.exdate !== undefined) && (curEvent.exdate[dateLookupKey] !== undefined))
                        {
                            // This date is an exception date, which means we should skip it in the recurrence pattern.
                            showRecurrence = false;
                        }
        
                        // Set the the title and the end date from either the regular event or the recurrence override.
                        var recurrenceTitle = curEvent.summary;
                        endDate = moment(parseInt(startDate.format("x")) + curDuration, 'x');
        
                        // If this recurrence ends before the start of the date range, or starts after the end of the date range, 
                        // don't process it.
                        if (endDate.isBefore(rangeStart) || startDate.isAfter(rangeEnd)) {
                            showRecurrence = false;
                        }
        
                        if (showRecurrence === true) {
                            this.state.events.push(
                                {'title': recurrenceTitle,
                                'start': startDate.toDate(),
                                'end': endDate.toDate(),
                                'allDay?': false
                                }
                            )
                            // console.log('title:' + recurrenceTitle);
                            // console.log('startDate:' + startDate.format('MMMM Do YYYY, h:mm:ss a'));
                            // console.log('endDate:' + endDate.format('MMMM Do YYYY, h:mm:ss a'));
                            // console.log('duration:' + moment.duration(curDuration).humanize());
                            // console.log();
                        }
        
                    }
                } 
            }
        }


    }

    render() {
        this.parseEventsFromICS(this.state.source_file)

        return (
            <div className="Calendar">
            <Calendar
                localizer={localizer}
                defaultView="week"
                events={this.state.events}
                selectable={false}
            />
            </div>
        );
    }
}

export default withRouter(ScheduleCalendar);