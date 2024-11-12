import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios"; // Ensure you have axios installed for making API calls

function ReportCommentButton({ commentID, userID, username }) {
  const [show, setShow] = useState(false);
  const [selectedBehavior, setSelectedBehavior] = useState(""); // State for selected behavior
  const [otherText, setOtherText] = useState(""); // State to manage the text input for "Others"
  const [isOtherSelected, setIsOtherSelected] = useState(false); // Track if "Others" option is selected
  const [reportComments, setReportComments] = useState([]); // State for fetched report comments

  // Fetch report comments from the backend
  useEffect(() => {
    const fetchReportComments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/reportComments"
        );
        setReportComments(response.data); // Store fetched data in state
      } catch (err) {
        console.error("Error fetching report comments:", err);
      }
    };

    fetchReportComments();
  }, []);

  const handleClose = () => {
    setShow(false);
    setSelectedBehavior(""); // Reset selected behavior when closing the modal
    setOtherText(""); // Reset the "Others" text
    setIsOtherSelected(false); // Reset the "Others" selection
  };

  const handleShow = () => setShow(true);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedBehavior(value);
    setIsOtherSelected(value === "Others");
  };

  const handleOtherTextChange = (event) => {
    setOtherText(event.target.value); // Update the text input for "Others"
  };

  const handleSubmitReport = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/reportuserComment",
        {
          commentID,
          userID,
          reason: selectedBehavior,
          otherText: isOtherSelected ? otherText : null,
        }
      );

      if (response.status === 200) {
        alert("Your report has been submitted.");
        handleClose(); // Close the modal after successful submission
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("There was an error submitting your report.");
    }
  };

  return (
    <>
      <button className="btn btn-light w-100" onClick={handleShow}>
        Report
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Report {username} Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ minHeight: "15rem" }}>
          <div>
            <label className="d-flex gap-2 mb-3">
              <h5 className="m-0">Reason: </h5>
              {selectedBehavior && <h5 className="m-0">{selectedBehavior}</h5>}
            </label>
            <div className="d-flex flex-column gap-2">
              <select
                className="form-select"
                value={selectedBehavior}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  Select a reason
                </option>
                {/* Dynamically create options from fetched data */}
                {reportComments.map((comment, index) => (
                  <option key={index} value={comment.comment_title}>
                    {comment.reason}
                  </option>
                ))}
                <option value="Others">Others</option>
              </select>
              {isOtherSelected && (
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Please specify"
                  value={otherText}
                  onChange={handleOtherTextChange}
                />
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <button
            className="primaryButton py-2 rounded"
            onClick={handleSubmitReport}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReportCommentButton;
