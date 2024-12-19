import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";
import sampleImage from "../../../assets/Background.jpg";
import { Dropdown } from "react-bootstrap";

const IndexImage = () => {
  const [reportUsers, setReportUsers] = useState([]);
  const [filteredReportUsers, setFilteredReportUsers] = useState([]);
  const [newReportUsers, setNewReportUsers] = useState("");
  const [editingReportUsers, setEditingReportUsers] = useState(null);
  const [editedReportUsers, setEditedReportUsers] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editImages, setEditImages] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchReportUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/reportUsers");
        setReportUsers(response.data);
        setFilteredReportUsers(response.data);
      } catch (error) {
        console.error("Error fetching report users:", error);
      }
    };
    fetchReportUsers();
  }, []);

  const handleAddReportUsers = async (e) => {
    e.preventDefault();
    if (newReportUsers.trim()) {
      try {
        const newUser = { reason: newReportUsers, count: 0 };
        await axios.post("http://localhost:8081/reportUsers", newUser);
        setReportUsers([...reportUsers, newUser]);
        setFilteredReportUsers([...filteredReportUsers, newUser]);
        setNewReportUsers("");
      } catch (error) {
        console.error("Error adding report user:", error);
      }
    }
  };

  const handleEditReportUsers = (reportingUserID, currentReportUsers) => {
    setEditingReportUsers(reportingUserID);
    setEditedReportUsers(currentReportUsers);
  };

  const handleSaveEdit = async (reportingUserID) => {
    if (editedReportUsers.trim()) {
      try {
        await axios.put(
          `http://localhost:8081/reportUsers/${reportingUserID}`,
          { reason: editedReportUsers }
        );
        const updatedUsers = reportUsers.map((user) =>
          user.reportingUserID === reportingUserID
            ? { ...user, reason: editedReportUsers }
            : user
        );
        setReportUsers(updatedUsers);
        setFilteredReportUsers(updatedUsers);
        setEditingReportUsers(null);
        alert("Edited Successfully.");
      } catch (error) {
        console.error("Error editing report user:", error);
      }
    }
  };

  const handleDeleteReportUser = async (reportingUserID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report user?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:8081/reportUsers/${reportingUserID}`
        );
        const updatedUsers = reportUsers.filter(
          (user) => user.reportingUserID !== reportingUserID
        );
        setReportUsers(updatedUsers);
        setFilteredReportUsers(updatedUsers);
        alert("Successfully deleted.");
      } catch (error) {
        console.error("Error deleting report user:", error);
      }
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = reportUsers.filter((user) =>
      user.reason.toLowerCase().includes(query)
    );
    setFilteredReportUsers(filtered);
    setCurrentPage(1); // Reset to first page
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredReportUsers.length / itemsPerPage);
  const currentItems = filteredReportUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditImage = () => {
    setEditImages(true);
  };
  const handleCancelEditImage = () => {
    setEditImages(false);
  };

  return (
    <div className="p-3 rounded shadow-sm" style={{ backgroundColor: "#fff" }}>
      <div className=" position-relative border-bottom d-flex justify-content-center align-items-end pb-2 gap-1">
        <h4 className="border-2 m-0">Index Page Images</h4>
        <div className="informationToolTip">
          <i class="bx bx-info-circle"></i>
          <p className="infToolTip rounded p-2 m-0">
            These images will appear on the website's main page.
          </p>
        </div>
      </div>

      {/* Table */}
      <div
        className="overflow-y-scroll p-3 d-flex flex-column gap-2"
        style={{ height: "40vh" }}
      >
        <div className="row gap-2" style={{ width: "100%" }}>
          <div className="col-md-4 px-0 position-relative">
            <img
              className="rounded"
              src={sampleImage}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="col-md px-0 py-1 text-start d-flex flex-column justify-content-start">
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center gap-1">
                {editImages ? (
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Sample Title"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                ) : (
                  <h5 className="m-0">Sample Title</h5>
                )}

                <Dropdown>
                  <Dropdown.Toggle variant="light" bsPrefix>
                    <h5 className="m-0 d-flex align-items-center">
                      <i class="bx bx-dots-horizontal-rounded"></i>
                    </h5>
                  </Dropdown.Toggle>
                  {editImages ? (
                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="btn p-0 px-2"
                        onClick={handleCancelEditImage}
                      >
                        <button className="btn btn-light w-100">
                          <p className="m-0">Cancel</p>
                        </button>
                      </Dropdown.Item>
                      <Dropdown.Item className="btn p-0 px-2">
                        <button className="btn btn-light w-100">
                          <p className="m-0">Save</p>
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  ) : (
                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="btn p-0 px-2"
                        onClick={handleEditImage}
                      >
                        <button className="btn btn-light w-100">
                          <p className="m-0">Edit</p>
                        </button>
                      </Dropdown.Item>
                      <Dropdown.Item className="btn p-0 px-2">
                        <button className="btn btn-light w-100">
                          <p className="m-0">Delete</p>
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              </div>
              {editImages ? (
                <div class="form-floating">
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                  ></textarea>
                  <label for="floatingTextarea">Short Description</label>
                </div>
              ) : (
                <p className="m-0">
                  sample paragraph Lorem ipsum dolor sit, amet consectetur
                  adipisicing elit. Officiis, dicta.
                </p>
              )}
            </div>
          </div>
        </div>{" "}
        <div className="row gap-2" style={{ width: "100%" }}>
          <div className="col-md-4 px-0 position-relative">
            <img
              className="rounded"
              src={sampleImage}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="col-md px-0 py-1 text-start d-flex flex-column justify-content-start">
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center gap-1">
                {editImages ? (
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Sample Title"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                ) : (
                  <h5 className="m-0">Sample Title</h5>
                )}

                <Dropdown>
                  <Dropdown.Toggle variant="light" bsPrefix>
                    <h5 className="m-0 d-flex align-items-center">
                      <i class="bx bx-dots-horizontal-rounded"></i>
                    </h5>
                  </Dropdown.Toggle>
                  {editImages ? (
                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="btn p-0 px-2"
                        onClick={handleCancelEditImage}
                      >
                        <button className="btn btn-light w-100">
                          <p className="m-0">Cancel</p>
                        </button>
                      </Dropdown.Item>
                      <Dropdown.Item className="btn p-0 px-2">
                        <button className="btn btn-light w-100">
                          <p className="m-0">Save</p>
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  ) : (
                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="btn p-0 px-2"
                        onClick={handleEditImage}
                      >
                        <button className="btn btn-light w-100">
                          <p className="m-0">Edit</p>
                        </button>
                      </Dropdown.Item>
                      <Dropdown.Item className="btn p-0 px-2">
                        <button className="btn btn-light w-100">
                          <p className="m-0">Delete</p>
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              </div>
              {editImages ? (
                <div class="form-floating">
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                  ></textarea>
                  <label for="floatingTextarea">Short Description</label>
                </div>
              ) : (
                <p className="m-0">
                  sample paragraph Lorem ipsum dolor sit, amet consectetur
                  adipisicing elit. Officiis, dicta.
                </p>
              )}
            </div>
          </div>
        </div>{" "}
        <div className="row gap-2" style={{ width: "100%" }}>
          <div className="col-md-4 px-0 position-relative">
            <img
              className="rounded"
              src={sampleImage}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="col-md px-0 py-1 text-start d-flex flex-column justify-content-start">
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center gap-1">
                {editImages ? (
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Sample Title"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                ) : (
                  <h5 className="m-0">Sample Title</h5>
                )}

                <Dropdown>
                  <Dropdown.Toggle variant="light" bsPrefix>
                    <h5 className="m-0 d-flex align-items-center">
                      <i class="bx bx-dots-horizontal-rounded"></i>
                    </h5>
                  </Dropdown.Toggle>
                  {editImages ? (
                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="btn p-0 px-2"
                        onClick={handleCancelEditImage}
                      >
                        <button className="btn btn-light w-100">
                          <p className="m-0">Cancel</p>
                        </button>
                      </Dropdown.Item>
                      <Dropdown.Item className="btn p-0 px-2">
                        <button className="btn btn-light w-100">
                          <p className="m-0">Save</p>
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  ) : (
                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="btn p-0 px-2"
                        onClick={handleEditImage}
                      >
                        <button className="btn btn-light w-100">
                          <p className="m-0">Edit</p>
                        </button>
                      </Dropdown.Item>
                      <Dropdown.Item className="btn p-0 px-2">
                        <button className="btn btn-light w-100">
                          <p className="m-0">Delete</p>
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              </div>
              {editImages ? (
                <div class="form-floating">
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                  ></textarea>
                  <label for="floatingTextarea">Short Description</label>
                </div>
              ) : (
                <p className="m-0">
                  sample paragraph Lorem ipsum dolor sit, amet consectetur
                  adipisicing elit. Officiis, dicta.
                </p>
              )}
            </div>
          </div>
        </div>{" "}
        <div className="row gap-2" style={{ width: "100%" }}>
          <div className="col-md-4 px-0 position-relative">
            <img
              className="rounded"
              src={sampleImage}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="col-md px-0 py-1 text-start d-flex flex-column justify-content-start">
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center gap-1">
                {editImages ? (
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Sample Title"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                ) : (
                  <h5 className="m-0">Sample Title</h5>
                )}

                <Dropdown>
                  <Dropdown.Toggle variant="light" bsPrefix>
                    <h5 className="m-0 d-flex align-items-center">
                      <i class="bx bx-dots-horizontal-rounded"></i>
                    </h5>
                  </Dropdown.Toggle>
                  {editImages ? (
                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="btn p-0 px-2"
                        onClick={handleCancelEditImage}
                      >
                        <button className="btn btn-light w-100">
                          <p className="m-0">Cancel</p>
                        </button>
                      </Dropdown.Item>
                      <Dropdown.Item className="btn p-0 px-2">
                        <button className="btn btn-light w-100">
                          <p className="m-0">Save</p>
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  ) : (
                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="btn p-0 px-2"
                        onClick={handleEditImage}
                      >
                        <button className="btn btn-light w-100">
                          <p className="m-0">Edit</p>
                        </button>
                      </Dropdown.Item>
                      <Dropdown.Item className="btn p-0 px-2">
                        <button className="btn btn-light w-100">
                          <p className="m-0">Delete</p>
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              </div>
              {editImages ? (
                <div class="form-floating">
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                  ></textarea>
                  <label for="floatingTextarea">Short Description</label>
                </div>
              ) : (
                <p className="m-0">
                  sample paragraph Lorem ipsum dolor sit, amet consectetur
                  adipisicing elit. Officiis, dicta.
                </p>
              )}
            </div>
          </div>
        </div>{" "}
        <div className="row gap-2" style={{ width: "100%" }}>
          <div className="col-md-4 px-0 position-relative">
            <img
              className="rounded"
              src={sampleImage}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="col-md px-0 py-1 text-start d-flex flex-column justify-content-start">
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center gap-1">
                {editImages ? (
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Sample Title"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                ) : (
                  <h5 className="m-0">Sample Title</h5>
                )}

                <Dropdown>
                  <Dropdown.Toggle variant="light" bsPrefix>
                    <h5 className="m-0 d-flex align-items-center">
                      <i class="bx bx-dots-horizontal-rounded"></i>
                    </h5>
                  </Dropdown.Toggle>
                  {editImages ? (
                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="btn p-0 px-2"
                        onClick={handleCancelEditImage}
                      >
                        <button className="btn btn-light w-100">
                          <p className="m-0">Cancel</p>
                        </button>
                      </Dropdown.Item>
                      <Dropdown.Item className="btn p-0 px-2">
                        <button className="btn btn-light w-100">
                          <p className="m-0">Save</p>
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  ) : (
                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="btn p-0 px-2"
                        onClick={handleEditImage}
                      >
                        <button className="btn btn-light w-100">
                          <p className="m-0">Edit</p>
                        </button>
                      </Dropdown.Item>
                      <Dropdown.Item className="btn p-0 px-2">
                        <button className="btn btn-light w-100">
                          <p className="m-0">Delete</p>
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              </div>
              {editImages ? (
                <div class="form-floating">
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                  ></textarea>
                  <label for="floatingTextarea">Short Description</label>
                </div>
              ) : (
                <p className="m-0">
                  sample paragraph Lorem ipsum dolor sit, amet consectetur
                  adipisicing elit. Officiis, dicta.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Form onSubmit={handleAddReportUsers}>
        <h5 className="mt-4">Add User Violation</h5>

        <div className="mt-3">
          <FloatingLabel controlId="newReportReason" label="Add User Violation">
            <Form.Control
              type="text"
              placeholder="Enter new report reason"
              value={newReportUsers}
              onChange={(e) => setNewReportUsers(e.target.value)}
            />
          </FloatingLabel>
        </div>
        <h5></h5>

        <div className="mt-3 d-flex justify-content-end">
          <button type="submit" className="primaryButton px-5 py-2">
            <p className="m-0">Add</p>
          </button>
        </div>
      </Form>
    </div>
  );
};

export default IndexImage;
