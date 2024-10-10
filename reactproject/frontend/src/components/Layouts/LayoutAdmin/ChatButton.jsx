import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ChatIcon from "../../../assets/ChatIcon.png";
import SendIcon from "../../../assets/SendIcon.png";
import DefaultProfile from "../../../assets/userDefaultProfile.png";

const ChatButton = () => {
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const handleClose = () => {
    setShow(false);
    setSelectedUser(null);
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } else {
      window.location.href = "/";
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:8081/users`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        console.log("Fetched Users:", data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const pusher = new Pusher("4810211a14a19b86f640", {
    cluster: "ap1",
    forceTLS: true,
  });

  useEffect(() => {
    if (!user) return;

    const channel = pusher.subscribe(`user-${user.userID}`);
    channel.bind("message-event", function (data) {
      if (selectedUser && data.senderID !== user.userID) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { senderID: data.senderID, message: data.message },
        ]);
      }
    });

    return () => {
      if (channel) {
        channel.unbind_all();
        channel.unsubscribe();
      }
    };
  }, [user, selectedUser]);

  const fetchMessagesForSelectedUser = async (withUserID) => {
    try {
      const response = await fetch(
        `http://localhost:8081/messages?userID=${user.userID}&withUserID=${withUserID}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();

      if (data && Array.isArray(data)) {
        setMessages(data);
        const selectedUserData = users.find((usr) => usr.userID === withUserID);
        setSelectedUser(selectedUserData);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "" || !user || !selectedUser) return;

    try {
      const response = await fetch(`http://localhost:8081/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderID: user.userID,
          recipientID: selectedUser.userID,
          message: newMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setNewMessage("");
      setMessages((prevMessages) => [
        ...prevMessages,
        { senderID: user.userID, message: newMessage },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <>
      <div className="ChatButton">
        <button className="shadow" onClick={handleShow}>
          <img
            src={ChatIcon}
            alt=""
            style={{ width: "35px", height: "35px", marginRight: "1px" }}
          />
          <span className="tooltiptext" style={{ zIndex: "-2" }}>
            Messages
          </span>

          <div
            className="position-absolute p-0 d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "red",
              top: "5px",
              left: "-5px",
              height: "15px",
              width: "15px",
              borderRadius: "50%",
              color: "#ffff",
              // border: "2px solid var(--background)",
            }}
          ></div>
        </button>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Messages</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="p-1"
          style={{ height: "clamp(400px, 30vh, 500px)", overflow: "hidden" }}
        >
          <div>
            {/* Show UserList if no user is selected, otherwise show ChatRoom */}
            {!selectedUser ? (
              <div
                className="UserList "
                style={{ height: "clamp(400px, 30vh, 500px)" }}
              >
                <div className="d-flex align-items-center justify-content-between mb-1 px-3">
                  <h5 className="m-0">Users</h5>
                  <div class="w-50 input-group">
                    <span class="input-group-text" id="basic-addon1">
                      <i className="bx bx-search"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search"
                      aria-label="search"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div style={{ height: "85%" }}>
                  <div
                    className="mb-4 pe-2 d-flex flex-column gap-2 overflow-y-scroll"
                    style={{ height: "100%" }}
                  >
                    {users.map((userItem, index) => (
                      <div
                        key={index}
                        className="grayHover d-flex align-items-center gap-2 bg-light p-2 rounded"
                        onClick={() => handleUserClick(userItem)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="profilePicture">
                          <img
                            src={DefaultProfile}
                            alt="Profile"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <p className="m-0">
                          {userItem.firstName} {userItem.lastName} or (Alias){" "}
                          {/* if the user is anonymous */}
                        </p>
                        <div
                          className="p-0 m-0 d-flex align-items-center justify-content-center"
                          style={{
                            backgroundColor: "red",
                            height: "20px",
                            width: "20px",
                            borderRadius: "50%",
                            color: "#ffff",
                          }}
                        >
                          <p className="m-0 p-0" style={{ fontSize: "13px" }}>
                            0
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="ChatRoom mb-1 p-2"
                style={{ height: "clamp(400px, 30vh, 500px)" }}
              >
                {/* Back button */}
                <div onClick={handleBackClick} style={{ cursor: "pointer" }}>
                  <i className="bx bx-arrow-back"></i> {selectedUser.username}
                </div>
                <div>
                  {/* Display chat messages */}
                  <div className="border rounded">
                    <h5>Lorem ipsum dolor sit amet.</h5>
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`w-100 d-flex justify-content-${
                          msg.username === user?.username ? "end" : "start"
                        }`}
                      >
                        <div
                          className="rounded p-2 text-light"
                          style={{
                            backgroundColor:
                              msg.username === user?.username
                                ? "#ff8533"
                                : "#990099",
                            maxWidth: "200px",
                            width: "fit-content",
                            wordWrap: "break-word",
                          }}
                        >
                          <p className="m-0">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <FloatingLabel
                      controlId="floatingTextarea2"
                      label="Message"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: "70px" }}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                    </FloatingLabel>
                    <button
                      className="orangeButton py-2 d-flex align-items-center justify-content-center"
                      onClick={sendMessage}
                    >
                      <p className="me-2 mb-0">Send</p>
                      <img
                        src={SendIcon}
                        alt=""
                        style={{ width: "20px", height: "20px" }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChatButton;
