import Event from './event';
import Modal from './modal';
import { ReactNode, useState } from 'react';
import { minutesToMilitary, INTERVAL } from '@/util/time';

import { CalendarEvent } from '@/db/schema';

import dayStyles from '@/styles/day.module.css';

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 3; i++) {
        color += letters[Math.floor(Math.random() * 8)];
        color += letters[Math.floor(Math.random() * 8 + 8)];
    }

    return color;
}

function getIntervalHeight() {
    return getIntervalHeightRaw() / 2;
}

function getIntervalHeightRaw() {
    return parseInt(getComputedStyle(document.body).getPropertyValue('--increment-height'));
}

function findNearestIntervalPX(pageY: number) {
    const intervalHeight = getIntervalHeight();
    return Math.floor(pageY / intervalHeight) * intervalHeight;
}

function nearestPXFromInterval(interval: number) {
    return interval * getIntervalHeight();
}

function findNearestInterval(pageY: number) {
    const intervalHeight = getIntervalHeight();
    return Math.floor(pageY / intervalHeight);
}

interface EventStyle {
    top: string;
    height: string;
    backgroundColor: string;
};

interface NewEvent {
    event?: ReactNode;
    style: EventStyle;
    time: number[];
};

interface EventContent {
    title: string;
    description: string;
};

function Day() {
    const newEventDefault: NewEvent = {
        event: null,
        style: { top: '0px', height: '0', backgroundColor: '' },
        time: [0, 0]
    };

    const [events, setEvents] = useState<any[]>([]);
    const [mouseDown, setMouseDown] = useState(0); // TODO: bad variable name
    const [newEvent, setNewEvent] = useState(newEventDefault);
    const [modal, setModal] = useState(<Modal close={() => { }} hidden={true} time={['', '']} />);
    const [description, setDescription] = useState('');

    const timeToString = (time: number[]) => {
        return time.map(t => `${minutesToMilitary(t)}`);
    }

    // TODO: cleanup the event functions. these are gross
    const onMouseDown = (e: React.MouseEvent) => {
        if (e.button === 0 && e.pageY > getIntervalHeightRaw()) {
            setMouseDown(e.pageY);
            const top = findNearestIntervalPX(e.pageY);
            const height = getIntervalHeight();
            const newStyle = Object.assign({}, newEvent.style, {
                top: `${top}px`,
                height: `${height}px`, // TODO: change this height to some variable
                backgroundColor: getRandomColor(),
            });

            const newTime = [INTERVAL * (top / height - 2), INTERVAL * ((height + top) / height - 2)];

            const freshEv: NewEvent = {
                event: (
                    <Event style={newStyle} time={timeToString(newTime)} />
                ),
                style: newStyle,
                time: newTime,
            };

            setNewEvent(freshEv);
            setEvents(events.concat([freshEv]));
        }
    };

    const updateWithNewEvent = (ne: NewEvent) => {
        let newEvents = events.slice(0, -1);
        setEvents(newEvents.concat([ne]));
    };

    const closeModal = () => {
        document.body.style.setProperty('overflow', '');
        setModal(<Modal {...getModalProps(false)} />);
    };

    const setEventContent = (content: EventContent) => {
        const latest = events[events.length - 1];
        const updated: NewEvent = {
            time: latest.time,
            event: <Event time={timeToString(latest.time)} style={latest.style} title={content.title} description={content.description} />,
            style: latest.style,
        };

        updateWithNewEvent(updated);
        closeModal();
    };

    const saveEvent = (content: EventContent) => {
        const times: string[] = timeToString(events[events.length - 1].time);
        const dbEvent: CalendarEvent = {
            title: content.title,
            description: content.description,
            startTime: times[0],
            endTime: times[1],
        };

        setEventContent(content);

        // save event in DB with API
        fetch('/api/event', {
            method: 'POST',
            body: JSON.stringify(dbEvent),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json()).then(res => {
            console.log(res);
        });
    };

    const cancelEvent = () => {
        setEvents(events.slice(0, -1));
        closeModal();
    };

    const getModalProps = (hidden: boolean, time?: string[]) => {
        if (!hidden) {
            return {
                close: () => { },
                hidden: true,
                time: ['', ''],
                onSubmit: () => { },
            };
        }
        else {
            return {
                close: cancelEvent,
                hidden: false,
                time: time,
                onSubmit: saveEvent,
            };
        }
    }

    const openModal = (time: string[]) => {
        document.body.style.setProperty('overflow', 'hidden');
        setModal(<Modal {...getModalProps(true, time)} />);
    }

    const onMouseUp = () => {
        if (mouseDown) {
            setMouseDown(0);
            openModal(timeToString(newEvent.time));
            updateWithNewEvent(newEvent);
            setNewEvent(newEventDefault);
        }
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (mouseDown) {
            const height = parseInt(newEvent.style.height);
            const nearestInterval = findNearestInterval(e.pageY) + 1;
            const minimumInterval = findNearestInterval(mouseDown);
            const currentElementInterval = findNearestInterval(mouseDown + height);

            if (nearestInterval !== currentElementInterval && nearestInterval > minimumInterval) {
                const intervalHeight = getIntervalHeight();
                const newHeight = height + (nearestPXFromInterval(nearestInterval) - findNearestIntervalPX(mouseDown + height));

                const newStyle = Object.assign({}, newEvent.style, {
                    top: newEvent.style.top,
                    height: `${newHeight}px`,
                });

                const top = parseInt(newEvent.style.top);
                const newTime = [
                    INTERVAL * (top / intervalHeight - 2),
                    INTERVAL * ((newHeight + top) / intervalHeight - 2)
                ];

                const updatedEvent = {
                    event: (
                        <Event style={newStyle} time={timeToString(newTime)} />
                    ),
                    style: newStyle,
                    time: newTime,
                };

                updateWithNewEvent(updatedEvent);
                setNewEvent(updatedEvent);
            }
        }
    };

    return (
        <>
            <div>{modal}</div>
            <div className={dayStyles.day} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove} onMouseLeave={onMouseUp}>
                {events.map(e => e.event)}
            </div>
        </>
    );
}

export default Day;
