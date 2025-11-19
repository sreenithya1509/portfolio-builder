import React, { useState, useRef, useEffect } from "react";
import "./index.css";

import PortfolioForm from "./components/PortfolioForm";
import PortfolioPreview from "./components/PortfolioPreview";
import ThemeSelector from "./components/ThemeSelector";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [theme, setTheme] = useState("theme1");

  // DARK MODE
  const [darkMode, setDarkMode] = useState(false);

  // FORM DATA
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    image: "",
    skills: "",
    experience: "",
    education: "",
    achievements: "",
    projects: [],
    email: "",
    location: "",
    socials: "",
  });

  const previewRef = useRef(null);

  /* ===================== AUTO-SAVE LOCAL STORAGE ===================== */
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-data");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio-data", JSON.stringify(formData));
  }, [formData]);

  /* ===================== PROJECT HANDLERS ===================== */
  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: "", desc: "", link: "" }],
    }));
  };

  const updateProject = (i, field, value) => {
    const updated = [...formData.projects];
    updated[i][field] = value;
    setFormData({ ...formData, projects: updated });
  };

  const removeProject = (i) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((_, x) => x !== i),
    });
  };

  /* ===================== EXPORT: PDF ===================== */
  const downloadPDF = async () => {
    const el = previewRef.current;
    const canvas = await html2canvas(el, { scale: 2 });
    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(img, "PNG", 0, 0, width, height);
    pdf.save(`${formData.name || "portfolio"}.pdf`);
  };

  /* ===================== EXPORT: IMAGE (PNG) ===================== */
  const downloadImage = async () => {
    const el = previewRef.current;
    const canvas = await html2canvas(el, { scale: 2 });
    const img = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.download = `${formData.name || "portfolio"}.png`;
    link.href = img;
    link.click();
  };

  /* ===================== EXPORT: HTML FILE ===================== */
  const downloadHTML = () => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>${formData.name} - Portfolio</title>
<style>
  body { font-family: Inter, sans-serif; padding: 40px; }
  .portfolio-card { max-width: 900px; margin: auto; }
  .hero { display: flex; justify-content: space-between; }
  img { width: 140px; height: 140px; border-radius: 20px; object-fit: cover; }
  .skill { background: #eee; padding: 6px 12px; margin: 5px; display: inline-block; border-radius: 8px; }
  .project { padding: 12px; border: 1px solid #ddd; margin-top: 10px; border-radius: 10px; }
</style>
</head>
<body>
<div class="portfolio-card">
  <div class="hero">
    <div>
      <h1>${formData.name}</h1>
      <h3>${formData.title}</h3>
      <p>${formData.bio}</p>
      <p><b>Email:</b> ${formData.email}</p>
      <p><b>Location:</b> ${formData.location}</p>
      <p><b>Socials:</b> ${formData.socials}</p>
    </div>
    ${formData.image ? `<img src="${formData.image}" />` : ""}
  </div>

  <hr />

  <h2>Skills</h2>
  <div>${formData.skills
    .split(",")
    .map((s) => `<span class="skill">${s.trim()}</span>`)
    .join("")}
  </div>

  <h2>Education</h2>
  <p>${formData.education}</p>

  <h2>Experience</h2>
  <p>${formData.experience}</p>

  <h2>Achievements</h2>
  <p>${formData.achievements}</p>

  <h2>Projects</h2>
  ${formData.projects
    .map(
      (p) => `
      <div class="project">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <a href="${p.link}">${p.link}</a>
      </div>`
    )
    .join("")}
</div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${formData.name || "portfolio"}.html`;
    link.click();
  };

  /* ========================================================= */

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-logo">PortfolioBuilder</div>

        <div style={{ display: "flex", gap: "10px" }}>
          {!showLanding && (
            <button className="nav-btn" onClick={() => setShowLanding(true)}>
              Home
            </button>
          )}

          <button className="nav-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </nav>

      {/* ================= LANDING PAGE ================= */}
      {showLanding && (
        <div className="landing-container">

          <div className="glow g1"></div>
          <div className="glow g2"></div>
          <div className="landing-waves"></div>

          <div className="landing-card fade-container">
            <h1 className="landing-title">
              Create <span className="landing-highlight">Professional Portfolios</span>
            </h1>

            <p className="landing-subtitle">
              Choose a theme → Fill details → Download PDF / Image / HTML.
            </p>

            <button className="landing-start-btn big" onClick={() => setShowLanding(false)}>
              Start Building →
            </button>
          </div>
        </div>
      )}

      {/* ================= BUILDER PAGE ================= */}
      {!showLanding && !showPreview && (
        <div className="builder-page fade-container">
          <h1 className="title">Portfolio Builder</h1>

          {/* Theme thumbnails */}
          <ThemeSelector theme={theme} setTheme={setTheme} />

          <div className="form-card">
            <PortfolioForm
              formData={formData}
              setFormData={setFormData}
              addProject={addProject}
              updateProject={updateProject}
              removeProject={removeProject}
              onPreview={() => setShowPreview(true)}
            />
          </div>
        </div>
      )}

      {/* ================= PREVIEW PAGE ================= */}
      {!showLanding && showPreview && (
        <div className="preview-page fade-container">
          
          <ThemeSelector theme={theme} setTheme={setTheme} />

          <PortfolioPreview
            ref={previewRef}
            formData={formData}
            theme={theme}
          />

          <div className="actions">
            <button className="btn primary" onClick={downloadPDF}>Download PDF</button>
            <button className="btn primary" onClick={downloadImage}>Download PNG</button>
            <button className="btn primary" onClick={downloadHTML}>Download HTML</button>

            <button className="btn outline" onClick={() => setShowPreview(false)}>
              Modify
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;



















