import Dropdown from "react-bootstrap/Dropdown";
import EditPersonalDetailButton from "../../pages/PagesUser/UserProfileLayout/EditPersonalDetailButton";

const ProfileDropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        className="btn-light d-flex align-items-center"
        id="dropdown-basic"
      >
        <p className="m-0">More Options</p>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item className="p-0 px-2 btn btn-light">
          <button className="w-100 btn btn-light text-start">
            Activity log
          </button>
        </Dropdown.Item>
        <Dropdown.Item className="p-0 px-2 btn btn-light">
          <button className="w-100 btn btn-light text-start">Filed Case</button>
        </Dropdown.Item>
        <Dropdown.Item className="p-0 px-2 btn btn-light">
          <EditPersonalDetailButton></EditPersonalDetailButton>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
