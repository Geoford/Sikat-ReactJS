import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AnonymousIcon from "../../../assets/Anonymous.png";
import SendIcon from "../../../assets/SendIcon.png";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import CommentDropdown from "./CommentDropdown";

const CommentSection = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="InteractButton" onClick={handleShow}>
        Comment
      </button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>UserName's Diary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="d-flex flex-column gap-2"
            style={{ height: "55vh", overflowY: "scroll" }}
          >
            <div>
              <div className="d-flex align-items-start flex-column gap-2 pb-2">
                <div className="w-100 d-flex align-items-center justify-content-between pe-3">
                  <div className="d-flex align-items-center gap-2">
                    <div className="profilePicture d-flex align-items-center justify-content-center pt-1">
                      <img
                        src={AnonymousIcon}
                        alt=""
                        style={{ width: "80%" }}
                      />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <h6 className="m-0 text-start">UserName</h6>
                    </div>
                  </div>
                  <div>
                    <CommentDropdown></CommentDropdown>
                  </div>
                </div>
              </div>

              {/* Replies */}
              <div className="ms-4 ps-2 border-start border-2 rounded-bottom-5">
                <p className="m-0 text-secondary">
                  Sample Comment Lorem ipsum, dolor sit amet consectetur
                  adipisicing elit. Quisquam explicabo accusamus nobis rem ipsa
                  illo?
                </p>
                <div className="">
                  <button className="btn btn-light btn-sm">Gadify</button>
                  <button className="btn btn-light btn-sm">Reply</button>
                </div>
                <div className="d-flex align-items-start flex-column gap-2 ps-1 pb-2 mt-2">
                  <div className="w-100 d-flex align-items-center justify-content-between pe-3">
                    <div className="d-flex align-items-center gap-2">
                      <div className="profilePicture d-flex align-items-center justify-content-center pt-1">
                        <img
                          src={AnonymousIcon}
                          alt=""
                          style={{ width: "80%" }}
                        />
                      </div>
                      <div className="d-flex justify-content-start flex-column">
                        <h6 className="m-0 text-start">UserName</h6>
                      </div>
                    </div>
                    <div>
                      <CommentDropdown></CommentDropdown>
                    </div>
                  </div>
                  <p className="ps-5 m-0 text-secondary">
                    Sample Comment Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Quisquam explicabo accusamus nobis rem
                    ipsa illo?
                  </p>
                  <div className="ps-5">
                    <button className="btn btn-light btn-sm">Gadify</button>
                    <button className="btn btn-light btn-sm">Reply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="">
          <div className="w-100 position-relative">
            <FloatingLabel controlId="floatingTextarea2" label="Comment">
              <Form.Control
                className="custom-scrollbar pe-5"
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
              />
            </FloatingLabel>
            <button
              className="position-absolute p-2 rounded-circle"
              onClick={handleClose}
              style={{
                right: "10px",
                bottom: "10px",
                backgroundColor: "#ffff",
                border: "none",
              }}
            >
              <img className="miniIcon m-0" src={SendIcon} alt="" />
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommentSection;
