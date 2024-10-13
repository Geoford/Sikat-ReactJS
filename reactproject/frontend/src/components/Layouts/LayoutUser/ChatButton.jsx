import Pusher from "pusher-js";
import { useState, useEffect, useRef } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ChatIcon from "../../../assets/ChatIcon.png";
import SendIcon from "../../../assets/SendIcon.png";

const UserChatButton = () => {
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [admin, setAdmin] = useState(null);
  const pusherRef = useRef(null);

  const handleClose = () => {
    setShow(false);
    setMessages([]); // Clear messages when modal closes
    setSelectedUser(null); // Reset selected user
  };

  const handleShow = async () => {
    setShow(true);
    if (!user?.isAdmin && admin) {
      await fetchMessages(admin.userID); // Fetch messages when modal opens for normal users
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      console.log("Current user:", parsedUser);

      const fetchAdmin = async () => {
        try {
          const response = await fetch("http://localhost:8081/admin");
          const data = await response.json();
          console.log("Fetched admin data:", data);
          setAdmin(data);
          if (!parsedUser.isAdmin) {
            await fetchMessages(data.userID); // Fetch messages for normal users
          }
        } catch (error) {
          console.error("Error fetching admin data:", error);
        }
      };

      fetchAdmin();

      if (parsedUser.isAdmin) {
        const fetchAllUsers = async () => {
          try {
            const response = await fetch("http://localhost:8081/users");
            const data = await response.json();
            console.log("Fetched all users:", data);
            setAllUsers(data);
          } catch (error) {
            console.error("Error fetching all users:", error);
          }
        };
        fetchAllUsers();
      }

      // Initialize Pusher here
      pusherRef.current = new Pusher("4810211a14a19b86f640", {
        cluster: "ap1",
        encrypted: true,
      });

      const channel = pusherRef.current.subscribe("chat-channel");

      // Handle incoming messages
      channel.bind("message-event", (data) => {
        // Update messages for the correct recipient
        if (
          data.recipientID === user.userID ||
          (selectedUser && data.senderID === selectedUser)
        ) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              username: data.username,
              message: data.message,
              senderID: data.senderID,
            },
          ]);
        }
      });

      return () => {
        channel.unbind_all();
        pusherRef.current.unsubscribe("chat-channel");
      };
    } else {
      window.location.href = "/";
    }
  }, []); // Only run this effect on mount

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser);
    }
  }, [selectedUser]);

  const fetchMessages = async (userID) => {
    if (!user) return;

    try {
      const response = await fetch(
        `http://localhost:8081/messages?userID=${user.userID}&withUserID=${userID}`
      );
      const data = await response.json();
      console.log("Fetched messages for userID:", userID, data);
      setMessages(data);
      setSelectedUser(userID);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "" || !user || (!selectedUser && !admin)) return;

    const recipientUserID = user.isAdmin ? selectedUser : admin.userID;
    const senderUserID = user.userID;

    await fetch("http://localhost:8081/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderID: senderUserID,
        recipientID: recipientUserID,
        message: newMessage,
      }),
    });

    // Update local state for the sent message
    setMessages((prevMessages) => [
      ...prevMessages,
      { username: user.username, message: newMessage, senderID: senderUserID },
    ]);
    setNewMessage("");
  };

  return (
    <>
      <div className="ChatButton">
        <button className="shadow" onClick={handleShow}>
          <img src={ChatIcon} alt="Message" />
          <span className="tooltiptext">
            Message {user?.isAdmin ? "Users" : "Admin"}
          </span>
        </button>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {user?.isAdmin
              ? "Select a User to Chat"
              : `Hello, ${user?.username || "UserName"}!`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user?.isAdmin ? (
            <div>
              <ul>
                {allUsers.map((usr) => (
                  <li
                    key={usr.userID}
                    onClick={() => fetchMessages(usr.userID)}
                  >
                    {usr.username}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <div
                className="border rounded mb-1 p-2"
                style={{ height: "300px", overflowY: "scroll" }}
              >
                <div className="mb-2">
                  <p className="m-0 text-secondary text-center">
                    You are now communicating with Admin. Please feel free to
                    reach out if you need assistance, and ensure that all
                    interactions remain respectful.
                  </p>
                </div>

                {messages.map((msg, index) => (
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
                          msg.senderID === user?.userID ? "#ff8533" : "#990099",
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

              <div className="position-relative">
                <FloatingLabel controlId="floatingTextarea2" label="Message">
                  <Form.Control
                    className="pe-3"
                    as="textarea"
                    placeholder="Leave a message here"
                    style={{ height: "70px" }}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                </FloatingLabel>
              </div>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {user?.isAdmin || admin ? (
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
          ) : null}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserChatButton;
