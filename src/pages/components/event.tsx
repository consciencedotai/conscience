import eventStyles from '@/styles/event.module.css';

interface EventProps {
    style: any;
    time: string[];
    description?: string;
}

function Event(props: EventProps) {
    return (
        <div className={eventStyles.eventContainer} style={props.style}>
            <div className={eventStyles.eventContentContainer}>
                <div>{`${props.time[0]} - ${props.time[1]}`}</div>
                <div>{props.description}</div>
            </div>
        </div>
    );
}

export default Event;
