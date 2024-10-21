import React, { useState, useEffect } from "react";
import UserPageMainLayout from "../../Layouts/LayoutUser/UserPageMainLayout";
import { PreLoader } from "../PreLoader";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

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
  const [isNextDisabled, setIsNextDisabled] = useState(true);

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
    // Handle form submission
  };

  // Validate required fields based on the current step
  useEffect(() => {
    const validateStep = () => {
      if (step === 1) {
        setIsNextDisabled(!formData.contactInfo || !formData.gender);
      } else if (step === 2) {
        setIsNextDisabled(
          !formData.incidentDescription ||
            !formData.location ||
            !formData.date ||
            !formData.time
        );
      } else {
        setIsNextDisabled(false); // No required fields in step 3
      }
    };
    validateStep();
  }, [formData, step]);

  const inputStyle = {
    height: "2.5rem",
    width: "100%",
    borderColor: "lightgray",
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

          <form
            className="text-start"
            onSubmit={handleSubmit}
            style={{ minHeight: "20rem" }}
          >
            {/* Step 1: Report Details */}
            {step === 1 && (
              <div
                className="d-flex flex-column justify-content-between"
                style={{ height: "20rem" }}
              >
                <div className="d-flex flex-column gap-2">
                  <h5 className="my-2">Step 1: Report Details</h5>
                  <div className="input-group mb-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Victim's Name(Optional)"
                      name="victimName"
                      value={formData.victimName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group mb-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Contact Information"
                      name="contactInfo"
                      value={formData.contactInfo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <select
                      className="ps-2 rounded"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="prefer-not-to-say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-2">
                  <button
                    className="btn btn-secondary disabled"
                    type="button"
                    onClick={handlePrev}
                  >
                    Previous
                  </button>
                  <button
                    className="primaryButton"
                    type="button"
                    onClick={handleNext}
                    disabled={isNextDisabled}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Incident Details */}
            {step === 2 && (
              <div className="d-flex flex-column justify-content-between">
                <div className="d-flex flex-column gap-2">
                  <h5 className="my-2">Step 2: Incident Details</h5>

                  <div className="input-group mb-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Perpetrator's Name(Optional)"
                      name="perpetratorName"
                      value={formData.perpetratorName}
                      onChange={handleChange}
                    />
                  </div>
                  <FloatingLabel
                    controlId="floatingTextarea2"
                    label="Description of the Incident"
                  >
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: "100px" }}
                      name="incidentDescription"
                      value={formData.incidentDescription}
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>

                  <div className="input-group mb-1 d-flex flex-column">
                    <label htmlFor="location" className="form-label m-0">
                      Location of Incident
                    </label>
                    <input
                      type="text"
                      className="form-control w-100"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      style={{ borderRadius: "0.43rem" }}
                      required
                    />
                  </div>

                  <div className="input-group mb-1 d-flex flex-column">
                    <label htmlFor="date" className="form-label m-0">
                      Date of Incident
                    </label>
                    <input
                      type="date"
                      className="form-control w-100 border"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: "0.43rem" }}
                    />
                  </div>

                  <div className="input-group mb-1 d-flex flex-column">
                    <label htmlFor="time" className="form-label m-0">
                      Time of Incident
                    </label>
                    <input
                      type="time"
                      className="form-control w-100 border"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: "0.43rem" }}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-2">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={handlePrev}
                  >
                    Previous
                  </button>
                  <button
                    className="primaryButton"
                    type="button"
                    onClick={handleNext}
                    disabled={isNextDisabled}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Supporting Details */}
            {step === 3 && (
              <div className="d-flex flex-column justify-content-between">
                <div>
                  <h5 className="my-2">Step 3: Supporting Details</h5>

                  <div className="input-group mb-1">
                    <label htmlFor="supportingDocuments" className="form-label">
                      Upload Supporting Documents (Optional)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      name="supportingDocuments"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group mb-1">
                    <label htmlFor="witnesses" className="form-label">
                      Any Witnesses? (If any)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="witnesses"
                      value={formData.witnesses}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-2">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={handlePrev}
                  >
                    Previous
                  </button>
                  <button className="primaryButton" type="submit">
                    Submit Report
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </UserPageMainLayout>
  );
};

export default GetHelp;
