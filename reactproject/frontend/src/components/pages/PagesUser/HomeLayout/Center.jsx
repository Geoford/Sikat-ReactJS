import DiaryEntryButton from "../../../Layouts/DiaryEntryButton";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Center = () => {
  const [entries, setEntries] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const fetchEntries = useCallback(() => {
    if (!user) return;

    axios
      .get("http://localhost:8081/entries", {
        params: { userID: user.userID },
      })
      .then((response) => {
        setEntries(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the diary entries!", error);
      });
  }, [user]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return (
    <div className="p-2">
      <div
        className="rounded border border-bg-secondary-subtle shadow-sm p-3"
        style={{ backgroundColor: "white" }}
      >
        <DiaryEntryButton onEntrySaved={fetchEntries} />
      </div>

      {entries.length === 0 ? (
        <p>No entries available.</p>
      ) : (
        entries.map((entry) => (
          <div
            key={entry.entryID}
            className="rounded border border-bg-secondary-subtle shadow-sm p-3 mt-3"
            style={{ backgroundColor: "white" }}
          >
            <div className="d-flex align-items-center gap-2 border-bottom pb-2">
              <div className="profilePicture"></div>

              <p className="m-0">
                {entry.visibility === "public" && entry.anonimity === "private"
                  ? "Anonymous"
                  : entry.username}
              </p>
              {user && user.userID !== entry.userID && (
                <div>
                  <button className="orangeButton">Follow</button>
                </div>
              )}
            </div>
            <div className="text-start p-2">
              <h5>{entry.title}</h5>
              <p className="m-0">{entry.description}</p>
              {entry.fileURL && (
                <img
                  className="DiaryImage mt-1"
                  src={`http://localhost:8081${entry.fileURL}`}
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
