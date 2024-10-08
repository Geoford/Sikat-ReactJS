import Pusher from "pusher-js";
import { useState, useEffect } from "react";
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            await fetchMessages(data.userID);
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
    } else {
      window.location.href = "/";
    }

    // Initialize Pusher
    const pusher = new Pusher("4810211a14a19b86f640", {
      cluster: "ap1",
      encrypted: true,
    });

    const channel = pusher.subscribe("chat-channel");
    channel.bind("message-event", function (data) {
      if (data.senderID === admin.userID || data.senderID === user.userID) {
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
      channel.unsubscribe();
    };
  }, [user, admin]);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (user && admin) {
      fetchMessages(admin.userID);
    }
  }, [user, admin]);

  const fetchMessages = async (userID) => {
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
                    You are now messaging with Admin.
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

export default UserChatButton;
