import React from "react";
import { Link } from "react-router-dom";

const DiaryOwnerDetails = ({
  userID,
  isAdmin,
  firstName,
  lastName,
  alias,
  anonimity,
  visibility,
  imageFile,
  anonymousImage,
  defaultImage,
  date,
  // handleFollowToggle,
}) => {
  const formatDate = (dateString) => {
    const entryDate = new Date(dateString);
    const now = new Date();
    const timeDiff = now - entryDate;

    return timeDiff < 24 * 60 * 60 * 1000
      ? entryDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : entryDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
  };
  return (
    <div>
      {/* // IF PUBLIC */}
      <div className="d-flex align-items-center gap-2 text-secondary">
        {/* TO DETERMINE IF THE DIARY IN ANONYMOUS OR NOT */}
        {anonimity === "private" ? (
          <div className="profilePicture">
            <img
              src={isAdmin === 1 ? imageFile : anonymousImage}
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ) : (
          <Link to={`/Profile/${userID}`} className="linkText rounded p-0">
            <div className="profilePicture">
              <img
                src={imageFile ? imageFile : defaultImage}
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </Link>
        )}

        <div className="d-flex flex-column align-items-start">
          <div className="d-flex align-items-center justify-content-center gap-1">
            {anonimity === "private" ? (
              <h5 className="m-0">{alias}</h5>
            ) : (
              <Link to={`/Profile/${userID}`} className="linkText rounded p-0">
                <h5 className="m-0 text-start">
                  {isAdmin === 1
                    ? "Gender and Development"
                    : firstName && lastName
                    ? firstName + " " + lastName
                    : firstName + " " + lastName}
                </h5>
              </Link>
            )}

            {
              // user &&
              userID !== userID && anonimity !== "private" && isAdmin !== 1 && (
                <div className="d-flex align-items-center gap-1">
                  <h3
                    className="m-0 text-secondary d-flex align-items-center"
                    style={{ height: ".9rem" }}
                  >
                    ·
                  </h3>
                  {/* <button
                    className="secondaryButton p-0 m-0"
                    onClick={() => handleFollowToggle}
                    style={{ height: "" }}
                  >
                    <h5 className="m-0">
                      {followedUsers.includes(userID) ? "Following" : "Follow"}
                    </h5>{" "}
                  </button> */}
                </div>
              )
            }
          </div>
          <p className="m-0" style={{ fontSize: ".7rem" }}>
            {formatDate(date)}
            <span>
              {visibility === "public" ? (
                <i class="bx bx-globe"></i>
              ) : (
                <i class="bx bx-lock-alt"></i>
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiaryOwnerDetails;
