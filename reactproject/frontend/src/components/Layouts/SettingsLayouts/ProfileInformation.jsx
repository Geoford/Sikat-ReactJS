import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";

const ProfileInformation = () => {
  return (
    <div
      className="p-3 rounded shadow-sm"
      style={{
        backgroundColor: "#ffff",
        minHeight: "clamp(20rem, 80vh, 30rem)",
      }}
    >
      <h4 className="border-bottom border-2 pb-2">Profile Information</h4>
      <form action="">
        <div className="row text-start">
          <h5 className="m-0">Display Name and Alias</h5>
          <p className="text-secondary m-0 mb-1" style={{ fontSize: ".9rem" }}>
            Using a full name builds credibility and trust but may expose the
            individual to risks. An alias, however, offers privacy and safety,
            allowing for open sharing without fear of judgment or backlash.
          </p>
          <Row className="mt-1">
            <Col md={9}>
              <InputGroup className="">
                <InputGroup.Text className="py-3">
                  First and Last name
                </InputGroup.Text>
                <Form.Control aria-label="First name" />
                <Form.Control aria-label="Last name" />
              </InputGroup>
            </Col>
            <Col>
              <FloatingLabel controlId="floatingInputGrid" label="Alias">
                <Form.Control type="text" placeholder="Alias" />
              </FloatingLabel>
            </Col>
          </Row>
        </div>
        <div className="row text-start mt-2">
          <h5 className="m-0 mt-2">Profile Details</h5>
          <p className="text-secondary m-0 mb-1" style={{ fontSize: ".9rem" }}>
            Your Username is your unique identifier visible to others on the
            platform. The Bio is a short description where you can share details
            about yourself or your interests.
          </p>
          <Row className="mt-1 gap-2">
            <Col md={12}>
              <FloatingLabel controlId="floatingInputGrid" label="Username">
                <Form.Control type="text" placeholder="Username" />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="floatingTextarea2" label="Bio">
                <Form.Control
                  as="textarea"
                  placeholder="Bio"
                  style={{ height: "120px" }}
                />
              </FloatingLabel>
            </Col>
          </Row>
        </div>
        <div className="mt-4 d-flex justify-content-end">
          <button className="primaryButton px-5 py-2">Save</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInformation;
