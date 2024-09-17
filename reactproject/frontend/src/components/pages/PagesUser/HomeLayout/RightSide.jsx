import DiaryEntry from "../../../../assets/DiaryEntry.png";
import SampleImage from "../../../../assets/Background.jpg";
const Center = () => {
  return (
    <div className="p-2">
      <div className=" bg-light rounded border p-3 mb-2">
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
          style={{ height: "200px", overflowY: "scroll" }}
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
      <div className=" bg-light rounded border p-3">
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
