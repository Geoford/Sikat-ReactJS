import React from "react";

const DiaryDetails = ({
  entry,
  isAdmin,
  entrySubject,
  containAlarmingWords,
  title,
  description,
}) => {
  return (
    <div>
      <div className="d-flex alig-items-center gap-1 position-relative">
        {entry.subjects === "None(no subject or topic)" ? null : (
          <h6 className="text-secondary m-0 mt-2">
            <span style={{ fontSize: "clamp(0.7rem, 1dvw, .85rem)" }}>
              Trigger Warning: {entry.subjects}
            </span>
          </h6>
        )}
        {containAlarmingWords && isAdmin ? (
          <div className="d-flex justify-content-center align-items-end pt-1 gap-1">
            <div className="informationToolTip accordion text-danger align-middle">
              <h4 className="m-0">
                <i class="bx bx-error" style={{}}></i>
              </h4>
              <p
                className="infToolTip rounded p-2 m-0 text-center"
                style={{
                  backgroundColor: "rgb(179, 0, 0, .7)",
                  width: "85%",
                }}
              >
                This diary entry has been flagged by the system as potentially
                containing sensitive or distressing topics and may require
                immediate attention.
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="d-flex gap-1 align-items-center mt-2">
        <div className="d-flex flex-column gap-1">
          <h5 className="m-0">{title}</h5>
        </div>
      </div>
      <p style={{ whiteSpace: "pre-wrap" }}>{description}</p>
    </div>
  );
};

export default DiaryDetails;
