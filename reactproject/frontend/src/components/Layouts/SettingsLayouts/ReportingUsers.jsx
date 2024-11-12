import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Button from "react-bootstrap/Button";

const ReportingUsers = () => {
  const [reportUsers, setReportUsers] = useState([]);
  const [newReportUsers, setNewReportUsers] = useState("");
  const [editingReportUsers, setEditingReportUsers] = useState(null);
  const [editedReportUsers, setEditedReportUsers] = useState("");

  useEffect(() => {
    const fetchReportUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/reportUsers");
        setReportUsers(response.data);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchReportUsers();
  }, []);

  const handleAddReportUsers = async (e) => {
    e.preventDefault();
    if (newReportUsers.trim()) {
      try {
        await axios.post("http://localhost:8081/reportUsers", {
          reason: newReportUsers,
        });
        setReportUsers([...reportUsers, { reason: newReportUsers, count: 0 }]);
        setNewReportUsers("");
      } catch (error) {
        console.error("Error adding filter:", error);
      }
    }
  };

  const handleEditReportUsers = (reportingUserID, currrentReportUsers) => {
    setEditingReportUsers(reportingUserID);
    setEditedReportUsers(currrentReportUsers);
  };

  const handleSaveEdit = async (reportingUserID) => {
    if (editedReportUsers.trim()) {
      try {
        await axios.put(
          `http://localhost:8081/reportUsers/${reportingUserID}`,
          {
            reason: editedReportUsers,
          }
        );
        setReportUsers(
          reportUsers.map((reportUser) =>
            reportUser.reportingUserID === reportingUserID
              ? { ...reportUser, reason: editedReportUsers }
              : reportUser
          )
        );
        setEditingReportUsers(null);
        alert("Edited Successfully.");
      } catch (error) {
        console.error("Error editing option:", error);
      }
    }
  };

  const handleDeleteReportUser = (reportingUserID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this filter?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8081/reportUsers/${reportingUserID}`)
        .then(() => {
          setReportUsers(
            reportUsers.filter(
              (reportUser) => reportUser.reportingUserID !== reportingUserID
            )
          );
          alert("Successfully deleted.");
        })
        .catch((error) => {
          console.error("Error deleting filter:", error);
        });
    }
  };

  return (
    <div
      className="p-3 rounded shadow-sm"
      style={{
        backgroundColor: "#ffff",
        minHeight: "clamp(20rem, 80vh, 30rem)",
      }}
    >
      <h4 className="border-bottom border-2 pb-2">Filter and Subjects</h4>
      <div className="text-start mt-3 pe-2">
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
          {reportUsers.map((reportUser) => (
            <div
              key={reportUser.reportingUserID}
              className="d-flex justify-content-between align-items-center border rounded p-3"
            >
              <div className="d-flex gap-2">
                <h5 className="m-0">{reportUser.reason}</h5>
                <div
                  className="MiniToolTip rounded-circle d-flex justify-content-center position-relative"
                  style={{
                    backgroundColor: "var(--secondary)",
                    width: "1.5rem",
                    height: "1.5rem",
                  }}
                >
                  <p className="m-0 text-light">{reportUser.count || 0}</p>
                  <span
                    className="tooltip-text p-2 rounded"
                    style={{ fontSize: ".9rem" }}
                  >
                    Number of diaries with this filter
                  </span>
                </div>
              </div>
              <div className="d-flex gap-2">
                {editingReportUsers === reportUser.reportingUserID ? (
                  <>
                    <Form.Control
                      type="text"
                      value={editedReportUsers}
                      onChange={(e) => setEditedReportUsers(e.target.value)}
                    />
                    <Button
                      variant="primary"
                      onClick={() => handleSaveEdit(reportUser.reportingUserID)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setEditingReportUsers(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <button
                      className="primaryButton"
                      onClick={() =>
                        handleEditReportUsers(
                          reportUser.reportingUserID,
                          reportUser.reason
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleDeleteReportUser(reportUser.reportingUserID)
                      }
                    >
                      Remove
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleAddReportUsers}>
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
                <Form.Control
                  type="text"
                  placeholder="New Filter"
                  value={newReportUsers}
                  onChange={(e) => setNewReportUsers(e.target.value)}
                />
              </FloatingLabel>
            </Col>
          </Row>
        </div>
        <div className="mt-4 d-flex justify-content-end">
          <button type="submit" className="primaryButton px-5 py-2">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportingUsers;
