import React from "react";
import { Button, Modal, Toast } from "react-bootstrap";

const MessageAlert = ({
  showModal,
  closeModal,
  title,
  message,
  confirm,
  needConfirm,
}) => {
  return (
    <>
      <Toast
        className="position-fixed me-0 me-sm-3"
        show={showModal.show}
        onClose={closeModal}
        delay={3000}
        autohide
        style={{ zIndex: "1000", top: "10%", right: "0" }}
      >
        <Toast.Header>
          {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </>
  );
};

export default MessageAlert;
