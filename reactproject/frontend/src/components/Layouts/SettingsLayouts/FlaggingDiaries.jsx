import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Button from "react-bootstrap/Button";

const FlaggingDiaries = () => {
  const [flaggingOptions, setFlaggingOptions] = useState([]);
  const [newOption, setNewOption] = useState("");
  const [editingOption, setEditingOption] = useState(null);
  const [editedReason, setEditedReason] = useState(""); // State for edited reason

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/flaggingOptions"
        );
        setFlaggingOptions(response.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, []);

  const handleAddOption = async (e) => {
    e.preventDefault();
    if (newOption.trim()) {
      try {
        await axios.post("http://localhost:8081/flaggingOptions", {
          option: newOption,
        });
        setFlaggingOptions([...flaggingOptions, { reason: newOption }]);
        setNewOption("");
      } catch (error) {
        console.error("Error adding option:", error);
      }
    }
  };

  const handleEditOption = (flagID, currentReason) => {
    setEditingOption(flagID);
    setEditedReason(currentReason); // Set the current reason for editing
  };

  const handleSaveEdit = async (flagID) => {
    if (editedReason.trim()) {
      try {
        await axios.put(`http://localhost:8081/flaggingEdit/${flagID}`, {
          reason: editedReason,
        });
        setFlaggingOptions(
          flaggingOptions.map((option) =>
            option.flagID === flagID
              ? { ...option, reason: editedReason }
              : option
          )
        );
        setEditingOption(null); // Reset the editing state after saving
      } catch (error) {
        console.error("Error editing option:", error);
      }
    }
  };

  const handleDeleteOption = (flagID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this option?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8081/flaggingDelete/${flagID}`)
        .then(() => {
          setFlaggingOptions(
            flaggingOptions.filter((option) => option.flagID !== flagID)
          );
        })
        .catch((error) => {
          console.error("Error deleting option:", error);
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
      <h4 className="border-bottom border-2 pb-2">Flagging Diaries</h4>
      <div className="text-start mt-3 pe-2">
        <p className="text-secondary m-0 mb-1" style={{ fontSize: ".9rem" }}>
          Filtering diaries allows users to control the content they see,
          helping them focus only on what they want and avoiding potential
          triggers.
        </p>
        <div
          className="d-flex flex-column gap-2 pe-2 custom-scrollbar"
          style={{ overflowY: "scroll", height: "15rem" }}
        >
          {flaggingOptions.map((option) => (
            <div
              key={option.flagID}
              className="d-flex justify-content-between align-items-center border rounded p-3"
            >
              <div className="d-flex gap-2">
                <h5 className="m-0">{option.reason}</h5>
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
                    Number of diaries flagged with this reason
                  </span>
                </div>
              </div>
              <div className="d-flex gap-2">
                {editingOption === option.flagID ? (
                  <>
                    <Form.Control
                      type="text"
                      value={editedReason}
                      onChange={(e) => setEditedReason(e.target.value)}
                    />
                    <Button
                      variant="primary"
                      onClick={() => handleSaveEdit(option.flagID)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setEditingOption(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <button
                      className="primaryButton"
                      onClick={() =>
                        handleEditOption(option.flagID, option.reason)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteOption(option.flagID)}
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
      <form onSubmit={handleAddOption}>
        <div className="row text-start mt-2">
          <h5 className="m-0 mt-2">Add Flagging Option</h5>
          <p className="text-secondary m-0 mb-1" style={{ fontSize: ".9rem" }}>
            Adding filters gives users a variety of options to categorize or
            group their diaries, helping them to organize more effectively and
            find entries with ease.
          </p>
          <Row className="mt-1 pe-0 gap-2">
            <Col md={12} className="pe-0">
              <FloatingLabel controlId="floatingInputGrid" label="New Option">
                <Form.Control
                  type="text"
                  placeholder="New Filter"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
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

export default FlaggingDiaries;
