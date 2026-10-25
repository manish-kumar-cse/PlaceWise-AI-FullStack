
"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type StudentForm = {
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

type Props = {
  form: StudentForm;
};

export default function PerformanceAnalytics({ form }: Props) {
  const academicData = [
    { name: "CGPA", score: Math.max(0, Math.min(100, (Number(form.CGPA) || 0) * 10)) },
    { name: "SSC", score: Math.max(0, Math.min(100, Number(form.SSC_Marks) || 0)) },
    { name: "HSC", score: Math.max(0, Math.min(100, Number(form.HSC_Marks) || 0)) },
  ];

  const skillsData = [
    { name: "Aptitude", score: Math.max(0, Math.min(100, Number(form.AptitudeTestScore) || 0)) },
    { name: "Soft Skills", score: Math.max(0, Math.min(100, (Number(form.SoftSkillsRating) || 0) * 20)) },
  ];

  const preparationData = [
    { name: "Projects", value: Math.max(0, Math.min(5, Number(form.Projects) || 0)) },
    { name: "Internships", value: Math.max(0, Math.min(3, Number(form.Internships) || 0)) },
    { name: "Certifications", value: Math.max(0, Math.min(5, Number(form.Workshops_Certifications) || 0)) },
  ];

  const trainingData = [
    { name: "Completed", value: form.PlacementTraining === "1" ? 1 : 0 },
    { name: "Not completed", value: form.PlacementTraining === "1" ? 0 : 1 },
  ];

  const colors = ["#34d399", "#475569"];

  return (
    <section className="performance-analytics">
      <div className="analytics-heading">
        <span className="analytics-eyebrow">STUDENT INSIGHTS</span>
        <h2>Performance Analytics</h2>
        <p>Understand your academic performance and placement preparation.</p>
      </div>

      <div className="analytics-grid">
        <article className="analytics-card">
          <h3>Academic Performance</h3>
          <p className="analytics-description">Scores shown on a 0–100 scale.</p>
          <div className="analytics-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={academicData} margin={{ top: 12, right: 8, left: -18, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis domain={[0, 100]} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: 10,
                    color: "#f8fafc",
                  }}
                />
                <Bar dataKey="score" name="Score" fill="#818cf8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="analytics-card">
          <h3>Skills Overview</h3>
          <p className="analytics-description">Aptitude and soft-skills scores on a 0–100 scale.</p>
          <div className="analytics-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillsData} margin={{ top: 12, right: 8, left: -18, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis domain={[0, 100]} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: 10,
                    color: "#f8fafc",
                  }}
                />
                <Bar dataKey="score" name="Score" fill="#34d399" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="analytics-card">
          <h3>Preparation Activities</h3>
          <p className="analytics-description">Counts entered in your student profile.</p>
          <div className="activity-list">
            {preparationData.map((item) => (
              <div className="activity-row" key={item.name}>
                <div className="activity-label">
                  <span>{item.name}</span>
                  <strong>{item.value}</strong>
                </div>
                <div className="activity-track">
                  <div
                    className="activity-fill"
                    style={{
                      width: `${(item.value / (item.name === "Internships" ? 3 : 5)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="analytics-note">
            Bars use reference scales of 5 for projects/certifications and 3 for internships.
          </p>
        </article>

        <article className="analytics-card training-card">
          <h3>Placement Training</h3>
          <p className="analytics-description">Training status based on your entered profile.</p>
          <div className="training-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trainingData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={54}
                  outerRadius={76}
                  paddingAngle={4}
                  stroke="none"
                >
                  {trainingData.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: 10,
                    color: "#f8fafc",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="training-center">
              <strong>{form.PlacementTraining === "1" ? "Yes" : "No"}</strong>
              <span>Training</span>
            </div>
          </div>
          <p className="analytics-note">
            {form.PlacementTraining === "1"
              ? "Placement training is marked as completed."
              : "Placement training is not marked as completed."}
          </p>
        </article>
      </div>

      <style jsx>{`
        .performance-analytics {
          margin: 28px 0;
          padding: 26px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 22px;
          background: rgba(15, 23, 42, 0.76);
          color: #f8fafc;
        }

        .analytics-heading {
          margin-bottom: 22px;
        }

        .analytics-eyebrow {
          color: #a5b4fc;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .analytics-heading h2 {
          margin: 8px 0;
          font-size: clamp(23px, 3vw, 30px);
          font-weight: 800;
        }

        .analytics-heading p,
        .analytics-description,
        .analytics-note {
          color: #94a3b8;
          font-size: 13px;
          line-height: 1.6;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .analytics-card {
          min-width: 0;
          padding: 20px;
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-radius: 16px;
          background: rgba(30, 41, 59, 0.56);
        }

        .analytics-card h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
        }

        .analytics-description {
          margin: 7px 0 12px;
          min-height: 21px;
        }

        .analytics-chart {
          width: 100%;
          height: 220px;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 23px;
          padding: 16px 0;
        }

        .activity-label {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 9px;
          color: #cbd5e1;
          font-size: 13px;
        }

        .activity-label strong {
          color: #a5b4fc;
        }

        .activity-track {
          height: 8px;
          overflow: hidden;
          border-radius: 99px;
          background: #334155;
        }

        .activity-fill {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #818cf8, #34d399);
          transition: width 0.3s ease;
        }

        .training-chart {
          position: relative;
          width: 100%;
          height: 190px;
        }

        .training-center {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .training-center strong {
          font-size: 23px;
          color: #6ee7b7;
        }

        .training-center span {
          margin-top: 4px;
          color: #94a3b8;
          font-size: 12px;
        }

        .analytics-note {
          margin: 10px 0 0;
        }

        @media (max-width: 700px) {
          .performance-analytics {
            padding: 17px;
          }

          .analytics-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .analytics-card {
            padding: 16px;
          }
        }
      `}</style>
    </section>
  );
}
