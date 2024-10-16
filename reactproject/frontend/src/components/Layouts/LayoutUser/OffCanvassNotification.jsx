import { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import axios from "axios";
import Pusher from "pusher-js";
import DefaultProfile from "../../../../src/assets/userDefaultProfile.png";

function OffCanvassLayouts() {
  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Subscribe to Pusher notifications channel
      const pusher = new Pusher("4810211a14a19b86f640", {
        cluster: "ap1",
      });

      const channel = pusher.subscribe(`notifications-${parsedUser.userID}`);

      channel.bind("new-notification", (data) => {
        console.log("New notification received:", data);
        setNotifications((prevNotifications) => {
          const updatedNotifications = [...prevNotifications, data];
          // Save to localStorage
          localStorage.setItem(
            "notifications",
            JSON.stringify(updatedNotifications)
          );
          return updatedNotifications;
        });
      });

      // Clean up the subscription on component unmount
      return () => {
        pusher.unsubscribe(`notifications-${parsedUser.userID}`);
      };
    }
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) return;

      try {
        const response = await axios.get(
          `http://localhost:8081/notifications/${user.userID}`
        );
        const fetchedNotifications = await Promise.all(
          response.data.map(async (notification) => {
            // Fetch the user profile of the actor for each notification
            const userResponse = await axios.get(
              `http://localhost:8081/fetchUser/user/${notification.actorID}`
            );
            const actorData = userResponse.data;

            return {
              ...notification,
              actorUsername: actorData.username,
              actorProfileImage: actorData.profile_image || DefaultProfile, // Fallback to default image
            };
          })
        );
        setNotifications(fetchedNotifications);
        // Save fetched notifications to localStorage
        localStorage.setItem(
          "notifications",
          JSON.stringify(fetchedNotifications)
        );
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (show) {
      fetchNotifications();
    }
  }, [show, user]);

  useEffect(() => {
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
  }, []);

  return (
    <>
      <button className="logo" onClick={handleShow}>
        <i className="bx bxs-bell bx-sm"></i>
      </button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Notifications</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {notifications.length === 0 ? (
            <p>No notifications available.</p>
          ) : (
            notifications.map((notification) => (
              <Link
                key={notification.timestamp} // Assuming unique timestamps
                className="text-decoration-none text-dark"
                to={`/DiaryEntry/${notification.entryID || ""}`}
              >
                <div className="grayHover d-flex align-items-center gap-2 p-2 rounded">
                  <div className="profilePicture">
                    <img
                      src={notification.actorProfileImage}
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <p className="m-0">
                    {notification.actorUsername} {notification.message}
                    <span
                      className="text-secondary"
                      style={{ fontSize: "13px" }}
                    >
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </span>
                  </p>
                </div>
              </Link>
            ))
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvassLayouts;
