import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ChatIcon from "../../../assets/ChatIcon.png";
import SendIcon from "../../../assets/SendIcon.png";

const ChatButton = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="ChatButton">
        <button className="shadow" onClick={handleShow}>
          <img src={ChatIcon} alt="" />
          <span class="tooltiptext">Message Admin</span>
        </button>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Hello, UserName! </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div
              className="border rounded mb-1 p-2"
              style={{ height: "300px", overflowY: "scroll" }}
            >
              <div className="mb-2">
                <p className="m-0 text-secondary text-center">
                  You're now messaging the GAD Personnel Admins. Please be
                  respectful, and don't hesitate to communicate!
                </p>
              </div>

              <div>
                <div
                  className="rounded p-2 text-light"
                  style={{
                    backgroundColor: "#990099",
                    maxWidth: "200px",
                    width: "fit-content",
                    wordWrap: "break-word",
                  }}
                >
                  <p className="m-0">Hello, Kamusta?</p>
                </div>
              </div>

              <div className="w-100 d-flex justify-content-end">
                <div
                  className="rounded p-2 text-light"
                  style={{
                    backgroundColor: "#ff8533",
                    maxWidth: "200px",
                    width: "fit-content",
                    wordWrap: "break-word",
                  }}
                >
                  <p className="m-0">Ayos lang naman po, Ikaw kamusta?</p>
                </div>
              </div>
            </div>

            <div>
              <FloatingLabel controlId="floatingTextarea2" label="Message">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "70px" }}
                />
              </FloatingLabel>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button className="orangeButton py-2 d-flex align-items-center justify-content-center">
            <p className="me-2 mb-0">Send</p>
            <img
              src={SendIcon}
              alt=""
              style={{ width: "20px", height: "20px" }}
            />
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChatButton;
