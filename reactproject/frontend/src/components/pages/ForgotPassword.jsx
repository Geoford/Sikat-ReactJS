import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ForgotPassword = () => {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1);
  const [values, setValues] = useState({
    cvsuEmail: "",
    OTP: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleClose = () => {
    setShow(false);
    setStep(1);
    setValues({
      cvsuEmail: "",
      OTP: "",
      password: "",
      confirmPassword: "",
    });
    setError("");
    setSuccessMessage("");
  };

  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendOTP = async () => {
    setError("");
    try {
      await axios.post("http://localhost:8081/send-otp", {
        email: values.cvsuEmail,
      });
      setStep(2);
    } catch (err) {
      setError(
        err.response?.data?.error || "Error sending OTP. Please try again."
      );
    }
  };

  const handleVerifyOTP = async () => {
    setError("");
    try {
      await axios.post("http://localhost:8081/verify-otp", {
        email: values.cvsuEmail,
        otp: values.OTP,
      });
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.error || "Invalid OTP. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    setError("");
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await axios.post("http://localhost:8081/reset-password", {
        email: values.cvsuEmail,
        password: values.password,
      });
      setSuccessMessage("Password reset successfully. You can now log in.");
      setTimeout(handleClose, 3000); // Close modal after 3 seconds
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Error resetting password. Please try again."
      );
    }
  };

  return (
    <>
      <button
        type="button"
        className="my-1"
        onClick={handleShow}
        style={{ border: "none", backgroundColor: "transparent" }}
      >
        <p className="hoverUnderline m-0 text-light">Forgot Password?</p>
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Account Recovery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {step === 1 && (
            <div>
              <div className="mb-3">
                <input
                  type="email"
                  name="cvsuEmail"
                  placeholder="Enter your email"
                  className="form-control rounded"
                  value={values.cvsuEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p>OTP sent to your CvSU Email.</p>
              <div className="mb-3">
                <input
                  type="number"
                  name="OTP"
                  placeholder="Enter OTP"
                  className="form-control rounded"
                  value={values.OTP}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  className="form-control rounded"
                  autoComplete="new-password"
                  value={values.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="form-control rounded"
                  value={values.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          {error && <div className="text-danger">{error}</div>}
          {successMessage && (
            <div className="text-success">{successMessage}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {step === 1 && (
            <button className="primaryButton py-2" onClick={handleSendOTP}>
              Send OTP
            </button>
          )}
          {step === 2 && (
            <button className="primaryButton py-2" onClick={handleVerifyOTP}>
              Verify OTP
            </button>
          )}
          {step === 3 && (
            <button
              className="primaryButton py-2"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ForgotPassword;
