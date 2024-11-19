import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";

const ReportingComments = () => {
  const [reportComments, setReportComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newReportComments, setNewReportComments] = useState("");
  const [editingReportComments, setEditingReportComments] = useState(null);
  const [editedReportComments, setEditedReportComments] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchReportComments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/reportComments"
        );
        setReportComments(response.data);
        setFilteredComments(response.data);
      } catch (error) {
        console.error("Error fetching Comment reports:", error);
      }
    };
    fetchReportComments();
  }, []);

  const handleAddReportComments = async (e) => {
    e.preventDefault();
    if (newReportComments.trim()) {
      try {
        await axios.post("http://localhost:8081/reportComments", {
          reason: newReportComments,
        });
        const newComment = { reason: newReportComments, count: 0 };
        setReportComments([...reportComments, newComment]);
        setFilteredComments([...reportComments, newComment]);
        setNewReportComments("");
      } catch (error) {
        console.error("Error adding comment report:", error);
      }
    }
  };

  const handleEditReportComments = (reportCommentID, currentReportComments) => {
    setEditingReportComments(reportCommentID);
    setEditedReportComments(currentReportComments);
  };

  const handleSaveEdit = async (reportCommentID) => {
    if (editedReportComments.trim()) {
      try {
        await axios.put(
          `http://localhost:8081/reportCommentEdit/${reportCommentID}`,
          { reason: editedReportComments }
        );
        const updatedComments = reportComments.map((comment) =>
          comment.reportCommentID === reportCommentID
            ? { ...comment, reason: editedReportComments }
            : comment
        );
        setReportComments(updatedComments);
        setFilteredComments(updatedComments);
        setEditingReportComments(null);
        alert("Edited Successfully.");
      } catch (error) {
        console.error("Error editing reports:", error);
      }
    }
  };

  const handleDeleteReportComment = async (reportCommentID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report comment?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:8081/reportCommentDelete/${reportCommentID}`
        );
        const updatedComments = reportComments.filter(
          (comment) => comment.reportCommentID !== reportCommentID
        );
        setReportComments(updatedComments);
        setFilteredComments(updatedComments);
        alert("Successfully deleted.");
      } catch (error) {
        console.error("Error deleting report comment:", error);
      }
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = reportComments.filter((comment) =>
      comment.reason.toLowerCase().includes(term)
    );
    setFilteredComments(filtered);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredComments.length / itemsPerPage);
  const currentItems = filteredComments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-3 rounded shadow-sm" style={{ backgroundColor: "#ffff" }}>
      <h4 className="border-bottom border-2 pb-2">Report Comments</h4>

      {/* Search Filter */}
      <div className="my-3">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <i class="bx bx-search"></i>
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search by reason..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
      </div>

      {/* Table */}
      <div className="overflow-y-scroll" style={{ height: "30vh" }}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="w-25">Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((comment) => (
              <tr key={comment.reportCommentID}>
                <td>
                  {editingReportComments === comment.reportCommentID ? (
                    <Form.Control
                      className="bg-transparent text-center border-0 border-bottom border-2"
                      type="text"
                      value={editedReportComments}
                      onChange={(e) => setEditedReportComments(e.target.value)}
                    />
                  ) : (
                    <p className="m-0 mt-2">{comment.reason}</p>
                  )}
                </td>
                <td className="d-flex justify-content-center gap-1">
                  {editingReportComments === comment.reportCommentID ? (
                    <>
                      <Button
                        className="px-3"
                        variant="primary"
                        onClick={() => handleSaveEdit(comment.reportCommentID)}
                      >
                        Save
                      </Button>
                      <Button
                        className="px-3"
                        variant="secondary"
                        onClick={() => setEditingReportComments(null)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <button
                        className="primaryButton"
                        onClick={() =>
                          handleEditReportComments(
                            comment.reportCommentID,
                            comment.reason
                          )
                        }
                      >
                        Edit
                      </button>{" "}
                      <Button
                        variant="danger"
                        onClick={() =>
                          handleDeleteReportComment(comment.reportCommentID)
                        }
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

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

      {/* Add New Comment */}
      <form onSubmit={handleAddReportComments}>
        <h5 className="mt-4">Add Comment Violation</h5>

        <FloatingLabel
          controlId="floatingInputGrid"
          label="New Comment Violation"
        >
          <Form.Control
            type="text"
            placeholder="New Comment Violation"
            value={newReportComments}
            onChange={(e) => setNewReportComments(e.target.value)}
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

export default ReportingComments;
