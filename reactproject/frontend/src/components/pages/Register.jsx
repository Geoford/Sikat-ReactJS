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
          navigate("/Login");
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
    <div
      className="vh-100 d-flex justify-content-center align-items-center "
      style={{ backgroundColor: "#990099" }}
    >
      <div className="bg-white rounded p-3 text-start w-50">
        <form action="" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                onChange={handleInput}
                className="form-control rounded-0"
                value={values.firstName}
              />
              {errors.firstName && (
                <span className="text-danger"> {errors.firstName}</span>
              )}
            </div>
            <div className="col mb-3">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                onChange={handleInput}
                className="form-control rounded-0"
                value={values.lastName}
              />
              {errors.lastName && (
                <span className="text-danger"> {errors.lastName}</span>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="cvsuEmail">CvSU Email</label>
            <input
              type="email"
              name="cvsuEmail"
              placeholder="Enter your CvSU Email"
              onChange={handleInput}
              className="form-control rounded-0"
              value={values.cvsuEmail}
            />
            {errors.cvsuEmail && (
              <span className="text-danger"> {errors.cvsuEmail}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your Username"
              onChange={handleInput}
              className="form-control rounded-0"
              value={values.username}
            />
            {errors.username && (
              <span className="text-danger"> {errors.username}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleInput}
              className="form-control rounded-0"
              value={values.password}
            />
            {errors.password && (
              <span className="text-danger"> {errors.password}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleInput}
              className="form-control rounded-0"
              value={values.confirmPassword}
            />
            {errors.confirmPassword && (
              <span className="text-danger"> {errors.confirmPassword}</span>
            )}
          </div>
          <button type="submit" className="btn btn-success">
            Register
          </button>
          <p>
            Already have an account?{" "}
            <Link
              to="/Login"
              className="link-underline link-underline-opacity-0"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
