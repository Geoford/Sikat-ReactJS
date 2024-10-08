import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ChatIcon from "../../../assets/ChatIcon.png";
import SendIcon from "../../../assets/SendIcon.png";
import DefaultProfile from "../../../assets/userDefaultProfile.png";

const AdminChatButton = () => {
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
          <img src={ChatIcon} alt="Chat" />
          <span className="tooltiptext">Messages</span>
        </button>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedUser ? `Chat with ${selectedUser.username}` : "Messages"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {!selectedUser ? (
              <div>
                <h5 className="m-0 ms-2">Users</h5>
                <div>
                  {users.length === 0 ? (
                    <p>No users available.</p>
                  ) : (
                    users.map((userItem) => (
                      <div
                        key={userItem.userID}
                        className="grayHover d-flex align-items-center gap-2 bg-light p-2 rounded"
                        onClick={() =>
                          fetchMessagesForSelectedUser(userItem.userID)
                        }
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
                        <p className="m-0">{userItem.username}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div
                  className="border rounded mb-1 p-2"
                  style={{ height: "300px", overflowY: "scroll" }}
                >
                  {messages.length === 0 ? (
                    <p>No messages yet.</p>
                  ) : (
                    messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`w-100 d-flex justify-content-${
                          msg.senderID === user?.userID ? "end" : "start"
                        }`}
                      >
                        <div
                          className="rounded p-2 text-light"
                          style={{
                            backgroundColor:
                              msg.senderID === user?.userID
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
                    ))
                  )}
                </div>

                <div>
                  <FloatingLabel controlId="floatingTextarea2" label="Message">
                    <Form.Control
                      as="textarea"
                      placeholder="Type your message here"
                      style={{ height: "70px" }}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                  </FloatingLabel>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button
            className="orangeButton py-2 d-flex align-items-center justify-content-center"
            onClick={sendMessage}
          >
            <p className="me-2 mb-0">Send</p>
            <img
              src={SendIcon}
              alt="Send"
              style={{ width: "20px", height: "20px" }}
            />
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminChatButton;
