import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateStudent() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    cvsuEmail: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { username } = useParams(); // Assuming you pass the username as a route parameter.
  const [errors, setErrors] = useState({});

  // Fetch the current values of the student on component load
  useEffect(() => {
    axios
      .get(`http://localhost:8082/`) // Assuming the endpoint to get user by username
      .then((res) => {
        setValues({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          cvsuEmail: res.data.cvsuEmail,
          username: res.data.username,
          password: "", // You may want to keep this empty
          confirmPassword: "", // You may want to keep this empty
        });
      })
      .catch((err) => console.log(err));
  }, [username]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = RegisterValidation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .put("http://localhost:8082/UpdateStudent", values)
        .then((res) => {
          navigate("/UserTable");
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
        <form action="" onSubmit={handleSubmit}>
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
              onChange={handleInput}
              className="form-control rounded-0"
              value={values.username}
              readOnly // Username should not be editable
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
