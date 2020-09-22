import React from "react";

export default function SurveyField({ input, label, meta }) {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "20px" }} autoComplete="off" />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {meta.touched && meta.error}
      </div>
    </div>
  );
}
