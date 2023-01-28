import eventStyles from '@/styles/event.module.css';

interface EventProps {
    style: any;
}

function Event(props: EventProps) {
    return (
        <div className={eventStyles.eventContainer} style={props.style}>
            <div className={eventStyles.eventContentContainer}>testing!</div>
        </div>
    );
}

export default Event;
