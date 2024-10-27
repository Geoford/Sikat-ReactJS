import Dropdown from "react-bootstrap/Dropdown";
import ReportButton from "./ReportButton";

const CommentDropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        className="btn-light d-flex align-items-center pt-0 pb-2"
        id="dropdown-basic"
        bsPrefix="custom-toggle"
      >
        <h5 className="m-0">...</h5>
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-2">
        <Dropdown.Item className="p-0 btn btn-light">
          <ReportButton></ReportButton>
        </Dropdown.Item>
        {/* <Dropdown.Item href="#/action-2"></Dropdown.Item>
        <Dropdown.Item href="#/action-3"> </Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CommentDropdown;
