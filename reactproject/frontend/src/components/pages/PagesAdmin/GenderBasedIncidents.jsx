import HomeMainLayout from "../../Layouts/Home/HomeMainLayout";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout";

export default function GenderBasedIncidents() {
  return (
    <MainLayout ActiveTab="Complaints">
      <div className="mt-4">
        <h2 className="fw-bold m-0">Gender-Based Incidents Complaints</h2>
        <div className="container-fluid container-lg mb-2">
          <h3 className="text-start">Case Status</h3>
          <div className="d-flex gap-2">
            <div className="rounded p-3" style={{ backgroundColor: "#ffff" }}>
              <h5 className="m-0">Awaiting Review 0</h5>
            </div>
            <div className="bg-success rounded   text-light p-3">
              <h5 className="m-0">Addressed 0</h5>
            </div>
          </div>
        </div>
        <div className="container-fluid container-lg">
          <table class="table rounded overflow-hidden">
            <thead>
              <tr>
                <th scope="col">Case #</th>
                <th scope="col">Victim's Name</th>
                <th scope="col">Sex</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <p className="m-0 mt-1">1</p>
                </th>
                <td>
                  <p className="m-0 mt-1">Mark</p>
                </td>
                <td>
                  <p className="m-0 mt-1">Male</p>
                </td>
                <td className="d-flex justify-content-center gap-2">
                  <button className="btn btn-success text-light py-1">
                    Mark as Adressed
                  </button>
                  <Link to="/Admin/CaseDetails">
                    <button className="primaryButton text-light">View</button>
                  </Link>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p className="m-0 mt-1">2</p>
                </th>
                <td>
                  <p className="m-0 mt-1">Michelle</p>
                </td>
                <td>
                  <p className="m-0 mt-1">Female</p>
                </td>
                <td className="d-flex justify-content-center gap-2">
                  <button className="btn btn-success text-light py-1">
                    Mark as Adressed
                  </button>
                  <Link to="/Admin/CaseDetails">
                    <button className="primaryButton text-light">View</button>
                  </Link>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p className="m-0 mt-1">3</p>
                </th>
                <td>
                  <p className="m-0 mt-1">Brody</p>
                </td>
                <td>
                  <p className="m-0 mt-1">Male</p>
                </td>
                <td className="d-flex justify-content-center gap-2">
                  <button className="btn btn-success text-light py-1">
                    Mark as Adressed
                  </button>
                  <Link to="/Admin/CaseDetails">
                    <button className="primaryButton text-light">View</button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="container-fluid container-lg">
          <h3 className="text-start">Addressed Cases</h3>
          <table class="table rounded overflow-hidden">
            <thead>
              <tr>
                <th scope="col" style={{ width: "15%" }}>
                  Case #
                </th>
                <th scope="col">Victim's Name</th>
                <th scope="col">Sex</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <p className="m-0 mt-1">1</p>
                </th>
                <td>
                  <p className="m-0 mt-1">Mark</p>
                </td>
                <td>
                  <p className="m-0 mt-1">Male</p>
                </td>
                <td className="d-flex justify-content-center gap-2">
                  <Link to="/Admin/CaseDetails">
                    <button className="primaryButton text-light">View</button>
                  </Link>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p className="m-0 mt-1">2</p>
                </th>
                <td>
                  <p className="m-0 mt-1">Michelle</p>
                </td>
                <td>
                  <p className="m-0 mt-1">Female</p>
                </td>
                <td className="d-flex justify-content-center gap-2">
                  <Link to="/Admin/CaseDetails">
                    <button className="primaryButton text-light">View</button>
                  </Link>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p className="m-0 mt-1">3</p>
                </th>
                <td>
                  <p className="m-0 mt-1">Brody</p>
                </td>
                <td>
                  <p className="m-0 mt-1">Male</p>
                </td>
                <td className="d-flex justify-content-center gap-2">
                  <Link to="/Admin/CaseDetails">
                    <button className="primaryButton text-light">View</button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}
