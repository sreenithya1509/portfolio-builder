package com.portfolio.backend.model;

public class Portfolio {
    private String name;
    private String bio;
    private String skills;
    private String projects;
    private String email;

    // Default constructor
    public Portfolio() {}

    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public String getProjects() { return projects; }
    public void setProjects(String projects) { this.projects = projects; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
