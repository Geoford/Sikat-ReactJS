import React, { useState, useEffect, useRef } from "react";
import Pusher from "pusher-js";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ChatIcon from "../../../assets/ChatIcon.png";
import SendIcon from "../../../assets/SendIcon.png";
import DefaultProfile from "../../../assets/anonymous.png";
import axios from "axios";

const ChatButton = () => {
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);

  const handleClose = () => {
    setShow(false);
    setSelectedUser(null);
    setMessages([]);
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } else {
      alert("You need to log in to access the chat.");
      window.location.href = "/";
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:8081/users`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!user) return;

    const pusher = new Pusher("4810211a14a19b86f640", {
      cluster: "ap1",
      forceTLS: true,
    });

    const channel = pusher.subscribe(`user-${user.userID}`);

    const adminChannel = pusher.subscribe("admin-channel");

    channel.bind("message-event", function (data) {
      if (selectedUser && data.recipientID === selectedUser.userID) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { senderID: data.senderID, message: data.message },
        ]);
      }
    });

    adminChannel.bind("message-event", function (data) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { senderID: data.senderID, message: data.message },
      ]);
    });

    // Cleanup function
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      adminChannel.unbind_all();
      adminChannel.unsubscribe();
      pusher.disconnect();
    };
  }, [user, selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessagesForSelectedUser = async (withUserID) => {
    try {
      const response = await axios.get("http://localhost:8081/messages", {
        params: {
          userID: user.userID,
          withUserID: withUserID,
        },
      });

      setMessages(response.data);
      setSelectedUser(users.find((usr) => usr.userID === withUserID));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleUserClick = (userItem) => {
    fetchMessagesForSelectedUser(userItem.userID);
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
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const handleBackClick = () => {
    setSelectedUser(null);
    setMessages([]); // Clear messages when going back
  };

  // Function to filter users based on search query
  const filteredUsers = users.filter((userItem) =>
    `${userItem.firstName} ${userItem.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const entryDate = new Date(dateString);
    const now = new Date();
    const timeDiff = now - entryDate;

    if (timeDiff < 24 * 60 * 60 * 1000) {
      return entryDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return entryDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <>
      <div className="ChatButton d-flex align-items-center justify-content-center">
        <button className="shadow p-2" onClick={handleShow}>
          <img src={ChatIcon} alt="" />
          <p>
            <span className="tooltiptext" style={{ zIndex: "-2" }}>
              Messages
            </span>
          </p>
        </button>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="m-0">Messages</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-1" style={{ overflow: "hidden" }}>
          <div>
            {!selectedUser ? (
              <div
                className="UserList"
                style={{ height: "clamp(400px, 30vh, 500px)" }}
              >
                <div className="d-flex justify-content-between px-3 py-2 mb-2 border-bottom">
                  <h5 className="m-0 mt-2">Users</h5>
                  <InputGroup className="m-0 w-50">
                    <InputGroup.Text id="basic-addon1">
                      <i class="bx bx-search-alt-2"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className=""
                    />
                  </InputGroup>
                </div>
                <div style={{ height: "85%" }}>
                  <div
                    className="mb-4 pe-2 d-flex flex-column gap-2 overflow-y-scroll custom-scrollbar"
                    style={{ height: "100%" }}
                  >
                    {filteredUsers.map((userItem, index) => (
                      <div
                        key={index}
                        className="grayHover d-flex align-items-center justify-content-between gap-2 bg-light p-2 pe-3 rounded"
                        onClick={() => handleUserClick(userItem)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className=" d-flex align-items-center gap-2">
                          <div className="profilePicture">
                            <img
                              src={
                                userItem.profile_image
                                  ? `http://localhost:8081${userItem.profile_image}`
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
                          <p className="m-0">
                            {userItem.firstName} {userItem.lastName} or (Alias)
                          </p>
                        </div>
                        {userItem.isActive === 1 ? (
                          <div
                            className="p-0 m-0 d-flex align-items-center justify-content-center"
                            style={{
                              backgroundColor: "var(--primary)",
                              height: "15px",
                              width: "15px",
                              borderRadius: "50%",
                              color: "#ffff",
                            }}
                          ></div>
                        ) : (
                          <div
                            className="p-0 m-0 d-flex align-items-center justify-content-center"
                            style={{
                              backgroundColor: "gray",
                              height: "15px",
                              width: "15px",
                              borderRadius: "50%",
                              color: "#ffff",
                            }}
                          ></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="ChatRoom p-2 pt-0"
                style={{ minHeight: "clamp(400px, 30vh, 500px)" }}
              >
                <div
                  className="py-2 d-flex align-items-center gap-2"
                  onClick={handleBackClick}
                  style={{ cursor: "pointer" }}
                >
                  <i className="bx bx-arrow-back"></i>{" "}
                  <h5 className="m-0">{selectedUser.username}</h5>
                </div>
                <div>
                  <div
                    className="border rounded mb-1 p-2 custom-scrollbar"
                    style={{ height: "300px", overflowY: "scroll" }}
                  >
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`w-100 p-0 d-flex justify-content-${
                          msg.senderID === user?.userID ? "end" : "start"
                        }`}
                      >
                        <div
                          className="rounded p-2 mt-1 text-light text-start"
                          style={{
                            backgroundColor:
                              msg.senderID === user?.userID
                                ? "var(--secondary)"
                                : "var(--primary)",
                            maxWidth: "80%",
                            width: "fit-content",
                            wordWrap: "break-word",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          <p className="m-0">{msg.message}</p>
                          <p className="m-0 text-end">
                            <span
                              style={{
                                fontSize: "clamp(0.5rem, 1.5dvw, 0.6rem)",
                              }}
                            >
                              {formatDate(msg.created_at)}
                            </span>{" "}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* Scroll reference */}
                  </div>
                  <div className="position-relative">
                    <FloatingLabel
                      controlId="floatingTextarea2"
                      label="Message"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Message"
                        style={{ height: "70px" }}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                      />
                    </FloatingLabel>
                    <button
                      className="position-absolute py-2 d-flex align-items-center justify-content-center border-0"
                      onClick={sendMessage}
                      style={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#ffff",
                        right: "10px",
                        bottom: "10px",
                        color: "var(--primary)",
                      }}
                    >
                      <i
                        className="bx bxs-send "
                        style={{ fontSize: "clamp(1.2rem, 2dvw, 1.5rem)" }}
                      ></i>
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
