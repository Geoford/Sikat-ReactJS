import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UpdateValidation from "./pages/UpdateValidation";

export default function UpdateUser() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    cvsuEmail: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User data from local storage:", user);
    if (user) {
      setValues({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        cvsuEmail: user.cvsuEmail || "",
        username: user.username || "",
        password: "",
        confirmPassword: "",
      });
    } else {
      navigate("/Login");
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = UpdateValidation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const userID = JSON.parse(localStorage.getItem("user")).userID;
      axios
        .put(`http://localhost:8081/UpdateUser?userID=${userID}`, values)
        .then((res) => {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...values,
              userID: userID,
            })
          );
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
      <div className="bg-white rounded p-3 text-start w-50">
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="password">
              Password (Leave blank to keep current)
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter new Password"
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
              placeholder="Confirm new Password"
              onChange={handleInput}
              className="form-control rounded-0"
              value={values.confirmPassword}
            />
            {errors.confirmPassword && (
              <span className="text-danger"> {errors.confirmPassword}</span>
            )}
          </div>
          <button type="submit" className="btn btn-success">
            Update
          </button>
          <p>
            Want to go back?{" "}
            <Link
              to="/Home"
              className="link-underline link-underline-opacity-0"
            >
              Home
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
