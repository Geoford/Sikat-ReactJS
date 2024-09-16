import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginValidation from "../LoginValidation.jsx";

export default function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = LoginValidation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:8081/Login", values)
        .then((res) => {
          navigate("/Home");
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
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#990099" }}
    >
      <div className="bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
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
          <button type="submit" className="btn btn-success">
            Log in
          </button>
          <p>
            Don't have an account?{" "}
            <Link
              to="/Register"
              className="link-underline link-underline-opacity-0"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
