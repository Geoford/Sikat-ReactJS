import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const UserAuthentication = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div
        className="w-100 d-flex align-items-center gap-2 ps-3 py-2"
        style={{ cursor: "pointer" }}
        onClick={handleShow}
      >
        <i class="bx bx-check-shield bx-sm"></i>
        <p className="m-0">Password and Security</p>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Floating className="mb-3 mt-0 position-relative">
            <Form.Control
              id="newPasswordInput"
              name="new-password-field"
              type={showPassword ? "text" : "password"}
              placeholder=""
              autoComplete="new-password"
            />
            <label htmlFor="newPasswordInput">Password</label>
            <div
              className="position-absolute d-flex align-items-center"
              style={{
                height: "100%",
                top: "0",
                right: "1.5rem",
                cursor: "pointer",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              <p className="secondaryButton m-0">
                {showPassword ? "Hide" : "Show"}
              </p>
            </div>
          </Form.Floating>
        </Modal.Body>
        <Modal.Footer>
          <button className="primaryButton px-4 py-2" onClick={handleClose}>
            Verify
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserAuthentication;
