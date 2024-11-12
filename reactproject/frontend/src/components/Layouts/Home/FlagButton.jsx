import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function FlagButton({ userID, entryID }) {
  const [show, setShow] = useState(false);
  const [selectedBehaviors, setSelectedBehaviors] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [flaggingOptions, setFlaggingOptions] = useState([]);

  useEffect(() => {
    const fetchFlaggingOptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/flaggingOptions"
        );
        setFlaggingOptions(response.data);
      } catch (error) {
        console.error("Error fetching flagging options:", error);
      }
    };
    fetchFlaggingOptions();
  }, []);

  const handleClose = () => {
    setShow(false);
    setSelectedBehaviors([]);
    setOtherText("");
    setIsOtherSelected(false);
  };

  const handleShow = () => setShow(true);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (value === "others") {
      setIsOtherSelected(checked);
    }

    setSelectedBehaviors((prevSelected) =>
      checked
        ? [...prevSelected, value]
        : prevSelected.filter((behavior) => behavior !== value)
    );
  };

  const handleSubmit = async () => {
    const reportData = {
      userID,
      entryID,
      behaviors: selectedBehaviors.join(", "),
      otherText: isOtherSelected ? otherText : null,
    };

    console.log("Submitting report data:", reportData);

    try {
      const response = await axios.post(
        "http://localhost:8081/flags",
        reportData
      );

      if (response.status === 200) {
        alert("Flagged successfully");
        console.log("Report submitted successfully");
        handleClose();
      } else {
        console.error("Failed to submit report");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("There was an error submitting your report. Please try again.");
    }
  };

  return (
    <>
      <button
        className="InteractButton d-flex align-items-center justify-content-center gap-2"
        onClick={handleShow}
      >
        <i className="bx bx-flag"></i>
        Flag
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Flag UserName's Diary</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ minHeight: "15rem" }}>
          <div>
            <label className="d-flex gap-2 mb-3">
              <h5 className="m-0">Reason: </h5>
              {selectedBehaviors.length > 0 && (
                <h5 className="m-0">{selectedBehaviors.join(", ")}</h5>
              )}
            </label>
            <div className="d-flex flex-column gap-2">
              {flaggingOptions.map((option) => (
                <label className="border rounded p-2" key={option.flagID}>
                  <input
                    type="checkbox"
                    id={option.flagID}
                    value={option.reason}
                    onChange={handleCheckboxChange}
                  />
                  <label className="ms-1" htmlFor={option.flagID}>
                    {option.reason}
                  </label>
                </label>
              ))}
              <label className="border rounded p-2">
                <input
                  type="checkbox"
                  id="others"
                  value="others"
                  onChange={handleCheckboxChange}
                />
                <label className="ms-1" htmlFor="others">
                  Others:
                </label>
              </label>
              {isOtherSelected && (
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Please specify"
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                />
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <button className="primaryButton py-2 rounded" onClick={handleSubmit}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FlagButton;
