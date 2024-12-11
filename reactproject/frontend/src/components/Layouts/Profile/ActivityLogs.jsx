import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const ActivityLogs = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  return (
    <div>
      <button
        className="w-100 btn btn-light text-start d-flex align-items-center gap-1"
        onClick={handleShow}
      >
        <i class="bx bx-history"></i>
        <p className="m-0">Activity log</p>
      </button>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="m-0">Activity Logs</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-2">
          <Tabs defaultActiveKey="gadify" id="followerAndFollowing">
            <Tab eventKey="gadify" title="Gadify" className="pt-1">
              <div
                className="overflow-y-scroll custom-scrollbar pe-1 pt-1"
                style={{ height: "25rem" }}
              >
                <div
                  //  key={user.userID}
                  className="d-flex align-items-center py-2 ps-3 mb-2 grayHover rounded bg-transparent"
                >
                  <p className="m-0">
                    Firstname's Diary - Diary Title{" "}
                    <span style={{ fontSize: "clamp(0.6rem, 1.5dvw, 0.7rem)" }}>
                      0 hrs. ago
                    </span>
                  </p>
                </div>
              </div>
            </Tab>
            <Tab eventKey="comment" title="Comment" className="pt-1">
              <div
                className="overflow-y-scroll custom-scrollbar pe-1 pt-1"
                style={{ height: "25rem" }}
              >
                <div
                  //  key={user.userID}
                  className="d-flex flex-column align-items-start py-2 ps-3 mb-2 grayHover rounded bg-transparent"
                >
                  <p className="m-0">Firstname's Diary - Diary Title</p>
                  <p className="m-0">
                    Comment Content{" "}
                    <span style={{ fontSize: "clamp(0.6rem, 1.5dvw, 0.7rem)" }}>
                      0 hrs. ago
                    </span>
                  </p>
                </div>
              </div>
            </Tab>
            <Tab eventKey="flag" title="Flag" className="pt-1">
              <div
                className="overflow-y-scroll custom-scrollbar pe-1 pt-1"
                style={{ height: "25rem" }}
              >
                <div
                  //  key={user.userID}
                  className="d-flex flex-column align-items-start py-2 ps-3 mb-2 grayHover rounded bg-transparent"
                >
                  <p className="m-0">Firstname's Diary - "Diary Title" </p>
                  <p className="m-0">
                    Reason for flagging{" "}
                    <span style={{ fontSize: "clamp(0.6rem, 1.5dvw, 0.7rem)" }}>
                      0 hrs. ago
                    </span>
                  </p>
                </div>
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ActivityLogs;
