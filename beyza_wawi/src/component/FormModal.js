import "../css/FormModal.css";

const FormModal = ({ children, show, handleClose, title }) => {
    return (
        <div style={{ display: show ? "block" : "none" }} id="myModal" className="modal">
            <div className="modal-content">
                <div style={{backgroundColor:'#5cb85c',padding:'2px 16px',color: 'white'}}>
                    <span onClick={() => handleClose()} className="close">&times;</span>
                    <h2>{title}</h2>
                </div>

                {
                    children
                }
            </div>

        </div>
    )
}

export const ModalBody = ({ children }) => {
    return (
        <div className="modal-body">
            {children}
        </div>
    )
}

export const ModalFooter = ({ children }) => {
    return (
        <div className="modal-footer">
            {children}
        </div>
    )
}

export default FormModal;