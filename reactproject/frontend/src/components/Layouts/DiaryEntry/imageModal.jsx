import React from "react";
import { CloseButton, Modal } from "react-bootstrap";

const ImageModal = ({ showModal, handleCloseModal, diaryImage }) => {
  return (
    <>
      {/* Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        size="lg"
        style={{}}
      >
        <Modal.Body
          className="text-center p-1 position-relative"
          // style={{ maxHeight: "70vh" }}
        >
          <div
            className="position-absolute rounded"
            style={{
              right: "1rem",
              top: "1rem",
              backgroundColor: "rgb(242, 242, 242,.5)",
              paddingTop: ".15rem",
              paddingLeft: ".15rem",
              paddingRight: ".15rem",
            }}
          >
            <CloseButton onClick={handleCloseModal} style={{}} />
          </div>

          <img
            src={diaryImage}
            alt="Diary Full View"
            className="rounded"
            style={{
              height: "clamp(20rem, 55dvw, 38rem)",
              width: "100%",
              objectFit: "contain",
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ImageModal;
