import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link } from "react-router-dom";
import CloseButton from "react-bootstrap/CloseButton";
import DefaultProfile from "../../../assets/userDefaultProfile.png";

const Followers = ({ followersCount, followingCount }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleCLose = () => setShowModal(false);
  return (
    <div>
      <button className="border-0 bg-transparent p-0" onClick={handleShow}>
        <p className="m-0 mt-1 text-secondary underlinedLink">
          {followersCount} Followers - {followingCount} Following
        </p>
      </button>
      <Modal show={showModal} onHide={handleCLose} centered>
        <Modal.Body className="position-relative">
          <CloseButton
            className="position-absolute"
            style={{ right: "1rem", top: "1rem" }}
          />
          <Tabs defaultActiveKey="followers" id="followerAndFollowing">
            <Tab eventKey="followers" title="Followers">
              <div
                className="overflow-y-scroll custom-scrollbar pe-1 pt-1"
                style={{ height: "25rem" }}
              >
                <div
                  //  key={user.userID}
                  className="pb-2 pe-2 mb-2"
                >
                  <div className="position-relative d-flex align-items-center justify-content-between gap-2">
                    <Link
                      //   to={`/Profile/${user.userID}`}
                      className="linkText rounded d-flex justify-content-between w-100 p-2"
                    >
                      <div className="d-flex align-items-center">
                        <div className="profilePicture">
                          <img
                            src={
                              //   user.profile_image
                              //     ? `http://localhost:8081${user.profile_image}`
                              //     :
                              DefaultProfile
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
                          {/* {user.firstName} {user.lastName} */}
                          Firstname Lastname
                        </p>
                      </div>
                    </Link>
                    <button
                      className="primaryButton position-absolute"
                      // onClick={() => handleFollowToggle(user.userID)}
                      style={{ right: "0" }}
                    >
                      {/* {isFollowing(user.userID) ? "Unfollow" : "Follow"} */}
                      <p className="m-0">Follow</p>
                    </button>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="following" title="Following">
              <div
                className="overflow-y-scroll custom-scrollbar pe-1 pt-1"
                style={{ height: "25rem" }}
              >
                <div
                  //  key={user.userID}
                  className="pb-2 pe-2 mb-2"
                >
                  <div className="position-relative d-flex align-items-center justify-content-between gap-2">
                    <Link
                      //   to={`/Profile/${user.userID}`}
                      className="linkText rounded d-flex justify-content-between w-100 p-2"
                    >
                      <div className="d-flex align-items-center">
                        <div className="profilePicture">
                          <img
                            src={
                              //   user.profile_image
                              //     ? `http://localhost:8081${user.profile_image}`
                              //     :
                              DefaultProfile
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
                          {/* {user.firstName} {user.lastName} */}
                          Firstname Lastname
                        </p>
                      </div>
                    </Link>
                    <button
                      className="secondaryButton position-absolute"
                      // onClick={() => handleFollowToggle(user.userID)}
                      style={{ right: "0" }}
                    >
                      {/* {isFollowing(user.userID) ? "Unfollow" : "Follow"} */}
                      <p className="m-0">Following</p>
                    </button>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Followers;
