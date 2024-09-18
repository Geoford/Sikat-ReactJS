import DiaryEntry from "../../../../assets/DiaryEntry.png";
import SampleImage from "../../../../assets/Background.jpg";
const Center = () => {
  return (
    <div className="p-2">
      <div className=" bg-light rounded border border-bg-secondary-subtle shadow-sm p-3 mb-2">
        <div className="d-flex justify-content-between border-bottom">
          <div>
            <h4>Followers</h4>
          </div>
          <div>
            <p className="orangerText" style={{ cursor: "pointer" }}>
              View All
            </p>
          </div>
        </div>
        <div
          className="mt-2 pe-1"
          style={{ height: "200px", overflowY: "scroll" }}
        >
          <div className="d-flex align-items-center justify-content-between gap-2 border-bottom pb-2 pe-2 mb-2">
            <div className="d-flex align-items-center gap-2">
              <div className="profilePicture"></div>
              <p className="m-0">UserName</p>
            </div>
            <div>
              <button className="orangeButton">Follow</button>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between gap-2 border-bottom pb-2 pe-2 mb-2">
            <div className="d-flex align-items-center gap-2">
              <div className="profilePicture"></div>
              <p className="m-0">UserName</p>
            </div>
            <div>
              <button className="orangeButton">Follow</button>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between gap-2 border-bottom pb-2 pe-2 mb-2">
            <div className="d-flex align-items-center gap-2">
              <div className="profilePicture"></div>
              <p className="m-0">UserName</p>
            </div>
            <div>
              <button className="orangeButton">Follow</button>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-light rounded border border-bg-secondary-subtle shadow-sm p-3">
        <div className="d-flex justify-content-between border-bottom">
          <div>
            <h4>Friends</h4>
          </div>
          <div>
            <p className="orangerText" style={{ cursor: "pointer" }}>
              View All
            </p>
          </div>
        </div>
        <div
          className="mt-2 pe-1"
          style={{ height: "260px", overflowY: "scroll" }}
        >
          <div className="d-flex align-items-center gap-2 border-bottom pb-2 pe-2 mb-2">
            <div className="profilePicture"></div>
            <p className="m-0">UserName</p>
          </div>
          <div className="d-flex align-items-center gap-2 border-bottom pb-2 pe-2 mb-2">
            <div className="profilePicture"></div>
            <p className="m-0">UserName</p>
          </div>
          <div className="d-flex align-items-center gap-2 border-bottom pb-2 pe-2 mb-2">
            <div className="profilePicture"></div>
            <p className="m-0">UserName</p>
          </div>
          <div className="d-flex align-items-center gap-2 border-bottom pb-2 pe-2 mb-2">
            <div className="profilePicture"></div>
            <p className="m-0">UserName</p>
          </div>
          <div className="d-flex align-items-center gap-2 border-bottom pb-2 pe-2 mb-2">
            <div className="profilePicture"></div>
            <p className="m-0">UserName</p>
          </div>
          <div className="d-flex align-items-center gap-2 border-bottom pb-2 pe-2 mb-2">
            <div className="profilePicture"></div>
            <p className="m-0">UserName</p>
          </div>
          <div className="d-flex align-items-center gap-2 border-bottom pb-2 pe-2 mb-2">
            <div className="profilePicture"></div>
            <p className="m-0">UserName</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Center;
