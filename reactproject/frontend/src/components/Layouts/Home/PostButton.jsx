import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import uploadIcon from "../../../assets/upload.png";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import SubjectSelection from "../LayoutUser/SubjectSelection";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function PostButton({ onEntrySaved }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [visibility, setVisibility] = useState("now");
  const [anonimity, setAnonimity] = useState("now");
  const [file, setFile] = useState(null);
  const [scheduledDate, setScheduledDate] = useState(null);

  const navigate = useNavigate();

  const handleChangeVisibility = (event) => {
    setVisibility(event.target.value);
    if (event.target.value === "now") {
      setScheduledDate(null); // Reset date when changing to "Post Now"
    }
  };

  const handleChangeAnonimity = (event) => {
    setAnonimity(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleClose = () => {
    setShow(false);
    setFormErrors({});
    setServerError("");
    setTitle("");
    setDescription("");
    setFile(null);
    setScheduledDate(null);
  };
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    let errors = {};
    if (!title) errors.title = "Title is required.";
    if (!description) errors.description = "Description is required.";
    if (visibility === "later" && !scheduledDate) {
      errors.scheduledDate = "Please select a date and time for your post.";
    }
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    if (!user || !user.userID) {
      setServerError("User not authenticated. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("userID", user.userID);
    formData.append("visibility", visibility);
    formData.append("anonimity", anonimity);
    if (scheduledDate) {
      formData.append("scheduledDate", scheduledDate.toISOString());
    }
    if (file) {
      formData.append("file", file);
    }

    setLoading(true);
    setServerError("");

    axios
      .post("http://localhost:8081/entry", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data.message);
        setTitle("");
        setDescription("");
        setFile(null);
        handleClose();
        if (onEntrySaved) {
          onEntrySaved();
        }
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error saving the diary entry!", error);
        setServerError("Failed to save diary entry. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <button
        className="primaryButton w-100 d-flex align-items-center justify-content-center"
        onClick={handleShow}
      >
        <p className="m-0">Create Post</p>
        <i className="bx bxs-edit m-0 ms-1"></i>
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center gap-2 border-bottom pb-2">
            <div className="profilePicture"></div>
            <p className="m-0">{user?.username || "User"}</p>
            <div>
              <select
                className="py-1"
                id="visibility"
                value={visibility}
                onChange={handleChangeVisibility}
              >
                <option value="now">Post Now</option>
                <option value="later">Post Later</option>
              </select>
            </div>
            {visibility === "later" && (
              <div className="">
                <DatePicker
                  selected={scheduledDate}
                  onChange={(date) => setScheduledDate(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="form-control"
                  isInvalid={!!formErrors.scheduledDate}
                  placeholderText="Select Date and Time"
                />
                {formErrors.scheduledDate && (
                  <div className="text-danger">{formErrors.scheduledDate}</div>
                )}
              </div>
            )}
          </div>
          {serverError && <p className="text-danger">{serverError}</p>}

          <div className="">
            <InputGroup className="mb-1">
              <Form.Control
                className="rounded"
                placeholder="Title"
                aria-label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                isInvalid={!!formErrors.title}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.title}
              </Form.Control.Feedback>
            </InputGroup>
            <FloatingLabel controlId="floatingTextarea2" label="Description">
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                isInvalid={!!formErrors.description}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.description}
              </Form.Control.Feedback>
            </FloatingLabel>

            <div className="ps-1 pt-2 mt-2">
              <label htmlFor="uploadPhoto">
                <div style={{ cursor: "pointer" }}>
                  <img className="miniIcon mb-1 me-1" src={uploadIcon} alt="" />
                  Upload Photo
                </div>
              </label>
              <input
                type="file"
                id="uploadPhoto"
                hidden
                onChange={handleFileChange}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Close
          </Button>
          <button
            className="orangeButton py-2 px-3"
            variant="primary"
            onClick={handleSubmit}
            disabled={loading}
            aria-label="Save diary entry"
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Creating Post...
              </>
            ) : (
              "Publish"
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PostButton;
