const RecentJournalEntries = () => {
  return (
    <div>
      <div className=" bg-light border border-secondary-subtle rounded shadow  p-2">
        <div className="d-flex justify-content-between border-bottom pt-2 px-1">
          <div>
            <h5>Journal entries</h5>
          </div>
          <div>
            <p className="orangerText" style={{ cursor: "pointer" }}>
              View All
            </p>
          </div>
        </div>
        <div
          className="pe-1 mt-1"
          style={{ height: "35vh", overflowY: "scroll" }}
        >
          <div className="journalEntries d-flex align-items-start flex-column rounded ps-2 py-2">
            <p className="m-0">Journal Title (date)</p>
          </div>
          <div className="journalEntries d-flex align-items-start flex-column rounded ps-2 py-2">
            <p className="m-0">Journal Title (date)</p>
          </div>
          <div className="journalEntries d-flex align-items-start flex-column rounded ps-2 py-2">
            <p className="m-0">Journal Title (date)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentJournalEntries;
