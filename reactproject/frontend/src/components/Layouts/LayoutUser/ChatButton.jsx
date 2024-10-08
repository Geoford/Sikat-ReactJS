import Pusher from "pusher-js";
import { useState, useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ChatIcon from "../../../assets/ChatIcon.png";
import SendIcon from "../../../assets/SendIcon.png";

const ChatButton = () => {
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null); // State to hold current user
  const [selectedUser, setSelectedUser] = useState(null); // State to hold selected user for chat
  const [allUsers, setAllUsers] = useState([]); // State to hold all users (for admin)
  const [admin, setAdmin] = useState(null); // State to hold admin data

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // Fetch user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Fetch the admin user for regular users
      const fetchAdmin = async () => {
        const response = await fetch("http://localhost:8081/admin");
        const data = await response.json();
        setAdmin(data);
        if (!parsedUser.isAdmin) {
          fetchMessages(data.userID); // Regular user will automatically see admin's chat
        }
      };

      fetchAdmin();

      // Fetch all users if current user is admin
      if (parsedUser.isAdmin) {
        const fetchAllUsers = async () => {
          const response = await fetch("http://localhost:8081/users");
          const data = await response.json();
          setAllUsers(data);
        };
        fetchAllUsers();
      }
    } else {
      window.location.href = "/";
    }

    const pusher = new Pusher("4810211a14a19b86f640", {
      cluster: "ap1",
      encrypted: true,
    });

    const channel = pusher.subscribe("chat-channel");
    channel.bind("message-event", function (data) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { username: data.username, message: data.message },
      ]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const fetchMessages = async (userID) => {
    const response = await fetch(
      `http://localhost:8081/messages?userID=${userID}`
    );
    const data = await response.json();
    setMessages(data);
    setSelectedUser(userID); // Set selected user to load their chat
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "" || !user || (!selectedUser && !admin)) return; // Check if message, user, and selected user/admin exist

    const recipientUserID = user.isAdmin ? selectedUser : admin.userID; // Admin sends to selected user, regular user sends to admin

    await fetch("http://localhost:8081/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: newMessage, userID: recipientUserID }), // Send message to the appropriate chat
    });
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
              {/* List of all users for admin to select */}
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
              {/* Chat messages view for users */}
              <div
                className="border rounded mb-1 p-2"
                style={{ height: "300px", overflowY: "scroll" }}
              >
                <div className="mb-2">
                  <p className="m-0 text-secondary text-center">
                    You are now messaging with Admin.
                  </p>
                </div>

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
                <FloatingLabel controlId="floatingTextarea2" label="Message">
                  <Form.Control
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

export default ChatButton;
