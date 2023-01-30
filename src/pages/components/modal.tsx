import { useEffect, useState, useRef } from 'react';

import modalStyles from '@/styles/modal.module.css';

function Modal(props: any) {
    const [time, setTime] = useState<any[]>(['', '']);
    const titleRef = useRef() as React.MutableRefObject<HTMLInputElement>;
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
        props.onSubmit({
            title: titleRef.current.value,
            description: descriptionRef.current.value,
        });
        titleRef.current.value = "";
        descriptionRef.current.value = "";
    };

    const removeText = () => {
        
        titleRef.current.value = "";
        descriptionRef.current.value = "";
        props.close();
    };

    return (
        <>
            <div className={modalStyles.modalBackdrop} style={backdropStyle} onClick={removeText} />
            <div className={modalStyles.modal} style={modalStyle}>
                <div className={modalStyles.modalText}>From {time[0]} to {time[1]}.</div>
                <div className={modalStyles.modalTitleInputContainer}>
                    <input ref={titleRef} type="text" className={modalStyles.modalTitleInput} placeholder="Title" />
                </div>
                <textarea ref={descriptionRef} className={modalStyles.modalDescriptionInput} placeholder="What are you doing?" />
                <div>
                    <button className={modalStyles.modalSaveButton} onClick={saveEvent}>Save</button>
                </div>
            </div>
        </>
    );
}

export default Modal;
