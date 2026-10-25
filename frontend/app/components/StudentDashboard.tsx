"use client";

import SmartImprovementPlan from "./SmartImprovementPlan";
import TargetCareerPath from "./TargetCareerPath";
import PerformanceAnalytics from "./PerformanceAnalytics";

type StudentProfile = {
  CGPA: string;
  Internships: string;
  Projects: string;
  Workshops_Certifications: string;
  AptitudeTestScore: string;
  SoftSkillsRating: string;
  ExtracurricularActivities: string;
  PlacementTraining: string;
  SSC_Marks: string;
  HSC_Marks: string;
};

type StudentDashboardProps = {
  form: StudentProfile;
  result: {
    prediction: string | number;
    probability?: number;
  } | null;
};

export default function StudentDashboard({
  form,
  result,
}: StudentDashboardProps) {
  const fields = Object.values(form);

  const completed = fields.filter(
    (value) => value.trim() !== ""
  ).length;

  const completion = Math.round(
    (completed / fields.length) * 100
  );

  // Custom profile indicator, not actual placement probability.
  const readinessScore = Math.round(
    (Number(form.CGPA || 0) / 10) * 25 +
      (Number(form.AptitudeTestScore || 0) / 100) * 20 +
      (Number(form.SoftSkillsRating || 0) / 5) * 15 +
      (Math.min(Number(form.Projects || 0), 5) / 5) * 15 +
      (Math.min(Number(form.Internships || 0), 3) / 3) * 10 +
      (Math.min(Number(form.Workshops_Certifications || 0), 5) / 5) * 5 +
      Number(form.PlacementTraining || 0) * 5 +
      Number(form.ExtracurricularActivities || 0) * 5
  );

  const safeReadiness = Math.max(
    0,
    Math.min(100, readinessScore)
  );

  const circumference = 2 * Math.PI * 66;
  const dashOffset =
    circumference - (safeReadiness / 100) * circumference;

  const improvementSuggestions: string[] = [];

  if (form.CGPA.trim() !== "" && Number(form.CGPA) < 7) {
    improvementSuggestions.push(
      "Focus on improving your CGPA through regular revision and practice."
    );
  }

  if (
    form.AptitudeTestScore.trim() !== "" &&
    Number(form.AptitudeTestScore) < 70
  ) {
    improvementSuggestions.push(
      "Practice quantitative aptitude, logical reasoning, and mock tests."
    );
  }

  if (
    form.SoftSkillsRating.trim() !== "" &&
    Number(form.SoftSkillsRating) < 4
  ) {
    improvementSuggestions.push(
      "Improve communication skills through presentations and mock interviews."
    );
  }

  if (form.Projects.trim() !== "" && Number(form.Projects) < 2) {
    improvementSuggestions.push(
      "Build practical projects and add them to your portfolio."
    );
  }

  if (
    form.Internships.trim() !== "" &&
    Number(form.Internships) < 1
  ) {
    improvementSuggestions.push(
      "Explore internship opportunities to gain practical experience."
    );
  }

  if (
    form.Workshops_Certifications.trim() !== "" &&
    Number(form.Workshops_Certifications) < 2
  ) {
    improvementSuggestions.push(
      "Consider relevant workshops or certifications for your target role."
    );
  }

  if (form.PlacementTraining === "0") {
    improvementSuggestions.push(
      "Consider joining placement training and practising interview questions."
    );
  }

  if (form.ExtracurricularActivities === "0") {
    improvementSuggestions.push(
      "Consider team activities or clubs to practise collaboration."
    );
  }

  if (improvementSuggestions.length === 0) {
    improvementSuggestions.push(
      "No improvement flags were identified in the fields you entered. Keep practising and tailor your preparation to your target role."
    );
  }

  const metrics = [
    { label: "CGPA", value: form.CGPA || "—", suffix: "/ 10" },
    {
      label: "Aptitude Score",
      value: form.AptitudeTestScore || "—",
      suffix: "/ 100",
    },
    {
      label: "Soft Skills",
      value: form.SoftSkillsRating || "—",
      suffix: "/ 5",
    },
    {
      label: "Projects",
      value: form.Projects || "—",
      suffix: "",
    },
  ];

  const predictionLabel = result
    ? String(result.prediction) === "1"
      ? "Placed"
      : String(result.prediction) === "0"
        ? "Not Placed"
        : String(result.prediction)
    : "No prediction yet";

  const readinessLabel =
    safeReadiness >= 75
      ? "Strong profile indicators"
      : safeReadiness >= 50
        ? "Developing profile"
        : "Room to build your profile";

  return (
    <section className="student-dashboard">
      <div className="dashboard-heading">
        <div>
          <p className="dashboard-eyebrow">YOUR OVERVIEW</p>
          <h2>Student Dashboard</h2>
          <p className="dashboard-subtitle">
            Track your academic profile and placement readiness.
          </p>
        </div>

        <div className="completion-badge">
          {completion}% Profile Complete
        </div>
      </div>

      <div
        className="completion-track"
        role="progressbar"
        aria-label="Student profile completion"
        aria-valuenow={completion}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div style={{ width: `${completion}%` }} />
      </div>

      <div className="readiness-panel">
        <div className="readiness-copy">
          <p className="dashboard-eyebrow">PLACEMENT READINESS</p>
          <h3>Your Readiness Score</h3>
          <p>
            A custom indicator calculated from your entered academic
            and preparation details.
          </p>

          <div className="readiness-label">{readinessLabel}</div>

          <div className="readiness-progress-heading">
            <span>Readiness progress</span>
            <strong>{safeReadiness}/100</strong>
          </div>

          <div
            className="readiness-track"
            role="progressbar"
            aria-label="Placement readiness score"
            aria-valuenow={safeReadiness}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div style={{ width: `${safeReadiness}%` }} />
          </div>

          <p className="readiness-note">
            This custom score is not actual placement probability
            and is not generated by the trained ML model.
          </p>
        </div>

        <div className="gauge-container">
          <svg
            className="readiness-gauge"
            viewBox="0 0 160 160"
            role="img"
            aria-label={`Readiness score ${safeReadiness} out of 100`}
          >
            <circle
              className="gauge-background"
              cx="80"
              cy="80"
              r="66"
              fill="none"
              strokeWidth="12"
            />

            <circle
              className="gauge-value"
              cx="80"
              cy="80"
              r="66"
              fill="none"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 80 80)"
            />

            <text
              x="80"
              y="76"
              textAnchor="middle"
              className="gauge-number"
            >
              {safeReadiness}
            </text>

            <text
              x="80"
              y="99"
              textAnchor="middle"
              className="gauge-caption"
            >
              OUT OF 100
            </text>
          </svg>

          <p className="gauge-footer">Readiness indicator</p>
        </div>
      </div>

      <div className="suggestions-panel">
        <p className="dashboard-eyebrow">PERSONALIZED GUIDANCE</p>
        <h3>Areas to Improve</h3>
        <p className="suggestions-description">
          These suggestions are based on the profile details you entered.
        </p>

        <div className="suggestions-list">
          {improvementSuggestions.map((suggestion, index) => (
            <div className="suggestion-item" key={suggestion}>
              <span className="suggestion-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>{suggestion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Smart improvement plan */}
      <SmartImprovementPlan form={form} />

      {/* Target role: Frontend Developer | Skill level: Beginner */}
      <TargetCareerPath />

      {/* Performance analytics */}
      <PerformanceAnalytics form={form} />

      <div className="dashboard-metrics">
        {metrics.map((metric) => (
          <article className="dashboard-card" key={metric.label}>
            <p>{metric.label}</p>
            <h3>
              {metric.value}
              <span>{metric.suffix}</span>
            </h3>
          </article>
        ))}
      </div>

      <div className="dashboard-details">
        <article className="dashboard-card">
          <h3>Academic Profile</h3>

          <div className="detail-row">
            <span>SSC Marks</span>
            <strong>{form.SSC_Marks || "—"}%</strong>
          </div>

          <div className="detail-row">
            <span>HSC Marks</span>
            <strong>{form.HSC_Marks || "—"}%</strong>
          </div>

          <div className="detail-row">
            <span>Internships</span>
            <strong>{form.Internships || "—"}</strong>
          </div>

          <div className="detail-row">
            <span>Workshops / Certifications</span>
            <strong>{form.Workshops_Certifications || "—"}</strong>
          </div>

          <div className="detail-row">
            <span>Placement Training</span>
            <strong>
              {form.PlacementTraining === "1"
                ? "Completed"
                : form.PlacementTraining === "0"
                  ? "Not completed"
                  : "—"}
            </strong>
          </div>

          <div className="detail-row">
            <span>Extracurricular Activities</span>
            <strong>
              {form.ExtracurricularActivities === "1"
                ? "Yes"
                : form.ExtracurricularActivities === "0"
                  ? "No"
                  : "—"}
            </strong>
          </div>
        </article>

        <article className="dashboard-card dashboard-prediction-card">
          <p className="dashboard-eyebrow">MODEL PREDICTION</p>
          <h3>{predictionLabel}</h3>

          <p>
            {result
              ? "This result is generated by your placement prediction model."
              : "Complete the form and run the prediction to see your result here."}
          </p>

          {result?.probability !== undefined && (
            <div className="model-probability">
              <span>Model probability</span>
              <strong>
                {(result.probability * 100).toFixed(1)}%
              </strong>
            </div>
          )}

          <p className="dashboard-note">
            The model prediction is an estimate, not a guarantee
            of actual placement.
          </p>
        </article>
      </div>

      <style jsx>{`
        .student-dashboard {
          margin: 32px 0;
          padding: 28px;
          color: #f1f5f9;
          background: rgba(10, 18, 38, 0.88);
          border: 1px solid rgba(103, 232, 249, 0.2);
          border-radius: 24px;
          box-shadow: 0 0 35px rgba(34, 211, 238, 0.07);
        }

        .dashboard-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .dashboard-eyebrow {
          color: #67e8f9;
          font-size: 12px;
          letter-spacing: 2px;
          font-weight: 700;
        }

        .dashboard-heading h2 {
          font-size: 28px;
          font-weight: 800;
          margin: 8px 0;
        }

        .dashboard-heading p,
        .dashboard-prediction-card > p {
          color: #aab7cc;
          font-size: 14px;
        }

        .dashboard-subtitle {
          margin-top: 6px;
        }

        .completion-badge {
          color: #a5f3fc;
          background: rgba(8, 145, 178, 0.15);
          border: 1px solid rgba(103, 232, 249, 0.3);
          padding: 10px 14px;
          border-radius: 12px;
          font-weight: 700;
        }

        .completion-track {
          height: 7px;
          margin: 22px 0;
          background: #1e293b;
          border-radius: 99px;
          overflow: hidden;
        }

        .completion-track div {
          height: 100%;
          background: linear-gradient(90deg, #06b6d4, #8b5cf6);
          transition: width 0.3s ease;
        }

        .readiness-panel {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 190px;
          align-items: center;
          gap: 28px;
          padding: 25px;
          margin-bottom: 20px;
          border: 1px solid rgba(103, 232, 249, 0.18);
          border-radius: 20px;
          background: linear-gradient(
            120deg,
            rgba(8, 145, 178, 0.12),
            rgba(139, 92, 246, 0.09)
          );
        }

        .readiness-copy h3 {
          font-size: 23px;
          font-weight: 800;
          margin: 9px 0;
        }

        .readiness-copy > p:not(.dashboard-eyebrow) {
          color: #aab7cc;
          font-size: 13px;
          line-height: 1.6;
        }

        .readiness-label {
          display: inline-block;
          margin-top: 15px;
          padding: 7px 11px;
          color: #a5f3fc;
          background: rgba(8, 145, 178, 0.16);
          border: 1px solid rgba(103, 232, 249, 0.22);
          border-radius: 9px;
          font-size: 12px;
          font-weight: 700;
        }

        .readiness-progress-heading {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-top: 24px;
          font-size: 13px;
        }

        .readiness-progress-heading span {
          color: #aab7cc;
        }

        .readiness-progress-heading strong {
          color: #e0f2fe;
        }

        .readiness-track {
          height: 10px;
          margin-top: 10px;
          background: #1e293b;
          border-radius: 99px;
          overflow: hidden;
        }

        .readiness-track div {
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(90deg, #06b6d4, #8b5cf6);
          transition: width 0.5s ease;
        }

        .readiness-note {
          margin-top: 14px;
          font-size: 11px !important;
        }

        .gauge-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .readiness-gauge {
          width: 160px;
          max-width: 100%;
          overflow: visible;
        }

        .gauge-background {
          stroke: #26364e;
        }

        .gauge-value {
          stroke: #22d3ee;
          filter: drop-shadow(0 0 5px rgba(34, 211, 238, 0.3));
          transition: stroke-dashoffset 0.5s ease;
        }

        .gauge-number {
          fill: #f1f5f9;
          font-size: 34px;
          font-weight: 800;
        }

        .gauge-caption {
          fill: #94a3b8;
          font-size: 9px;
          letter-spacing: 1px;
        }

        .gauge-footer {
          color: #aab7cc;
          font-size: 12px;
          margin-top: 5px;
        }

        .suggestions-panel {
          margin: 20px 0;
          padding: 24px;
          border-radius: 20px;
          background: rgba(20, 32, 57, 0.8);
          border: 1px solid rgba(103, 232, 249, 0.2);
        }

        .suggestions-panel h3 {
          margin: 10px 0;
          color: #f1f5f9;
          font-size: 22px;
          font-weight: 800;
        }

        .suggestions-description {
          margin-bottom: 18px;
          color: #aab7cc;
          font-size: 13px;
          line-height: 1.6;
        }

        .suggestions-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .suggestion-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 15px;
          border-radius: 13px;
          background: rgba(8, 145, 178, 0.08);
          border: 1px solid rgba(148, 163, 184, 0.12);
        }

        .suggestion-number {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 9px;
          color: #67e8f9;
          background: rgba(8, 145, 178, 0.18);
          font-size: 12px;
          font-weight: 800;
        }

        .suggestion-item p {
          color: #dbeafe;
          font-size: 13px;
          line-height: 1.6;
        }

        .dashboard-metrics {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .dashboard-card {
          padding: 20px;
          background: rgba(20, 32, 57, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 17px;
          transition: transform 0.2s, border-color 0.2s;
          min-width: 0;
        }

        .dashboard-card:hover {
          transform: translateY(-3px);
          border-color: rgba(103, 232, 249, 0.45);
        }

        .dashboard-card > p {
          color: #aab7cc;
          font-size: 13px;
          margin-bottom: 12px;
        }

        .dashboard-card h3 {
          font-size: 25px;
          font-weight: 800;
          overflow-wrap: anywhere;
        }

        .dashboard-card h3 span {
          color: #94a3b8;
          font-size: 12px;
          font-weight: 500;
          margin-left: 5px;
        }

        .dashboard-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 16px;
        }

        .dashboard-details h3 {
          font-size: 18px;
          margin-bottom: 18px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(148, 163, 184, 0.12);
          font-size: 13px;
        }

        .detail-row span {
          color: #aab7cc;
        }

        .detail-row strong {
          text-align: right;
          overflow-wrap: anywhere;
        }

        .dashboard-prediction-card h3 {
          color: #67e8f9;
          font-size: 27px;
          margin: 12px 0;
        }

        .model-probability {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-top: 18px;
          padding: 12px;
          background: rgba(8, 145, 178, 0.1);
          border-radius: 10px;
          font-size: 13px;
        }

        .model-probability span {
          color: #aab7cc;
        }

        .model-probability strong {
          color: #a5f3fc;
        }

        .dashboard-note {
          margin-top: 22px;
          padding-top: 14px;
          border-top: 1px solid rgba(148, 163, 184, 0.15);
          font-size: 12px !important;
        }

        @media (max-width: 700px) {
          .student-dashboard {
            padding: 18px;
          }

          .readiness-panel {
            grid-template-columns: 1fr;
            gap: 18px;
            padding: 18px;
          }

          .gauge-container {
            grid-row: 1;
          }

          .readiness-gauge {
            width: 145px;
          }

          .suggestions-panel {
            padding: 18px;
          }

          .suggestions-list {
            grid-template-columns: 1fr;
          }

          .dashboard-metrics {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .dashboard-details {
            grid-template-columns: 1fr;
          }

          .dashboard-heading h2 {
            font-size: 24px;
          }
        }
      `}</style>
    </section>
  );
}
