import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import MainLayout from "../../Layouts/MainLayout";
import RegisteredUsers from "../../Layouts/LayoutAdmin/AnalyticsLayout/RegisteredUser";
import FlaggedDiaries from "../../Layouts/LayoutAdmin/AnalyticsLayout/FlaggedDiaries";
import ReportedUsers from "../../Layouts/LayoutAdmin/AnalyticsLayout/ReportedUsers";

const Analytics = () => {
  const [users, setUsers] = useState([]);
  const [flags, setFlags] = useState([]);
  const [reportedComments, setReportedComments] = useState([]);
  const [activeTab, setActiveTab] = useState("RegisteredUser");

  useEffect(() => {
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

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const response = await fetch(`http://localhost:8081/flagged`);
        if (!response.ok) {
          throw new Error("Failed to fetch flags");
        }
        const data = await response.json();
        setFlags(data);
      } catch (error) {
        console.error("Error fetching flags:", error);
      }
    };

    fetchFlags();
  }, []);

  useEffect(() => {
    const fetchReportedComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/getReportedComments`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reported comments");
        }
        const data = await response.json();
        setReportedComments(data);
      } catch (error) {
        console.error("Error fetching reported comments:", error);
      }
    };

    fetchReportedComments();
  }, []);

  return (
    <MainLayout ActiveTab="Analytics">
      <div className="mt-0 mt-lg-2 pt-2 px-2">
        <div
          className="container rounded "
          style={{ backgroundColor: "var(--primary)" }}
        >
          <h4 className="text-light fw-bold m-0 mt-4 mt-lg-0 py-2">
            User Analytics
          </h4>
        </div>
        <div
          className="container rounded mt-2 p-3 shadow-sm mb-5"
          style={{
            width: "",
            height: "max-content",
            backgroundColor: "#fff",
          }}
        >
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="RegisteredUser"
          >
            <div className="mb-2">
              <Nav variant="pills" className="d-flex custom-nav ">
                <Nav.Item>
                  <Nav.Link
                    className=" d-flex align-items-center gap-2"
                    eventKey="RegisteredUser"
                  >
                    <h5 className="m-0">
                      <i class="bx bxs-user-detail mt-1"></i>
                    </h5>
                    <p className="m-0 d-none d-md-block">Registered Users</p>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className=" d-flex align-items-center gap-2"
                    eventKey="FlaggedDiaries"
                  >
                    <h5 className="m-0">
                      <i class="bx bx-message-alt-error mt-1"></i>
                    </h5>
                    <p className="m-0 d-none d-md-block">Flagged Diaries</p>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className=" d-flex align-items-center gap-2"
                    eventKey="ReportedUsers"
                  >
                    <h5 className="m-0">
                      <i class="bx bx-user-pin mt-1"></i>
                    </h5>
                    <p className="m-0 d-none d-md-block">Reported Commments</p>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <div>
              <Tab.Content>
                <Tab.Pane eventKey="RegisteredUser">
                  <RegisteredUsers users={users} />
                </Tab.Pane>
                <Tab.Pane eventKey="FlaggedDiaries">
                  <FlaggedDiaries flags={flags} />
                </Tab.Pane>
                <Tab.Pane eventKey="ReportedUsers">
                  <ReportedUsers reportedComments={reportedComments} />
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </div>
      </div>
    </MainLayout>
  );
};

export default Analytics;
