import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RegisterValidation from "./pages/RegisterValidation";
import { useParams } from "react-router-dom";

export default function UpdateStudent() {
  const { userID } = useParams();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    cvsuEmail: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObject = JSON.parse(userData);
      console.log("User object:", userObject);
      setUser(userObject);
      setValues({
        firstName: userObject.firstName,
        lastName: userObject.lastName,
        cvsuEmail: userObject.cvsuEmail,
        username: userObject.username,
        password: "",
        confirmPassword: "",
      });
    } else {
      navigate("/Login");
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = RegisterValidation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .put(`http://localhost:8081/update/${user.userID}`, values)
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
    <div className="vh-100 d-flex justify-content-center align-items-center bg-primary">
      <div className="bg-white rounded p-3 text-start w-50">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
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
          <div className="mb-3">
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
              className="form-control rounded-0"
              value={values.username}
              readOnly
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
