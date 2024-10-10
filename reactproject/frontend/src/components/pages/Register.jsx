import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterValidation from "./RegisterValidation";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Alert } from "react-bootstrap"; // Import Bootstrap Alert

export default function Register() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    cvsuEmail: "",
    alias: "",
    studentNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step to manage current form section
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false); // State for alert visibility

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/Home");
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (step === 3) {
      const validationErrors = RegisterValidation(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        axios
          .post("http://localhost:8081/Register", values)
          .then((res) => {
            navigate("/");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      } else {
        setShowAlert(true); // Show alert if there are errors
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // Step-based progress percentage
  const progressPercent = step === 1 ? 0 : step === 2 ? 50 : 100;

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center flex-column pt-2">
      <div
        className=" mb-3 position-relative py-2 "
        style={{ width: "clamp(450px, 80vw, 650px)" }}
      >
        <div
          className="position-absolute w-100"
          style={{ top: "50%", transform: "translateY(-50%)", zIndex: "-1" }}
        >
          <ProgressBar
            now={progressPercent}
            className="custom-progress-bar"
            animated
          />
        </div>
        <div className="d-flex justify-content-between">
          <div
            className={`stepsIndicator ${step === 1 ? "active" : ""}`}
            style={{
              backgroundColor: step >= 1 ? "var(--primary)" : "lightgray",
              color: step >= 1 ? "#ffff" : "gray",
            }}
          >
            <h5>1</h5>
          </div>
          <div
            className={`stepsIndicator ${step === 2 ? "active" : ""}`}
            style={{
              backgroundColor: step >= 2 ? "var(--primary)" : "lightgray",
              color: step >= 2 ? "#ffff" : "gray",
            }}
          >
            <h5>2</h5>
          </div>
          <div
            className={`stepsIndicator ${step === 3 ? "active" : ""}`}
            style={{
              backgroundColor: step === 3 ? "var(--primary)" : "lightgray",
              color: step >= 3 ? "#ffff" : "gray",
            }}
          >
            <h5>3</h5>
          </div>
        </div>
      </div>

      <div
        className="bg-white rounded border border-secondary-subtle shadow text-start p-3 "
        style={{
          width: "clamp(450px, 80vw, 650px)",
          minHeight: "clamp(350px, 60vh, 450px)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <form
          className="h-100 d-flex flex-column justify-content-between"
          action=""
          onSubmit={handleSubmit}
        >
          <div>
            <div className="border-bottom pb-1 mb-2">
              <h3 className="m-0" style={{ color: "var(--primary)" }}>
                Create New Account
              </h3>
              <p className="m-0 text-secondary">
                Easily establish your account in just a few steps.
              </p>
            </div>

            {/* Error Alert */}
            {showAlert && Object.keys(errors).length > 0 && (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <ul className="mb-0">
                  {Object.entries(errors).map(([key, message]) => (
                    <li key={key}>{message}</li>
                  ))}
                </ul>
              </Alert>
            )}

            {/* Personal Details - Step 1 */}
            {step === 1 && (
              <div
                className={`form-section active`}
                style={{ transition: "all 0.5s ease-in-out" }}
              >
                <h5>Personal Details</h5>
                <div className="row">
                  <div className="col mb-3">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      onChange={handleInput}
                      className="form-control rounded"
                      value={values.firstName}
                    />
                  </div>
                  <div className="col mb-3">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      onChange={handleInput}
                      className="form-control rounded"
                      value={values.lastName}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="alias"
                    placeholder="Alias (for anonymity purposes)"
                    onChange={handleInput}
                    className="form-control rounded"
                    value={values.alias}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="cvsuEmail"
                    placeholder="CvSU Email"
                    onChange={handleInput}
                    className="form-control rounded"
                    value={values.cvsuEmail}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    name="studentNumber"
                    placeholder="Student Number"
                    onChange={handleInput}
                    className="form-control rounded"
                    value={values.studentNumber}
                  />
                </div>
              </div>
            )}

            {/* Account Details - Step 2 */}
            {step === 2 && (
              <div
                className={`form-section active`}
                style={{
                  transform: `translateX(0)`,
                  transition: "all 0.5s ease-in-out",
                }}
              >
                <h5>Account Security Details</h5>
                <div className="mb-3">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleInput}
                    className="form-control rounded"
                    value={values.username}
                    autoComplete="new-username"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInput}
                    className="form-control rounded"
                    value={values.password}
                    autoComplete="new-password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleInput}
                    className="form-control rounded"
                    value={values.confirmPassword}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="securityQuestion"
                    placeholder="Security Question"
                    className="form-control rounded"
                    autoComplete="new-question"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="securityAnswer"
                    placeholder="Security Answer"
                    className="form-control rounded"
                    autoComplete="new-answer"
                  />
                </div>
              </div>
            )}

            {/* Security Details - Step 3 */}
            {step === 3 && (
              <div
                className={`form-section active`}
                style={{
                  transform: `translateX(0)`,
                  transition: "all 0.5s ease-in-out",
                }}
              >
                <h5>Account Verification</h5>
                <div>
                  <p className="m-0">OPT sent to email@email.com</p>
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
                      Resend otp
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Navigation Buttons */}
          <div
            className="w-100 d-flex justify-content-between"
            style={{ bottom: "0", left: "0" }}
          >
            <button
              type="button"
              className="w-25 btn btn-secondary"
              onClick={() => setStep(step - 1)}
              disabled={step === 1} // Disable when on step 1
            >
              Back
            </button>

            <button type="submit" className="w-25 primaryButton">
              {step === 3 ? "Submit" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
