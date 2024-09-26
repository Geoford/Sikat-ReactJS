import DiaryEntryButton from "../../../Layouts/DiaryEntryButton";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import FilterButton from "../../../Layouts/LayoutUser/FilterButton";

const Center = () => {
  const [entries, setEntries] = useState([]);
  const [user, setUser] = useState(null);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [activeButtons, setActiveButtons] = useState({});
  const [expandButtons, setExpandButtons] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      const followedData = localStorage.getItem("followedUsers");
      if (followedData) {
        setFollowedUsers(JSON.parse(followedData));
      }
    }
  }, []);

  const fetchEntries = useCallback(() => {
    if (!user) return;

    axios
      .get("http://localhost:8081/entries", {
        params: { userID: user.userID },
      })
      .then((response) => {
        console.log("Entries fetched:", response.data);
        setEntries(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the diary entries!", error);
      });
  }, [user]);

  const handleGadify = (entryID) => {
    if (!user) return;

    const entry = entries.find((entry) => entry.entryID === entryID);
    if (!entry) return;

    axios
      .post(`http://localhost:8081/entry/${entryID}/gadify`, {
        userID: user.userID,
      })
      .then((res) => {
        setEntries(
          entries.map((entry) =>
            entry.entryID === entryID
              ? {
                  ...entry,
                  gadifyCount:
                    res.data.message === "Gadify action recorded successfully"
                      ? entry.gadifyCount + 1
                      : entry.gadifyCount - 1,
                }
              : entry
          )
        );
      })
      .catch((err) => console.error("Error updating gadify count:", err));
  };

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleClick = (entryID) => {
    const updatedActiveButtons = {
      ...activeButtons,
      [entryID]: !activeButtons[entryID],
    };
    setActiveButtons(updatedActiveButtons);

    const updatedExpandButtons = { ...expandButtons, [entryID]: true };
    setExpandButtons(updatedExpandButtons);

    setTimeout(() => {
      updatedExpandButtons[entryID] = false;
      setExpandButtons({ ...updatedExpandButtons });
    }, 300);

    handleGadify(entryID);
  };

  const handleFollowToggle = async (followUserId) => {
    if (!followUserId) {
      console.error("User ID to follow/unfollow is undefined");
      return;
    }

    if (user.userID === followUserId) {
      alert("You cannot follow yourself.");
      return;
    }

    const isFollowing = followedUsers.includes(followUserId);

    try {
      if (isFollowing) {
        await axios.delete(`http://localhost:8081/unfollow/${followUserId}`, {
          data: { followerId: user.userID },
        });

        setFollowedUsers((prev) => {
          const updatedFollowedUsers = prev.filter((id) => id !== followUserId);
          localStorage.setItem(
            "followedUsers",
            JSON.stringify(updatedFollowedUsers)
          );
          return updatedFollowedUsers;
        });

        alert(`You have unfollowed user ${followUserId}`);
      } else {
        await axios.post(`http://localhost:8081/follow/${followUserId}`, {
          followerId: user.userID,
        });

        setFollowedUsers((prev) => {
          const updatedFollowedUsers = [...prev, followUserId];
          localStorage.setItem(
            "followedUsers",
            JSON.stringify(updatedFollowedUsers)
          );
          return updatedFollowedUsers;
        });

        alert(`You are now following user ${followUserId}`);
      }

      window.location.reload();
    } catch (error) {
      console.error("Error toggling follow status:", error);
      alert("There was an error processing your request.");
    }
  };

  if (!user) return null;

  return (
    <div className="p-2">
      <div
        className="rounded border border-secondary-subtle shadow-sm p-3 mt-1"
        style={{ backgroundColor: "white" }}
      >
        <DiaryEntryButton onEntrySaved={fetchEntries} />
      </div>
      <div className="d-flex justify-content-end">
        <FilterButton />
      </div>

      {entries.length === 0 ? (
        <p>No entries available.</p>
      ) : (
        entries.map((entry) => (
          <div
            key={entry.entryID}
            className="rounded border border-secondary-subtle shadow-sm p-3 mb-2"
            style={{ backgroundColor: "white" }}
          >
            <div className="d-flex align-items-center gap-2 border-bottom pb-2">
              <div className="profilePicture"></div>

              <p className="m-0">
                {user && entry.userID === user.userID
                  ? entry.visibility === "public" &&
                    entry.anonimity === "private"
                    ? `${entry.username} - Anonymous`
                    : entry.username
                  : entry.visibility === "public" &&
                    entry.anonimity === "private"
                  ? "Anonymous"
                  : entry.username}
              </p>
              {user && user.userID !== entry.userID && (
                <div>
                  <button
                    className="orangeButton"
                    onClick={() => handleFollowToggle(entry.userID)}
                  >
                    {followedUsers.includes(entry.userID)
                      ? "Following"
                      : "Follow"}
                  </button>
                </div>
              )}
            </div>

            <div className="text-start border-bottom p-2">
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

            <div className="row pt-2">
              <div className="col">
                <button
                  className={`InteractButton ${
                    activeButtons[entry.entryID] ? "active" : ""
                  } ${expandButtons[entry.entryID] ? "expand" : ""}`}
                  onClick={() => handleClick(entry.entryID)}
                >
                  <span>({entry.gadifyCount}) </span>Gadify
                </button>
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
