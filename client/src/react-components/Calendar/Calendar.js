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

    render() {
        return (
            <div className="Calendar">
            <Calendar
                localizer={localizer}
                defaultView="week"
                views={['month', 'week', 'day', 'agenda']}
                events={this.state.events}
                selectable={false}
                eventPropGetter={this.eventStyleGetter}
            />
            </div>
        );
    }
}

export default withRouter(ScheduleCalendar);