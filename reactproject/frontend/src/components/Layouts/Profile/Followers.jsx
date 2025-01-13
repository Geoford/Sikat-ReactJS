import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import axios from "axios";
import Tabs from "react-bootstrap/Tabs";
import { Link } from "react-router-dom";
import CloseButton from "react-bootstrap/CloseButton";
import DefaultProfile from "../../../assets/userDefaultProfile.png";
import { useNavigate } from "react-router-dom";
import MessageAlert from "../DiaryEntry/messageAlert";
import MessageModal from "../DiaryEntry/messageModal";
import { first } from "lodash";

const UserList = ({ users, handleFollowToggle, isFollowing }) => (
  <div
    className="custom-scrollbar mt-2 pe-1"
    style={{ height: "70vh", overflowY: "scroll" }}
  >
    {users.map((user) => (
      <div key={user.userID} className="pb-2 pe-2 mb-2">
        <div className="position-relative d-flex align-items-center justify-content-between gap-2">
          <Link
            to={`/Profile/${user.userID}`}
            className="linkText rounded d-flex justify-content-between w-100 p-2"
          >
            <div className="d-flex align-items-center">
              <div className="profilePicture">
                <img
                  src={
                    user.profile_image
                      ? `http://localhost:8081${user.profile_image}`
                      : DefaultProfile
                  }
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <p className="m-0 ms-2">
                {user.firstName} {user.lastName}
              </p>
            </div>
          </Link>
          <button
            className="primaryButton position-absolute"
            onClick={() => handleFollowToggle(user.userID, user.firstName)}
            style={{ right: "0" }}
          >
            <p className="m-0">
              {isFollowing(user.userID) ? "Unfollow" : "Follow"}
            </p>
          </button>
        </div>
      </div>
    ))}
  </div>
);

const Followers = ({ user, followersCount, followingCount }) => {
  const [showModal, setShowModal] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const navigate = useNavigate();

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

  // useEffect(() => {
  //   const userData = localStorage.getItem("user");
  //   if (userData) {
  //     const parsedUser = JSON.parse(userData);
  //     setUser(parsedUser);
  //     fetchFollowers(parsedUser.userID);
  //     fetchFollowedUsers(parsedUser.userID);
  //   } else {
  //     navigate("/");
  //   }
  // }, [navigate]);

  useEffect(() => {
    fetchFollowers(user.userID);
    fetchFollowedUsers(user.userID);
    console.log("userID", user.userID);
  }, [user.userID]);

  const fetchFollowers = async (userID) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/followers/${userID}`
      );
      setFollowers(response.data);
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  const fetchFollowedUsers = async (userID) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/followedUsers/${userID}`
      );
      const followedUsersData = response.data;
      setFollowedUsers(followedUsersData);
      localStorage.setItem("followedUsers", JSON.stringify(followedUsersData));
    } catch (error) {
      console.error("Error fetching followed users:", error);
    }
  };

  const handleFollowToggle = async (followUserId, firstName) => {
    if (!followUserId) {
      console.error("User ID to follow/unfollow is undefined");
      return;
    }

    if (user.userID === followUserId) {
      alert("You cannot follow yourself.");
      return;
    }

    const isFollowing = followedUsers.some((f) => f.userID === followUserId);

    try {
      if (isFollowing) {
        setConfirmModal({
          show: true,
          message: `Are you sure you want to unfollow ${firstName}?`,
          onConfirm: async () => {
            await axios.delete(
              `http://localhost:8081/unfollow/${followUserId}`,
              {
                data: { followerId: user.userID },
              }
            );

            setFollowedUsers((prev) =>
              prev.filter((u) => u.userID !== followUserId)
            );
            closeConfirmModal();
            setModal({
              show: true,
              message: `You have unfollowed ${firstName}.`,
            });
          },
          onCancel: () => setConfirmModal({ show: false, message: "" }),
        });
      } else {
        const response = await axios.post(
          `http://localhost:8081/follow/${followUserId}`,
          {
            followerId: user.userID,
          }
        );
        const followedUserData = response.data;

        setFollowedUsers((prev) => [...prev, followedUserData]);
        setModal({
          show: true,
          message: `You are now following ${firstName}.`,
        });
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
      alert("There was an error processing your request.");
    }
  };

  const handleShow = () => setShowModal(true);
  const handleCLose = () => setShowModal(false);
  return (
    <div>
      <MessageAlert
        showModal={modal}
        closeModal={closeModal}
        title={"Notice"}
        message={modal.message}
      ></MessageAlert>
      <MessageModal
        showModal={confirmModal}
        closeModal={closeConfirmModal}
        title={"Confirmation"}
        message={confirmModal.message}
        confirm={confirmModal.onConfirm}
        needConfirm={1}
      ></MessageModal>
      <button className="border-0 bg-transparent p-0" onClick={handleShow}>
        <p className="m-0 mt-1 text-secondary underlinedLink">
          {followersCount} Followers - {followingCount} Following
        </p>
      </button>
      <Modal show={showModal} onHide={handleCLose} centered>
        <Modal.Body className="position-relative">
          <Tabs
            defaultActiveKey="Followers"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="Followers" title="Followers">
              <div>
                <UserList
                  users={followers}
                  handleFollowToggle={handleFollowToggle}
                  isFollowing={(id) =>
                    followedUsers.some((f) => f.userID === id)
                  }
                />
              </div>
            </Tab>
            <Tab eventKey="Following" title="Following">
              <div>
                <UserList
                  users={followedUsers}
                  handleFollowToggle={handleFollowToggle}
                  isFollowing={() => true}
                />
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Followers;
