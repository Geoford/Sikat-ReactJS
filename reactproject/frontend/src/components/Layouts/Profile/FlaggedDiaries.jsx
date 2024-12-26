import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const FlaggedDiaries = ({ userID }) => {
  const [showModal, setShowModal] = useState(false);
  const [flaggedDiaries, setFlaggedDiaries] = useState([]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    // Fetch flagged diaries for the user when the modal is opened
    if (showModal) {
      axios
        .get(`/flagged/${userID}`)
        .then((response) => {
          setFlaggedDiaries(response.data);
        })
        .catch((error) => {
          console.error("Error fetching flagged diaries:", error);
        });
    }
  }, [showModal, userID]);

  return (
    <div>
      <button
        className="btn btn-danger py-2 px-3"
        onClick={handleShow}
        style={{ height: "100%" }}
      >
        <h5 className="m-0">Flagged Diaries: {flaggedDiaries.length}</h5>
      </button>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="m-0">Flagged Diaries</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="overflow-y-scroll custom-scrollbar pe-1"
            style={{ height: "20rem" }}
          >
            {flaggedDiaries.length > 0 ? (
              flaggedDiaries.map((diary) => (
                <div key={diary.entryID}>
                  <Link
                    className="text-decoration-none text-dark"
                    to={`/diary/${diary.entryID}`}
                  >
                    <h5
                      className="m-0 grayHover px-3 py-2 rounded"
                      style={{ backgroundColor: "transparent" }}
                    >
                      {diary.title}
                    </h5>
                  </Link>
                </div>
              ))
            ) : (
              <p>No flagged diaries found.</p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FlaggedDiaries;
