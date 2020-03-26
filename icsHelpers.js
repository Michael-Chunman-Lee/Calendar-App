const moment = require("moment");
const ical = require('ical');

function parseEventsFromICS(source) {
    const events = []
    // Eventually should be parsed from file on server side, since fs cant run in browser
    //const data = ical.parseFile(source)
    
    const data = ical.parseICS(source)
    for (let k in data) {
        // Range of Dates to query against, to handle potentially infinitely recurring events
        const rangeStart = moment("2017-01-01");
        const rangeEnd = moment("2020-12-31");
    
    
        const event = data[k]
        if (event.type === 'VEVENT') {
    
            const title = event.summary;
            let startDate = moment(event.start);
            let endDate = moment(event.end);
    
            // Calculate the duration of the event for use with recurring events.
            const duration = parseInt(endDate.format("x")) - parseInt(startDate.format("x"));
    
            // If No recurrences
            if (typeof event.rrule === 'undefined')
            {
                events.push(
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
                const dates = event.rrule.between(
                  rangeStart.toDate(),
                  rangeEnd.toDate(),
                  true,
                  function(date, i) {return true;}
                )
    
                // Any particular recurring evennt outside our range could have been edited to be inside our range
                // So, add all recurring events to our list
                if (event.recurrences !== undefined)
                {
                    for (let r in event.recurrences)
                    {
                        // Only add dates that weren't already in the range we added from the rrule
                        if (moment(new Date(r)).isBetween(rangeStart, rangeEnd) !== true)
                        {
                            dates.push(new Date(r));
                        }
                    }
                }
    
                // Loop through the set of date entries to prune ones that don't entirely fit in our range
                for(let i in dates) {
    
                    const date = dates[i];
                    let curEvent = event;
                    let showRecurrence = true;
                    let curDuration = duration;
    
                    startDate = moment(date);
    
                    // Use just the date of the recurrence to look up overrides and exceptions (i.e. chop off time information)
                    const dateLookupKey = date.toISOString().substring(0, 10);
    
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
                        showRecurrence = false;
                    }
    
                    // Set the the title and the end date from either the regular event or the recurrence override.
                    const recurrenceTitle = curEvent.summary;
                    endDate = moment(parseInt(startDate.format("x")) + curDuration, 'x');
    
                    // If this recurrence ends before the start of the date range, or starts after the end of the date range, 
                    // don't process it.
                    if (endDate.isBefore(rangeStart) || startDate.isAfter(rangeEnd)) {
                        showRecurrence = false;
                    }
    
                    if (showRecurrence === true) {
                        events.push(
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
    return events
}

module.exports = {parseEventsFromICS: parseEventsFromICS}