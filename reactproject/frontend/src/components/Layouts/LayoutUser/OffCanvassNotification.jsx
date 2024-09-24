import { useState } from "react";
import "../style.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import Notification from "../../../assets/Notification.png";

function OffCanvassLayouts() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        className="logo custom-button d-flex align-items-center justify-content-center"
        onClick={handleShow}
      >
        <img className="icon" src={Notification} alt="Notification Icon" />
      </button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Notifications</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvassLayouts;
