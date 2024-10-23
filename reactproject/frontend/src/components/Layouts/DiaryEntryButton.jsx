import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DiaryEntry from "../../assets/DiaryEntry.png";
import uploadIcon from "../../assets/upload.png";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import SubjectSelection from "./LayoutUser/SubjectSelection";
import userDefaultProfile from "../../assets/userDefaultProfile.png";

function DiaryEntryButton({ onEntrySaved }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [anonimity, setAnonimity] = useState("private");
  const [file, setFile] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState("");

  // Update the selected subjects when changed in SubjectSelection
  const handleSubjectsChange = (subjectsText) => {
    setSelectedSubjects(subjectsText); // This is the text string now
  };

  const navigate = useNavigate();

  const handleChangeVisibility = (event) => {
    setVisibility(event.target.value);
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
  };
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    let errors = {};
    if (!title) errors.title = "Title is required.";
    if (!description) errors.description = "Description is required.";
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

    // Append selected subjects
    formData.append("subjects", JSON.stringify(selectedSubjects));

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
      <button className="primaryButton w-100" onClick={handleShow}>
        Diary Entry{" "}
        <img
          className="miniIcon mb-1"
          src={DiaryEntry}
          alt="Diary Entry Icon"
        />
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Diary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center gap-2 border-bottom pb-2">
            <div className="profilePicture">
              <img
                src={
                  user?.profile_image
                    ? `http://localhost:8081${user?.profile_image}`
                    : userDefaultProfile
                }
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <p className="m-0">{user?.username || "User"}</p>
            <div>
              <select
                id="visibility"
                value={visibility}
                onChange={handleChangeVisibility}
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
            </div>
            <div>
              <select
                id="anonimity"
                value={anonimity}
                onChange={handleChangeAnonimity}
                disabled={visibility === "private"}
              >
                <option value="private">Anonymous</option>
                <option value="public">Not Anonymous</option>
              </select>
            </div>
          </div>
          {serverError && <p className="text-danger">{serverError}</p>}
          <div className="d-flex align-items-center">
            <SubjectSelection onSubjectsChange={handleSubjectsChange} />
            {selectedSubjects && <div className=""> {selectedSubjects} </div>}
          </div>
          <div className="">
            <InputGroup className="mb-1">
              <Form.Control
                className="rounded"
                placeholder="Journal Title"
                aria-label="Journal Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                isInvalid={!!formErrors.title}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.title}
              </Form.Control.Feedback>
            </InputGroup>
            <FloatingLabel
              controlId="floatingTextarea2"
              label={`Describe your day, ${user?.username || "User"}!`}
            >
              <Form.Control
                as="textarea"
                placeholder=""
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
            <div className="ps-1 pt-2">
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
            className="orangeButton py-2"
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
                Saving Changes...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DiaryEntryButton;
