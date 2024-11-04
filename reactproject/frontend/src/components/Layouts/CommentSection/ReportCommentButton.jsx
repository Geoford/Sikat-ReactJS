import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ReportCommentButton() {
  const [show, setShow] = useState(false);
  const [selectedBehavior, setSelectedBehavior] = useState(""); // State for selected behavior
  const [otherText, setOtherText] = useState(""); // State to manage the text input for "Others"
  const [isOtherSelected, setIsOtherSelected] = useState(false); // Track if "Others" option is selected

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

  return (
    <>
      <button className="btn btn-light w-100" onClick={handleShow}>
        Report
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Report UserName's Comments</Modal.Title>
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
                <option value="Bullying">Bullying</option>
                <option value="Harassment">Harassment</option>
                <option value="Pretending to be someone">
                  Pretending to be someone
                </option>
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
          <button className="primaryButton py-2 rounded" onClick={handleClose}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReportCommentButton;
