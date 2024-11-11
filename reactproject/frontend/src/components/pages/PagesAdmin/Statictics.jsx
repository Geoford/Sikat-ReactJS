import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MainLayout from "../../Layouts/MainLayout";

const Statictics = () => {
  return (
    <MainLayout ActiveTab="Followers">
      <div
        className="container mt-4 rounded p-3 shadow-sm"
        style={{ width: "40rem", backgroundColor: "#ffff" }}
      >
        <Tabs
          defaultActiveKey="Followers"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="Followers" title="Registered Users">
            <div></div>
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
