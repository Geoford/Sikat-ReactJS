import { useState } from "react";

const UserDiary = () => {
  const [activeButtons, setActiveButtons] = useState([false, false, false]);
  const [expandButtons, setExpandButtons] = useState([false, false, false]); // For expansion

  const handleClick = (index) => {
    // Toggle active (persistent color change)
    const updatedActiveButtons = [...activeButtons];
    updatedActiveButtons[index] = !updatedActiveButtons[index];
    setActiveButtons(updatedActiveButtons);

    // Trigger temporary expansion
    const updatedExpandButtons = [...expandButtons];
    updatedExpandButtons[index] = true;
    setExpandButtons(updatedExpandButtons);

    // Remove the expansion class after 300ms
    setTimeout(() => {
      updatedExpandButtons[index] = false;
      setExpandButtons([...updatedExpandButtons]);
    }, 300);
  };

  return (
    <div className="d-flex flex-column gap-3">
      <div
        className="rounded border border-secondary-subtle shadow p-3"
        style={{ backgroundColor: "white" }}
      >
        <div className="d-flex align-items-center gap-2 border-bottom pb-2">
          <div className="profilePicture"></div>
          <p className="m-0">UserName</p>
        </div>
        <div className="text-start border-bottom p-2">
          <h5>Journal Title</h5>
          <p className="m-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            quaerat odit, laboriosam laudantium tempore vel?
          </p>
          <img className="DiaryImage mt-1" src={""} alt="Diary" />
        </div>
        <div className="row pt-2">
          <div className="col">
            <button
              className={`InteractButton ${activeButtons[0] ? "active" : ""} ${
                expandButtons[0] ? "expand" : ""
              }`}
              onClick={() => handleClick(0)}
            >
              (0) Gadify
            </button>
          </div>
          <div className="col">
            <button className="InteractButton">(0) Comment</button>
          </div>
          <div className="col">
            <button className="InteractButton">(0) Flag</button>
          </div>
        </div>
      </div>

      <div
        className="rounded border border-secondary-subtle shadow p-3"
        style={{ backgroundColor: "white" }}
      >
        <div className="d-flex align-items-center gap-2 border-bottom pb-2">
          <div className="profilePicture"></div>
          <p className="m-0">UserName</p>
        </div>
        <div className="text-start border-bottom p-2">
          <h5>Journal Title</h5>
          <p className="m-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            quaerat odit, laboriosam laudantium tempore vel? Lorem ipsum, dolor
            sit amet consectetur adipisicing elit. Commodi tempora consectetur
            cum architecto ab perspiciatis ut magni maxime cupiditate ullam.
          </p>
          <img className="DiaryImage mt-1" src={""} alt="Diary" />
        </div>
        <div className="row pt-2">
          <div className="col">
            <button
              className={`InteractButton ${activeButtons[1] ? "active" : ""} ${
                expandButtons[1] ? "expand" : ""
              }`}
              onClick={() => handleClick(1)}
            >
              (0) Gadify
            </button>
          </div>
          <div className="col">
            <button className="InteractButton">(0) Comment</button>
          </div>
          <div className="col">
            <button className="InteractButton">(0) Flag</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDiary;
