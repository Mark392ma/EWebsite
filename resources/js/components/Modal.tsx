import React from "react";

interface ModalProps {
    show: boolean;
    onClose: ()=> void;
    children: React.ReactNode;
}

const Modal = ({show, onClose, children}: ModalProps) => {
    if(!show) return null;

    return (
        <div className="fixed inset-0 rounded left-[50%] top-[50%] z-50 w-[60%] max-w-[900vw] translate-x-[-50%] translate-y-[-50%] border bg-background">
            <div className="bg-white p-4 rounded shadow-lg">
                { children }
                <button onClick={onClose}>x</button>
            </div>

        </div>
    )
}

export default Modal