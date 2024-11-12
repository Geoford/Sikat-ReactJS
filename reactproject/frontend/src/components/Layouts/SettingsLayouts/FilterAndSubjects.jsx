import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Button from "react-bootstrap/Button";

const FilterAndSubjects = () => {
  const [filters, setFilters] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [editingFilter, setEditingFilter] = useState(null);
  const [editedFilter, setEditedFilter] = useState("");

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get("http://localhost:8081/filters");
        setFilters(response.data);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchFilters();
  }, []);

  const handleAddFilter = async (e) => {
    e.preventDefault();
    if (newFilter.trim()) {
      try {
        await axios.post("http://localhost:8081/filters", {
          subject: newFilter,
        });
        setFilters([...filters, { subject: newFilter, count: 0 }]);
        setNewFilter("");
      } catch (error) {
        console.error("Error adding filter:", error);
      }
    }
  };

  const handleEditFilter = (subjectID, currrentSubject) => {
    setEditingFilter(subjectID);
    setEditedFilter(currrentSubject);
  };

  const handleSaveEdit = async (subjectID) => {
    if (editedFilter.trim()) {
      try {
        await axios.put(`http://localhost:8081/filterEdit/${subjectID}`, {
          subject: editedFilter,
        });
        setFilters(
          filters.map((filter) =>
            filter.subjectID === subjectID
              ? { ...filter, subject: editedFilter }
              : filter
          )
        );
        setEditingFilter(null);
        alert("Edited Successfully.");
      } catch (error) {
        console.error("Error editing option:", error);
      }
    }
  };

  const handleDeleteFilter = (subjectID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this filter?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8081/filterDelete/${subjectID}`)
        .then(() => {
          setFilters(
            filters.filter((filter) => filter.subjectID !== subjectID)
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
          {filters.map((filter) => (
            <div
              key={filter.subjectID}
              className="d-flex justify-content-between align-items-center border rounded p-3"
            >
              <div className="d-flex gap-2">
                <h5 className="m-0">{filter.subject}</h5>
                <div
                  className="MiniToolTip rounded-circle d-flex justify-content-center position-relative"
                  style={{
                    backgroundColor: "var(--secondary)",
                    width: "1.5rem",
                    height: "1.5rem",
                  }}
                >
                  <p className="m-0 text-light">{filter.count || 0}</p>
                  <span
                    className="tooltip-text p-2 rounded"
                    style={{ fontSize: ".9rem" }}
                  >
                    Number of diaries with this filter
                  </span>
                </div>
              </div>
              <div className="d-flex gap-2">
                {editingFilter === filter.subjectID ? (
                  <>
                    <Form.Control
                      type="text"
                      value={editedFilter}
                      onChange={(e) => setEditedFilter(e.target.value)}
                    />
                    <Button
                      variant="primary"
                      onClick={() => handleSaveEdit(filter.subjectID)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setEditingFilter(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <button
                      className="primaryButton"
                      onClick={() =>
                        handleEditFilter(filter.subjectID, filter.subject)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteFilter(filter.subjectID)}
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
      <form onSubmit={handleAddFilter}>
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
                  value={newFilter}
                  onChange={(e) => setNewFilter(e.target.value)}
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

export default FilterAndSubjects;
