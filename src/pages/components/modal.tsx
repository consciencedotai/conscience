import { useEffect, useState, useRef } from 'react';

import modalStyles from '@/styles/modal.module.css';

function Modal(props: any) {
    const [time, setTime] = useState<any[]>(['', '']);
    const descriptionRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

    useEffect(() => {
        setTime(props.time);
    }, [props.time]);

    let modalStyle, backdropStyle;
    if (props.hidden) {
        modalStyle = {
            width: '0',
            opacity: 0,
        };

        backdropStyle = {
            display: 'none',
        };
    }

    const saveEvent = () => {
        props.onSubmit(descriptionRef.current.value);
    };

    return (
        <>
            <div className={modalStyles.modalBackdrop} style={backdropStyle} onClick={props.close} />
            <div className={modalStyles.modal} style={modalStyle}>
                <div className={modalStyles.modalText}>From {time[0]} to {time[1]}.</div>
                <textarea ref={descriptionRef} className={modalStyles.modalInput} placeholder="What are you doing?" />
                <button onClick={saveEvent}>Save</button>
            </div>
        </>
    );
}

export default Modal;
