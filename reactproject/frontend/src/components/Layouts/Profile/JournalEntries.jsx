import { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const RecentJournalEntries = ({ userID, ownProfile }) => {
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8081/fetchUserEntry/user/${userID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No entry found");
        }
        return response.json();
      })
      .then((data) => {
        setEntries(data.entries);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userID]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="bg-light border border-secondary-subtle rounded shadow p-2">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-lg-none">
        <Accordion>
          <Accordion.Item eventKey="diaryEntries">
            <Accordion.Header>
              <div className="d-flex align-items-center gap-1">
                <i class="bx bx-edit"></i>
                <h5 className="m-0">Diary entries</h5>
              </div>
            </Accordion.Header>
            <Accordion.Body className="p-0 border-top">
              {error ? (
                <div>
                  <p>{error}</p>
                </div>
              ) : entries.length === 0 ? (
                <div>
                  <p>No entries available.</p>
                </div>
              ) : (
                <div
                  className="px-2 pt-2 my-1 me-1 custom-scrollbar"
                  style={{ eight: "35vh", overflowY: "scroll" }}
                >
                  {entries.map((entry) => (
                    <Link
                      to={`/DiaryEntry/${entry.entryID}`}
                      key={entry.entryID}
                      className="rounded text-decoration-none  text-secondary"
                      style={{ cursor: "pointer" }}
                    >
                      <div
                        className="grayHover  d-flex align-items-start flex-column rounded text-start ps-2  py-2"
                        style={{ backgroundColor: "#ffff" }}
                      >
                        <p className="m-0">
                          {entry.title} - {formatDate(entry.created_at)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className=" p-2 text-secondary d-none d-lg-block">
        <div className="d-flex justify-content-between border-bottom border-secondary-subtle px-1 pb-2">
          <div className="d-flex align-items-center">
            <h5 className="m-0">Diary entries</h5>
          </div>
          {ownProfile ? (
            <div>
              <Link
                to="/DiaryEntries"
                className=" rounded text-decoration-none"
                style={{ cursor: "pointer" }}
              >
                <h6 className="m-0 linkText rounded">View All</h6>
              </Link>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {error ? (
          <div>
            <p>{error}</p>
          </div>
        ) : entries.length === 0 ? (
          <div>
            <p>No entries available.</p>
          </div>
        ) : (
          <div
            className="pe-2 pt-2 mt-1 custom-scrollbar"
            style={{ height: "35vh", overflowY: "scroll" }}
          >
            {entries.map((entry) => (
              <Link
                to={`/DiaryEntry/${entry.entryID}`}
                key={entry.entryID}
                className="rounded text-decoration-none  text-secondary"
                style={{ cursor: "pointer" }}
              >
                <div className="journalEntries d-flex align-items-start flex-column rounded text-start ps-2  py-2">
                  <p className="m-0">
                    {entry.title} - {formatDate(entry.created_at)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentJournalEntries;
