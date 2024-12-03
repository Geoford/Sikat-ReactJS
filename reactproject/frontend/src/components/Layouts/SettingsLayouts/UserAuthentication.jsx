import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const UserAuthentication = ({ userID }) => {
  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false); // Track verification state

  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Fetch the logged-in user's email from the backend
    const fetchUserEmail = async () => {
      try {
        const response = await axios.get(`/get-user-email/${userID}`); // Replace with your API endpoint
        setEmail(response.data.cvsuEmail);
      } catch (error) {
        console.error("Error fetching email:", error);
        setVerificationStatus("Failed to fetch email. Please try again.");
      }
    };
    fetchUserEmail();
  }, [userID]);

  const handleClose = () => {
    // If the modal is being closed and the OTP wasn't verified, reload the page
    if (
      !verificationStatus ||
      verificationStatus !== "OTP verified successfully!"
    ) {
      alert("OTP Required!");
      window.location.reload();
    }
    setShow(false);
    setOtp("");
    setVerificationStatus(null); // Reset status on close
  };

  const handleShow = () => setShow(true);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = async () => {
    setIsVerifying(true); // Set verifying state to true
    try {
      const response = await axios.post(
        `http://localhost:8081/verify-otp/${userID}`, // Replace with your endpoint to verify OTP
        {
          email,
          otp,
        }
      );

      if (response.status === 200) {
        setVerificationStatus("OTP verified successfully!");
        setShow(false);
      } else {
        setVerificationStatus("OTP verification failed. Try again.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationStatus("OTP verification failed. Try again.");
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
        <h5 className="m-0">
          <i className="bx bx-check-shield"></i>
        </h5>
        <p className="m-0">Password and Security</p>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Account Verification</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-secondary">
            An OTP has been sent to your CvSU email to verify your identity to
            access your security details.
          </p>
          <Form.Floating className="mb-3 mt-0 position-relative">
            <Form.Control
              id="otpInput"
              name="otp"
              type="text"
              placeholder="eg. 000000"
              autoComplete="off"
              value={otp}
              onChange={handleOtpChange}
            />
            <label htmlFor="otpInput">Enter the 6-digit OTP</label>
          </Form.Floating>
          {verificationStatus && (
            <p className="mt-2 text-center">{verificationStatus}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="primaryButton px-4 py-2"
            onClick={handleVerifyOtp}
            disabled={isVerifying}
          >
            <p className="m-0">{isVerifying ? "Verifying..." : "Verify OTP"}</p>
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserAuthentication;
