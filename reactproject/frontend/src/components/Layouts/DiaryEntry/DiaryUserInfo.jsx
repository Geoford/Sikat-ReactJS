import React from "react";

const DiaryUserInfo = ({
  isAdmin,
  profileImage,
  anonymous,
  defaultProfile,
  entry,
  user,
  followedUsers,
  handleFollowToggle,
  formatDate,
}) => {
  const isAnonymous = entry.anonimity === "private";
  return (
    <>
      <div className="DiaryUserInfo">
        <img
          src={
            isAdmin
              ? `http://localhost:8081${profileImage}`
              : profileImage
              ? `http://localhost:8081${profileImage}`
              : anonymous || defaultProfile
          }
          alt="Profile"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="d-flex flex-column align-items-start">
        <div className="d-flex align-items-center justify-content-center gap-1">
          {isAnonymous ? (
            <h5 className="m-0">{entry.alias}</h5>
          ) : (
            <Link
              to={`/Profile/${entry.userID}`}
              className="linkText rounded p-0"
            >
              <h5 className="m-0 text-start">
                {entry.isAdmin
                  ? "Gender and Development"
                  : entry.firstName && entry.lastName
                  ? `${entry.firstName} ${entry.lastName}`
                  : `${user.firstName} ${user.lastName}`}
              </h5>
            </Link>
          )}
          {user &&
            user.userID !== entry.userID &&
            !isAnonymous &&
            entry.isAdmin !== 1 && (
              <div className="d-flex align-items-center gap-1">
                <h3
                  className="m-0 text-secondary d-flex align-items-center"
                  style={{ height: ".9rem" }}
                >
                  ·
                </h3>
                <button
                  className="secondaryButton p-0 m-0"
                  onClick={() => handleFollowToggle(entry.userID)}
                >
                  <h5 className="m-0">
                    {followedUsers.includes(entry.userID)
                      ? "Following"
                      : "Follow"}
                  </h5>
                </button>
              </div>
            )}
        </div>
        <p className="m-0" style={{ fontSize: ".7rem" }}>
          {formatDate(entry.created_at)}{" "}
          <span>
            {entry.visibility === "public" ? (
              <i className="bx bx-globe"></i>
            ) : (
              <i className="bx bx-lock-alt"></i>
            )}
          </span>
        </p>
      </div>
    </>
  );
};

export default DiaryUserInfo;
