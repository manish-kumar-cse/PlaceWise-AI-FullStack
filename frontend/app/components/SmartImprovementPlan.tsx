
"use client";

import { useEffect, useMemo, useState } from "react";

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

type Task = {
  id: string;
  category: string;
  title: string;
  description: string;
  action: string;
  time: string;
  priority: "High" | "Medium";
};

export default function SmartImprovementPlan({
  form,
}: {
  form: StudentProfile;
}) {
  const tasks = useMemo<Task[]>(() => {
    const list: Task[] = [];

    const addTask = (
      id: string,
      category: string,
      title: string,
      description: string,
      action: string,
      time: string,
      priority: "High" | "Medium" = "Medium"
    ) => {
      list.push({
        id,
        category,
        title,
        description,
        action,
        time,
        priority,
      });
    };

    if (form.CGPA.trim() && Number(form.CGPA) < 7) {
      addTask(
        "cgpa",
        "Academics",
        "Strengthen academic fundamentals",
        "Your entered CGPA is below the app's 7.0 guidance threshold.",
        "Choose one difficult subject and revise a topic, then solve practice questions.",
        "20–30 min/day",
        "High"
      );
    }

    if (
      form.AptitudeTestScore.trim() &&
      Number(form.AptitudeTestScore) < 70
    ) {
      addTask(
        "aptitude",
        "Aptitude",
        "Build aptitude and reasoning skills",
        "Your entered aptitude score leaves room for further practice.",
        "Solve 10 quantitative or logical reasoning questions and review mistakes.",
        "20 min/day",
        "High"
      );
    }

    if (
      form.SoftSkillsRating.trim() &&
      Number(form.SoftSkillsRating) < 4
    ) {
      addTask(
        "soft-skills",
        "Communication",
        "Practise interview communication",
        "Your soft-skills rating suggests communication practice may help.",
        "Practise a one-minute self-introduction or answer one common interview question aloud.",
        "10–15 min/day",
        "Medium"
      );
    }

    if (form.Projects.trim() && Number(form.Projects) < 2) {
      addTask(
        "projects",
        "Projects",
        "Build a practical portfolio project",
        "A project can help demonstrate how you apply your technical knowledge.",
        "Choose a small problem, define its features, and build one working feature at a time.",
        "2–3 sessions/week",
        "High"
      );
    }

    if (form.Internships.trim() && Number(form.Internships) < 1) {
      addTask(
        "internships",
        "Experience",
        "Prepare for internship opportunities",
        "Practical experience can help you understand real-world development.",
        "Prepare a résumé and identify suitable beginner internships or project opportunities.",
        "1 session/week",
        "Medium"
      );
    }

    if (
      form.Workshops_Certifications.trim() &&
      Number(form.Workshops_Certifications) < 2
    ) {
      addTask(
        "certifications",
        "Learning",
        "Explore relevant learning opportunities",
        "Structured learning can help you develop skills for your target role.",
        "Choose one relevant course or workshop and set a realistic completion goal.",
        "1–2 sessions/week",
        "Medium"
      );
    }

    if (form.PlacementTraining === "0") {
      addTask(
        "placement-training",
        "Placement preparation",
        "Start placement preparation",
        "Your profile indicates placement training is not marked as completed.",
        "Practise résumé preparation, aptitude questions, and common interview questions.",
        "2 sessions/week",
        "High"
      );
    }

    if (form.ExtracurricularActivities === "0") {
      addTask(
        "teamwork",
        "Teamwork",
        "Practise collaboration",
        "Team activities can provide opportunities to develop collaboration skills.",
        "Try a group project, student club activity, or collaborative coding task.",
        "1 session/week",
        "Medium"
      );
    }

    if (list.length === 0) {
      addTask(
        "portfolio-review",
        "Career preparation",
        "Review your career preparation",
        "No improvement flags were identified from the details currently entered.",
        "Choose a target role and review its skills, project expectations, and interview topics.",
        "30 min/week",
        "Medium"
      );

      addTask(
        "mock-interview",
        "Interview practice",
        "Practise a mock interview",
        "Regular practice can help you prepare for placement interviews.",
        "Answer three role-related interview questions and review your responses.",
        "20 min/week",
        "Medium"
      );
    }

    return list;
  }, [form]);

  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(
        "placewise-smart-plan-v1"
      );

      if (saved) {
        const parsed: unknown = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setCompletedIds(
            parsed.filter((id): id is string => typeof id === "string")
          );
        }
      }
    } catch {
      // The plan still works if browser storage is unavailable.
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    try {
      window.localStorage.setItem(
        "placewise-smart-plan-v1",
        JSON.stringify(completedIds)
      );
    } catch {
      // Checklist remains usable for the current session.
    }
  }, [completedIds, loaded]);

  const completedCount = tasks.filter((task) =>
    completedIds.includes(task.id)
  ).length;

  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  function toggleTask(id: string) {
    setCompletedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <section className="smart-plan">
      <div className="plan-heading">
        <div>
          <p className="plan-eyebrow">YOUR NEXT STEPS</p>
          <h2>Smart Improvement Plan</h2>
          <p className="plan-subtitle">
            Small, practical steps based on your entered student profile.
          </p>
        </div>

        <div className="plan-count">
          {completedCount}/{tasks.length} completed
        </div>
      </div>

      <div className="plan-progress-info">
        <span>Overall progress</span>
        <strong>{progress}%</strong>
      </div>

      <div
        className="plan-progress-track"
        role="progressbar"
        aria-label="Improvement plan completion"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div style={{ width: `${progress}%` }} />
      </div>

      {progress === 100 && (
        <p className="plan-success">
          Great work! You have completed every task in this plan.
        </p>
      )}

      <div className="plan-task-list">
        {tasks.map((task) => {
          const isCompleted = completedIds.includes(task.id);

          return (
            <article
              className={`plan-task ${isCompleted ? "task-completed" : ""}`}
              key={task.id}
            >
              <label className="task-checkbox">
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="custom-check" aria-hidden="true">
                  {isCompleted ? "✓" : ""}
                </span>
              </label>

              <div className="task-content">
                <div className="task-meta">
                  <span className="task-category">{task.category}</span>
                  <span
                    className={`task-priority ${
                      task.priority === "High" ? "priority-high" : ""
                    }`}
                  >
                    {task.priority} priority
                  </span>
                </div>

                <h3>{task.title}</h3>
                <p className="task-description">{task.description}</p>

                <div className="task-action">
                  <strong>Next step:</strong> {task.action}
                </div>

                <p className="task-time">
                  <span aria-hidden="true">◷</span> Suggested time: {task.time}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <p className="plan-disclaimer">
        Guidance is based on the values entered in your profile, not a
        diagnosis or a guarantee of placement. Suggested thresholds are
        general guidance and may not match every employer's criteria.
      </p>

      <style jsx>{`
        .smart-plan {
          margin: 24px 0;
          padding: 26px;
          color: #f1f5f9;
          background: rgba(10, 18, 38, 0.88);
          border: 1px solid rgba(129, 140, 248, 0.28);
          border-radius: 22px;
        }

        .plan-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          flex-wrap: wrap;
        }

        .plan-eyebrow {
          color: #a5b4fc;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .plan-heading h2 {
          margin: 8px 0;
          font-size: clamp(22px, 3vw, 29px);
          font-weight: 800;
        }

        .plan-subtitle {
          color: #aab7cc;
          font-size: 13px;
          line-height: 1.6;
        }

        .plan-count {
          padding: 9px 12px;
          color: #c7d2fe;
          background: rgba(99, 102, 241, 0.13);
          border: 1px solid rgba(129, 140, 248, 0.25);
          border-radius: 10px;
          font-size: 12px;
          font-weight: 700;
        }

        .plan-progress-info {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-top: 24px;
          color: #cbd5e1;
          font-size: 13px;
        }

        .plan-progress-info strong {
          color: #a5b4fc;
        }

        .plan-progress-track {
          height: 9px;
          margin-top: 10px;
          overflow: hidden;
          background: #273449;
          border-radius: 99px;
        }

        .plan-progress-track div {
          height: 100%;
          background: linear-gradient(90deg, #818cf8, #34d399);
          border-radius: inherit;
          transition: width 0.3s ease;
        }

        .plan-success {
          margin-top: 14px;
          color: #6ee7b7;
          font-size: 13px;
        }

        .plan-task-list {
          display: grid;
          gap: 13px;
          margin-top: 22px;
        }

        .plan-task {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 18px;
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-radius: 15px;
          background: rgba(30, 41, 59, 0.52);
          transition: border-color 0.2s, opacity 0.2s;
        }

        .plan-task:hover {
          border-color: rgba(129, 140, 248, 0.45);
        }

        .task-completed {
          border-color: rgba(52, 211, 153, 0.25);
          background: rgba(6, 78, 59, 0.13);
        }

        .task-checkbox {
          position: relative;
          display: flex;
          flex-shrink: 0;
          margin-top: 3px;
          cursor: pointer;
        }

        .task-checkbox input {
          position: absolute;
          width: 1px;
          height: 1px;
          opacity: 0;
        }

        .custom-check {
          display: flex;
          width: 22px;
          height: 22px;
          align-items: center;
          justify-content: center;
          border: 1px solid #64748b;
          border-radius: 7px;
          color: #052e2b;
          font-size: 14px;
          font-weight: 900;
        }

        .task-checkbox input:checked + .custom-check {
          border-color: #34d399;
          background: #34d399;
        }

        .task-checkbox input:focus-visible + .custom-check {
          outline: 2px solid #a5b4fc;
          outline-offset: 3px;
        }

        .task-content {
          flex: 1;
          min-width: 0;
        }

        .task-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 9px;
        }

        .task-category,
        .task-priority {
          padding: 5px 8px;
          border-radius: 7px;
          font-size: 10px;
          font-weight: 700;
        }

        .task-category {
          color: #c7d2fe;
          background: rgba(99, 102, 241, 0.14);
        }

        .task-priority {
          color: #fcd34d;
          background: rgba(245, 158, 11, 0.1);
        }

        .priority-high {
          color: #fda4af;
          background: rgba(244, 63, 94, 0.12);
        }

        .task-content h3 {
          margin: 0 0 7px;
          color: #f8fafc;
          font-size: 16px;
          font-weight: 750;
        }

        .task-description {
          color: #aab7cc;
          font-size: 12px;
          line-height: 1.6;
        }

        .task-action {
          margin-top: 12px;
          padding: 11px 12px;
          border-left: 3px solid #818cf8;
          border-radius: 0 8px 8px 0;
          background: rgba(99, 102, 241, 0.08);
          color: #dbeafe;
          font-size: 12px;
          line-height: 1.7;
        }

        .task-action strong {
          color: #c7d2fe;
        }

        .task-time {
          margin-top: 10px;
          color: #94a3b8;
          font-size: 11px;
        }

        .task-completed .task-content h3 {
          color: #a7f3d0;
        }

        .task-completed .task-description {
          opacity: 0.8;
        }

        .plan-disclaimer {
          margin-top: 20px;
          padding-top: 15px;
          border-top: 1px solid rgba(148, 163, 184, 0.14);
          color: #94a3b8;
          font-size: 11px;
          line-height: 1.7;
        }

        @media (max-width: 600px) {
          .smart-plan {
            padding: 17px;
          }

          .plan-task {
            gap: 11px;
            padding: 14px;
          }

          .task-content h3 {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}
