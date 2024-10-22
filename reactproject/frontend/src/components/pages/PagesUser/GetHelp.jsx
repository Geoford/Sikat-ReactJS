import React, { useState } from "react";
import UserPageMainLayout from "../../Layouts/LayoutUser/UserPageMainLayout";
import { PreLoader } from "../PreLoader";

const GetHelp = () => {
  const [formData, setFormData] = useState({
    victimName: "",
    perpetratorName: "",
    contactInfo: "",
    gender: "",
    incidentDescription: "",
    location: "",
    date: "",
    time: "",
    witnesses: "",
    supportingDocuments: null,
  });

  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    fetch("http://localhost:8081/submit-report", {
      method: "POST",
      body: formDataToSend,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message); // Display success message
      })
      .catch((error) => {
        console.error("Error submitting report:", error);
      });
  };

  return (
    <UserPageMainLayout>
      <PreLoader></PreLoader>
      <div className="d-flex justify-content-center pt-5">
        <div
          className="rounded p-3"
          style={{
            backgroundColor: "#ffff",
            width: "clamp(30rem, 50vw, 40rem)",
          }}
        >
          <div className="border-bottom border-2">
            <h4>Gender-Based Crime Reporting Form</h4>
          </div>

          <form className="text-start" onSubmit={handleSubmit}>
            {/* Step 1: Report Details */}
            {step === 1 && (
              <div>
                <h5>Step 1: Report Details</h5>
                <div>
                  <label htmlFor="victimName">Victim's Name</label>
                  <input
                    type="text"
                    name="victimName"
                    value={formData.victimName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="perpetratorName">Perpetrator's Name</label>
                  <input
                    type="text"
                    name="perpetratorName"
                    value={formData.perpetratorName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contactInfo">Your Contact Information</label>
                  <input
                    type="text"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="gender">Your Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                <div className="d-flex justify-content-between">
                  <button type="button" onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Incident Details */}
            {step === 2 && (
              <div>
                <h5>Step 2: Incident Details</h5>
                <div>
                  <label htmlFor="incidentDescription">
                    Description of the Incident
                  </label>
                  <textarea
                    name="incidentDescription"
                    value={formData.incidentDescription}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="location">Location of Incident</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="date">Date of Incident</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="time">Time of Incident</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="button" onClick={handlePrev}>
                  Previous
                </button>
                <button type="button" onClick={handleNext}>
                  Next
                </button>
              </div>
            )}

            {/* Step 3: Supporting Details */}
            {step === 3 && (
              <div>
                <h5>Step 3: Supporting Details</h5>
                <div>
                  <label htmlFor="supportingDocuments">
                    Upload Supporting Documents (Optional)
                  </label>
                  <input
                    type="file"
                    name="supportingDocuments"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="witnesses">Any Witnesses? (If any)</label>
                  <input
                    type="text"
                    name="witnesses"
                    value={formData.witnesses}
                    onChange={handleChange}
                  />
                </div>

                <button type="button" onClick={handlePrev}>
                  Previous
                </button>
                <button type="submit">Submit Report</button>
              </div>
            )}
          </form>
        </div>
      </div>
    </UserPageMainLayout>
  );
};

export default GetHelp;
