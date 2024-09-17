import DiaryEntry from "../../../../assets/DiaryEntry.png";
import SampleImage from "../../../../assets/Background.jpg";
const Center = () => {
  return (
    <div className="p-2">
      <div
        className="d-flex align-items-center flex-column rounded gap-2 border-bottom py-3"
        style={{ backgroundColor: "#cc00cc" }}
      >
        <div className="mainProfilePicture"></div>
        <p className="m-0 mt-1 text-light fs-5">UserName</p>
      </div>
      <div
        className="rounded border p-3 mt-3"
        style={{ backgroundColor: "white" }}
      >
        <div className="d-flex align-items-center gap-2 border-bottom pb-2">
          <div className="profilePicture"></div>
          <p className="m-0">UserName</p>
          <div>
            <button className="orangeButton">Follow</button>
          </div>
        </div>
        <div className="text-start p-2">
          <h5>Journal Title</h5>
          <p className="m-0">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi sequi
            incidunt obcaecati eaque quam, doloribus dolor repellat non in
            deserunt aliquam tenetur necessitatibus delectus animi dolore.
            Reiciendis nulla veritatis dolorem?
          </p>
          <img className="DiaryImage mt-1" src={SampleImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Center;
