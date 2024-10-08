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
        <Modal.Body
          className="p-0 px-2"
          style={{ height: "clamp(400px, 30vh, 500px)", overflow: "hidden" }}
        >
          <div>
            {/* Show UserList if no user is selected, otherwise show ChatRoom */}
            {!selectedUser ? (
              // USERLIST
              <div
                className="UserList "
                style={{ height: "clamp(400px, 30vh, 500px)" }}
              >
                <div className="p-2 d-flex align-items-center justify-content-between">
                  <h5 className="m-0">Users</h5>
                  <div class="input-group w-50">
                    <span class="input-group-text" id="basic-addon1">
                      <i className="bx bx-search-alt-2"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      aria-label="Username"
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
                          {userItem.firstName} {userItem.lastName} (FullName) or
                          (Alias) {/* if the user is anonymous */}
                        </p>
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{
                            backgroundColor: "red",
                            height: "20px",
                            width: "20px",
                            borderRadius: "50%",
                          }}
                        >
                          <p
                            className="m-0 text-light"
                            style={{ fontSize: "13px" }}
                          >
                            0
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // CHATROOM
              <div
                className="ChatRoom"
                style={{ height: "clamp(400px, 30vh, 500px)" }}
              >
                {/* Back button */}
                <div
                  className="py-2 d-flex align-items-center"
                  onClick={handleBackClick}
                  style={{ cursor: "pointer" }}
                >
                  <h5 className="m-0 my-1">
                    <i className="bx bx-arrow-back"></i> {selectedUser.username}
                  </h5>
                </div>
                <div style={{ height: "100%" }}>
                  {/* Display chat messages */}
                  <div
                    className="p-2 border rounded overflow-y-scroll"
                    style={{ height: "65%" }}
                  >
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
                                ? "var(--primary)"
                                : "var(--primary)",
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

                  <div className="mt-2 position-relative">
                    <FloatingLabel
                      controlId="floatingTextarea2"
                      label="Message"
                    >
                      <Form.Control
                        className="pe-4"
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: "70px" }}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                    </FloatingLabel>
                    <button
                      className="position-absolute border-0"
                      style={{
                        bottom: "5px",
                        right: "10px",
                        backgroundColor: "transparent",
                      }}
                      onClick={sendMessage}
                    >
                      <i
                        className="bx bxs-send bx-sm"
                        style={{ color: "var(--primary)" }}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default ChatButton;
