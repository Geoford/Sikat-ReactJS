import React, { useState, useEffect } from "react";
import UserPageMainLayout from "../../Layouts/MainLayout";
import { PreLoader } from "../PreLoader";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import SubjectSelection from "../../Layouts/LayoutUser/SubjectSelection";

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
    supportingDocuments1: null,
    supportingDocuments2: null,
    supportingDocuments3: null,
    supportingDocuments4: null,
    supportingDocuments5: null,
  });

  const [step, setStep] = useState(1);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [imagePreview3, setImagePreview3] = useState(null);
  const [imagePreview4, setImagePreview4] = useState(null);
  const [imagePreview5, setImagePreview5] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];

      // Create a preview for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        switch (name) {
          case "supportingDocuments1":
            setImagePreview1(reader.result);
            break;
          case "supportingDocuments2":
            setImagePreview2(reader.result);
            break;
          case "supportingDocuments3":
            setImagePreview3(reader.result);
            break;
          case "supportingDocuments4":
            setImagePreview4(reader.result);
            break;
          case "supportingDocuments5":
            setImagePreview5(reader.result);
            break;
          default:
            break;
        }
      };
      reader.readAsDataURL(file);
    }

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleRemoveImage = (name) => {
    setFormData({ ...formData, [name]: null });
    switch (name) {
      case "supportingDocuments1":
        setImagePreview1(null);
        break;
      case "supportingDocuments2":
        setImagePreview2(null);
        break;
      case "supportingDocuments3":
        setImagePreview3(null);
        break;
      case "supportingDocuments4":
        setImagePreview4(null);
        break;
      case "supportingDocuments5":
        setImagePreview5(null);
        break;
      default:
        break;
    }
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

  const inputStyle = {
    height: "2.5rem",
    width: "100%",
    borderColor: "lightgray",
  };

  return (
    <UserPageMainLayout>
      <PreLoader></PreLoader>
      <div className="d-flex justify-content-center py-3">
        <div
          className=" container-fluid container-lg rounded shadow p-3"
          style={{
            backgroundColor: "#ffff",
            // width: "clamp(30rem, 50vw, 40rem)",
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

            <div className="d-flex flex-column justify-content-between">
              <div className="d-flex flex-column gap-0">
                <h5 className="mt-2">Report Details</h5>
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
                <div className="row">
                  <div className="col-sm-12 col-md input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Contact Number"
                      name="contactInfo"
                      value={formData.contactInfo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-sm-12 col-md">
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
              </div>
            </div>

            {/* Step 2: Incident Details */}
            <div className="d-flex flex-column justify-content-between">
              <div className="d-flex flex-column gap-0">
                <h5 className="my-2">Incident Details</h5>
                <div className="row">
                  <div className="col-sm-12 col-md input-group mb-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Perpetrator's Name(Optional)"
                      name="perpetratorName"
                      value={formData.perpetratorName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-12 col-md-2 ">
                    <SubjectSelection></SubjectSelection>
                  </div>
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
                <div className="row">
                  <div className="col-sm-12 col-md input-group mb-1 d-flex flex-column">
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

                  <div className="col-sm-12 col-md input-group mb-1 d-flex flex-column">
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
                </div>
              </div>
            </div>

            {/* Step 3: Evidence Upload */}
            <div className="d-flex flex-column justify-content-between">
              <div>
                <h5 className="my-2">Upload Proof of Incident (optional)</h5>
                {/* <p className="m-0">Photo Evidence</p> */}
                {/* Supporting Document Uploads */}
                <div className="d-flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((index) => {
                    const docKey = `supportingDocuments${index}`;
                    const previewKey = `imagePreview${index}`;
                    const imagePreview = eval(previewKey); // Get the current image preview state
                    return (
                      <div key={index} className="mb-1">
                        <label
                          htmlFor={docKey}
                          className="form-label supportImageContainer position-relative d-flex justify-content-center align-items-center"
                        >
                          {/* Show image preview or icon when no image */}
                          {imagePreview ? (
                            <img
                              className="imagePreview"
                              src={imagePreview}
                              alt={`preview ${index}`}
                              style={{ maxWidth: "100%", maxHeight: "100%" }}
                            />
                          ) : (
                            <i className="bx bx-image-add bx-md text-secondary"></i> // Display icon
                          )}

                          {/* Remove button when image is present */}
                          {formData[docKey] && (
                            <button
                              type="button"
                              className="position-absolute text-light rounded p-0"
                              onClick={() => handleRemoveImage(docKey)}
                              style={{
                                width: "20px",
                                height: "20px",
                                lineHeight: "20px",
                                textAlign: "center",
                                fontSize: "12px",
                              }}
                            >
                              x
                            </button>
                          )}
                        </label>

                        {/* Hidden input field for file upload */}
                        <input
                          hidden
                          id={docKey} // Ensure ID matches the htmlFor in the label
                          type="file"
                          name={docKey}
                          className="form-control"
                          onChange={handleChange}
                          accept="image/*"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="d-flex justify-content-end mt-2">
                <button className="primaryButton w-100 py-2" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </UserPageMainLayout>
  );
};

export default GetHelp;
