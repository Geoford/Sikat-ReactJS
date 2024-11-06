import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function FlagButton({ userID, entryID }) {
  const [show, setShow] = useState(false);
  const [selectedBehaviors, setSelectedBehaviors] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSelectedBehaviors([]);
    setOtherText("");
    setIsOtherSelected(false);
  };

  const handleShow = () => setShow(true);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (value === "others") setIsOtherSelected(checked);
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
      behaviors: selectedBehaviors.join(", "), // Convert behaviors array to a comma-separated string
      otherText: isOtherSelected ? otherText : null,
    };

    console.log("Submitting report data:", reportData); // Log the data to check its format

    try {
      const response = await axios.post(
        "http://localhost:8081/flag",
        reportData
      );

      if (response.status === 200) {
        console.log("Report submitted successfully");
        handleClose();
      } else {
        console.error("Failed to submit report");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  return (
    <>
      <button className="InteractButton" onClick={handleShow}>
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
              <label className="border rounded p-2">
                <input
                  type="checkbox"
                  id="bullying"
                  value="bullying"
                  onChange={handleCheckboxChange}
                />
                <label className="ms-1" htmlFor="bullying">
                  Bullying
                </label>
              </label>
              <label className="border rounded p-2">
                <input
                  type="checkbox"
                  id="harassment"
                  value="harassment"
                  onChange={handleCheckboxChange}
                />
                <label className="ms-1" htmlFor="harassment">
                  Harassment
                </label>
              </label>
              <label className="border rounded p-2">
                <input
                  type="checkbox"
                  id="pretending"
                  value="pretending"
                  onChange={handleCheckboxChange}
                />
                <label className="ms-1" htmlFor="pretending">
                  Pretending to be someone
                </label>
              </label>
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
          <button className="primaryButton py-2 rounded" onClick={handleSubmit}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FlagButton;
