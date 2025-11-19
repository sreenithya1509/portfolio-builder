import React from "react";

function PortfolioForm({
  formData,
  setFormData,
  addProject,
  updateProject,
  removeProject,
  onPreview,
}) {

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>

      {/* Basic Inputs */}
      <label>Name</label>
      <input name="name" value={formData.name} onChange={handleChange} />

      <label>Title / Role</label>
      <input name="title" value={formData.title} onChange={handleChange} />

      <label>Profile Image URL</label>
      <input name="image" value={formData.image} onChange={handleChange} />

      <label>Bio</label>
      <textarea name="bio" value={formData.bio} onChange={handleChange} />

      <label>Location</label>
      <input name="location" value={formData.location} onChange={handleChange} />

      <label>Email</label>
      <input name="email" value={formData.email} onChange={handleChange} />

      <label>Social Links</label>
      <input name="socials" value={formData.socials} onChange={handleChange} />

      {/* SKILLS */}
      <label>Skills (comma separated)</label>
      <input
        name="skills"
        value={formData.skills}
        onChange={handleChange}
      />

      {/* EDUCATION */}
      <label>Education</label>
      <textarea
        name="education"
        value={formData.education}
        onChange={handleChange}
      />

      {/* EXPERIENCE */}
      <label>Experience</label>
      <textarea
        name="experience"
        value={formData.experience}
        onChange={handleChange}
      />

      {/* ACHIEVEMENTS */}
      <label>Achievements</label>
      <textarea
        name="achievements"
        value={formData.achievements}
        onChange={handleChange}
      />

      {/* PROJECTS */}
      <h3>Projects</h3>
      {formData.projects.map((p, i) => (
        <div className="project-box" key={i}>
          <input
            placeholder="Project Title"
            value={p.title}
            onChange={(e) => updateProject(i, "title", e.target.value)}
          />

          <textarea
            placeholder="Project Description"
            value={p.desc}
            onChange={(e) => updateProject(i, "desc", e.target.value)}
          />

          <input
            placeholder="Project Link"
            value={p.link}
            onChange={(e) => updateProject(i, "link", e.target.value)}
          />

          <button
            className="btn outline"
            onClick={() => removeProject(i)}
          >
            Remove
          </button>
        </div>
      ))}

      <button className="btn primary" onClick={addProject}>Add Project</button>

      {/* PREVIEW BUTTON */}
      <button className="btn primary" onClick={onPreview}>
        Preview Portfolio →
      </button>

    </div>
  );
}

export default PortfolioForm;

