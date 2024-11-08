import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";

const ReportingUsers = () => {
  return (
    <div
      className="p-3 rounded shadow-sm"
      style={{
        backgroundColor: "#ffff",
        minHeight: "clamp(20rem, 80vh, 30rem)",
      }}
    >
      <h4 className="border-bottom border-2 pb-2">Filter and Subjects</h4>
      <div className=" text-start mt-3 pe-2">
        <p className="text-secondary m-0 mb-1" style={{ fontSize: ".9rem" }}>
          Filtering diaries allows users to control the content they see,
          helping them focus only on what they want and avoiding potential
          triggers.
        </p>
        <div
          className="d-flex flex-column gap-2 pe-2 custom-scrollbar"
          style={{
            overflowY: "scroll",
            height: "15rem",
          }}
        >
          <div className="d-flex justify-content-between align-items-center border rounded p-3">
            <div className="d-flex gap-2">
              <h5 className="m-0">SampleFilter</h5>
              <div
                className="MiniToolTip rounded-circle d-flex justify-content-center position-relative"
                style={{
                  backgroundColor: "var(--secondary)",
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              >
                <p className="m-0 text-light">0</p>
                <span
                  className="tooltip-text p-2 rounded"
                  style={{ fontSize: ".9rem" }}
                >
                  Number of diary with this filter
                </span>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button className="primaryButton">Edit</button>
              <button className="btn btn-danger">Remove</button>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center border rounded p-3">
            <div className="d-flex gap-2">
              <h5 className="m-0">SampleFilter</h5>
              <div
                className="MiniToolTip rounded-circle d-flex justify-content-center position-relative"
                style={{
                  backgroundColor: "var(--secondary)",
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              >
                <p className="m-0 text-light">0</p>
                <span
                  className="tooltip-text p-2 rounded"
                  style={{ fontSize: ".9rem" }}
                >
                  Number of diary with this filter
                </span>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button className="primaryButton">Edit</button>
              <button className="btn btn-danger">Remove</button>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center border rounded p-3">
            <div className="d-flex gap-2">
              <h5 className="m-0">SampleFilter</h5>
              <div
                className="MiniToolTip rounded-circle d-flex justify-content-center position-relative"
                style={{
                  backgroundColor: "var(--secondary)",
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              >
                <p className="m-0 text-light">0</p>
                <span
                  className="tooltip-text p-2 rounded"
                  style={{ fontSize: ".9rem" }}
                >
                  Number of diary with this filter
                </span>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button className="primaryButton">Edit</button>
              <button className="btn btn-danger">Remove</button>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center border rounded p-3">
            <div className="d-flex gap-2">
              <h5 className="m-0">SampleFilter</h5>
              <div
                className="MiniToolTip rounded-circle d-flex justify-content-center position-relative"
                style={{
                  backgroundColor: "var(--secondary)",
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              >
                <p className="m-0 text-light">0</p>
                <span
                  className="tooltip-text p-2 rounded"
                  style={{ fontSize: ".9rem" }}
                >
                  Number of diary with this filter
                </span>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button className="primaryButton">Edit</button>
              <button className="btn btn-danger">Remove</button>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center border rounded p-3">
            <div className="d-flex gap-2">
              <h5 className="m-0">SampleFilter</h5>
              <div
                className="MiniToolTip rounded-circle d-flex justify-content-center position-relative"
                style={{
                  backgroundColor: "var(--secondary)",
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              >
                <p className="m-0 text-light">0</p>
                <span
                  className="tooltip-text p-2 rounded"
                  style={{ fontSize: ".9rem" }}
                >
                  Number of diary with this filter
                </span>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button className="primaryButton">Edit</button>
              <button className="btn btn-danger">Remove</button>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center border rounded p-3">
            <div className="d-flex gap-2">
              <h5 className="m-0">SampleFilter</h5>
              <div
                className="MiniToolTip rounded-circle d-flex justify-content-center position-relative"
                style={{
                  backgroundColor: "var(--secondary)",
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              >
                <p className="m-0 text-light">0</p>
                <span
                  className="tooltip-text p-2 rounded"
                  style={{ fontSize: ".9rem" }}
                >
                  Number of diary with this filter
                </span>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button className="primaryButton">Edit</button>
              <button className="btn btn-danger">Remove</button>
            </div>
          </div>
        </div>
      </div>
      <form action="">
        <div className="row text-start mt-2">
          <h5 className="m-0 mt-2">Add Filter</h5>
          <p className="text-secondary m-0 mb-1" style={{ fontSize: ".9rem" }}>
            Adding filters gives users a variety of options to categorize or
            group their diaries, helping them to organize more effectively and
            find entries with ease.
          </p>
          <Row className="mt-1 pe-0 gap-2">
            <Col md={12} className="pe-0">
              <FloatingLabel controlId="floatingInputGrid" label="New Filter">
                <Form.Control type="text" placeholder="New Filter" />
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

export default ReportingUsers;
