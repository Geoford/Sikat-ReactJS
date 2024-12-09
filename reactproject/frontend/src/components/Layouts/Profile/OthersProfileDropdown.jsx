import Dropdown from "react-bootstrap/Dropdown";
import EditPersonalDetailButton from "../../pages/PagesUser/UserProfileLayout/EditPersonalDetailButton";
import ReportUserButton from "./ReportUserButton";
import Suspend from "./Suspend";

const OthersProfileDropdown = ({ isAdmin }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        className="btn-light d-flex align-items-center"
        id="dropdown-basic"
      >
        <p className="m-0">More Options</p>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {isAdmin ? (
          ""
        ) : (
          <Dropdown.Item href="" className="p-0 px-2 btn btn-light">
            <ReportUserButton></ReportUserButton>
          </Dropdown.Item>
        )}

        {/* {isAdmin ? "im admin" : "Im not an Admin"} */}
        {isAdmin ? (
          <Dropdown.Item className="btn btn-light p-0 px-2">
            {/* <button className="w-100 btn btn-light text-start">Suspend</button> */}
            <Suspend></Suspend>
          </Dropdown.Item>
        ) : (
          ""
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default OthersProfileDropdown;
