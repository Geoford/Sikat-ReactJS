import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const FiledCases = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  return (
    <div>
      <button
        className="w-100 btn btn-light text-start d-flex align-items-center gap-1"
        onClick={handleShow}
      >
        <i class="bx bx-file"></i>
        <p className="m-0">Filed Cases</p>
      </button>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="m-0">Filed Cases</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-2">
          <div
            className="overflow-y-scroll custom-scrollbar"
            style={{ height: "25rem" }}
          >
            <table class="table">
              <thead>
                <tr>
                  <th className="text-center align-middle w-25" scope="col">
                    <h5 className="m-0">Date Filed</h5>
                  </th>
                  <th className="text-center align-middle" scope="col">
                    <h5 className="m-0">Status</h5>
                  </th>
                  <th className="text-center align-middle" scope="col">
                    <h5 className="m-0">Action</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="text-center align-middle" scope="row">
                    <p className="m-0">MM/DD/YYYY</p>
                  </th>
                  <td className="text-center align-middle">
                    <p className="m-0">Pending</p>
                  </td>
                  <td className="text-center align-middle">
                    <button className="primaryButton">
                      <p className="m-0">view</p>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FiledCases;
