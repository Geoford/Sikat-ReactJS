import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Notification from "../../../assets/Notification.png";
import { Link, useNavigate } from "react-router-dom";
import DefaultProfile from "../../../../src/assets/userDefaultProfile.png";

function OffCanvassLayouts() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            0
          </p>
        </div>
      </button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header className="border-bottom" closeButton>
          <Offcanvas.Title className="d-flex align-items-center gap-2">
            <h3 className="m-0">Notifications</h3>
            <div
              className=" p-0 d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "red",
                top: "0",
                left: "-10px",
                height: "30px",
                width: "30px",
                borderRadius: "50%",
                color: "#ffff",
              }}
            >
              <p className="m-0" style={{ fontSize: "15px" }}>
                0
              </p>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0 px-1 pt-1">
          <Link className="text-decoration-none text-dark" to="/DiaryEntry">
            <div
              className="grayHover d-flex align-items-center gap-2 p-2 rounded"
              style={{ backgroundColor: "white" }}
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
              UserName and 00 others gadified your diary.{" "}
              <span className="text-secondary" style={{ fontSize: "13px" }}>
                0 hours ago.
              </span>
            </div>
          </Link>
          <Link className="text-decoration-none text-dark" to="/DiaryEntry">
            <div
              className="grayHover d-flex align-items-center gap-2 p-2 rounded"
              style={{ backgroundColor: "white" }}
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
              UserName and 00 others commented on your diary.{" "}
              <span className="text-secondary" style={{ fontSize: "13px" }}>
                0 hours ago.
              </span>
            </div>
          </Link>
          <Link className="text-decoration-none text-dark" to="/DiaryEntry">
            <div
              className="grayHover d-flex align-items-center gap-2 p-2 rounded"
              style={{ backgroundColor: "white" }}
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
              UserName and 00 others flagged your diary.{" "}
              <span className="text-secondary" style={{ fontSize: "13px" }}>
                0 hours ago.
              </span>
            </div>
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvassLayouts;
