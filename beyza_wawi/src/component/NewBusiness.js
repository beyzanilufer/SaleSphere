import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/Business.css'

function NewBusiness({ show, handleClose }) {



    return (
        //  <div className="modal">

        <Modal style={{
            position: "absolute",
            

            top: " 20px",
            left: " 50%",
            transform: "translate(-50%, 50%)"
        }} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal Heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                This is a simple modal body text. You can put any content here.
                This is a simple modal body text. You can put any content here.
                This is a simple modal body text. You can put any content here.
                This is a simple modal body text. You can put any content here.
                This is a simple modal body text. You can put any content here.
                This is a simple modal body text. You can put any content here.
                This is a simple modal body text. You can put any content here.
                This is a simple modal body text. You can put any content here.
                This is a simple modal body text. You can put any content here.
                This is a simple modal body text. You can put any content here.
                This is a simple modal body text. You can put any content here.
                This is a simple modal body text. You can put any content here.
                This is a simple modal body text. You can put any content here.
                This is a simple modal body text. You can put any content here.
                This is a simple modal body text. You can put any content here.
                <div> This is a simple modal body text. You can put any content here.</div>
                <div> This is a simple modal body text. You can put any content here.</div>
                <div> This is a simple modal body text. You can put any content here.</div>
                <div> This is a simple modal body text. You can put any content here.</div>
                <div> This is a simple modal body text. You can put any content here.</div>
                <div> This is a simple modal body text. You can put any content here.</div>
                <div> This is a simple modal body text. You can put any content here.</div>
                <div> This is a simple modal body text. You can put any content here.</div>
                <div> This is a simple modal body text. You can put any content here.</div>
                <div> This is a simple modal body text. You can put any content here.</div>
                <div> This is a simple modal body text. You can put any content here.</div>
                <div> This is a simple modal body text. You can put any content here.</div>
                <div> This is a simple modal body text. You can put any content here.</div>
                <div> This is a simple modal body text. You can put any content here.</div>
                <div> This is a simple modal body text. You can put any content here.</div>
                <div> This is a simple modal body text. You can put any content here.</div>
                <div> This is a simple modal body text. You can put any content here.</div>
                <div> This is a simple modal body text. You can put any content here.</div>
                <div> This is a simple modal body text. You can put any content here.</div>
                <div> This is a simple modal body text. You can put any content here.</div>
                <div> This is a simple modal body text. You can put any content here.</div>
                <div> This is a simple modal body text. You can put any content here.</div> <div> This is a simple modal body text. You can put any content here.</div>



            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>


        // </div>

    )
}

export default NewBusiness