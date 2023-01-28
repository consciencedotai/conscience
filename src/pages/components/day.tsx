import Event from './event';
import { ReactNode, useState } from 'react';

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

function findNearestIntervalPX(pageY: number) {
    const intervalHeight = parseInt(getComputedStyle(document.body).getPropertyValue('--increment-height'));
    return Math.floor(pageY / intervalHeight) * intervalHeight;
}

function findNearestInterval(pageY: number) {
    const intervalHeight = parseInt(getComputedStyle(document.body).getPropertyValue('--increment-height'));
    return Math.floor(pageY / intervalHeight);
}

interface DayProps {
  day: string;
};

interface EventStyle {
  top: string;
  height: string;
  backgroundColor: string;
};

interface NewEvent {
  event?: ReactNode;
  style: EventStyle;
};

function Day(props: DayProps) {
    const newEventDefault: NewEvent = { event: null, style: { top: '0px', height: '0', backgroundColor: '' }, };
    const [events, setEvents] = useState<any[]>([]);
    const [mouseDown, setMouseDown] = useState(0); // TODO: bad variable name
    const [newEvent, setNewEvent] = useState(newEventDefault);

    // TODO: cleanup the event functions. these are gross
    const onMouseDown = (e: React.MouseEvent) => {
        setMouseDown(e.pageY);
        const newStyle = Object.assign({}, newEvent.style, {
            top: `${findNearestIntervalPX(e.pageY)}px`,
            height: '48px', // TODO: change this height to some variable
            backgroundColor: getRandomColor(),
        });

        const freshEv: NewEvent = {
            event: (
                <Event style={ newStyle } />
            ),
            style: newStyle,
        };

        setNewEvent(freshEv);
        setEvents(events.concat([freshEv]));
    };

    const updateWithNewEvent = (ne: NewEvent) => {
        let newEvents = events.slice(0, -1);
        setEvents(newEvents.concat([ne]));
    };

    const onMouseUp = () => {
        setMouseDown(0);
        updateWithNewEvent(newEvent);
        setNewEvent(newEventDefault);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (mouseDown) {
            const height = parseInt(newEvent.style.height);
            const nearestInterval = findNearestInterval(e.pageY);
            const a = nearestInterval;
            const b = findNearestInterval(mouseDown + height);

            if (a !== b) {
                const newStyle = Object.assign({}, newEvent.style, {
                    top: newEvent.style.top,
                    height: `${height + (findNearestIntervalPX(e.pageY) - findNearestIntervalPX(mouseDown + height))}px`,
                });

                const updatedEvent = {
                    event: (
                        <Event style={ newStyle } />
                    ),
                    style: newStyle,
                };

                updateWithNewEvent(updatedEvent);
                setNewEvent(updatedEvent);
            }
        }
    };

    return (
        <div className={ dayStyles.day } onMouseDown={ onMouseDown } onMouseUp={ onMouseUp } onMouseMove={ onMouseMove }>
            <div className={ dayStyles.incrementContainer }>
                <div className={ dayStyles.dayName }>{ props.day }</div>
            </div>
            { events.map(e => e.event) }
        </div>
    );
}

export default Day;
