import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";

const FlaggingDiaries = () => {
  const [flaggingOptions, setFlaggingOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newOption, setNewOption] = useState("");
  const [editingOption, setEditingOption] = useState(null);
  const [editedReason, setEditedReason] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/flaggingOptions"
        );
        setFlaggingOptions(response.data);
        setFilteredOptions(response.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = flaggingOptions.filter((option) =>
      option.reason.toLowerCase().includes(term)
    );
    setFilteredOptions(filtered);
    setCurrentPage(1); // Reset to the first page on a new search
  };

  const handleAddOption = async (e) => {
    e.preventDefault();
    if (newOption.trim()) {
      try {
        await axios.post("http://localhost:8081/flaggingOptions", {
          option: newOption,
        });
        const newFlag = { reason: newOption, flagID: Date.now(), count: 0 };
        setFlaggingOptions([...flaggingOptions, newFlag]);
        setFilteredOptions([...flaggingOptions, newFlag]);
        setNewOption("");
      } catch (error) {
        console.error("Error adding option:", error);
      }
    }
  };

  const handleEditOption = (flagID, currentReason) => {
    setEditingOption(flagID);
    setEditedReason(currentReason);
  };

  const handleSaveEdit = async (flagID) => {
    if (editedReason.trim()) {
      try {
        await axios.put(`http://localhost:8081/flaggingEdit/${flagID}`, {
          reason: editedReason,
        });
        const updatedOptions = flaggingOptions.map((option) =>
          option.flagID === flagID
            ? { ...option, reason: editedReason }
            : option
        );
        setFlaggingOptions(updatedOptions);
        setFilteredOptions(updatedOptions);
        setEditingOption(null);
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
          const updatedOptions = flaggingOptions.filter(
            (option) => option.flagID !== flagID
          );
          setFlaggingOptions(updatedOptions);
          setFilteredOptions(updatedOptions);
        })
        .catch((error) => {
          console.error("Error deleting option:", error);
        });
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredOptions.length / itemsPerPage);
  const currentItems = filteredOptions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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

      {/* Search Filter */}
      <div className="my-3">
        <Form.Control
          type="text"
          placeholder="Search flagging options..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Table */}
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Flagging Reason</th>
            <th>Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((option) => (
            <tr key={option.flagID}>
              <td>
                {editingOption === option.flagID ? (
                  <Form.Control
                    type="text"
                    value={editedReason}
                    onChange={(e) => setEditedReason(e.target.value)}
                  />
                ) : (
                  option.reason
                )}
              </td>
              <td>{option.count}</td>
              <td>
                {editingOption === option.flagID ? (
                  <>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleSaveEdit(option.flagID)}
                    >
                      Save
                    </Button>{" "}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditingOption(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <button
                      className="primaryButton"
                      size="sm"
                      onClick={() =>
                        handleEditOption(option.flagID, option.reason)
                      }
                    >
                      Edit
                    </button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteOption(option.flagID)}
                    >
                      Remove
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination className="mt-3 justify-content-center">
        {[...Array(totalPages).keys()].map((page) => (
          <Pagination.Item
            key={page + 1}
            active={page + 1 === currentPage}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Add New Option */}
      <form onSubmit={handleAddOption}>
        <h5 className="mt-4">Add Flagging Option</h5>
        <FloatingLabel controlId="floatingInputGrid" label="New Option">
          <Form.Control
            type="text"
            placeholder="New Flagging Option"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
          />
        </FloatingLabel>
        <div className="mt-3 d-flex justify-content-end">
          <button type="submit" className="primaryButton px-5 py-2">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlaggingDiaries;
