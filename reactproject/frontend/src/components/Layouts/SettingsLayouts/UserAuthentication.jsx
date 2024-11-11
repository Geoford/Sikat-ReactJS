import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const UserAuthentication = ({ userID }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false); // Track verification state

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleClose = () => {
    // If the modal is being closed and the password wasn't verified, navigate to Profile
    if (
      !verificationStatus ||
      verificationStatus !== "Password verified successfully!"
    ) {
      alert("Password Required!");
      window.location.reload();
    }
    setShow(false);
    setPassword("");
    setVerificationStatus(null); // Reset status on close
  };

  const handleShow = () => setShow(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleVerify = async () => {
    setIsVerifying(true); // Set verifying state to true
    try {
      const response = await axios.post(
        `http://localhost:8081/verify-password/${userID}`,
        {
          password,
        }
      );

      if (response.status === 200) {
        setVerificationStatus("Password verified successfully!");
        // No navigation here; just close the modal
        setShow(false);
      } else {
        setVerificationStatus("Password verification failed. Try again.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationStatus("Password verification failed. Try again.");
    } finally {
      setIsVerifying(false); // Reset verification state
    }
  };

  return (
    <>
      <div
        className="w-100 d-flex align-items-center gap-2 ps-3 py-2"
        style={{ cursor: "pointer" }}
        onClick={handleShow}
      >
        <i className="bx bx-check-shield bx-sm"></i>
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
              value={password}
              onChange={handlePasswordChange}
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
          {verificationStatus && (
            <p className="mt-2 text-center">{verificationStatus}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="primaryButton px-4 py-2" onClick={handleVerify}>
            Verify
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserAuthentication;
