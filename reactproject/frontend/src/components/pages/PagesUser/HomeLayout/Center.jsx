import DiaryEntry from "../../../../assets/DiaryEntry.png";
import DiaryEntryButton from "../../../Layouts/DiaryEntryButton";
import { useState, useEffect } from "react";
import axios from "axios";

const Center = () => {
  const [entries, setEntries] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch user data
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const fetchEntries = () => {
    axios
      .get("http://localhost:8081/entries")
      .then((response) => {
        setEntries(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the diary entries!", error);
      });
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="p-2">
      <div className="rounded border p-3" style={{ backgroundColor: "white" }}>
        <DiaryEntryButton onEntrySaved={fetchEntries} />
      </div>
      {entries.length === 0 ? (
        <p>No entries available.</p>
      ) : (
        entries.map((entry) => (
          <div
            key={entry.id}
            className="rounded border p-3 mt-3"
            style={{ backgroundColor: "white" }}
          >
            <div className="d-flex align-items-center gap-2 border-bottom pb-2">
              <div className="profilePicture"></div>
              <p className="m-0">{entry.username}</p>
              <div>
                <button className="orangeButton">Follow</button>
              </div>
            </div>
            <div className="text-start p-2">
              <h5>{entry.title}</h5>
              <p className="m-0">{entry.description}</p>
              {entry.image && (
                <img
                  className="DiaryImage mt-1"
                  src={entry.image}
                  alt="Diary"
                />
              )}
            </div>
            <div className="row px-2 pt-2">
              <div className="col">
                <button className="InteractButton">Gadify</button>
              </div>
              <div className="col">
                <button className="InteractButton">Comment</button>
              </div>
              <div className="col">
                <button className="InteractButton">Flag</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Center;
