import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import MessageAlert from "../DiaryEntry/messageAlert";

function Hide({ type }) {
  const [show, setShow] = useState(false);
  const [reasons, setReasons] = useState([]);
  const [selectedReason, setSelectedReason] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("3 Days");

  const [modal, setModal] = useState({ show: false, message: "" });
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    message: "",
    onConfirm: () => {},
    onCancel: () => {},
  });

  const closeModal = () => {
    setModal({ show: false, message: "" });
  };
  const closeConfirmModal = () => {
    setConfirmModal({
      show: false,
      message: "",
      onConfirm: () => {},
      onCancel: () => {},
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        className="btn btn-light w-100 d-flex align-items-center justify-content-center gap-1"
        onClick={handleShow}
        // disabled={suspended}
      >
        <i class="bx bxs-hide"></i>
        <p className="m-0">Hide</p>
      </button>

      {/* <MessageAlert
        showModal={modal}
        closeModal={closeModal}
        title={"Notice"}
        message={modal.message}
      ></MessageAlert> */}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="m-0">Notice!</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="m-0">Are you sure you want to hide this {type}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <p className="m-0">Cancel</p>
          </Button>
          <button
            className="primaryButton py-2 rounded"
            // onClick={handleSuspend}
          >
            <p className="m-0">Confirm</p>
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Hide;
