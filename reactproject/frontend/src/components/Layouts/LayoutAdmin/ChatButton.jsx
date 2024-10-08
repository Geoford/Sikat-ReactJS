import Pusher from "pusher-js";
import { useState, useEffect } from "react";
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
  const [user, setUser] = useState(null); // State to hold user data
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user
  const [users, setUsers] = useState([]); // Track list of users

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser); // Set user state
    } else {
      // Redirect to login if user is not authenticated
      window.location.href = "/";
    }

    const fetchMessages = async () => {
      const response = await fetch("http://localhost:8081/messages");
      const data = await response.json();
      setMessages(data);
    };

    const fetchUsers = async () => {
      const response = await fetch("http://localhost:8081/users"); // Assuming this endpoint returns user list
      const data = await response.json();
      setUsers(data);
    };

    fetchMessages();
    fetchUsers();

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

  const sendMessage = async () => {
    if (newMessage.trim() === "" || !user) return; // Prevent sending empty messages and check if user exists

    await fetch("http://localhost:8081/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: newMessage, userID: user.userID }), // Use userID from parsed user data
    });
    setNewMessage("");
  };

  // Function to go back to the user list
  const handleBackClick = () => {
    setSelectedUser(null);
  };

  // Function to handle user selection from the list
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <>
      <div className="ChatButton">
        <button className="shadow" onClick={handleShow}>
          <img src={ChatIcon} alt="" />
          <span className="tooltiptext">Messages</span>
        </button>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Messages</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {/* Show UserList if no user is selected, otherwise show ChatRoom */}
            {!selectedUser ? (
              <div className="UserList d-flex flex-column gap-2">
                <div>Users</div>
                {users.map((userItem, index) => (
                  <div
                    key={index}
                    className="user-item d-flex align-items-center gap-2"
                    onClick={() => handleUserClick(userItem)}
                    style={{ cursor: "pointer" }} // Add cursor pointer for click feedback
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
                      {/*if the user is anonymous*/}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="ChatRoom border rounded mb-1 p-2"
                style={{ height: "300px", overflowY: "scroll" }}
              >
                {/* Back button */}
                <div onClick={handleBackClick} style={{ cursor: "pointer" }}>
                  Back
                </div>

                <div className="mb-2">
                  <p className="m-0 text-secondary text-center">
                    You're now messaging {selectedUser.username}. Please be
                    respectful, and don't hesitate to communicate!
                  </p>
                </div>

                {/* Display chat messages */}
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
                <div>
                  <FloatingLabel controlId="floatingTextarea2" label="Message">
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
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChatButton;
