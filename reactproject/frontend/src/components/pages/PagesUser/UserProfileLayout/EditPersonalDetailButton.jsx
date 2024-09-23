import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UpdateValidation from "../../UpdateValidation";
import AnonimityButton from "../../../Layouts/LayoutUser/AnonimityButton";

const EditPersonalDetailButton = () => {
  const [show, setShow] = useState(false);
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      const updatedValues = { ...values };

      // Remove empty password fields from the request
      if (!updatedValues.password) {
        delete updatedValues.password;
      }
      if (!updatedValues.confirmPassword) {
        delete updatedValues.confirmPassword;
      }

      axios
        .put(`http://localhost:8081/UpdateUser?userID=${userID}`, updatedValues)
        .then((res) => {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...updatedValues,
              userID: userID,
            })
          );
          navigate("/Home");
          handleClose(); // Close modal after submission
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
    <>
      <button
        className="orangeButton position-absolute text-end"
        style={{ right: "10px", top: "10px" }}
        onClick={handleShow}
      >
        Edit Personal Details
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        centered
        dialogClassName="modal-dialog-scrollable" // Make the modal scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Personal Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="mb-3">
              <h5>Profile Information</h5>
              <div className="row">
                <div className="col mb-3">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    onChange={handleInput}
                    className="form-control rounded"
                    value={values.firstName}
                    autoComplete="off"
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
                    className="form-control rounded"
                    value={values.lastName}
                    autoComplete="off"
                  />
                  {errors.lastName && (
                    <span className="text-danger"> {errors.lastName}</span>
                  )}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your Username"
                  onChange={handleInput}
                  className="form-control rounded"
                  value={values.username}
                  autoComplete="off"
                />
                {errors.username && (
                  <span className="text-danger"> {errors.username}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="alias">Alias (for anonimity)</label>
                <input
                  type="text"
                  name="alias"
                  placeholder="Enter your Alias"
                  onChange={handleInput}
                  className="form-control rounded"
                  autoComplete="off"
                />
                {errors && <span className="text-danger"></span>}
              </div>
              <div class="form-floating">
                <textarea
                  class="form-control"
                  placeholder="Enter your Bio"
                  id="userBio"
                  style={{ height: "100px" }}
                ></textarea>
                <label for="userBio">Enter your Bio</label>
              </div>
            </div>
            <div>
              <h5>Privacy and Security</h5>
              <div className="mb-1">
                <p className="m-0">Interact Anonimously or Not</p>
                <AnonimityButton />
              </div>
              <div className="">
                <label htmlFor="password">
                  Password (Leave blank to keep current)
                </label>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Enter new Password"
                onChange={handleInput}
                className="form-control rounded mb-1"
                value={values.password}
                autoComplete="new-password"
                formNoValidate
              />
              {errors.password && (
                <span className="text-danger"> {errors.password}</span>
              )}
              <div className="mb-3">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new Password"
                  onChange={handleInput}
                  className="form-control rounded"
                  value={values.confirmPassword}
                  autoComplete="off"
                />
                {errors.confirmPassword && (
                  <span className="text-danger">{errors.confirmPassword}</span>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="orangeButton w-100">
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditPersonalDetailButton;
