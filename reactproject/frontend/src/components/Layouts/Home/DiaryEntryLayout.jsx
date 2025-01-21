import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import anonymous from "../../../assets/anonymous.png";
import userDefaultProfile from "../../../assets/userDefaultProfile.png";
// import TransparentLogo from "../../../assets/TransparentLogo.png";
import CommentSection from "../CommentSection/CommentSection";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import axios from "axios";
import FlagButton from "./FlagButton";
import ChatButton from "../DiaryEntry/ChatButton";
import EditDiaryEntryButton from "./EditDiaryEntryButton";
import EditPostButton from "./EditPostButton";
import DeleteButton from "../DiaryEntry/DeleteButton";
import ImageModal from "../DiaryEntry/ImageModal";
import Suspend from "../Profile/Suspend";

const DiaryEntryLayout = ({
  key,
  entry,
  user,
  followedUsers,
  handleFollowToggle,
  handleClick,
  expandButtons,
  formatDate,
  suspended,
}) => {
  const { userID } = useParams();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]); // New state for comments
  const [flaggedCount, setFlaggedCount] = useState(null);
  const [filters, setFilters] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = (entryID) => {
    setShowModal(true);
    updateEngagement(entryID);
  };
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/");
      return;
    }
    setCurrentUser(storedUser);
  }, [navigate]);

  // useEffect(() => {
  //   if (!userID || !currentUser) return;

  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:8081/fetchUser/user/${userID}`
  //       );

  //       if (!response.ok) {
  //         throw new Error("User not found");
  //       }
  //       const data = await response.json();
  //       setEntries(data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserData();
  // }, [userID, currentUser]);

  useEffect(() => {
    if (user) {
      fetchEntries(user.userID, filters);
    }
  }, [user, filters]);

  useEffect(() => {
    if (entry.entryID) {
      const fetchComments = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8081/fetchComments/${entry.entryID}`
          );
          setComments(response.data);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };
      fetchComments();
    }
  }, [entry.entryID]);

  const commentCount = comments.length;

  useEffect(() => {
    if (entry.entryID) {
      const fetchFlaggedCount = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8081/flaggedCount/${entry.entryID}`
          );
          const count = response.data.flaggedCount;
          setFlaggedCount(count);
        } catch (error) {
          console.error("Error fetching flagged count:", error);
        }
      };
      fetchFlaggedCount();
    }
  }, [entry.entryID]);

  useEffect(() => {
    if (entry.entryID) {
      const fetchComments = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8081/fetchComments/${entry.entryID}`
          );
          setComments(response.data);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };
      fetchComments();
    }
  }, [entry.entryID]);

  const fetchEntries = async (userID, filters) => {
    try {
      const response = await axios.get("http://localhost:8081/entries", {
        params: { userID, filters },
      });

      const gadifyStatusResponse = await axios.get(
        `http://localhost:8081/gadifyStatus/${userID}`
      );

      const updatedEntries = response.data.map((entry) => {
        const isGadified = gadifyStatusResponse.data.some(
          (g) => g.entryID === entry.entryID
        );
        return { ...entry, isGadified };
      });

      setEntries(updatedEntries);
    } catch (error) {
      console.error("Error fetching diary entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEntry = async (entryID) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8081/deleteEntry/${entryID}`);
        alert("Diary entry deleted successfully.");
        setEntries((prevEntries) =>
          prevEntries.filter((entry) => entry.entryID !== entryID)
        );
      } catch (error) {
        console.error("Error deleting diary entry:", error);
        alert("Failed to delete the entry.");
      }
    }
  };

  const updateEngagement = async (entryID) => {
    try {
      await axios.post("http://localhost:8081/updateEngagement", {
        entryID,
      });
    } catch (error) {
      console.error("Error updating engagement:", error);
    }
  };

  if (loading) {
    return (
      <div
        className="position-relative rounded shadow-sm p-3 mb-2"
        style={{ backgroundColor: "white" }}
      >
        <div className="position-absolute" style={{ right: "20px" }}>
          {/* <HomeDiaryDropdown></HomeDiaryDropdown> */}
        </div>
        <div className="d-flex align-items-center border-bottom pb-2 gap-2">
          <div className="profilePicture" style={{ backgroundColor: "#ffff" }}>
            <img
              src={userDefaultProfile}
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <p
            className="m-0 mt-2"
            style={{
              height: "14px",
              width: "70px",
              backgroundColor: "lightgray",
              marginBottom: "10px", // Optional, adds space between divs
            }}
          ></p>

          <p
            className="m-0 mt-2"
            style={{
              height: "14px",
              width: "50px",
              backgroundColor: "lightgray",
              marginBottom: "10px", // Optional, adds space between divs
            }}
          ></p>
        </div>

        <div className="text-start border-bottom p-2">
          <h5
            className="m-0 mt-2"
            style={{
              height: "20px",
              width: "190px",
              backgroundColor: "lightgray",
              marginBottom: "10px", // Optional, adds space between divs
            }}
          ></h5>
          <div>
            <p
              className="m-0 mt-3"
              style={{
                height: "14px",
                width: "100%",
                backgroundColor: "lightgray",
                marginBottom: "10px", // Optional, adds space between divs
              }}
            ></p>
            <p
              className="m-0 mt-3"
              style={{
                height: "14px",
                width: "100%",
                backgroundColor: "lightgray",
                marginBottom: "10px", // Optional, adds space between divs
              }}
            ></p>
            <p
              className="m-0 mt-3"
              style={{
                height: "14px",
                width: "50%",
                backgroundColor: "lightgray",
                marginBottom: "10px", // Optional, adds space between divs
              }}
            ></p>
          </div>
        </div>

        <div className="row pt-2">
          <div className="col">
            <button className="InteractButton">
              <p
                className="m-0 my-2"
                style={{
                  height: "14px",
                  width: "100%",
                  backgroundColor: "lightgray",
                  marginBottom: "10px", // Optional, adds space between divs
                }}
              ></p>
            </button>
          </div>
          <div className="col">
            <button className="InteractButton">
              <p
                className="m-0 my-2"
                style={{
                  height: "14px",
                  width: "100%",
                  backgroundColor: "lightgray",
                  marginBottom: "10px", // Optional, adds space between divs
                }}
              ></p>
            </button>
          </div>
          <div className="col">
            <button className="InteractButton">
              <p
                className="m-0 my-2"
                style={{
                  height: "14px",
                  width: "100%",
                  backgroundColor: "lightgray",
                  marginBottom: "10px", // Optional, adds space between divs
                }}
              ></p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const ownDiary = currentUser?.userID === entry.userID;

  return (
    <div
      key={entry.entryID}
      className="position-relative rounded shadow-sm p-3 mb-2"
      style={{ backgroundColor: "white", width: "100%" }}
    >
      <div className="d-flex align-items-start justify-content-between border-bottom pb-2">
        {/* TO DETERMINE IF THE DIARY IS PUBLIC OR PRIVATE */}
        {entry.visibility === "private" ? (
          // IF PRIVATE
          <div className="d-flex align-items-center gap-2 text-secondary">
            <Link
              to={`/Profile/${entry.userID}`}
              className="linkText rounded p-0"
            >
              <div className="profilePicture">
                <img
                  src={`http://localhost:8081${entry.profile_image}`}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </Link>

            <div className="d-flex flex-column align-items-start">
              <Link
                to={`/Profile/${entry.userID}`}
                className="linkText rounded p-0"
              >
                <h5 className="m-0">
                  {entry.isAdmin === 1
                    ? "Gender and Development"
                    : entry.firstName && entry.lastName
                    ? entry.firstName + " " + entry.lastName
                    : user.firstName + " " + user.lastName}
                </h5>
              </Link>

              <p className="m-0" style={{ fontSize: ".7rem" }}>
                {formatDate(entry.created_at)}{" "}
                <span>
                  {entry.anonimity === "public" ? (
                    <i class="bx bx-globe"></i>
                  ) : (
                    <i class="bx bx-lock-alt"></i>
                  )}
                </span>
              </p>
            </div>
          </div>
        ) : (
          // IF PUBLIC
          <div className="d-flex align-items-center gap-2 text-secondary">
            {/* TO DETERMINE IF THE DIARY IN ANONYMOUS OR NOT */}
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
                  <h5 className="m-0">
                    {entry.alias}
                    {user.userID === entry.userID ? " (You)" : ""}
                  </h5>
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
                {user.isAdmin ? (
                  ""
                ) : (
                  <>
                    {user &&
                      user.userID !== entry.userID &&
                      entry.anonimity !== "private" &&
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
                            onClick={() =>
                              handleFollowToggle(entry.userID, entry.firstName)
                            }
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
                  </>
                )}
              </div>
              <p
                className="m-0 d-flex align-items-center gap-1"
                style={{ fontSize: ".7rem" }}
              >
                {entry.isScheduled
                  ? formatDate(entry.scheduledDate)
                  : formatDate(entry.created_at)}

                <span className=" d-flex align-items-center">
                  {entry.visibility === "public" ? (
                    <i class="bx bx-globe "></i>
                  ) : (
                    <i class="bx bx-lock-alt"></i>
                  )}
                </span>
              </p>
            </div>
          </div>
        )}

        <div>
          {ownDiary || currentUser.isAdmin ? (
            <Dropdown>
              <Dropdown.Toggle
                className="btn-light d-flex align-items-center pt-0 pb-2"
                id="dropdown-basic"
                bsPrefix="custom-toggle"
              >
                <h5 className="m-0">...{}</h5>
              </Dropdown.Toggle>
              <Dropdown.Menu className="p-2">
                {currentUser.isAdmin && !entry.isAdmin ? (
                  <>
                    <Dropdown.Item className="p-0 btn btn-light">
                      <Suspend
                        userID={entry.userID}
                        firstName={entry.firstName}
                        suspended={entry.isSuspended}
                      ></Suspend>
                    </Dropdown.Item>
                    <Dropdown.Item className="p-0 btn btn-light">
                      <DeleteButton
                        entryID={entry.entryID}
                        title={entry.title}
                      ></DeleteButton>
                    </Dropdown.Item>
                  </>
                ) : (
                  <>
                    {user.isAdmin && !entry.userID ? (
                      <>
                        <Dropdown.Item className="p-0 btn btn-light">
                          <Suspend
                            userID={entry.userID}
                            firstName={entry.firstName}
                            suspended={suspended}
                          ></Suspend>
                        </Dropdown.Item>
                      </>
                    ) : (
                      <>
                        <Dropdown.Item className="p-0 btn btn-light">
                          {user.isAdmin ? (
                            <EditPostButton
                              entry={entry}
                              entryID={entry.entryID}
                              diaryTitle={entry.title}
                              diaryDesc={entry.description}
                              diaryVisib={entry.visibility}
                              diaryAnon={entry.anonimity}
                              diarySub={entry.subjects}
                              imageFile={
                                entry.diary_image &&
                                `http://localhost:8081${entry.diary_image}`
                              }
                            ></EditPostButton>
                          ) : (
                            <EditDiaryEntryButton
                              entry={entry}
                              entryID={entry.entryID}
                              diaryTitle={entry.title}
                              diaryDesc={entry.description}
                              diaryVisib={entry.visibility}
                              diaryAnon={entry.anonimity}
                              diarySub={entry.subjects}
                              imageFile={
                                entry.diary_image &&
                                `http://localhost:8081${entry.diary_image}`
                              }
                            />
                          )}
                        </Dropdown.Item>
                        <Dropdown.Item className="p-0 btn btn-light">
                          <DeleteButton
                            entryID={entry.entryID}
                            title={entry.title}
                          ></DeleteButton>
                        </Dropdown.Item>
                      </>
                    )}
                  </>
                )}
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
        <div className="d-flex align-items-center gap-1 position-relative">
          {entry.subjects === "None(no subject or topic)" ||
          entry.subjects === "General" ||
          entry.subjects === null ? null : (
            <h6 className="text-secondary m-0 mt-2">
              <span style={{ fontSize: "clamp(0.7rem, 1dvw, .85rem)" }}>
                Trigger Warning: {entry.subjects}
              </span>
            </h6>
          )}
        </div>

        <div className="d-flex gap-1 align-items-center mt-2 position-relative">
          <div className="d-flex flex-column gap-1">
            <h5 className="m-0">
              {entry.title}
              {/* {user} */}
            </h5>
          </div>
          {entry.containsAlarmingWords === 1 && user.isAdmin === 1 ? (
            <div className="d-flex justify-content-center align-items-end pt-1 gap-1">
              <div className="informationToolTip accordion text-danger align-middle">
                <h4 className="m-0">
                  <i class="bx bx-error" style={{}}></i>
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
          ) : null}
        </div>

        <p style={{ whiteSpace: "pre-wrap" }}>{entry.description}</p>

        {/* Clickable Image */}
        {entry.diary_image && (
          <>
            <img
              className="DiaryImage mt-1 rounded"
              src={`http://localhost:8081${entry.diary_image}`}
              alt="Diary"
              style={{ cursor: "pointer" }} // Add pointer cursor
              onClick={() => handleShowModal(entry.entryID)} // Open modal on click
            />

            {/* Modal */}
            <ImageModal
              showModal={showModal}
              handleCloseModal={handleCloseModal}
              diaryImage={`http://localhost:8081${entry.diary_image}`}
            ></ImageModal>
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

        {/* <div className="row pt-2">
          <div className="col">
            <i className="bx bx-comment"></i>
            {comments.length}
          </div> */}

        <div className="col p-0">
          <CommentSection
            commentCount={commentCount}
            userID={currentUser.userID}
            entryID={entry.entryID}
            entry={entry.userID}
            firstName={entry.firstName}
            isAnon={entry.anonimity}
            alias={entry.alias}
          />
          {/* {entry.isFlagged} */}
        </div>

        <div className="col p-0">
          {user.isAdmin ? (
            <ChatButton
              entry={entry}
              isAdmin={entry.isAdmin}
              userToChat={entry.userID}
            ></ChatButton>
          ) : (
            <FlagButton
              firstName={entry.firstName}
              isAnon={entry.anonimity}
              alias={entry.alias}
              flaggedCount={flaggedCount}
              userID={user.userID}
              entryID={entry.entryID}
              entry={entry.userID}
              fromAdmin={entry.isAdmin}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DiaryEntryLayout;
