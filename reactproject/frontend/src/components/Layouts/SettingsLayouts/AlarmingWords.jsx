import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";

const AlarmingWords = () => {
  const [alarmingWords, setAlarmingWords] = useState([]);
  const [filteredAlarmingWords, setFilteredAlarmingWords] = useState([]);
  const [newAlarmingWord, setNewAlarmingWord] = useState("");
  const [editingWordID, setEditingWordID] = useState(null);
  const [editedAlarmingWord, setEditedAlarmingWord] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAlarmingWords = async () => {
      try {
        const response = await axios.get("http://localhost:8081/alarmingWords");
        setAlarmingWords(response.data);
        setFilteredAlarmingWords(response.data);
      } catch (error) {
        console.error("Error fetching alarming words:", error);
      }
    };
    fetchAlarmingWords();
  }, []);

  const handleAddAlarmingWord = async (e) => {
    e.preventDefault();
    if (newAlarmingWord.trim()) {
      try {
        const response = await axios.post(
          "http://localhost:8081/alarmingWords",
          { alarmingWord: newAlarmingWord.trim() }
        );
        setAlarmingWords([...alarmingWords, response.data]);
        setFilteredAlarmingWords([...filteredAlarmingWords, response.data]);
        setNewAlarmingWord("");
      } catch (error) {
        console.error("Error adding alarming word:", error);
      }
    }
  };

  const handleEditAlarmingWord = (wordID, currentWord) => {
    setEditingWordID(wordID);
    setEditedAlarmingWord(currentWord);
  };

  const handleSaveEdit = async (wordID) => {
    if (editedAlarmingWord.trim()) {
      try {
        await axios.put(`http://localhost:8081/alarmingWordEdit/${wordID}`, {
          alarmingWord: editedAlarmingWord,
        });
        const updatedWords = alarmingWords.map((word) =>
          word.wordID === wordID
            ? { ...word, alarmingWord: editedAlarmingWord }
            : word
        );
        setAlarmingWords(updatedWords);
        setFilteredAlarmingWords(updatedWords);
        setEditingWordID(null);
        alert("Edited Successfully.");
      } catch (error) {
        console.error("Error editing alarming word:", error);
      }
    }
  };

  const handleDeleteAlarmingWord = async (wordID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this alarming word?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:8081/alarmingWordDelete/${wordID}`
        );
        const updatedWords = alarmingWords.filter(
          (word) => word.wordID !== wordID
        );
        setAlarmingWords(updatedWords);
        setFilteredAlarmingWords(updatedWords);
        alert("Successfully deleted.");
      } catch (error) {
        console.error("Error deleting alarming word:", error);
      }
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = alarmingWords.filter((word) =>
      word.alarmingWord.toLowerCase().includes(query)
    );
    setFilteredAlarmingWords(filtered);
    setCurrentPage(1);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredAlarmingWords.length / itemsPerPage);
  const currentItems = filteredAlarmingWords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className="p-3 rounded shadow-sm"
      style={{
        backgroundColor: "#ffff",
        minHeight: "clamp(20rem, 80vh, 30rem)",
      }}
    >
      <div className="position-relative border-bottom d-flex justify-content-center align-items-center pb-2 gap-1">
        <h4 className="border-2 m-0">Alarming Words</h4>
        <div className="informationToolTip">
          <h5 className="m-0 d-flex align-items-center justify-content-center">
            <i className="bx bx-info-circle"></i>
          </h5>
          <p className="infToolTip rounded p-2 m-0">
            Alarming words are predefined terms used to automatically detect
            potentially concerning diary entries and alert admins for prompt
            action.
          </p>
        </div>
      </div>

      {/* Search Filter */}
      <div className="my-3">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <i className="bx bx-search"></i>
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search Alarming Words..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </InputGroup>
      </div>

      <div
        className="overflow-y-scroll custom-scrollbar"
        style={{ height: "30vh" }}
      >
        {filteredAlarmingWords.length === 0 ? (
          <div className="text-center my-4">
            <p className="text-muted">No alarming words found.</p>
          </div>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className="w-50">
                  <h5 className="m-0">Word</h5>
                </th>
                <th>
                  <h5 className="m-0">Actions</h5>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((word) => (
                <tr key={word.wordID}>
                  <td className="">
                    {editingWordID === word.wordID ? (
                      <Form.Control
                        className="bg-transparent text-center border-0 border-bottom border-2"
                        type="text"
                        value={editedAlarmingWord}
                        onChange={(e) => setEditedAlarmingWord(e.target.value)}
                      />
                    ) : (
                      <p className="m-0 mt-2">{word.alarmingWord}</p>
                    )}
                  </td>
                  <td>
                    {editingWordID === word.wordID ? (
                      <div className="d-flex justify-content-evenly ">
                        <Button
                          variant="success"
                          onClick={() => handleSaveEdit(word.wordID)}
                        >
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setEditingWordID(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center gap-1">
                        <button
                          className="primaryButton"
                          onClick={() =>
                            handleEditAlarmingWord(
                              word.wordID,
                              word.alarmingWord
                            )
                          }
                        >
                          Edit
                        </button>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteAlarmingWord(word.wordID)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-3">
        <Pagination className="justify-content-center">
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              <p className="m-0">{index + 1}</p>{" "}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      {/* Add New Alarming Word */}
      <div className="d-flex flex-column gap-2 mt-4">
        <h5>Add New Alarming Word</h5>

        <FloatingLabel
          controlId="floatingInput"
          label="Add New Alarming Word"
          className=""
        >
          <Form.Control
            type="text"
            placeholder="Enter alarming word"
            value={newAlarmingWord}
            onChange={(e) => setNewAlarmingWord(e.target.value)}
          />
        </FloatingLabel>
        <button
          className="w-100 primaryButton px-5 py-2"
          onClick={handleAddAlarmingWord}
        >
          <p className="m-0">Save</p>
        </button>
      </div>
    </div>
  );
};

export default AlarmingWords;
