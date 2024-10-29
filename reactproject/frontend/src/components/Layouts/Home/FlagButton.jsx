import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function FlagButton() {
  const [show, setShow] = useState(false); // Initialize show state
  const [selectedBehaviors, setSelectedBehaviors] = useState([]);
  const [otherText, setOtherText] = useState(""); // State to manage the text input for "Others"
  const [isOtherSelected, setIsOtherSelected] = useState(false); // Track if "Others" checkbox is selected

  const handleClose = () => {
    setShow(false);
    setOtherText(""); // Reset the "Others" text when closing the modal
    setIsOtherSelected(false); // Reset the checkbox for "Others"
  };

  const handleShow = () => setShow(true);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (value === "others") {
      setIsOtherSelected(checked); // Show the input when "Others" is checked
    }

    // Update selected behaviors array based on whether the checkbox is checked or unchecked
    if (checked) {
      setSelectedBehaviors((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedBehaviors((prevSelected) =>
        prevSelected.filter((behavior) => behavior !== value)
      );
    }
  };

  const handleOtherTextChange = (event) => {
    setOtherText(event.target.value); // Update the text input for "Others"
  };

  const checkboxStyle = "border rounded p-2";
  const labelStyle = "ms-1";

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
              <label htmlFor="bullying" className={checkboxStyle}>
                <input
                  type="checkbox"
                  id="bullying"
                  value="bullying"
                  onChange={handleCheckboxChange}
                />
                <label className={labelStyle} htmlFor="bullying">
                  Bullying
                </label>
              </label>
              <label htmlFor="harassment" className={checkboxStyle}>
                <input
                  type="checkbox"
                  id="harassment"
                  value="harassment"
                  onChange={handleCheckboxChange}
                />
                <label className={labelStyle} htmlFor="harassment">
                  Harassment
                </label>
              </label>
              <label htmlFor="pretending" className={checkboxStyle}>
                <input
                  type="checkbox"
                  id="pretending"
                  value="pretending"
                  onChange={handleCheckboxChange}
                />
                <label className={labelStyle} htmlFor="pretending">
                  Pretending to be someone
                </label>
              </label>
              <label htmlFor="others" className={checkboxStyle}>
                <input
                  type="checkbox"
                  id="others"
                  value="others"
                  onChange={handleCheckboxChange}
                />
                <label className={labelStyle} htmlFor="others">
                  Others:
                </label>
              </label>
              {isOtherSelected && (
                <input
                  type="text"
                  className="form-control mt-1"
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
          <button className="primaryButton py-2 rounded" onClick={handleClose}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FlagButton;
