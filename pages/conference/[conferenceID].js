import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import { useQuery } from "@apollo/client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Head from 'next/head'

//API
import { SINGLE_CONFERENCE } from "../../libs/graphql/query";

const ConferenceID = () => {
    const router = useRouter();
    const { conferenceID } = router.query
    const [conferenceInfo, setConferenceInfo] = useState({});
    const [tabInfo, setTabInfo] = useState([]);
    const [tabStatus, setTabStatus] = useState("");
    const { data, loading, error } = useQuery(SINGLE_CONFERENCE, {
        variables: {
            id: conferenceID
        }
    })

    //-------------------drag and drop functionality--------------
    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: 0,
        margin: "22px 0",
        ...draggableStyle
    });

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            tabInfo,
            result.source.index,
            result.destination.index
        );

        setTabInfo(items)
    }

    useEffect(() => {
        if (data) {
            let tabArr = []
            if (data.conference) {
                setConferenceInfo(data.conference)
                if (data.conference?.organizer) {
                    tabArr.push({ title: "Organizer" });
                }
                if (data.conference?.speakers.length > 0) {
                    tabArr.push({ title: "Speakers" });
                }
                if (data.conference?.locations.length > 0) {
                    tabArr.push({ title: "Locations" });
                }
                if (data.conference?.schedules.length > 0) {
                    tabArr.push({ title: "Schedules" });
                }
                if (data.conference?.partners.length > 0) {
                    tabArr.push({ title: "Partners" })
                }
                if (data.conference?.sponsors.length > 0) {
                    tabArr.push({ title: "Sponsors" })
                }
                setTabInfo(tabArr)
                setTabStatus(tabArr[0].title)
            }
        }
        console.log("tabStatus", tabStatus);
        if (error) {
            console.log("error", error)
        }
    }, [data, error])
    return (
        <>
            <Head>
                <title>{conferenceID}</title>
                <meta name="description" content={conferenceID} />
            </Head>
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
                        </div>
                        :
                        conferenceInfo && (
                            <div className="container">
                                <div className="common-nav">
                                    <Navbar />
                                </div>
                                <div className="heding-text">
                                    <div className="section-heading">{conferenceInfo.name}</div>
                                    <p className="hero-description">{conferenceInfo.slogan}</p>
                                </div>
                                <div className="conference-tab">
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="tab-btn-outer">
                                                {tabInfo?.length > 0 &&
                                                    <DragDropContext onDragEnd={onDragEnd}>
                                                        <Droppable droppableId="droppable">
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    {...provided.droppableProps}
                                                                    ref={provided.innerRef}
                                                                >
                                                                    {tabInfo?.map((item, index) => (
                                                                        <Draggable key={item.title} draggableId={item.title} index={index}>
                                                                            {(provided, snapshot) => (
                                                                                <div
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                    style={getItemStyle(
                                                                                        snapshot.isDragging,
                                                                                        provided.draggableProps.style
                                                                                    )}
                                                                                >
                                                                                    <div
                                                                                        className={tabStatus === item.title ? "tab-btn active" : "tab-btn"}
                                                                                        onClick={() => { setTabStatus(item.title) }}
                                                                                    >
                                                                                        <div className="tab-icon">
                                                                                            <Image src="/images/bi-arrow.png" alt="Bi Arrow" width={20} height={15} />
                                                                                        </div>
                                                                                        {item.title}
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </Draggable>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </Droppable>
                                                    </DragDropContext>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <div className="tab-right-base">
                                                {tabStatus === "Organizer" && conferenceInfo.organizer &&
                                                    <div className="tab-right-item">
                                                        <div className="tab-right-img">
                                                            <Image src={conferenceInfo.organizer?.image?.url} alt={conferenceInfo.organizer?.image?.title} width={80} height={80} />
                                                        </div>
                                                        <div className="tab-right-text">
                                                            <div className="top-text">
                                                                <div className="person-name">{conferenceInfo.organizer?.name}</div>
                                                                <div className="company-name">{conferenceInfo.organizer?.company}</div>
                                                            </div>
                                                            <div className="tab-decription">
                                                                {conferenceInfo.organizer?.aboutShort}
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {tabStatus === "Schedules" && conferenceInfo.schedules.length > 0 &&
                                                    conferenceInfo.schedules.map((item, i) => (
                                                        <div className="tab-right-item" key={`${item.day}-${i}`} >
                                                            <div className="tab-right-img">
                                                                {item.day}
                                                            </div>
                                                            <div className="tab-right-text">
                                                                <div className="tab-decription">
                                                                    {item.description}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                {tabStatus === "Speakers" && conferenceInfo.speakers.length > 0 &&
                                                    conferenceInfo.speakers.map((item, i) => (
                                                        <div className="tab-right-item" key={`${item.name}-${i}`} >
                                                            <div className="tab-right-img">
                                                                <Image src={item?.image?.url} alt={item?.image?.title} width={80} height={80} />
                                                            </div>
                                                            <div className="tab-right-text">
                                                                <div className="top-text">
                                                                    <div className="person-name">{item?.name}</div>
                                                                    <div className="company-name">{item?.company}</div>
                                                                </div>
                                                                <div className="tab-decription">
                                                                    {item?.aboutShort}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                {tabStatus === "Locations" && conferenceInfo.locations.length > 0 &&
                                                    <div className="tab-right-item">
                                                        <div className="tab-right-img">
                                                            <Image src={conferenceInfo.locations[0]?.image?.url} alt={conferenceInfo.locations[0]?.image?.title} width={80} height={80} />
                                                        </div>
                                                        <div className="tab-right-text">
                                                            <div className="top-text">
                                                                <div className="person-name">{conferenceInfo.locations[0]?.name}</div>
                                                                <div className="company-name">{conferenceInfo.locations[0]?.address}, {conferenceInfo.locations[0]?.city}, {conferenceInfo.locations[0]?.country.name}</div>
                                                            </div>
                                                            <div className="tab-decription">
                                                                {conferenceInfo.locations[0]?.about}
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {tabStatus === "Partners" && conferenceInfo.partners.length > 0 &&
                                                    conferenceInfo.partners.map((item, i) => (
                                                        <div className="tab-right-item" key={`${item.name}-${i}`} >
                                                            <div className="tab-right-img">
                                                                <Image src={item?.image?.url} alt={item?.image?.title} width={80} height={80} />
                                                            </div>
                                                            <div className="tab-right-text">
                                                                <div className="top-text">
                                                                    <div className="person-name">{item?.name}</div>
                                                                    <div className="company-name">{item?.company}</div>
                                                                </div>
                                                                <div className="tab-decription">
                                                                    {item?.aboutShort}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                {tabStatus === "Sponsors" && conferenceInfo.sponsors.length > 0 &&
                                                    conferenceInfo.sponsors.map((item, i) => (
                                                        <div className="tab-right-item" key={`${item.name}-${i}`} >
                                                            <div className="tab-right-img">
                                                                <Image src={item?.image?.url} alt={item?.image?.title} width={80} height={80} />
                                                            </div>
                                                            <div className="tab-right-text">
                                                                <div className="top-text">
                                                                    <div className="person-name">{item?.name}</div>
                                                                    <div className="company-name">{item?.company}</div>
                                                                </div>
                                                                <div className="tab-decription">
                                                                    {item?.aboutShort}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                ) :
                    <div>Something went wrong</div>
            }
        </>
    )
}

export default ConferenceID