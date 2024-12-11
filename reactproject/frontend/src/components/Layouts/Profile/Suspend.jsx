import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function Suspend() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <button
        className="btn btn-light w-100 d-flex align-items-center justify-content-center gap-1"
        onClick={handleShow}
      >
        <i class="bx bx-block"></i>
        <p className="m-0">Suspend</p>
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title
            className="position-relative w-100"
            style={{ zIndex: "50" }}
          >
            <div className="d-flex justify-content-center align-items-end pt-1 gap-1">
              <div className="informationToolTip accordion align-middle">
                <div className="d-flex align-items-center gap-2">
                  <h4 className="m-0">Suspend UserName's Account</h4>
                  <h5 className="d-flex align-items-center m-0">
                    <i class="bx bx-error-alt " style={{}}></i>
                  </h5>
                </div>

                <p
                  className="infToolTip rounded p-2 m-0 text-center"
                  style={{
                    width: "85%",
                  }}
                >
                  This user will be restricted from posting, gadifying,
                  commenting, or flagging a diary until the suspension period is
                  over.
                </p>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ minHeight: "" }}>
          <div style={{}}>
            <div className="text-danger">
              <h5>Number of Offense: 0</h5>
            </div>
            <div className="d-flex flex-column gap-2">
              <div class="form-floating">
                <select
                  class="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                >
                  <option selected>3 Days</option>
                  <option value="1">3 weeks</option>
                  <option value="2">3 Months</option>
                  <option value="3">1 Year</option>
                </select>
                <label for="floatingSelect">Suspension Period</label>
              </div>
              <div class="form-floating">
                <select
                  class="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                >
                  <option selected>Sample Reason</option>
                  <option value="1">Sample Reason</option>
                  <option value="2">Sample Reason</option>
                  <option value="3">Sample Reason</option>
                </select>
                <label for="floatingSelect">Reason</label>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <p className="m-0">Cancel</p>
          </Button>
          <button className="primaryButton py-2 rounded">
            <p className="m-0">Suspend</p>
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Suspend;
