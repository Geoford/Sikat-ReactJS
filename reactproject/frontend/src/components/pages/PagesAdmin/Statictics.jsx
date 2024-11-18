import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MainLayout from "../../Layouts/MainLayout";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

const Statictics = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUsers(parsedUser);
    } else {
      alert("You need to log in to access the chat.");
      window.location.href = "/";
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:8081/users`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <MainLayout ActiveTab="Followers">
      <div
        className="container mt-4 rounded p-3 shadow-sm mb-5"
        style={{
          width: "clamp(30rem, 70vw, 75rem)",
          minHeight: "85vh",
          backgroundColor: "#ffff",
        }}
      >
        <Tabs
          defaultActiveKey="Followers"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="Followers" title="Registered Users">
            <div
              className="custom-scrollbar overflow-y-scroll"
              style={{ height: "50vh" }}
            >
              <table className="table rounded overflow-hidden">
                <thead>
                  <tr>
                    <th scope="col">Student No.</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Sex</th>
                    <th scope="col">Course</th>
                    <th scope="col">Year</th>
                    <th scope="col">CvSU Email</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(users) && users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.userID}>
                        <th scope="row">
                          <p className="m-0 mt-1">{user.studentNumber}</p>
                        </th>
                        <td>
                          <p className="m-0 mt-1">
                            {user.firstName} {user.lastName}
                          </p>
                        </td>
                        <td>
                          <p className="m-0 mt-1">{user.gender}</p>
                        </td>
                        <td>
                          <p className="m-0 mt-1">{user.program}</p>
                        </td>
                        <td>
                          <p className="m-0 mt-1">{user.year}</p>
                        </td>
                        <td>
                          <p className="m-0 mt-1">{user.cvsuEmail}</p>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No registered users available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="row mt-2">
              <div className="col-lg-2 d-flex flex-column align-items-start ">
                <h5 className="m-0">Total: 000</h5>
                <p className="m-0 text-secondary ms-1">Female: 00</p>
                <p className="m-0 text-secondary ms-1">Male: 00</p>
              </div>
              <div className="col-md  d-flex flex-column align-items-start">
                <h5 className="m-0">Courses:</h5>
                <div
                  className="d-flex flex-wrap gap-3 ps-2 text-secondary"
                  style={{ width: "80%" }}
                >
                  <p className="m-0">BS Information Technology: 00</p>
                  <p className="m-0">BS Information Technology: 00</p>
                  <p className="m-0">BS Information Technology: 00</p>
                  <p className="m-0">BS Information Technology: 00</p>
                  <p className="m-0">BS Information Technology: 00</p>
                </div>
              </div>
            </div>
            <div>
              <button className="primaryButton w-100 py-2 mt-4">
                Download Data
              </button>
            </div>
          </Tab>
          <Tab eventKey="Following" title="Following">
            <div></div>
          </Tab>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Statictics;
