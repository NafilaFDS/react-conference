import React from "react";
import { Calendar as Cal, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

const DragAndDropCalendar = withDragAndDrop(Cal);
const Calendar = ({
    events = [],
    date = new Date(),
    onNavigate,
    view = "week",
    onView,
    views = {
        day: true,
        week: true
    },
    getNow = () => new Date(),
    accessors,
    selectable = false,
    ...props
}) => {
    const localizer = momentLocalizer(moment);
    const step = 120
    return (
        <DragAndDropCalendar
            {...{
                localizer,
                events,
                date,
                onNavigate,
                view,
                onView,
                views,
                getNow,
                accessors,
                selectable,
                step
            }}
            resizable
            {...props}
        />
    );
};

export default Calendar;
