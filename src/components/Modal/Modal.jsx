import { useEffect, useRef } from "react";

import './styles.scss'
import PropTypes from 'prop-types';

Modal.propTypes = {
    openModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

function Modal({openModal, closeModal, children}) {
    const ref = useRef();

    useEffect(() => {
        if (openModal) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [openModal]);

    return (
        <dialog 
            className='modal' 
            ref={ref}
            onCancel={closeModal}
        >
            {children}
            <button onClick={closeModal}>
                Ще раз
            </button>
        </dialog>
    )
}

export default Modal
