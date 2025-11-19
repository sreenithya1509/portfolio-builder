import React from "react";

function ThemeSelector({ theme, setTheme }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <label
        style={{
          fontWeight: "600",
          fontSize: "14px",
          marginRight: "8px",
        }}
      >
        Select Theme:
      </label>

      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "14px",
          cursor: "pointer",
          outline: "none",
        }}
      >
        <option value="theme1">Theme 1 - Aether Prime</option>
        <option value="theme2">Theme 2 - SolarWave</option>
        <option value="theme3">Theme 3 - OceanEdge</option>
        <option value="theme4">Theme 4 - CrimsonFlow</option>
        <option value="theme5">Theme 5 - EmeraldZen</option>
        <option value="theme6">Theme 6 - Purple Premium</option>
      </select>
    </div>
  );
}

export default ThemeSelector;






