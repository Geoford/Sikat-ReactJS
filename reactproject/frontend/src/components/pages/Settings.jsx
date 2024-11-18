import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import MainLayout from "../Layouts/MainLayout";
import ProfileInformation from "../Layouts/SettingsLayouts/ProfileInformation";
import PasswordAndSecurity from "../Layouts/SettingsLayouts/PasswordAndSecurity";
import UserAuthentication from "../Layouts/SettingsLayouts/UserAuthentication";
import FilterAndSubjects from "../Layouts/SettingsLayouts/FilterAndSubjects";
import ReportingComments from "../Layouts/SettingsLayouts/ReportingComments";
import ReportingUsers from "../Layouts/SettingsLayouts/ReportingUsers";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FlaggingDiaries from "../Layouts/SettingsLayouts/FlaggingDiaries";

const Settings = () => {
  const { userID } = useParams();
  const [user, setUser] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async (userID) => {
    try {
      const response = await fetch(
        `http://localhost:8081/fetchUser/user/${userID}`
      );

      if (!response.ok) {
        throw new Error("User not found");
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      fetchUserData(parsedUser.userID);
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!user) return null;

  const navItemStyle = "shadow d-flex align-items-center gap-2";
  return (
    <MainLayout ActiveTab="Settings">
      <div className="container-fluid container-md mt-5">
        <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
          <Row>
            <Col sm={3}>
              <Nav
                variant="pills"
                className="flex-column gap-2 custom-nav mb-3 text-start"
              >
                <h5 className="m-0 text-start mb-2">Account Settings</h5>
                <Nav.Item>
                  <Nav.Link className={navItemStyle} eventKey="profile">
                    <i class="bx bxs-user-detail bx-sm"></i>
                    <p className="m-0">Profile Information</p>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className="shadow d-flex align-items-center gap-2 p-0"
                    eventKey="security"
                  >
                    <UserAuthentication userID={userID}></UserAuthentication>
                  </Nav.Link>
                </Nav.Item>
                {user && user.isAdmin ? (
                  <>
                    <h5 className="m-0 text-start my-2">Managing Diaries</h5>
                    <Nav.Item>
                      <Nav.Link className={navItemStyle} eventKey="filter">
                        <i class="bx bx-filter-alt bx-sm"></i>
                        <p className="m-0">Filtering and Subjects</p>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className={navItemStyle} eventKey="flag">
                        <i class="bx bx-flag bx-sm"></i>
                        <p className="m-0">Flagging Diaries</p>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className={navItemStyle} eventKey="repComment">
                        <i class="bx bx-comment-x bx-sm"></i>
                        <p className="m-0">Reporting Comments</p>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className={navItemStyle} eventKey="repUser">
                        <i class="bx bx-user-x bx-sm"></i>
                        <p className="m-0">Reporting Users</p>
                      </Nav.Link>
                    </Nav.Item>
                  </>
                ) : (
                  ""
                )}
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="profile">
                  <ProfileInformation></ProfileInformation>
                </Tab.Pane>
                <Tab.Pane eventKey="security">
                  <PasswordAndSecurity></PasswordAndSecurity>
                </Tab.Pane>
                <Tab.Pane eventKey="filter">
                  <FilterAndSubjects></FilterAndSubjects>
                </Tab.Pane>
                <Tab.Pane eventKey="flag">
                  <FlaggingDiaries></FlaggingDiaries>
                </Tab.Pane>
                <Tab.Pane eventKey="repComment">
                  <ReportingComments></ReportingComments>
                </Tab.Pane>
                <Tab.Pane eventKey="repUser">
                  <ReportingUsers></ReportingUsers>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </MainLayout>
  );
};

export default Settings;
