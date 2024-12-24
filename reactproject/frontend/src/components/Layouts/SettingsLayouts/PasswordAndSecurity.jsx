import React, { useState } from "react";
import UserAuthentication from "./UserAuthentication";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const PasswordAndSecurity = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div
      className="p-3 rounded shadow-sm"
      style={{
        backgroundColor: "#ffff",
        minHeight: "clamp(20rem, 20vh, 30rem)",
      }}
    >
      <h5 className="border-bottom border-2 pb-2">Password and Security</h5>
      <form action="" autoComplete="off">
        <Row className="g-2 pt-2 text-start ">
          <h5 className="m-0">Change Password</h5>
          <p className="text-secondary m-0" style={{ fontSize: ".9rem" }}>
            Changing a password regularly enhances security by reducing the risk
            of unauthorized access to your accounts, especially if your previous
            password was compromised.
          </p>
          <Col md>
            <Form.Floating className="mb-2 mt-0 position-relative">
              <Form.Control
                id="newPasswordInput"
                name="new-password-field"
                type={showNewPassword ? "text" : "password"}
                placeholder=""
                autoComplete="new-password"
              />
              <label htmlFor="newPasswordInput">New Password</label>
              <div
                className="position-absolute d-flex align-items-center"
                style={{
                  height: "100%",
                  top: "0",
                  right: "1.5rem",
                  cursor: "pointer",
                }}
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                <p className="secondaryButton m-0">
                  {showNewPassword ? "Hide" : "Show"}
                </p>
              </div>
            </Form.Floating>
            <Form.Floating className="mb-3 mt-0 position-relative">
              <Form.Control
                id="confirmPasswordInput"
                name="confirm-password-field"
                type={showConfirmPassword ? "text" : "password"}
                placeholder=""
                autoComplete="new-password"
              />
              <label htmlFor="confirmPasswordInput">Confirm Password</label>
              <div
                className="position-absolute d-flex align-items-center"
                style={{
                  height: "100%",
                  top: "0",
                  right: "1.5rem",
                  cursor: "pointer",
                }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <p className="secondaryButton m-0">
                  {showConfirmPassword ? "Hide" : "Show"}
                </p>
              </div>
            </Form.Floating>
          </Col>
        </Row>
        <div className="mt-4 d-flex justify-content-end">
          <button type="submit" className="primaryButton px-5 py-2">
            <p className="m-0">Save</p>
          </button>{" "}
        </div>
      </form>
    </div>
  );
};

export default PasswordAndSecurity;
