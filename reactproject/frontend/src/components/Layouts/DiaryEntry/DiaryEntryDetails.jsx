import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Modal, CloseButton } from "react-bootstrap";
import CommentSection from "../CommentSection/CommentSection";
import FlagButton from "../Home/FlagButton";
// import CommentSection from "./CommentSection"; // Adjust this import path according to your project structure
// import FlagButton from "./FlagButton"; // Adjust this import path according to your project structure

const DiaryEntryDetails = ({
  entry,
  user,
  handleFollowToggle,
  formatDate,
  handleDeleteEntry,
  handleClick,
  showModal,
  handleCloseModal,
  anonymous,
  userDefaultProfile,
  expandButtons,
  commentCount,
  flaggedCount,
  followedUsers,
  ownDiary,
}) => {
  return (
    <div>
      <div className="border-bottom d-flex gap-2 pb-2">
        {/* IF PUBLIC */}
        <div className="d-flex align-items-center gap-2 text-secondary">
          {/* TO DETERMINE IF THE DIARY IS ANONYMOUS OR NOT */}
          {entry.anonimity === "private" ? (
            <div className="profilePicture">
              <img
                src={
                  entry.isAdmin === 1
                    ? `http://localhost:8081${entry.profile_image}`
                    : anonymous
                }
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ) : (
            <Link
              to={`/Profile/${entry.userID}`}
              className="linkText rounded p-0"
            >
              <div className="profilePicture">
                <img
                  src={
                    entry.profile_image
                      ? `http://localhost:8081${entry.profile_image}`
                      : userDefaultProfile
                  }
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </Link>
          )}

          <div className="d-flex flex-column align-items-start">
            <div className="d-flex align-items-center justify-content-center gap-1">
              {entry.anonimity === "private" ? (
                <h5 className="m-0">{entry.alias}</h5>
              ) : (
                <Link
                  to={`/Profile/${entry.userID}`}
                  className="linkText rounded p-0"
                >
                  <h5 className="m-0 text-start">
                    {entry.isAdmin === 1
                      ? "Gender and Development"
                      : entry.firstName && entry.lastName
                      ? entry.firstName + " " + entry.lastName
                      : user.firstName + " " + user.lastName}
                  </h5>
                </Link>
              )}

              {user &&
                user.userID !== entry.userID &&
                entry.anonymity !== "private" &&
                entry.isAdmin !== 1 && (
                  <div className="d-flex align-items-center gap-1">
                    <h3
                      className="m-0 text-secondary d-flex align-items-center"
                      style={{ height: ".9rem" }}
                    >
                      ·
                    </h3>
                    <button
                      className="secondaryButton p-0 m-0"
                      onClick={() => handleFollowToggle(entry.userID)}
                      style={{ height: "" }}
                    >
                      <h5 className="m-0">
                        {followedUsers.includes(entry.userID)
                          ? "Following"
                          : "Follow"}
                      </h5>{" "}
                    </button>
                  </div>
                )}
            </div>
            <p className="m-0" style={{ fontSize: ".7rem" }}>
              {formatDate(entry.created_at)}{" "}
              <span>
                {entry.visibility === "public" ? (
                  <i className="bx bx-globe"></i>
                ) : (
                  <i className="bx bx-lock-alt"></i>
                )}
              </span>
            </p>
          </div>
        </div>
        <div>
          {ownDiary ? (
            <Dropdown>
              <Dropdown.Toggle
                className="btn-light d-flex align-items-center pt-0 pb-2"
                id="dropdown-basic"
                bsPrefix="custom-toggle"
              >
                <h5 className="m-0">...</h5>
              </Dropdown.Toggle>
              <Dropdown.Menu className="p-2">
                <Dropdown.Item className="p-0 btn btn-light">
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  className="p-0 btn btn-light"
                  onClick={() => handleDeleteEntry(entry.entryID)}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <div
        className="text-start border-bottom py-2 pt-2"
        style={{ minHeight: "5rem" }}
      >
        <div className="d-flex alig-items-center gap-1 position-relative">
          {entry.subjects && (
            <h6 className="text-secondary m-0 mt-2">
              <span
                style={{
                  fontSize: "clamp(0.7rem, 1dvw, .85rem)",
                }}
              >
                Trigger Warning: {entry.subjects}
              </span>
            </h6>
          )}
          {entry.containsAlarmingWords === 1 && user.isAdmin === 1 ? (
            <div className="d-flex justify-content-center align-items-end pt-1 gap-1">
              <div className="informationToolTip accordion text-danger align-middle">
                <h4 className="m-0">
                  <i className="bx bx-error" style={{}}></i>
                </h4>
                <p
                  className="infToolTip rounded p-2 m-0 text-center"
                  style={{
                    backgroundColor: "rgb(179, 0, 0, .7)",
                    width: "85%",
                  }}
                >
                  This diary entry has been flagged by the system as potentially
                  containing sensitive or distressing topics and may require
                  immediate attention.
                </p>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="d-flex gap-1 align-items-center mt-2">
          <div className="d-flex flex-column gap-1">
            <h5 className="m-0">{entry.title}</h5>
          </div>
        </div>

        <p style={{ whiteSpace: "pre-wrap" }}>{entry.description}</p>

        {/* Clickable Image */}
        {entry.diary_image && (
          <>
            {/* Modal */}
            <Modal
              show={showModal}
              onHide={handleCloseModal}
              centered
              size="lg"
            >
              <Modal.Body className="text-center p-1 position-relative">
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
                  <CloseButton onClick={handleCloseModal} />
                </div>

                <img
                  src={`http://localhost:8081${entry.diary_image}`}
                  alt="Diary Full View"
                  className="rounded"
                  style={{
                    height: "clamp(20rem, 80dvh, 60rem)",
                    maxWidth: "100%",
                  }}
                />
              </Modal.Body>
            </Modal>
          </>
        )}
      </div>
      <div className="row px-2 pt-2 gap-1">
        <div className="col p-0">
          <button
            className={`InteractButton d-flex align-items-center justify-content-center gap-1 ${
              entry.isGadified ? "active" : ""
            } ${expandButtons[entry.entryID] ? "expand" : ""}`}
            onClick={() => handleClick(entry.entryID)}
          >
            {entry.isGadified ? (
              <i className="bx bxs-heart"></i>
            ) : (
              <i className="bx bx-heart"></i>
            )}
            <span>{entry.gadifyCount}</span>
            <p className="m-0 d-none d-md-block">Gadify</p>
          </button>
        </div>
        <div className="col p-0">
          <CommentSection
            commentCount={commentCount}
            userID={user.userID}
            entryID={entry.entryID}
            entry={entry.userID}
            firstName={entry.firstName}
          />
        </div>
        <div className="col p-0">
          <FlagButton
            flaggedCount={flaggedCount}
            userID={user.userID}
            entryID={entry.entryID}
            entry={entry.userID}
          />
        </div>
      </div>
    </div>
  );
};

export default DiaryEntryDetails;
