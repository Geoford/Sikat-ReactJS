import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DiaryEntry from "../../assets/DiaryEntry.png";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function DiaryEntryButton() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="orangeButton w-100" onClick={handleShow}>
        Diary Entry{" "}
        <img
          className="miniIcon mb-1"
          src={DiaryEntry}
          alt="Diary Entry Icon"
        />
      </button>

      {/* Modal component */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Diary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center gap-2 border-bottom pb-2">
            <div className="profilePicture"></div>
            <p className="m-0">UserName</p>
          </div>
          <div>
            <InputGroup className="mb-1">
              <Form.Control
                placeholder="Journal Title"
                aria-label="Journal Title"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <FloatingLabel
              controlId="floatingTextarea2"
              label="Describe your day, UserName!"
            >
              <Form.Control
                className=""
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </div>
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
    </>
  );
}

export default DiaryEntryButton;
