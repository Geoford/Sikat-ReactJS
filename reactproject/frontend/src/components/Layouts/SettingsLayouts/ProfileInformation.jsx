import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Row, Col, InputGroup, Form, FloatingLabel } from "react-bootstrap";
import AnonimityButton from "../../../components/Layouts/LayoutUser/AnonimityButton";

const ProfileInformation = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    cvsuEmail: "",
    username: "",
    password: "",
    confirmPassword: "",
    alias: "",
    bio: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8081/fetchUser/user/${user.userID}`
          );
          const userDetails = response.data;

          setValues({
            firstName: userDetails.firstName || "",
            lastName: userDetails.lastName || "",
            cvsuEmail: userDetails.cvsuEmail || "",
            username: userDetails.username || user.username,
            alias: userDetails.alias || "",
            bio: userDetails.bio || "",
            password: "",
            confirmPassword: "",
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
      fetchUserDetails();
    } else {
      navigate("/Login");
    }
  }, [navigate]);

  const UpdateValidation = (values) => {
    let errors = {};
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (values.password && values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = UpdateValidation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const userID = JSON.parse(localStorage.getItem("user")).userID;
      const updatedValues = { ...values };

      if (!updatedValues.password) {
        delete updatedValues.password;
      }
      if (!updatedValues.confirmPassword) {
        delete updatedValues.confirmPassword;
      }

      axios
        .put(`http://localhost:8081/EditProfile/${userID}`, updatedValues)
        .then((res) => {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...updatedValues,
              userID: userID,
            })
          );
          alert("Profile successfully updated.");
        })
        .catch((err) => {
          alert("Failed to update profile. Please try again.");
        });
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
      className="p-3 rounded shadow-sm mb-3"
      style={{
        backgroundColor: "#ffff",
        minHeight: "clamp(20rem, 80vh, 30rem)",
      }}
    >
      <h4 className="border-bottom border-2 pb-2">Profile Information</h4>
      <form onSubmit={handleSubmit}>
        <div className="row text-start">
          <h5 className="m-0">Display Name and Alias</h5>
          <p className="text-secondary m-0 mb-1" style={{ fontSize: ".9rem" }}>
            Using a full name builds credibility and trust but may expose the
            individual to risks. An alias, however, offers privacy and safety,
            allowing for open sharing without fear of judgment or backlash.
          </p>
          <Row className="mt-1">
            <Col md={9}>
              <InputGroup>
                <InputGroup.Text className="py-3">
                  First and Last name
                </InputGroup.Text>
                <Form.Control
                  aria-label="First name"
                  name="firstName"
                  placeholder="First name"
                  value={values.firstName}
                  onChange={handleInput}
                />
                <Form.Control
                  aria-label="Last name"
                  name="lastName"
                  placeholder="Last name"
                  value={values.lastName}
                  onChange={handleInput}
                />
              </InputGroup>
            </Col>
            <Col>
              <FloatingLabel controlId="floatingInputGrid" label="Alias">
                <Form.Control
                  type="text"
                  name="alias"
                  placeholder="Alias"
                  value={values.alias}
                  onChange={handleInput}
                />
              </FloatingLabel>
            </Col>
          </Row>
        </div>

        <div className="row text-start mt-2">
          <h5 className="m-0 mt-2">Profile Details</h5>
          <p className="text-secondary m-0 mb-1" style={{ fontSize: ".9rem" }}>
            Your Username is your unique identifier visible to others on the
            platform. The Bio is a short description where you can share details
            about yourself or your interests.
          </p>
          <Row className="mt-1 gap-2">
            {/* <Col md={12}>
              <FloatingLabel controlId="floatingInputGrid" label="Username">
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleInput}
                />
              </FloatingLabel>
            </Col> */}
            <Col>
              <FloatingLabel controlId="floatingTextarea2" label="Bio">
                <Form.Control
                  as="textarea"
                  name="bio"
                  placeholder="Bio"
                  style={{ height: "100px" }}
                  value={values.bio}
                  onChange={handleInput}
                />
              </FloatingLabel>
            </Col>
          </Row>
        </div>

        <div className="mt-4 d-flex justify-content-end">
          <button type="submit" className="primaryButton px-5 py-2">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInformation;
