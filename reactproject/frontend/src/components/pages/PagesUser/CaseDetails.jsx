import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import sampleImage from "../../../assets/Background.jpg";
import MainLayout from "../../Layouts/MainLayout";
import BackButton from "../../Layouts/Home/BackButton";
import { jsPDF } from "jspdf";

const CaseDetails = () => {
  const { reportID } = useParams();
  const [caseDetails, setCaseDetails] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch case details based on reportID
    axios
      .get(`http://localhost:8081/reports/${reportID}`)
      .then((response) => {
        console.log(response.data);
        setCaseDetails(response.data);
        setError(null);
      })
      .catch((err) => {
        setError("Failed to load case details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [reportID]);

  const handleAddressed = (reportID) => {
    const confirmed = window.confirm(
      "Are you sure you want to address this entry?"
    );
    if (confirmed) {
      axios
        .put(`http://localhost:8081/reports/${reportID}`)
        .then(() => {
          alert("The case has been addressed!");
          fetchReports();
        })
        .catch((err) => {
          setError(err.response?.data?.error || "Failed to update case report");
        });
    }
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <MainLayout ActiveTab="Complaints">
        <div className="d-flex justify-content-center py-3">
          <p>Loading case details...</p>
        </div>
      </MainLayout>
    );
  }

  const documents = Array.isArray(caseDetails.supportingDocuments)
    ? caseDetails.supportingDocuments
    : [caseDetails.supportingDocuments];
  // If it's not an array, convert it into one

  if (error) {
    return (
      <MainLayout ActiveTab="Complaints">
        <div className="d-flex justify-content-center py-3">
          <p className="text-danger">{error}</p>
        </div>
      </MainLayout>
    );
  }

  const downloadData = async (format) => {
    if (format === "excel") {
      const header = [
        "Victim's Name",
        "Sex",
        "Contact Number",
        "Perpetrator's Name",
        "Location",
        "Date",
        "Description",
      ];
      const rows = [
        [
          caseDetails.victimName,
          caseDetails.gender,
          caseDetails.contactInfo,
          caseDetails.perpetratorName,
          caseDetails.location,
          new Date(caseDetails.date).toLocaleDateString(),
          caseDetails.incidentDescription,
        ],
      ];

      const csvContent = [header, ...rows]
        .map((row) => row.join(","))
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "case_details.csv";
      link.click();
      URL.revokeObjectURL(url);
    } else if (format === "pdf") {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Define colors
      const primaryColor = "#5c0099";
      const secondaryColor = "#ffb31a";
      const lightGray = "#f5f5f5";

      // Add header with styling
      doc.setFillColor(primaryColor);
      doc.rect(0, 0, 210, 30, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("Case Details", 105, 20, { align: "center" });

      // Add current date
      doc.setFontSize(10);
      doc.setTextColor(220, 220, 220);
      doc.text(new Date().toLocaleDateString(), 195, 10, { align: "right" });

      // Start content after header
      let yPos = 45;

      // Define sections with their content
      const sections = [
        {
          title: "Victim Information",
          content: [
            ["Name", caseDetails.victimName],
            ["Sex", caseDetails.gender],
            ["Contact", caseDetails.contactInfo],
          ],
        },
        {
          title: "Incident Details",
          content: [
            ["Perpetrator", caseDetails.perpetratorName],
            ["Location", caseDetails.location],
            ["Date", new Date(caseDetails.date).toLocaleDateString()],
          ],
        },
      ];

      // Function to add styled section
      const addSection = (section, startY) => {
        let currentY = startY;

        // Section title with background
        doc.setFillColor(secondaryColor);
        doc.rect(10, currentY - 5, 190, 10, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(section.title, 15, currentY);
        currentY += 10;

        // Section content
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");

        section.content.forEach(([label, value]) => {
          doc.setFillColor(lightGray);
          doc.rect(10, currentY - 5, 190, 7, "F");

          doc.setFont("helvetica", "bold");
          doc.text(label + ":", 15, currentY);
          doc.setFont("helvetica", "normal");
          doc.text(value || "Not provided", 50, currentY);
          currentY += 8;
        });

        return currentY + 5;
      };

      // Add each section
      sections.forEach((section) => {
        yPos = addSection(section, yPos);
      });

      // Add description section
      doc.setFillColor(secondaryColor);
      doc.rect(10, yPos - 5, 190, 10, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Description", 15, yPos);

      // Description content with text wrapping
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const splitDescription = doc.splitTextToSize(
        caseDetails.incidentDescription,
        180
      );
      doc.text(splitDescription, 15, yPos + 10);

      yPos += 20 + splitDescription.length * 5;

      // Add Supporting Documents section
      if (
        caseDetails.supportingDocuments &&
        Array.isArray(JSON.parse(caseDetails.supportingDocuments)) &&
        JSON.parse(caseDetails.supportingDocuments).length > 0
      ) {
        // Section header for supporting documents
        doc.setFillColor(secondaryColor);
        doc.rect(10, yPos - 5, 190, 10, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Supporting Documents(Proof of Incident)", 15, yPos);
        yPos += 15;

        // Function to load image and convert to base64
        const loadImage = async (url) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => {
              const canvas = document.createElement("canvas");
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);
              resolve(canvas.toDataURL("image/jpeg"));
            };
            img.onerror = reject;
            img.src = url;
          });
        };

        // Add images to PDF
        const addImages = async () => {
          const documents = JSON.parse(caseDetails.supportingDocuments);
          let currentX = 15;
          const startY = yPos;
          const imageWidth = 85; // Approximately 3 images per row
          const imageHeight = 60;

          for (let i = 0; i < documents.length; i++) {
            try {
              const imageUrl = `http://localhost:8081${documents[i]}`;
              const base64Image = await loadImage(imageUrl);

              // Add new page if image would overflow
              if (yPos + imageHeight > 280) {
                doc.addPage();
                yPos = 20;
                currentX = 15;
              }

              // New row if image would overflow horizontally
              if (currentX + imageWidth > 200) {
                currentX = 15;
                yPos += imageHeight + 10;
              }

              doc.addImage(
                base64Image,
                "JPEG",
                currentX,
                yPos,
                imageWidth,
                imageHeight
              );
              currentX += imageWidth + 5;
            } catch (error) {
              console.error("Error loading image:", error);
            }
          }
        };

        // Wait for images to be added before finalizing PDF
        await addImages();
      }

      // Add footer
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: "center" });
      }

      // Add watermark
      doc.setGState(new doc.GState({ opacity: 0.5 }));
      doc.setTextColor(200, 200, 200);
      doc.setFontSize(60);
      doc.text("SIKAT EDIARY", 140, 140, {
        align: "center",
        angle: 50,
      });

      // Save the PDF
      doc.save("case_details.pdf");
    }
  };

  return (
    <MainLayout ActiveTab="Complaints">
      <div className="d-flex justify-content-center py-3 mt-3">
        <div
          className="rounded shadow p-3"
          style={{
            backgroundColor: "#ffff",
            width: "clamp(30rem, 70vw, 50rem)",
          }}
        >
          <div className="position-relative border-bottom border-2 d-flex align-items-end justify-content-center gap-2 pb-2">
            {/* <Link
              className="position-absolute text-dark"
              style={{ left: "0" }}
              to="/Home"
            >
              <i className="bx bx-arrow-back bx-sm"></i>
            </Link> */}
            <BackButton></BackButton>

            <h4 className="m-0">
              Case Details{" "}
              <span
                className={`${
                  caseDetails.isAddress ? "text-success" : "text-danger"
                }`}
              >
                {caseDetails.isAddress ? "(Addressed)" : "(Pending)"}
              </span>
            </h4>
          </div>

          <form className="text-start" style={{ minHeight: "20rem" }}>
            <h5 className="mt-3">Victim Details</h5>
            <div className="px-2 d-flex flex-column gap-2">
              <div className="row gap-1">
                <div className="col-md-7">
                  <h6 className="m-0">Name</h6>
                  <p className="m-0 ps-2 border-bottom text-secondary">
                    {caseDetails.victimName}
                  </p>
                </div>
                <div className="col-md">
                  <h6 className="m-0">Sex</h6>
                  <p className="m-0 ps-2 border-bottom text-secondary">
                    {caseDetails.gender}
                  </p>
                </div>
              </div>

              <div>
                <h6 className="m-0">Contact Number</h6>
                <p className="m-0 ps-2 border-bottom text-secondary">
                  {caseDetails.contactInfo}
                </p>
              </div>
            </div>
            {/* Incident Details */}
            <h5 className="mt-3">Incident Details</h5>
            <div className="px-2 d-flex flex-column gap-3">
              <div className="row">
                <div className="col-md-7">
                  <h6 className="m-0">Perpetrator's Name</h6>
                  <p className="m-0 ps-2 border-bottom text-secondary">
                    {caseDetails.perpetratorName}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-7">
                  <h6 className="m-0">Location</h6>
                  <p className="m-0 ps-2 border-bottom text-secondary">
                    {caseDetails.location}
                  </p>
                </div>
                <div className="col-md">
                  <h6 className="m-0">Date</h6>
                  <p className="m-0 ps-2 border-bottom text-secondary">
                    {new Date(caseDetails.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <h6 className="m-0">Description</h6>
                <p className="m-0 ps-2 border-bottom text-secondary">
                  {caseDetails.incidentDescription}
                </p>
              </div>
            </div>

            <div>
              <h5 className="mt-3">Proof of Incident</h5>
              <div className="d-flex flex-wrap justify-content-center justify-content-sm-start gap-2">
                {caseDetails.supportingDocuments &&
                Array.isArray(JSON.parse(caseDetails.supportingDocuments)) &&
                JSON.parse(caseDetails.supportingDocuments).length > 0 ? (
                  JSON.parse(caseDetails.supportingDocuments).map(
                    (document, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          handleImageClick(`http://localhost:8081${document}`)
                        }
                      >
                        <div
                          className="supportImageContainer overflow-hidden border-0"
                          style={{
                            cursor: "pointer",
                            width: "clamp(8rem, 10vw, 10rem)",
                            height: "clamp(8rem, 10vw, 10rem)",
                          }}
                        >
                          <img
                            src={`http://localhost:8081${document}`} // Displaying the supporting document as an image
                            alt={`Supporting Document ${index + 1}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <p>No supporting documents available.</p>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-end flex-column gap-1 mt-2">
              {/* {caseDetails.isAddress ? (
                ""
              ) : (
                <button
                  className="primaryButton w-100 py-2"
                  onClick={() => handleAddressed(reportID)}
                >
                  <p className="m-0">Mark as Addressed</p>
                </button>
              )} */}

              <div className="row d-flex gy-1">
                <div className="col-sm pe-sm-1">
                  <button
                    className="w-100 primaryButton py-2 py-md-2"
                    onClick={() => downloadData("excel")}
                  >
                    <p className="m-0">Download as Excel</p>
                  </button>
                </div>
                <div className="col-sm ps-sm-1">
                  <button
                    className="w-100 primaryButton py-2 py-md-2 mx-a"
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        await downloadData("pdf");
                      } catch (err) {
                        console.error("Error downloading PDF:", err);
                        alert("Failed to download PDF. Please try again.");
                      }
                    }}
                  >
                    <p className="m-0">Download as PDF</p>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Body className="p-0 d-flex justify-content-center">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Enlarged proof"
                style={{ width: "auto", height: "60vh" }}
              />
            )}
          </Modal.Body>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default CaseDetails;
