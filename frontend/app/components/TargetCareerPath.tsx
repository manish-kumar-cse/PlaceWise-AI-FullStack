
"use client";

import { useEffect, useMemo, useState } from "react";

type CareerRole =
  | "Frontend Developer"
  | "Backend Developer"
  | "Data Analyst"
  | "AI/ML Engineer";

type SkillLevel = "Beginner" | "Intermediate";

type RoadmapTask = {
  id: string;
  phase: string;
  title: string;
  description: string;
  duration: string;
  action: string;
};

const roadmaps: Record<
  CareerRole,
  Record<SkillLevel, RoadmapTask[]>
> = {
  "Frontend Developer": {
    Beginner: [
      {
        id: "html",
        phase: "Phase 1",
        title: "Learn HTML fundamentals",
        description: "Understand page structure, headings, links, forms and semantic elements.",
        duration: "1 week",
        action: "Create a personal profile page using HTML.",
      },
      {
        id: "css",
        phase: "Phase 2",
        title: "Master CSS basics",
        description: "Learn selectors, box model, Flexbox, Grid and responsive layouts.",
        duration: "2 weeks",
        action: "Style your profile page and make it mobile-friendly.",
      },
      {
        id: "javascript",
        phase: "Phase 3",
        title: "Learn JavaScript",
        description: "Practise variables, functions, arrays, objects, events and DOM manipulation.",
        duration: "2–3 weeks",
        action: "Build an interactive calculator or to-do list.",
      },
      {
        id: "git",
        phase: "Phase 4",
        title: "Learn Git and GitHub",
        description: "Understand repositories, commits, branches and README files.",
        duration: "3–5 days",
        action: "Upload your projects to a GitHub repository with clear documentation.",
      },
      {
        id: "react",
        phase: "Phase 5",
        title: "Build interfaces with React",
        description: "Learn components, props, state, hooks and handling user input.",
        duration: "2–3 weeks",
        action: "Build a student dashboard with reusable React components.",
      },
      {
        id: "portfolio",
        phase: "Phase 6",
        title: "Build and deploy a portfolio",
        description: "Combine your skills into a complete project that others can try.",
        duration: "1–2 weeks",
        action: "Deploy your portfolio and document the project, features and technologies.",
      },
      {
        id: "interview",
        phase: "Phase 7",
        title: "Prepare for interviews",
        description: "Revise HTML, CSS, JavaScript, React and common coding questions.",
        duration: "Ongoing",
        action: "Practise explaining your projects and solving beginner coding problems.",
      },
    ],
    Intermediate: [
      {
        id: "advanced-css",
        phase: "Phase 1",
        title: "Improve responsive UI skills",
        description: "Practise accessibility, responsive design systems and CSS architecture.",
        duration: "1–2 weeks",
        action: "Improve an existing project for keyboard access and mobile screens.",
      },
      {
        id: "advanced-react",
        phase: "Phase 2",
        title: "Strengthen React",
        description: "Work with reusable components, custom hooks, forms and rendering behaviour.",
        duration: "2 weeks",
        action: "Refactor a project into reusable components.",
      },
      {
        id: "typescript",
        phase: "Phase 3",
        title: "Learn TypeScript",
        description: "Practise types, interfaces, unions, props and API response types.",
        duration: "1–2 weeks",
        action: "Convert a small JavaScript project to TypeScript.",
      },
      {
        id: "frontend-testing",
        phase: "Phase 4",
        title: "Add testing and performance checks",
        description: "Learn component testing, browser debugging and performance basics.",
        duration: "1–2 weeks",
        action: "Add tests for key interactions in your application.",
      },
      {
        id: "frontend-deploy",
        phase: "Phase 5",
        title: "Ship a production-ready project",
        description: "Practise API integration, environment configuration and deployment.",
        duration: "2 weeks",
        action: "Deploy a complete app and document setup and usage.",
      },
    ],
  },

  "Backend Developer": {
    Beginner: [
      {
        id: "backend-language",
        phase: "Phase 1",
        title: "Learn a backend language",
        description: "Build a foundation in Python or JavaScript, including functions and data structures.",
        duration: "2–3 weeks",
        action: "Create a small command-line application.",
      },
      {
        id: "http",
        phase: "Phase 2",
        title: "Understand HTTP and APIs",
        description: "Learn requests, responses, status codes and JSON.",
        duration: "1 week",
        action: "Call a public API and display its response.",
      },
      {
        id: "database",
        phase: "Phase 3",
        title: "Learn SQL and databases",
        description: "Practise tables, queries, relationships and CRUD operations.",
        duration: "2 weeks",
        action: "Design a simple student database.",
      },
      {
        id: "rest-api",
        phase: "Phase 4",
        title: "Build a REST API",
        description: "Learn routing, validation, error handling and database integration.",
        duration: "2–3 weeks",
        action: "Create a student records API.",
      },
      {
        id: "backend-project",
        phase: "Phase 5",
        title: "Deploy a backend project",
        description: "Learn environment variables, testing and deployment basics.",
        duration: "1–2 weeks",
        action: "Deploy your API and write its usage documentation.",
      },
    ],
    Intermediate: [
      {
        id: "backend-design",
        phase: "Phase 1",
        title: "Improve API design",
        description: "Practise pagination, filtering, validation and consistent error responses.",
        duration: "1–2 weeks",
        action: "Improve an existing API with pagination and validation.",
      },
      {
        id: "auth",
        phase: "Phase 2",
        title: "Learn authentication and authorization",
        description: "Understand sessions, tokens, permissions and secure password handling.",
        duration: "2 weeks",
        action: "Add secure authentication to a practice project.",
      },
      {
        id: "backend-testing",
        phase: "Phase 3",
        title: "Test and debug services",
        description: "Learn automated tests, logging and debugging techniques.",
        duration: "1–2 weeks",
        action: "Write tests for important API endpoints.",
      },
      {
        id: "backend-production",
        phase: "Phase 4",
        title: "Prepare for production",
        description: "Explore deployment, database migrations and performance monitoring.",
        duration: "2 weeks",
        action: "Deploy a documented service with basic monitoring.",
      },
    ],
  },

  "Data Analyst": {
    Beginner: [
      {
        id: "spreadsheets",
        phase: "Phase 1",
        title: "Learn spreadsheet analysis",
        description: "Practise formulas, sorting, filtering, pivot tables and charts.",
        duration: "1–2 weeks",
        action: "Analyse a small dataset and create a summary report.",
      },
      {
        id: "sql",
        phase: "Phase 2",
        title: "Learn SQL",
        description: "Practise SELECT, WHERE, GROUP BY, JOIN and aggregate functions.",
        duration: "2 weeks",
        action: "Write queries to answer five questions about a dataset.",
      },
      {
        id: "python-data",
        phase: "Phase 3",
        title: "Learn Python and Pandas",
        description: "Practise loading, cleaning, filtering and summarising data.",
        duration: "2–3 weeks",
        action: "Clean a CSV file and explain the main findings.",
      },
      {
        id: "visualization",
        phase: "Phase 4",
        title: "Create useful visualizations",
        description: "Learn charts, labels, comparisons and how to communicate insights.",
        duration: "1–2 weeks",
        action: "Build a dashboard with three meaningful charts.",
      },
      {
        id: "analyst-portfolio",
        phase: "Phase 5",
        title: "Create an analysis project",
        description: "Turn a real or public dataset into a documented case study.",
        duration: "2 weeks",
        action: "Publish your analysis, charts and conclusions in a portfolio.",
      },
    ],
    Intermediate: [
      {
        id: "advanced-sql",
        phase: "Phase 1",
        title: "Strengthen SQL",
        description: "Practise CTEs, window functions and more complex joins.",
        duration: "2 weeks",
        action: "Solve analytical SQL problems using a public dataset.",
      },
      {
        id: "statistics",
        phase: "Phase 2",
        title: "Apply statistical reasoning",
        description: "Review distributions, sampling, correlation and uncertainty.",
        duration: "2 weeks",
        action: "Write an analysis that distinguishes correlation from causation.",
      },
      {
        id: "dashboard-tool",
        phase: "Phase 3",
        title: "Build an interactive dashboard",
        description: "Practise a dashboard tool and clear data storytelling.",
        duration: "2 weeks",
        action: "Create a dashboard with filters and documented insights.",
      },
      {
        id: "case-study",
        phase: "Phase 4",
        title: "Present a business case study",
        description: "Translate analysis into clear findings and limitations.",
        duration: "1–2 weeks",
        action: "Prepare a short presentation explaining your results.",
      },
    ],
  },

  "AI/ML Engineer": {
    Beginner: [
      {
        id: "python",
        phase: "Phase 1",
        title: "Build Python fundamentals",
        description: "Learn variables, functions, collections, loops and file handling.",
        duration: "2–3 weeks",
        action: "Write a small program that processes a CSV file.",
      },
      {
        id: "math-data",
        phase: "Phase 2",
        title: "Learn data and math foundations",
        description: "Review descriptive statistics, vectors and basic probability.",
        duration: "2 weeks",
        action: "Analyse a dataset using means, medians and charts.",
      },
      {
        id: "pandas",
        phase: "Phase 3",
        title: "Practise NumPy and Pandas",
        description: "Learn arrays, data cleaning, filtering and feature preparation.",
        duration: "2 weeks",
        action: "Clean a dataset and document its features.",
      },
      {
        id: "ml-basics",
        phase: "Phase 4",
        title: "Learn machine learning basics",
        description: "Explore train-test splits, classification, regression and evaluation metrics.",
        duration: "2–3 weeks",
        action: "Train and evaluate a simple classification model.",
      },
      {
        id: "ml-project",
        phase: "Phase 5",
        title: "Build an ML project",
        description: "Develop a reproducible project and explain its limitations.",
        duration: "2–3 weeks",
        action: "Publish your code, evaluation results and project README.",
      },
    ],
    Intermediate: [
      {
        id: "features",
        phase: "Phase 1",
        title: "Practise feature engineering",
        description: "Learn preprocessing, feature selection and leakage prevention.",
        duration: "2 weeks",
        action: "Compare a baseline model with a properly validated pipeline.",
      },
      {
        id: "evaluation",
        phase: "Phase 2",
        title: "Improve model evaluation",
        description: "Practise cross-validation, precision, recall and error analysis.",
        duration: "2 weeks",
        action: "Compare models using metrics suited to the problem.",
      },
      {
        id: "pipelines",
        phase: "Phase 3",
        title: "Build reproducible pipelines",
        description: "Organise preprocessing, training and inference consistently.",
        duration: "2 weeks",
        action: "Create a reusable training and prediction pipeline.",
      },
      {
        id: "ml-deployment",
        phase: "Phase 4",
        title: "Deploy an ML application",
        description: "Learn API integration, input validation and basic monitoring.",
        duration: "2–3 weeks",
        action: "Serve predictions through a documented API.",
      },
    ],
  },
};

