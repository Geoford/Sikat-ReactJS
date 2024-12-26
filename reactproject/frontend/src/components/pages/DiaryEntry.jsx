import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import anonymous from "../../assets/Anonymous.png";
import MainLayout from "../Layouts/MainLayout";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import CommentDropdown from "../Layouts/CommentSection/CommentDropdown";
import DiaryEntryLayout from "../Layouts/Home/DiaryEntryLayout";
import axios from "axios";
import CommentSectionButton from "../Layouts/CommentSection/CommentSection";
import CommentSection from "../Layouts/DiaryEntry/CommentSection";

import FlagButton from "../Layouts/Home/FlagButton";

const DiaryEntry = () => {
  const { entryID } = useParams();
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [comments, setComments] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [expandButtons, setExpandButtons] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const commentSectionRef = useRef(null);

  // FOR CLICKABLE IMAGE
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = (entryID) => {
    setShowModal(true);
    // updateEngagement(entryID);
  };
  const handleCloseModal = () => setShowModal(false);

  // Fetch user data and check if logged in
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/");
    }
  }, [navigate]);

  // Fetch the data of the current user
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/");
      return;
    }
    setCurrentUser(storedUser);
  }, [navigate]);

  // Fetch entry and comments when user or entryID changes
  useEffect(() => {
    if (user && entryID) {
      fetchEntry();
      fetchComments();
      fetchFollowedUsers(user.userID);
    }
  }, [user, entryID]);

  const fetchEntry = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8081/fetchDiaryEntry/${entryID}`
      );
      const gadifyStatusResponse = await axios.get(
        `http://localhost:8081/gadifyStatus/${user.userID}`
      );

      if (response.data && response.data.entry) {
        const entry = response.data.entry;
        const isGadified = gadifyStatusResponse.data.some(
          (g) => g.entryID === entry.entryID
        );
        setEntries([{ ...entry, isGadified }]);
      } else {
        setError("No entry found.");
      }
    } catch (error) {
      console.error("Error fetching entry:", error);
      setError("Error loading entry.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/fetchComments/${entryID}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError("Failed to load comments.");
    }
  };

  const fetchFollowedUsers = async (userID) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/followedUsers/${userID}`
      );
      setFollowedUsers(response.data.map((user) => user.userID));
    } catch (error) {
      console.error("Error fetching followed users:", error);
    }
  };

  const handleGadify = async (entryID) => {
    if (!user) return;

    try {
      const response = await axios.post(
        `http://localhost:8081/entry/${entryID}/gadify`,
        {
          userID: user.userID,
        }
      );
      const isGadified =
        response.data.message === "Gadify action recorded successfully";

      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.entryID === entryID
            ? {
                ...entry,
                gadifyCount: isGadified
                  ? entry.gadifyCount + 1
                  : entry.gadifyCount - 1,
                isGadified,
              }
            : entry
        )
      );
    } catch (error) {
      console.error("Error updating gadify count:", error);
    }
  };

  const handleClick = (entryID) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.entryID === entryID
          ? { ...entry, isGadified: !entry.isGadified }
          : entry
      )
    );
    setExpandButtons((prev) => ({ ...prev, [entryID]: true }));
    setTimeout(
      () => setExpandButtons((prev) => ({ ...prev, [entryID]: false })),
      300
    );
    handleGadify(entryID);
  };

  const formatDate = (dateString) => {
    const entryDate = new Date(dateString);
    const now = new Date();
    const timeDiff = now - entryDate;

    return timeDiff < 24 * 60 * 60 * 1000
      ? entryDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : entryDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
  };

  // FOR FLAGGED AND COMMENT COUNT
  const commentCount = comments.length;

  const [flaggedCount, setFlaggedCount] = useState(null);

  useEffect(() => {
    if (entries.length > 0) {
      const entry = entries[0]; // Assuming there's only one entry per page
      const fetchFlaggedCount = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8081/flaggedCount/${entry.entryID}`
          );
          setFlaggedCount(response.data.flaggedCount);
        } catch (error) {
          console.error("Error fetching flagged count:", error);
        }
      };
      fetchFlaggedCount();
    }
  }, [entries]);

  const handleFollowToggle = (userID) => {
    setFollowedUsers((prevFollowedUsers) =>
      prevFollowedUsers.includes(userID)
        ? prevFollowedUsers.filter((id) => id !== userID)
        : [...prevFollowedUsers, userID]
    );
  };

  return (
    <MainLayout>
      <div
        className="d-flex align-items-center justify-content-center pb-3"
        style={{ minHeight: "70vh" }}
      >
        {isLoading ? (
          <p>Loading...</p>
        ) : entries.length === 0 ? (
          <p>{error || "No entries available."}</p>
        ) : (
          entries.map((entry) => {
            const ownDiary = currentUser?.userID === entry.userID;
            return (
              <div
                className="d-flex justify-content-center align-items-center mt-3 bg-light rounded shadow-sm p-3"
                style={{ width: "clamp(30rem, 90vw, 80rem)" }}
              >
                <div className="row gap-2">
                  {entry.diary_image && (
                    // IMAGE SIDE
                    <div className="col-lg-7 d-flex justify-content-center overflow-hidden rounded">
                      <div
                        style={{
                          width: "clamp(19rem, 50dvw, 50rem)",
                          height: "clamp(19rem, 50dvw, 80dvh)",
                        }}
                      >
                        <img
                          className="DiaryImage rounded"
                          src={`http://localhost:8081${entry.diary_image}`}
                          alt="Diary"
                          style={{
                            cursor: "pointer",
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }} // Add pointer cursor
                          onClick={() => handleShowModal(entry.entryID)} // Open modal on click
                        />
                      </div>
                    </div>
                  )}

                  {/* DIARY DETAILS SIDE */}
                  <div
                    className="col-lg"
                    // style={{
                    //   width: entry.diary_image
                    //     ? "clamp(19rem, 30dvw, 30rem)"
                    //     : "clamp(19rem, 50dvw, 50rem)",
                    // }}
                  >
                    <div className="border-bottom d-flex gap-2 pb-2">
                      {/* // IF PUBLIC */}
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
                                    onClick={() =>
                                      handleFollowToggle(entry.userID)
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
                          </div>
                          <p className="m-0" style={{ fontSize: ".7rem" }}>
                            {formatDate(entry.created_at)}{" "}
                            <span>
                              {entry.visibility === "public" ? (
                                <i class="bx bx-globe"></i>
                              ) : (
                                <i class="bx bx-lock-alt"></i>
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
                    {/* DIARY ENTRY DETAILS */}
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
                        {entry.containsAlarmingWords === 1 &&
                        user.isAdmin === 1 ? (
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
                                This diary entry has been flagged by the system
                                as potentially containing sensitive or
                                distressing topics and may require immediate
                                attention.
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

                      <p style={{ whiteSpace: "pre-wrap" }}>
                        {entry.description}
                      </p>

                      {/* Clickable Image */}
                      {entry.diary_image && (
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
                                <CloseButton
                                  onClick={handleCloseModal}
                                  style={{}}
                                />
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
                        <button className="InteractButton d-flex align-items-center justify-content-center gap-2">
                          <i className="bx bx-comment"></i>
                          <span>{commentCount}</span>
                          <p className="m-0 d-none d-md-block">Comments</p>
                        </button>
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
                    <div>
                      <CommentSection
                        commentCount={commentCount}
                        userID={user.userID}
                        entryID={entry.entryID}
                        entry={entry.userID}
                        firstName={entry.firstName}
                      ></CommentSection>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </MainLayout>
  );
};

export default DiaryEntry;
