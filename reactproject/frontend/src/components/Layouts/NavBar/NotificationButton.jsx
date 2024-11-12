import { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import axios from "axios";
import Pusher from "pusher-js";
import DefaultProfile from "../../../../src/assets/userDefaultProfile.png";

function NotificationButton() {
  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [user, setUser] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      const pusher = new Pusher("4810211a14a19b86f640", {
        cluster: "ap1",
      });

      const channel = pusher.subscribe(`notifications-${parsedUser.userID}`);

      channel.bind("new-notification", (data) => {
        console.log("New notification received:", data);
        setNotifications((prevNotifications) => {
          const updatedNotifications = [...prevNotifications, data];
          localStorage.setItem(
            "notifications",
            JSON.stringify(updatedNotifications)
          );
          setUnreadCount((prevCount) => prevCount + 1);
          return updatedNotifications;
        });
      });

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
          `http://localhost:8081/getnotifications/${user.userID}`
        );

        const fetchedNotifications = response.data.map((notification) => ({
          ...notification,
          actorProfileImage: notification.actorProfileImage
            ? `http://localhost:8081${notification.actorProfileImage}`
            : DefaultProfile,
        }));

        setNotifications(fetchedNotifications);

        const unread = fetchedNotifications.filter(
          (notification) => !notification.read
        ).length;
        setUnreadCount(unread);
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
      const parsedNotifications = JSON.parse(storedNotifications);
      setNotifications(parsedNotifications);

      const unread = parsedNotifications.filter(
        (notification) => !notification.read
      ).length;
      setUnreadCount(unread);
    }
  }, []);

  useEffect(() => {
    if (show && notifications.length > 0) {
      const updatedNotifications = notifications.map((notification) => ({
        ...notification,
        read: true,
      }));
      setNotifications(updatedNotifications);
      setUnreadCount(0);

      localStorage.setItem(
        "notifications",
        JSON.stringify(updatedNotifications)
      );

      axios
        .post("http://localhost:8081/notifications/mark-as-read", {
          userID: user.userID,
        })
        .catch((error) =>
          console.error("Error marking notifications as read:", error)
        );
    }
  }, [show]);

  const markAsReadAndNavigate = (notificationID) => {
    if (!user) return;

    // Mark the notification as read
    axios
      .post("http://localhost:8081/notifications/mark-as-read", {
        userID: user.userID,
        notificationID,
      })
      .catch((error) =>
        console.error("Error marking notification as read:", error)
      );

    // Navigate to the appropriate page
    if (notificationID) {
      // Navigate depending on the notification type
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <>
      <button
        className="logo overflow-visible position-relative d-flex align-items-center justify-content-center"
        onClick={handleShow}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <i
          className={isHovered ? "bx bxs-bell-ring bx-sm" : "bx bxs-bell bx-sm"}
        ></i>

        <div
          className="position-absolute p-0 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "red",
            top: "0",
            left: "-10px",
            height: "20px",
            width: "20px",
            borderRadius: "50%",
            color: "#ffff",
            border: "2px solid var(--primary)",
          }}
        >
          <p className="m-0" style={{ fontSize: "10px" }}>
            {unreadCount}
          </p>
        </div>
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
                key={notification.timestamp}
                className="text-decoration-none text-dark"
                to={
                  notification.type === "follow"
                    ? `/profile/${notification.actorID}`
                    : `/DiaryEntry/${notification.entryID || ""}`
                }
                onClick={() =>
                  markAsReadAndNavigate(notification.notificationID)
                }
              >
                <div className="row grayHover d-flex align-items-center gap-2 p-2 rounded my-1">
                  <div className="col-1 p-0">
                    <div className="profilePicture">
                      <img
                        src={
                          notification.actorProfileImage
                            ? notification.actorProfileImage
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
                  </div>
                  <p className="col m-0 ms-3">
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

export default NotificationButton;
