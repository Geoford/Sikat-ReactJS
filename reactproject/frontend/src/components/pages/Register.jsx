import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterValidation from "./RegisterValidation";
import axios from "axios";

export default function Register() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    cvsuEmail: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/Home");
    }
  }, [navigate]);

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
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
    }
  };

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center ">
      <div
        className="bg-white rounded border border-secondary-subtle shadow text-start p-3 mt-5"
        style={{ width: "clamp(450px, 80vw, 650px)" }}
      >
        <div className="border-bottom pb-1 mb-2">
          <h3 className="m-0" style={{ color: "#990099" }}>
            Create New Account
          </h3>
          <p className="m-0 text-secondary">
            Easily establish your account in just a few steps.
          </p>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div>
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
                {errors.firstName && (
                  <span className="text-danger"> {errors.firstName}</span>
                )}
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
                {errors.lastName && (
                  <span className="text-danger"> {errors.lastName}</span>
                )}
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
              {errors.cvsuEmail && (
                <span className="text-danger"> {errors.cvsuEmail}</span>
              )}
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

          <div>
            <h5>Account Details</h5>
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
              {errors.username && (
                <span className="text-danger"> {errors.username}</span>
              )}
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
              {errors.password && (
                <span className="text-danger"> {errors.password}</span>
              )}
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
              {errors.confirmPassword && (
                <span className="text-danger"> {errors.confirmPassword}</span>
              )}
            </div>
          </div>
          <button type="submit" className="w-100 orangeButton">
            Register
          </button>
          {/* <p>
            Already have an account?{" "}
            <Link
              to="/Login"
              className="link-underline link-underline-opacity-0"
            >
              Login
            </Link>
          </p> */}
        </form>
      </div>
    </div>
  );
}
