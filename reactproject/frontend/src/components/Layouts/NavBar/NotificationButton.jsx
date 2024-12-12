import { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Toast from "react-bootstrap/Toast";
import { Link } from "react-router-dom";
import axios from "axios";
import Pusher from "pusher-js";
import DefaultProfile from "../../../../src/assets/userDefaultProfile.png";

function NotificationButton() {
  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [user, setUser] = useState(null);
  const [toasts, setToasts] = useState([]);

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

        // Add toasts for new notifications
        const newToast = { ...data, id: Date.now(), visible: true };

        setToasts((prevToasts) => [...prevToasts, newToast]);

        // Set a timeout to hide the toast after 5 seconds
        setTimeout(() => {
          setToasts((prevToasts) =>
            prevToasts.map((toast) =>
              toast.id === newToast.id ? { ...toast, visible: false } : toast
            )
          );
        }, 5000);
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
        .put("http://localhost:8081/notifications/mark-as-read", {
          userID: user.userID,
          notificationIDs: notifications.map((n) => n.notificationID),
        })
        .catch((error) =>
          console.error("Error marking notifications as read:", error)
        );
    }
  }, [show]);

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
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  return (
    <>
      <button
        className="logo overflow-visible position-relative d-flex align-items-center justify-content-center"
        onClick={handleShow}
      >
        <i className="bx bxs-bell bx-sm"></i>
        {unreadCount > 0 && (
          <div
            className="position-absolute p-0 d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "red",
              top: "0",
              left: "clamp(-7px, 2.5dvw, -10px)",
              height: "clamp(.95rem, 2.5dvw, 1.2rem)",
              width: "clamp(.95rem, 2.5dvw, 1.2rem)",
              borderRadius: "50%",
              color: "#ffff",
              border: "2px solid var(--primary)",
            }}
          >
            <h6
              className="m-0 p-0 fw-lighter d-none d-lg-block"
              style={{ fontSize: "clamp(.5rem, 1.5dvw, .8rem)" }}
            >
              {unreadCount}
            </h6>
          </div>
        )}
      </button>

      {/* Toasts for new notifications */}
      <div
        style={{ position: "fixed", bottom: "1rem", left: "1rem" }}
        className="toast-container"
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            onClose={() =>
              setToasts((prevToasts) =>
                prevToasts.filter((t) => t.id !== toast.id)
              )
            }
            show={toast.visible}
            delay={5000}
            autohide
          >
            <Toast.Header>
              <div className="w-100 d-flex justify-content-between align-items-end">
                <p className="m-0 fw-bold">New Notification</p>
                <p className="m-0">
                  <span style={{ fontSize: "clamp(0.6rem, 1.5dvw, 0.7rem)" }}>
                    {formatDate(toast.timestamp)}
                  </span>
                </p>
              </div>
            </Toast.Header>
            <Toast.Body>{toast.message}</Toast.Body>
          </Toast>
        ))}
      </div>

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
              >
                <div
                  className="row grayHover d-flex align-items-center gap-2 p-2 rounded my-1"
                  style={{
                    backgroundColor: notification.read ? "white" : "",
                  }}
                >
                  <div className="col-1 p-0">
                    <div className="profilePicture">
                      <img
                        src={notification.actorProfileImage || DefaultProfile}
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
                      {" "}
                      {formatDate(notification.timestamp)}
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
