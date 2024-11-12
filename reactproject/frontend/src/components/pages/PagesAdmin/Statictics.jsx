import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MainLayout from "../../Layouts/MainLayout";

const Statictics = () => {
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
              <table class="table rounded overflow-hidden">
                <thead>
                  <tr>
                    <th scope="col">Student no.</th>
                    <th scope="col">FullName</th>
                    <th scope="col">Sex</th>
                    <th scope="col">Course</th>
                    <th scope="col">Year</th>
                    <th scope="col">CvSU Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <p className="m-0 mt-1">0000000000</p>
                    </th>
                    <td>
                      <p className="m-0 mt-1">Mark Tahimik Lang</p>
                    </td>
                    <td>
                      <p className="m-0 mt-1">Male</p>
                    </td>
                    <td>
                      <p className="m-0 mt-1">BS Information Techology</p>
                    </td>
                    <td>
                      <p className="m-0 mt-1">1st</p>
                    </td>{" "}
                    <td>
                      <p className="m-0 mt-1">marktahimik.lang@cvsu.edu.ph</p>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <p className="m-0 mt-1">0000000000</p>
                    </th>
                    <td>
                      <p className="m-0 mt-1">Chrollo Lucilfer</p>
                    </td>
                    <td>
                      <p className="m-0 mt-1">Male</p>
                    </td>
                    <td>
                      <p className="m-0 mt-1">BS Computer Science</p>
                    </td>
                    <td>
                      <p className="m-0 mt-1">3rd</p>
                    </td>{" "}
                    <td>
                      <p className="m-0 mt-1">chrollo.lucilfer@cvsu.edu.ph</p>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <p className="m-0 mt-1">0000000000</p>
                    </th>
                    <td>
                      <p className="m-0 mt-1">Magie Rhee</p>
                    </td>
                    <td>
                      <p className="m-0 mt-1">Female</p>
                    </td>
                    <td>
                      <p className="m-0 mt-1">BS Industrial Technology</p>
                    </td>
                    <td>
                      <p className="m-0 mt-1">2nd</p>
                    </td>{" "}
                    <td>
                      <p className="m-0 mt-1">magie.rhee@cvsu.edu.ph</p>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <p className="m-0 mt-1">0000000000</p>
                    </th>
                    <td>
                      <p className="m-0 mt-1">Negan Smith</p>
                    </td>
                    <td>
                      <p className="m-0 mt-1">Male</p>
                    </td>
                    <td>
                      <p className="m-0 mt-1">BS Education</p>
                    </td>
                    <td>
                      <p className="m-0 mt-1">4th</p>
                    </td>{" "}
                    <td>
                      <p className="m-0 mt-1">negan.smith@cvsu.edu.ph</p>
                    </td>
                  </tr>
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
