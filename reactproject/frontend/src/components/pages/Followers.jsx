import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MainLayout from "../Layouts/MainLayout";
import DefaultProfile from "../../assets/userDefaultProfile.png";

const Followers = () => {
  const ActiveTab = "Followers";
  return (
    <MainLayout ActiveTab={ActiveTab}>
      <div
        className="container mt-4 rounded p-3 shadow-sm"
        style={{ width: "40rem", backgroundColor: "#ffff" }}
      >
        <Tabs
          defaultActiveKey="Followers"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="Followers" title="Followers">
            <div>
              <div className="d-flex align-items-center">
                <div className="profilePicture">
                  <img
                    src={DefaultProfile}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div>
                  <p className="m-0">FullName</p>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="Following" title="Following">
            Tab content for Profile
          </Tab>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Followers;
