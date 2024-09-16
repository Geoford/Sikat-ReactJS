import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DiaryEntry from "../../assets/DiaryEntry.png";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

function DiaryEntryButton({ onEntrySaved }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    if (!title || !description) {
      alert("Please fill in both title and description.");
      return;
    }

    const diaryEntry = {
      title,
      description,
      user_id: user?.id,
    };

    setLoading(true);

    axios
      .post("http://localhost:8081/entry", diaryEntry)
      .then((response) => {
        console.log(response.data.message);
        handleClose();
        if (onEntrySaved) {
          onEntrySaved();
        }
      })
      .catch((error) => {
        console.error("There was an error saving the diary entry!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <button className="orangeButton w-100" onClick={handleShow}>
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
            <div className="profilePicture"></div>
            <p className="m-0">{user?.username || "User"}</p>
          </div>
          <div>
            <InputGroup className="mb-1">
              <Form.Control
                placeholder="Journal Title"
                aria-label="Journal Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
            <FloatingLabel
              controlId="floatingTextarea2"
              label={`Describe your day, ${user?.username || "User"}!`}
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
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
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DiaryEntryButton;
