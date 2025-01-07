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
                  className="my-1 px-2 custom-scrollbar"
                  style={{ eight: "35vh", overflowY: "scroll" }}
                >
                  {entries.map((entry) => {
                    if (
                      (!ownProfile && entry.visibility === "private") ||
                      entry.anonimity === "private"
                    ) {
                      return null;
                    }
                    return (
                      <Link
                        key={entry.entryID}
                        to={`/DiaryEntry/${entry.entryID}`}
                        className="rounded text-decoration-none"
                      >
                        <div className="journalEntries d-flex flex-column rounded ps-1 mt-1">
                          <div>
                            <div className="d-flex flex-column align-items-start p-1">
                              <p className="m-0 text-start text-secondary">
                                {entry.title}{" "}
                                <span>
                                  {entry.visibility === "private" ? (
                                    <i class="bx bx-lock-alt"></i>
                                  ) : (
                                    <i class="bx bx-globe"></i>
                                  )}
                                </span>
                              </p>
                              <span
                                className="text-secondary"
                                style={{
                                  fontSize: "clamp(0.6rem, 1.5dvw, 0.7rem)",
                                }}
                              >
                                {formatDate(entry.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className=" p-2 text-secondary d-none d-lg-block">
        <div className="d-flex justify-content-between border-bottom border-secondary-subtle px-1 pb-2">
          <div className="d-flex align-items-center text-secondary gap-1">
            <i className="bx bx-edit bx-sm"></i>
            <h5 className="m-0 text-start">Diary Entries</h5>
          </div>
          {ownProfile ? (
            <Link to="/DiaryEntries" className="linkText rounded p-1">
              <p className="m-0">View All</p>
            </Link>
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
            <p className="m-0 text-secondary mt-1 mt-xl-3">
              No entries available.
            </p>
          </div>
        ) : (
          <div
            className="pe-2 mt-1 custom-scrollbar"
            style={{ height: "35vh", overflowY: "scroll" }}
          >
            {entries.map((entry) => {
              if (
                (!ownProfile && entry.visibility === "private") ||
                entry.anonimity === "private"
              ) {
                return null;
              }
              return (
                <Link
                  key={entry.entryID}
                  to={`/DiaryEntry/${entry.entryID}`}
                  className="rounded text-decoration-none"
                >
                  <div className="journalEntries d-flex flex-column rounded ps-1 mt-1">
                    <div>
                      <div className="d-flex flex-column align-items-start p-1">
                        <p className="m-0 text-start text-secondary">
                          {entry.title}{" "}
                          <span>
                            {entry.visibility === "private" ? (
                              <i class="bx bx-lock-alt"></i>
                            ) : (
                              <i class="bx bx-globe"></i>
                            )}
                          </span>
                        </p>
                        <span
                          className="text-secondary"
                          style={{ fontSize: "clamp(0.6rem, 1.5dvw, 0.7rem)" }}
                        >
                          {formatDate(entry.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentJournalEntries;
