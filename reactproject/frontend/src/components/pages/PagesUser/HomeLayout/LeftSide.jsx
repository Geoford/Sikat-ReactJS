import DiaryEntry from "../../../../assets/DiaryEntry.png";
import SampleImage from "../../../../assets/Background.jpg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Center = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/Login");
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="p-2">
      <div
        className="d-flex align-items-center flex-column rounded gap-2 shadow py-3"
        style={{ backgroundColor: "#cc00cc" }}
      >
        <div className="mainProfilePicture"></div>
        <p className="m-0 mt-1 text-light fs-5">{user.username}</p>
      </div>

      <div className=" bg-light rounded border border-bg-secondary-subtle shadow-sm p-3 mt-3">
        <div className="d-flex justify-content-between border-bottom">
          <div>
            <h4>Journal Entries</h4>
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
          <div className="journalEntries d-flex align-items-start flex-column rounded ps-2 pt-1">
            <h5>Journal Title</h5>
            <p className="text-start">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              expedita repellat quos quod nulla omnis!
            </p>
          </div>
          <div className="journalEntries d-flex align-items-start flex-column rounded ps-2 pt-1">
            <h5>Journal Title</h5>
            <p className="text-start">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              expedita repellat quos quod nulla omnis!
            </p>
          </div>
          <div className="journalEntries d-flex align-items-start flex-column rounded ps-2 pt-1">
            <h5>Journal Title</h5>
            <p className="text-start">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              expedita repellat quos quod nulla omnis!
            </p>
          </div>
          <div className="journalEntries d-flex align-items-start flex-column rounded ps-2 pt-1">
            <h5>Journal Title</h5>
            <p className="text-start">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              expedita repellat quos quod nulla omnis!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Center;
