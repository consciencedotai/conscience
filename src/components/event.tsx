import eventStyles from '@/styles/event.module.css';

interface EventProps {
    style: any;
    time: string[];
    title?: string;
    description?: string;
}

function Event(props: EventProps) {
    return (
        <div className={eventStyles.eventContainer} style={props.style}>
            <div className={eventStyles.eventContentContainer}>
                <div>{props.title}</div>
                <div>{`${props.time[0]} - ${props.time[1]}`}</div>
                <div className={eventStyles.eventContent}>{props.description}</div>
            </div>
        </div>
    );
}

export default Event;