export default function TargetCareerPath() {
  const [role, setRole] = useState<CareerRole>("Frontend Developer");
  const [level, setLevel] = useState<SkillLevel>("Beginner");
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  const tasks = roadmaps[role][level];
  const storageKey = "placewise-career-progress-v1";

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);

      if (saved) {
        const parsed: unknown = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setCompletedIds(
            parsed.filter((item): item is string => typeof item === "string")
          );
        }
      }
    } catch {
      // The roadmap remains usable without browser storage.
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify(completedIds)
      );
    } catch {
      // Progress remains available for the current session.
    }
  }, [completedIds, loaded]);

  const completedCount = tasks.filter((task) =>
    completedIds.includes(`${role}:${level}:${task.id}`)
  ).length;

  const progress = Math.round(
    (completedCount / tasks.length) * 100
  );

  function toggleTask(taskId: string) {
    const key = `${role}:${level}:${taskId}`;

    setCompletedIds((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key]
    );
  }

  function changeRole(value: string) {
    setRole(value as CareerRole);
  }

  function changeLevel(value: string) {
    setLevel(value as SkillLevel);
  }

  return (
    <section className="career-path">
      <div className="career-heading">
        <p className="career-eyebrow">CAREER BUILDER</p>
        <h2>Target Career Path</h2>
        <p>
          Choose a role and follow a structured roadmap to build
          relevant skills and projects.
        </p>
      </div>

      <div className="career-controls">
        <label>
          <span>Target role</span>
          <select
            value={role}
            onChange={(event) => changeRole(event.target.value)}
          >
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Data Analyst</option>
            <option>AI/ML Engineer</option>
          </select>
        </label>

        <label>
          <span>Current skill level</span>
          <select
            value={level}
            onChange={(event) => changeLevel(event.target.value)}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
          </select>
        </label>
      </div>

      <div className="career-progress">
        <div className="career-progress-heading">
          <div>
            <strong>{role}</strong>
            <span>{level} roadmap</span>
          </div>
          <strong>{progress}%</strong>
        </div>

        <div
          className="career-progress-track"
          role="progressbar"
          aria-label="Career roadmap completion"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div style={{ width: `${progress}%` }} />
        </div>

        <p>
          {completedCount} of {tasks.length} learning milestones completed
        </p>
      </div>

      <div className="roadmap-list">
        {tasks.map((task, index) => {
          const key = `${role}:${level}:${task.id}`;
          const isCompleted = completedIds.includes(key);

          return (
            <article
              className={`roadmap-item ${isCompleted ? "roadmap-done" : ""}`}
              key={key}
            >
              <div className="roadmap-marker">
                <span>{isCompleted ? "✓" : index + 1}</span>
              </div>

              <div className="roadmap-content">
                <div className="roadmap-meta">
                  <span>{task.phase}</span>
                  <span>{task.duration}</span>
                </div>

                <h3>{task.title}</h3>
                <p className="roadmap-description">
                  {task.description}
                </p>

                <div className="roadmap-action">
                  <strong>Your task:</strong> {task.action}
                </div>

                <button
                  type="button"
                  className={isCompleted ? "milestone-button done-button" : "milestone-button"}
                  onClick={() => toggleTask(task.id)}
                >
                  {isCompleted ? "Mark as incomplete" : "Mark as completed"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <p className="career-disclaimer">
        This is a suggested learning roadmap, not a guarantee of employment.
        Time estimates are flexible and depend on your experience and schedule.
      </p>

      <style jsx>{`
        .career-path {
          margin: 24px 0;
          padding: 26px;
          color: #f8fafc;
          background: rgba(10, 18, 38, 0.88);
          border: 1px solid rgba(52, 211, 153, 0.22);
          border-radius: 22px;
        }

        .career-eyebrow {
          color: #6ee7b7;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .career-heading h2 {
          margin: 8px 0;
          font-size: clamp(22px, 3vw, 29px);
          font-weight: 800;
        }

        .career-heading > p:last-child {
          color: #aab7cc;
          font-size: 13px;
          line-height: 1.7;
        }

        .career-controls {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin-top: 23px;
        }

        .career-controls label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          color: #cbd5e1;
          font-size: 12px;
          font-weight: 700;
        }

        .career-controls select {
          width: 100%;
          min-width: 0;
          padding: 12px;
          color: #f8fafc;
          background: #172338;
          border: 1px solid #334155;
          border-radius: 10px;
          font: inherit;
        }

        .career-controls select:focus-visible {
          outline: 2px solid #6ee7b7;
          outline-offset: 2px;
        }

        .career-progress {
          margin-top: 22px;
          padding: 17px;
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.13);
          border-radius: 14px;
        }

        .career-progress-heading {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
          font-size: 14px;
        }

        .career-progress-heading > div {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .career-progress-heading > div span {
          color: #94a3b8;
          font-size: 11px;
          font-weight: 400;
        }

        .career-progress-heading > strong {
          color: #6ee7b7;
        }

        .career-progress-track {
          height: 8px;
          margin-top: 14px;
          overflow: hidden;
          background: #334155;
          border-radius: 99px;
        }

        .career-progress-track div {
          height: 100%;
          background: linear-gradient(90deg, #34d399, #818cf8);
          border-radius: inherit;
          transition: width 0.3s ease;
        }

        .career-progress > p {
          margin-top: 9px;
          color: #94a3b8;
          font-size: 11px;
        }

        .roadmap-list {
          display: grid;
          gap: 0;
          margin-top: 25px;
        }

        .roadmap-item {
          display: grid;
          grid-template-columns: 35px minmax(0, 1fr);
          gap: 13px;
          position: relative;
          padding-bottom: 24px;
        }

        .roadmap-item:not(:last-child)::before {
          content: "";
          position: absolute;
          left: 16px;
          top: 35px;
          bottom: 0;
          width: 2px;
          background: #334155;
        }

        .roadmap-marker {
          position: relative;
          z-index: 1;
        }

        .roadmap-marker span {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          color: #a7f3d0;
          background: #123b36;
          border: 1px solid #26705f;
          border-radius: 50%;
          font-size: 12px;
          font-weight: 800;
        }

        .roadmap-done .roadmap-marker span {
          color: #052e2b;
          background: #6ee7b7;
          border-color: #6ee7b7;
        }

        .roadmap-content {
          min-width: 0;
          padding: 16px;
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(148, 163, 184, 0.14);
          border-radius: 14px;
        }

        .roadmap-done .roadmap-content {
          border-color: rgba(52, 211, 153, 0.28);
        }

        .roadmap-meta {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          color: #6ee7b7;
          font-size: 10px;
          font-weight: 700;
        }

        .roadmap-meta span:last-child {
          color: #aab7cc;
          font-weight: 500;
        }

        .roadmap-content h3 {
          margin-top: 9px;
          font-size: 15px;
          font-weight: 800;
        }

        .roadmap-description {
          margin-top: 7px;
          color: #aab7cc;
          font-size: 12px;
          line-height: 1.7;
        }

        .roadmap-action {
          margin-top: 12px;
          padding: 11px;
          color: #d1fae5;
          background: rgba(16, 185, 129, 0.08);
          border-left: 3px solid #34d399;
          border-radius: 0 8px 8px 0;
          font-size: 12px;
          line-height: 1.7;
        }

        .roadmap-action strong {
          color: #6ee7b7;
        }

        .milestone-button {
          margin-top: 13px;
          padding: 9px 12px;
          color: #d1fae5;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(52, 211, 153, 0.3);
          border-radius: 9px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        .milestone-button:hover {
          background: rgba(16, 185, 129, 0.2);
        }

        .done-button {
          color: #cbd5e1;
          background: rgba(100, 116, 139, 0.12);
          border-color: rgba(148, 163, 184, 0.25);
        }

        .career-disclaimer {
          padding-top: 15px;
          border-top: 1px solid rgba(148, 163, 184, 0.14);
          color: #94a3b8;
          font-size: 11px;
          line-height: 1.7;
        }

        @media (max-width: 600px) {
          .career-path {
            padding: 17px;
          }

          .career-controls {
            grid-template-columns: 1fr;
          }

          .roadmap-item {
            grid-template-columns: 29px minmax(0, 1fr);
            gap: 9px;
          }

          .roadmap-marker span {
            width: 29px;
            height: 29px;
          }

          .roadmap-item:not(:last-child)::before {
            left: 13px;
            top: 30px;
          }

          .roadmap-content {
            padding: 13px;
          }
        }
      `}</style>
    </section>
  );
}
