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
  const [user, setUser] = useState(null); // State to hold user data

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

    fetchMessages();

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

    const adminUserID = "adminUserID";

    await fetch("http://localhost:8081/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: newMessage, userID: user.userID }), // Use userID from parsed user data
    });
    setNewMessage("");
  };

  return (
    <>
      <div className="ChatButton">
        <button className="shadow" onClick={handleShow}>
          <img src={ChatIcon} alt="" />
          <span className="tooltiptext">Message Admin</span>
        </button>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Hello, {user?.username || "UserName"}!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div
              className="border rounded mb-1 p-2"
              style={{ height: "300px", overflowY: "scroll" }}
            >
              <div className="mb-2">
                <p className="m-0 text-secondary text-center">
                  You're now messaging the GAD Personnel Admins. Please be
                  respectful, and don't hesitate to communicate!
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
                        msg.username === user?.username ? "#ff8533" : "#990099",
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
                  placeholder="Leave a comment here"
                  style={{ height: "70px" }}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </FloatingLabel>
            </div>
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
              alt=""
              style={{ width: "20px", height: "20px" }}
            />
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChatButton;
