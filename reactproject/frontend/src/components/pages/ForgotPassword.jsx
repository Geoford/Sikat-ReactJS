import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ForgotPassword = () => {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1); // Step state to control which step is shown

  const handleClose = () => {
    setShow(false);
    setStep(1); // Reset step on close
  };
  const handleShow = () => setShow(true);

  const handleFirstStepSubmit = () => {
    // You can add validation for the recovery question and OTP here
    // If valid, proceed to the second step
    setStep(2);
  };

  return (
    <>
      <button
        type="button"
        className=" my-1"
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
            // FIRST STEP
            <div>
              <div className="mb-3">
                <p className="m-0">
                  <b>Recovery Question:</b> What is your favorite color?
                </p>
                <div className="input-group mb-2">
                  <input
                    type="text"
                    name="answer"
                    placeholder="Answer"
                    className="form-control rounded-end"
                  />
                </div>
              </div>

              <div>
                <p className="m-0">OTP sent to email@email.com</p>
                <div className="mb-3">
                  <input
                    type="number"
                    name="OTP"
                    placeholder="OTP eg. 000000"
                    className="form-control rounded"
                  />
                </div>
                <div className="text-end px-2">
                  <a className="m-0 text-end" href="">
                    Resend OTP
                  </a>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            // SECOND STEP
            <div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  className="form-control rounded"
                  autoComplete="new-password"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="form-control rounded"
                />
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {step === 1 ? (
            <button
              className="primaryButton py-2"
              onClick={handleFirstStepSubmit}
            >
              Next
            </button>
          ) : (
            <button className="primaryButton py-2" onClick={handleClose}>
              Submit
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ForgotPassword;
