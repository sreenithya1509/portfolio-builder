import React, { forwardRef } from "react";

const PortfolioPreview = forwardRef(({ formData, theme }, ref) => {
  return (
    <div ref={ref} className={`portfolio-card ${theme}`}>
      
      {/* HERO SECTION */}
      <section className="hero fade-in">
        <div className="hero-text">
          <h2>{formData.name || "Your Name"}</h2>
          <h4>{formData.title || "Your Role / Title"}</h4>
          <p>{formData.bio || "Short bio about yourself..."}</p>

          {formData.location && <p><strong>📍 Location:</strong> {formData.location}</p>}
          {formData.email && <p><strong>📧 Email:</strong> {formData.email}</p>}
          {formData.socials && <p><strong>🔗 Socials:</strong> {formData.socials}</p>}
        </div>

        {formData.image && (
          <img src={formData.image} alt="Profile" className="profile-pic" />
        )}
      </section>

      {/* SKILLS */}
      {formData.skills && (
        <section>
          <h3>Skills</h3>
          <div className="skill-grid">
            {formData.skills.split(",").map((skill, i) => (
              <span key={i} className="skill">{skill.trim()}</span>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {formData.education && (
        <section>
          <h3>Education</h3>
          <p>{formData.education}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      {formData.experience && (
        <section>
          <h3>Experience</h3>
          <p>{formData.experience}</p>
        </section>
      )}

      {/* ACHIEVEMENTS */}
      {formData.achievements && (
        <section>
          <h3>Achievements</h3>
          <p>{formData.achievements}</p>
        </section>
      )}

      {/* PROJECT LIST */}
      {formData.projects.length > 0 && (
        <section className="projects">
          <h3>Projects</h3>

          {formData.projects.map((p, i) => (
            <div className="project fade-up" key={i}>
              <h4>{p.title || "Project Title"}</h4>
              <p>{p.desc || "Project description goes here..."}</p>

              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue", fontWeight: "600" }}
                >
                  🔗 {p.link}
                </a>
              )}
            </div>
          ))}
        </section>
      )}

    </div>
  );
});

export default PortfolioPreview;










