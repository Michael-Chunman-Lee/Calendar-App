import React from "react";
import {withRouter} from "react-router-dom";
import {
    Calendar,
    momentLocalizer,
  } from 'react-big-calendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
const localizer = momentLocalizer(moment)


class ScheduleCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: this.props.events
        }   
    }

    parseDate(dateString){
        const year = parseInt(dateString.substring(0,4))
        const month = parseInt(dateString.substring(5,7))
        const day = parseInt(dateString.substring(8,10))
        return new Date(year, month - 1, day, 0, 0, 0, 0)
    }

    render() {
        let defaultDate = new Date()
        if (this.state.events.length !== 0){
            const dateString = this.state.events.reduce(function (r, a) {
                return r.start > a.start ? r.start : a.start;
            })
          
            defaultDate = this.parseDate(dateString)
        }

        this.state.events.forEach(function(item, index) {
            item.start = new Date(item.start)
            item.end = new Date(item.end)
        })
        return (
            <div className="Calendar">
            <Calendar
                localizer={localizer}
                defaultView="week"
                views={['month', 'week', 'day', 'agenda']}
                events={this.state.events}
                selectable={false}
                defaultDate={defaultDate}
                eventPropGetter={this.eventStyleGetter}
            />
            </div>
        );
    }
}

export default withRouter(ScheduleCalendar);