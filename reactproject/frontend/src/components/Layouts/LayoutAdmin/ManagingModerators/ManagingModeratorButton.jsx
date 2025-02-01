import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddingModeratorForm from "./AddingModeratorForm";
import { add } from "lodash";

const ManagingModeratorButton = ({
  departmentID,
  departmentName,
  moderators,
}) => {
  const [addingModerator, setAddingModerator] = useState(false);
  const [manageModerator, setManageModerator] = useState(false);

  const handleCloseManageModerator = () => {
    setAddingModerator(false);
    setManageModerator(false);
  };
  return (
    <>
      <button className="purpleButton" onClick={() => setManageModerator(true)}>
        <p className="m-0 text-center align-middle">Manage</p>
      </button>

      <Modal
        show={manageModerator}
        onHide={handleCloseManageModerator}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="m-0">{departmentName}</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="overflow-x-hidden overflow-y-scroll custom-scrollbar"
          style={{ height: "19.3rem" }}
        >
          {addingModerator ? (
            <div className={addingModerator ? "fade-right" : "fade-left"}>
              <AddingModeratorForm
                departmentID={departmentID}
                departmentName={departmentName}
              />
            </div>
          ) : (
            <div className={addingModerator ? "fade-right" : "fade-left"}>
              {moderators.filter((mod) => departmentID === mod.departmentID)
                .length > 0 ? (
                moderators
                  .filter((mod) => departmentID === mod.departmentID)
                  .map((mod) => (
                    <>
                      <div className="d-flex align-items-center justify-content-between gap-2">
                        <div className="d-flex align-items-center gap-2">
                          <Link
                            key={mod.userID}
                            to={`/Profile/${mod.userID}`}
                            className="linkText rounded p-0"
                          >
                            <div className="profilePicture">
                              <img
                                src={`http://localhost:8081${mod.profile_image}`}
                                alt="Profile"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          </Link>
                          <Link
                            to={`/Profile/${mod.userID}`}
                            className="linkText rounded p-0"
                          >
                            <p className="m-0 text-center align-middle">
                              {mod.firstName} {mod.lastName}
                            </p>
                          </Link>
                        </div>

                        <div className="d-flex align-items-center gap-1">
                          <button className="btn btn-danger">
                            <p className="m-0">Remove</p>
                          </button>
                        </div>
                      </div>
                    </>
                  ))
              ) : (
                <>
                  <p className="m-0 text-secondary text-center">
                    No moderator.
                  </p>
                </>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {addingModerator ? (
            <div className="d-flex align-items-center gap-1">
              <button
                className="grayButton py-2"
                onClick={() => setAddingModerator(false)}
              >
                <p className="m-0 ">Cancel</p>
              </button>
              <button className="primaryButton py-2 rounded">
                <p className="m-0" onClick={() => setAddingModerator(true)}>
                  Save
                </p>
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-1">
              <button
                className="grayButton py-2"
                onClick={handleCloseManageModerator}
              >
                <p className="m-0 ">Close</p>
              </button>
              <button className="primaryButton py-2 rounded">
                <p className="m-0" onClick={() => setAddingModerator(true)}>
                  Add Moderator
                </p>
              </button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManagingModeratorButton;
