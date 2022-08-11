import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Calendar from "./Calender";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useRouter } from 'next/router';
import Image from 'next/image';

//API
import { CONFERENCES } from "../libs/graphql/query";

const now = () => new Date(2019, 3, 11);

const ScheduleTable = () => {
    const router = useRouter();

    //----------------------------------------------big calender start-------------------------
    const [events, setEvents] = useState([]);
    const [date, setDate] = useState(now());
    const [view, setView] = useState("week");

    const onNavigate = (newDate) => setDate(newDate);
    const onView = (newView) => setView(newView);

    const accessors = {
        draggableAccessor: (event) => !event.blocked,
        resizableAccessor: (event) => !event.blocked
    };

    const onSelectEvent = (event) => {
        router.push(`/conference/${event.id}`)
    };
    //----------------------------------------------big calender end-------------------------

    const { data, loading, error } = useQuery(CONFERENCES)
    useEffect(() => {
        if (data) {
            console.log(data.conferences)
            let eventArr = []
            if (data.conferences) {
                for (var value of data.conferences) {
                    console.log("value.schedule", value.schedules)
                    console.log(value.schedules[0]?.day);
                    console.log(value.schedules[0]?.intervals[0]?.begin)
                    let start = new Date(`${value.schedules[0]?.day} ${value.schedules[0]?.intervals[0]?.begin ? value.schedules[0]?.intervals[0]?.begin : "00:00"}`)
                    let end = new Date(`${value.schedules[0]?.day} ${value.schedules[0]?.intervals[value.schedules[0]?.intervals.length - 1]?.end ? value.schedules[0]?.intervals[value.schedules[0]?.intervals.length - 1]?.end : "00:00"}`)
                    console.log("start, end", start, end)
                    eventArr.push({
                        id: value.id,
                        title: value.name,
                        start: start,
                        end: end
                    })
                }
                setEvents(eventArr)
            }
        }
        if (error) {
            console.log(error)
        }
    }, [data, loading, error])
    console.log("event", events);
    return (
        <div className="container schedule-table">
            {
                !error ? (
                    loading ?
                        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
                            <Image
                                alt='React Conference'
                                src="/images/react-conference.gif"
                                layout='fill'
                                objectFit='contain'
                            />
                        </div> :
                        <>
                            <div className="heding-text">
                                <div className="section-heading">Event Schedule</div>
                                <p className="hero-description">Lorem uis diam turpis quam id fermentum.In quis diam turpis quam id fermentum.</p>
                            </div>
                            <Calendar
                                {...{
                                    events,
                                    date,
                                    onNavigate,
                                    view,
                                    onView,
                                    onSelectEvent,
                                }}
                                getNow={now}
                                {...accessors}
                                selectable="ignoreEvents"
                            />
                        </>
                ) :
                    <div> Something went wrong!</div>
            }
        </div>
    )
}
export default ScheduleTable
