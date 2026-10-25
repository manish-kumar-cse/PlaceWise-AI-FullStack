
"use client";
import StudentDashboard from "./components/StudentDashboard";
import AnimationEffects from "./components/AnimationEffects";

import { useEffect, useRef, useState } from "react";

type FormValues = {
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

type PredictionResponse = {
  prediction: string | number;
  probability?: number;
};

const initialForm: FormValues = {
  CGPA: "",
  Internships: "0",
  Projects: "0",
  Workshops_Certifications: "0",
  AptitudeTestScore: "",
  SoftSkillsRating: "",
  ExtracurricularActivities: "0",
  PlacementTraining: "0",
  SSC_Marks: "",
  HSC_Marks: "",
};

const fields: {
  name: keyof FormValues;
  label: string;
  description: string;
  min: number;
  max?: number;
  step?: number;
}[] = [
  {
    name: "CGPA",
    label: "CGPA",
    description: "Your current CGPA",
    min: 0,
    max: 10,
    step: 0.01,
  },
  {
    name: "Internships",
    label: "Internships",
    description: "Number of internships completed",
    min: 0,
    step: 1,
  },
  {
    name: "Projects",
    label: "Projects",
    description: "Number of projects completed",
    min: 0,
    step: 1,
  },
  {
    name: "Workshops_Certifications",
    label: "Workshops / Certifications",
    description: "Total workshops or certifications",
    min: 0,
    step: 1,
  },
  {
    name: "AptitudeTestScore",
    label: "Aptitude Test Score",
    description: "Score out of 100",
    min: 0,
    max: 100,
    step: 0.1,
  },
  {
    name: "SoftSkillsRating",
    label: "Soft Skills Rating",
    description: "Rating from 0 to 5",
    min: 0,
    max: 5,
    step: 0.1,
  },
  {
    name: "SSC_Marks",
    label: "SSC Marks",
    description: "Class 10 marks percentage",
    min: 0,
    max: 100,
    step: 0.1,
  },
  {
    name: "HSC_Marks",
    label: "HSC Marks",
    description: "Class 12 marks percentage",
    min: 0,
    max: 100,
    step: 0.1,
  },
];

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const parent = canvas.parentElement;
    if (!parent) return;

    let width = 0;
    let height = 0;
    let frameId = 0;

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    };

    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };
    const particleCount = Math.min(
      90,
      Math.max(35, Math.floor(window.innerWidth / 16))
    );

    function resizeCanvas() {
      const rect = parent!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;

      context!.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 0.7,
      }));
    }

    function handleMouseMove(event: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    }

    function handleMouseLeave() {
      mouse.x = -1000;
      mouse.y = -1000;
    }

    function draw() {
      if (!context) return;

      context.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }

        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const mouseDistance = Math.sqrt(
          dxMouse * dxMouse + dyMouse * dyMouse
        );

        if (mouseDistance < 145) {
          context.beginPath();
          context.moveTo(p.x, p.y);
          context.lineTo(mouse.x, mouse.y);
          context.strokeStyle = `rgba(34, 211, 238, ${
            (1 - mouseDistance / 145) * 0.32
          })`;
          context.lineWidth = 0.7;
          context.stroke();
        }

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 105) {
            context.beginPath();
            context.moveTo(p.x, p.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `rgba(99, 102, 241, ${
              (1 - distance / 105) * 0.18
            })`;
            context.lineWidth = 0.6;
            context.stroke();
          }
        }

        context.beginPath();
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(103, 232, 249, 0.8)";
        context.shadowBlur = 8;
        context.shadowColor = "#22d3ee";
        context.fill();
        context.shadowBlur = 0;
      }

      if (!reducedMotion) {
        frameId = requestAnimationFrame(draw);
      }
    }

    resizeCanvas();
    draw();

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="particle-canvas"
    />
  );
}

export default function Home() {
  const [form, setForm] = useState<FormValues>(initialForm);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(name: keyof FormValues, value: string) {
    setForm((previous) => ({ ...previous, [name]: value }));
    setError("");
    setResult(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    for (const field of fields) {
      const value = form[field.name].trim();

      if (!value) {
        setError(`Please enter your ${field.label}.`);
        return;
      }

      const number = Number(value);

      if (!Number.isFinite(number) || number < field.min) {
        setError(`${field.label} must be at least ${field.min}.`);
        return;
      }

      if (field.max !== undefined && number > field.max) {
        setError(`${field.label} must not exceed ${field.max}.`);
        return;
      }
    }

    setLoading(true);

    const apiUrl = (
      process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
    ).replace(/\/$/, "");

    const payload = {
      CGPA: Number(form.CGPA),
      Internships: Number(form.Internships),
      Projects: Number(form.Projects),
      Workshops_Certifications: Number(form.Workshops_Certifications),
      AptitudeTestScore: Number(form.AptitudeTestScore),
      SoftSkillsRating: Number(form.SoftSkillsRating),
      ExtracurricularActivities: Number(form.ExtracurricularActivities),
      PlacementTraining: Number(form.PlacementTraining),
      SSC_Marks: Number(form.SSC_Marks),
      HSC_Marks: Number(form.HSC_Marks),
    };

    try {
      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(
          message || `Prediction request failed (${response.status}).`
        );
      }

      const data: PredictionResponse = await response.json();
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? `Unable to get a prediction. ${err.message}`
          : "Unable to connect to the prediction server. Check that the API is running."
      );
    } finally {
      setLoading(false);
    }
  }

  const isPlaced =
    result !== null &&
    (result.prediction === 1 || result.prediction === "1");

  return (
    <main className="page-shell">
<AnimationEffects />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />
      <ParticleBackground />

      <div className="page-content">
        <nav className="topbar">
          <a href="#" className="brand">
            <span className="brand-icon">P</span>
            <span>
              PlaceWise<span className="brand-highlight"> AI</span>
            </span>
          </a>
          <span className="status-pill">
            <span className="status-dot" />
            AI Prediction System
          </span>
        </nav>

        <section className="hero">
          <div className="eyebrow">
            <span className="sparkle">✦</span>
            YOUR CAREER, POWERED BY AI
          </div>

          <h1>
            Your future.
            <br />
            <span className="gradient-text">One prediction away.</span>
          </h1>

          <p className="hero-description">
            Discover your placement outlook using your academic performance,
            skills and preparation. Get an AI-generated estimate in seconds.
          </p>

          <div className="hero-highlights">
            <span>
              <span className="check-icon">✓</span> Instant prediction
            </span>
            <span>
              <span className="check-icon">✓</span> 10 student parameters
            </span>
            <span>
              <span className="check-icon">✓</span> Simple insights
            </span>
          </div>
        
        </section>

        <StudentDashboard form={form} result={result} />

        <section className="workspace">


        
          <div className="form-card glass-card">
            <div className="card-heading">
              <div className="heading-icon">✧</div>
              <div>
                <h2>Student Profile</h2>
                <p>Enter your details to estimate your placement outcome.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="section-label">
                <span>01</span> ACADEMIC PERFORMANCE
              </div>

              <div className="fields-grid">
                {fields.slice(0, 1).map((field) => (
                  <div className="field" key={field.name}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                      id={field.name}
                      type="number"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={form[field.name]}
                      onChange={(e) =>
                        handleChange(field.name, e.target.value)
                      }
                      placeholder="e.g. 8.5"
                      required
                    />
                    <small>{field.description}</small>
                  </div>
                ))}

                {fields.slice(6, 8).map((field) => (
                  <div className="field" key={field.name}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                      id={field.name}
                      type="number"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={form[field.name]}
                      onChange={(e) =>
                        handleChange(field.name, e.target.value)
                      }
                      placeholder="Enter percentage"
                      required
                    />
                    <small>{field.description}</small>
                  </div>
                ))}
              </div>

              <div className="section-label section-gap">
                <span>02</span> SKILLS & EXPERIENCE
              </div>

              <div className="fields-grid">
                {fields.slice(1, 6).map((field) => (
                  <div className="field" key={field.name}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                      id={field.name}
                      type="number"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={form[field.name]}
                      onChange={(e) =>
                        handleChange(field.name, e.target.value)
                      }
                      placeholder={
                        field.max === undefined
                          ? "Enter a number"
                          : `0–${field.max}`
                      }
                      required
                    />
                    <small>{field.description}</small>
                  </div>
                ))}
              </div>

              <div className="section-label section-gap">
                <span>03</span> PLACEMENT READINESS
              </div>

              <div className="fields-grid">
                {(
                  [
                    {
                      name: "ExtracurricularActivities",
                      label: "Extracurricular Activities",
                      description: "Have you participated?",
                    },
                    {
                      name: "PlacementTraining",
                      label: "Placement Training",
                      description: "Have you completed training?",
                    },
                  ] as const
                ).map((field) => (
                  <div className="field" key={field.name}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <select
                      id={field.name}
                      value={form[field.name]}
                      onChange={(e) =>
                        handleChange(field.name, e.target.value)
                      }
                    >
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </select>
                    <small>{field.description}</small>
                  </div>
                ))}
              </div>

              {error && (
                <div className="error-message" role="alert">
                  <span>!</span> {error}
                </div>
              )}

              <button
                type="submit"
                className="predict-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner" />
                    Analysing your profile...
                  </>
                ) : (
                  <>
                    Predict My Placement
                    <span className="button-arrow">↗</span>
                  </>
                )}
              </button>

              <p className="form-footnote">
                Your prediction is an estimate, not a placement guarantee.
              </p>
            </form>
          </div>

          <aside className="result-card glass-card">
            <div className="result-top">
              <span className="result-icon">✦</span>
              <span className="result-label">YOUR INSIGHT</span>
            </div>

            {!result && !loading && (
              <div className="empty-result">
                <div className="orb-illustration">
                  <div className="orb-ring ring-one" />
                  <div className="orb-ring ring-two" />
                  <div className="orb-core">✧</div>
                </div>

                <h2>Your results will appear here</h2>
                <p>
                  Complete your student profile and run the prediction to see
                  your model's result.
                </p>

                <div className="mini-stat">
                  <span className="mini-stat-icon">⌁</span>
                  <div>
                    <strong>Academic + Skills</strong>
                    <small>Two sides of your profile</small>
                  </div>
                </div>

                <div className="mini-stat">
                  <span className="mini-stat-icon">◎</span>
                  <div>
                    <strong>Instant model response</strong>
                    <small>Powered by your trained model</small>
                  </div>
                </div>
              </div>
            )}

            {loading && (
              <div className="loading-result">
                <div className="loader-orbit">
                  <span />
                  <span />
                  <span />
                </div>
                <h2>Analysing your profile</h2>
                <p>Your model is processing the information...</p>
              </div>
            )}

            {result && !loading && (
              <div className="prediction-result">
                <div
                  className={`result-badge ${
                    isPlaced ? "placed-badge" : "not-placed-badge"
                  }`}
                >
                  {isPlaced ? "✓" : "↗"}
                </div>

                <p className="prediction-caption">MODEL PREDICTION</p>
                <h2>{isPlaced ? "Placed" : "Not Placed"}</h2>
                <p className="prediction-description">
                  {isPlaced
                    ? "Your profile matches the model's placed category. Keep building your skills and experience."
                    : "Your profile matches the model's not-placed category. Consider strengthening your skills and placement preparation."}
                </p>

                {typeof result.probability === "number" && (
                  <div className="probability-box">
                    <div className="probability-heading">
                      <span>Highest class probability</span>
                      <strong>{result.probability.toFixed(2)}%</strong>
                    </div>
                    <div
                      className="probability-track"
                      role="progressbar"
                      aria-label="Highest class probability"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={Math.min(
                        100,
                        Math.max(0, result.probability)
                      )}
                    >
                      <div
                        className="probability-fill"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(0, result.probability)
                          )}%`,
                        }}
                      />
                    </div>
                    <small>
                      This is the highest class probability returned by the
                      model, not necessarily the probability of being placed.
                    </small>
                  </div>
                )}

                <div className="next-step">
                  <span>✧</span>
                  <div>
                    <strong>Keep moving forward</strong>
                    <p>
                      Practice aptitude, improve communication and build
                      projects that demonstrate your skills.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    setResult(null);
                    setError("");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Try another profile ↗
                </button>
              </div>
            )}

            <div className="privacy-note">
              <span>◈</span>
              <p>
                <strong>AI-assisted insight</strong>
                <br />
                Predictions depend on the model and its training data. They
                are not guarantees of actual placement.
              </p>
            </div>
          </aside>
        </section>

        <footer className="footer">
          <a href="#" className="footer-brand">
            PlaceWise AI
          </a>
          <span>Built to help you prepare for what's next.</span>
          <span className="footer-dot">●</span>
        </footer>
      </div>

      <style jsx global>{`
        :root {
          color-scheme: dark;
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #070b18;
          color: #eef2ff;
          font-family: Arial, Helvetica, sans-serif;
        }

        button,
        input,
        select {
          font: inherit;
        }

        .page-shell {
          position: relative;
          isolation: isolate;
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(
              ellipse at 15% 10%,
              rgba(8, 145, 178, 0.13),
              transparent 38%
            ),
            radial-gradient(
              ellipse at 85% 35%,
              rgba(109, 40, 217, 0.14),
              transparent 38%
            ),
            #070b18;
        }

        .particle-canvas {
          position: absolute;
          z-index: -1;
          inset: 0;
          pointer-events: auto;
          opacity: 0.8;
        }

        .ambient {
          position: absolute;
          z-index: -2;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          opacity: 0.2;
          animation: orb-drift 14s ease-in-out infinite alternate;
        }

        .ambient-one {
          top: 120px;
          left: -170px;
          background: #0891b2;
        }

        .ambient-two {
          top: 500px;
          right: -160px;
          background: #7c3aed;
          animation-delay: -5s;
        }

        .ambient-three {
          top: 1050px;
          left: 30%;
          background: #2563eb;
          animation-delay: -8s;
        }

        .page-content {
          width: min(1160px, calc(100% - 40px));
          margin: 0 auto;
        }

        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 25px 0;
          border-bottom: 1px solid rgba(148, 163, 184, 0.13);
          animation: fade-down 0.7s ease both;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #f8fafc;
          text-decoration: none;
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.7px;
        }

        .brand-icon {
          display: grid;
          place-items: center;
          width: 35px;
          height: 35px;
          border: 1px solid rgba(103, 232, 249, 0.5);
          border-radius: 11px;
          background: linear-gradient(135deg, #0e7490, #6d28d9);
          box-shadow: 0 0 22px rgba(34, 211, 238, 0.18);
          transition: transform 0.3s ease;
        }

        .brand:hover .brand-icon {
          transform: rotate(-8deg) scale(1.07);
        }

        .brand-highlight {
          color: #67e8f9;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 9px 13px;
          border: 1px solid rgba(148, 163, 184, 0.19);
          border-radius: 30px;
          background: rgba(15, 23, 42, 0.55);
          color: #cbd5e1;
          font-size: 12px;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 10px #34d399;
          animation: pulse-dot 2s infinite;
        }

        .hero {
          max-width: 790px;
          margin: 72px auto 54px;
          text-align: center;
          animation: fade-up 0.8s 0.08s ease both;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          border: 1px solid rgba(103, 232, 249, 0.22);
          border-radius: 30px;
          background: rgba(8, 145, 178, 0.08);
          color: #a5f3fc;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        .sparkle {
          color: #c4b5fd;
          animation: sparkle 3s ease-in-out infinite;
        }

        .hero h1 {
          margin: 24px 0 18px;
          font-size: clamp(38px, 6.5vw, 70px);
          line-height: 1.08;
          letter-spacing: -3px;
          font-weight: 850;
        }

        .gradient-text {
          color: transparent;
          background: linear-gradient(
            90deg,
            #67e8f9,
            #a5b4fc 48%,
            #c4b5fd
          );
          background-clip: text;
          -webkit-background-clip: text;
          background-size: 200% auto;
          animation: gradient-flow 7s ease infinite;
        }

        .hero-description {
          max-width: 650px;
          margin: 0 auto;
          color: #a5b4cc;
          font-size: 16px;
          line-height: 1.8;
        }

        .hero-highlights {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px 24px;
          margin-top: 27px;
          color: #cbd5e1;
          font-size: 12px;
        }

        .hero-highlights span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        .check-icon {
          color: #67e8f9;
          font-weight: 800;
        }

        .workspace {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.8fr);
          align-items: start;
          gap: 24px;
          padding-bottom: 60px;
        }

        .glass-card {
          border: 1px solid rgba(148, 163, 184, 0.19);
          border-radius: 22px;
          background: linear-gradient(
            145deg,
            rgba(17, 27, 49, 0.88),
            rgba(10, 15, 31, 0.88)
          );
          box-shadow:
            0 25px 80px rgba(0, 0, 0, 0.22),
            inset 0 1px rgba(255, 255, 255, 0.025);
          backdrop-filter: blur(16px);
          animation: fade-up 0.8s ease both;
          transition:
            border-color 0.3s ease,
            box-shadow 0.3s ease,
            transform 0.3s ease;
        }

        .glass-card:hover {
          border-color: rgba(103, 232, 249, 0.3);
          box-shadow:
            0 28px 80px rgba(0, 0, 0, 0.26),
            0 0 28px rgba(34, 211, 238, 0.045);
        }

        .form-card {
          padding: 29px;
          animation-delay: 0.12s;
        }

        .card-heading {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 29px;
        }

        .heading-icon {
          display: grid;
          place-items: center;
          width: 45px;
          height: 45px;
          border: 1px solid rgba(103, 232, 249, 0.2);
          border-radius: 14px;
          background: rgba(8, 145, 178, 0.12);
          color: #67e8f9;
          font-size: 25px;
        }

        .card-heading h2 {
          margin: 0 0 6px;
          font-size: 20px;
          letter-spacing: -0.5px;
        }

        .card-heading p {
          margin: 0;
          color: #94a3b8;
          font-size: 12px;
          line-height: 1.6;
        }

        .section-label {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 17px;
          color: #a5b4cc;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.4px;
        }

        .section-label span {
          display: grid;
          place-items: center;
          width: 25px;
          height: 25px;
          border: 1px solid rgba(103, 232, 249, 0.22);
          border-radius: 8px;
          background: rgba(8, 145, 178, 0.09);
          color: #67e8f9;
          font-size: 10px;
        }

        .section-gap {
          margin-top: 28px;
        }

        .fields-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px 15px;
        }

        .field {
          min-width: 0;
          animation: fade-up 0.55s ease both;
        }

        .field label {
          display: block;
          margin-bottom: 8px;
          color: #e2e8f0;
          font-size: 12px;
          font-weight: 650;
        }

        .field input,
        .field select {
          display: block;
          width: 100%;
          min-height: 45px;
          padding: 11px 12px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 10px;
          outline: none;
          background: rgba(5, 10, 24, 0.66);
          color: #f1f5f9;
          font-size: 13px;
          transition:
            border-color 0.25s ease,
            box-shadow 0.25s ease,
            background 0.25s ease,
            transform 0.25s ease;
        }

        .field input::placeholder {
          color: #64748b;
        }

        .field input:hover,
        .field select:hover {
          border-color: rgba(103, 232, 249, 0.4);
        }

        .field input:focus,
        .field select:focus {
          border-color: #22d3ee;
          background: rgba(8, 47, 73, 0.35);
          box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.1);
        }

        .field small {
          display: block;
          margin-top: 7px;
          color: #8492aa;
          font-size: 10px;
          line-height: 1.5;
        }

        .predict-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          min-height: 52px;
          margin-top: 29px;
          padding: 14px 18px;
          border: 1px solid rgba(165, 243, 252, 0.35);
          border-radius: 12px;
          background: linear-gradient(100deg, #0891b2, #4f46e5 65%, #7c3aed);
          color: white;
          font-size: 13px;
          font-weight: 750;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(79, 70, 229, 0.2);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            filter 0.25s ease;
        }

        .predict-button:hover:not(:disabled) {
          transform: translateY(-3px);
          filter: brightness(1.12);
          box-shadow: 0 13px 32px rgba(79, 70, 229, 0.34);
        }

        .predict-button:active:not(:disabled) {
          transform: translateY(0) scale(0.99);
        }

        .predict-button:disabled {
          opacity: 0.75;
          cursor: wait;
        }

        .button-arrow {
          font-size: 18px;
          transition: transform 0.25s ease;
        }

        .predict-button:hover .button-arrow {
          transform: translate(3px, -2px);
        }

        .spinner {
          width: 17px;
          height: 17px;
          border: 2px solid rgba(255, 255, 255, 0.35);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .form-footnote {
          margin: 13px 0 0;
          color: #74829a;
          text-align: center;
          font-size: 10px;
          line-height: 1.6;
        }

        .error-message {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          margin-top: 18px;
          padding: 12px;
          border: 1px solid rgba(248, 113, 113, 0.25);
          border-radius: 10px;
          background: rgba(127, 29, 29, 0.18);
          color: #fecaca;
          font-size: 12px;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .error-message span {
          display: grid;
          place-items: center;
          flex: 0 0 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(248, 113, 113, 0.15);
          font-weight: 800;
        }

        .result-card {
          position: sticky;
          top: 22px;
          min-height: 600px;
          padding: 27px;
          animation-delay: 0.24s;
        }

        .result-top {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.13);
        }

        .result-icon {
          color: #67e8f9;
          font-size: 20px;
        }

        .result-label {
          color: #a5b4cc;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.7px;
        }

        .empty-result {
          padding-top: 19px;
          animation: fade-up 0.5s ease both;
        }

        .orb-illustration {
          position: relative;
          display: grid;
          place-items: center;
          width: 170px;
          height: 170px;
          margin: 12px auto 25px;
        }

        .orb-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 1px solid rgba(103, 232, 249, 0.2);
          border-radius: 50%;
          animation: ring-rotate 12s linear infinite;
        }

        .ring-one {
          border-top-color: #67e8f9;
          border-bottom-color: rgba(103, 232, 249, 0.04);
        }

        .ring-two {
          width: 76%;
          height: 76%;
          border-color: rgba(167, 139, 250, 0.38);
          border-left-color: #a78bfa;
          animation-direction: reverse;
          animation-duration: 8s;
        }

        .orb-core {
          display: grid;
          place-items: center;
          width: 65px;
          height: 65px;
          border: 1px solid rgba(165, 243, 252, 0.45);
          border-radius: 22px;
          background: radial-gradient(
            circle at 30% 20%,
            rgba(103, 232, 249, 0.35),
            rgba(79, 70, 229, 0.32) 65%,
            rgba(15, 23, 42, 0.8)
          );
          box-shadow:
            0 0 35px rgba(34, 211, 238, 0.18),
            inset 0 0 20px rgba(167, 139, 250, 0.15);
          color: #a5f3fc;
          font-size: 32px;
          animation: core-float 3s ease-in-out infinite;
        }

        .empty-result h2,
        .loading-result h2 {
          margin: 0 0 10px;
          text-align: center;
          font-size: 18px;
          letter-spacing: -0.4px;
        }

        .empty-result > p,
        .loading-result > p {
          margin: 0 auto;
          max-width: 300px;
          color: #94a3b8;
          text-align: center;
          font-size: 12px;
          line-height: 1.8;
        }

        .mini-stat {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-top: 22px;
          padding: 13px;
          border: 1px solid rgba(148, 163, 184, 0.12);
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.42);
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            background 0.25s ease;
        }

        .mini-stat:hover {
          transform: translateX(4px);
          border-color: rgba(103, 232, 249, 0.3);
          background: rgba(8, 145, 178, 0.06);
        }

        .mini-stat-icon {
          display: grid;
          place-items: center;
          width: 35px;
          height: 35px;
          flex: 0 0 35px;
          border-radius: 10px;
          background: rgba(8, 145, 178, 0.12);
          color: #67e8f9;
          font-size: 21px;
        }

        .mini-stat strong {
          display: block;
          margin-bottom: 4px;
          font-size: 12px;
        }

        .mini-stat small {
          color: #94a3b8;
          font-size: 10px;
        }

        .loading-result {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 425px;
          animation: fade-up 0.4s ease both;
        }

        .loader-orbit {
          position: relative;
          display: grid;
          place-items: center;
          width: 115px;
          height: 115px;
          margin-bottom: 28px;
          border: 1px solid rgba(103, 232, 249, 0.2);
          border-radius: 50%;
          animation: ring-rotate 3s linear infinite;
        }

        .loader-orbit span {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #67e8f9;
          box-shadow: 0 0 15px #22d3ee;
        }

        .loader-orbit span:nth-child(1) {
          top: -5px;
        }

        .loader-orbit span:nth-child(2) {
          right: 6px;
          bottom: 15px;
          background: #a78bfa;
          box-shadow: 0 0 15px #8b5cf6;
        }

        .loader-orbit span:nth-child(3) {
          bottom: 13px;
          left: 5px;
          background: #38bdf8;
        }

        .prediction-result {
          padding-top: 32px;
          text-align: center;
          animation: result-enter 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .result-badge {
          display: grid;
          place-items: center;
          width: 65px;
          height: 65px;
          margin: 0 auto 20px;
          border-radius: 22px;
          font-size: 28px;
          animation: core-float 3s ease-in-out infinite;
        }

        .placed-badge {
          border: 1px solid rgba(52, 211, 153, 0.4);
          background: rgba(16, 185, 129, 0.12);
          color: #6ee7b7;
          box-shadow: 0 0 32px rgba(16, 185, 129, 0.12);
        }

        .not-placed-badge {
          border: 1px solid rgba(251, 191, 36, 0.35);
          background: rgba(245, 158, 11, 0.1);
          color: #fcd34d;
        }

        .prediction-caption {
          margin: 0 0 10px;
          color: #94a3b8;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.7px;
        }

        .prediction-result h2 {
          margin: 0 0 12px;
          font-size: 34px;
          letter-spacing: -1px;
        }

        .prediction-description {
          margin: 0 auto;
          max-width: 320px;
          color: #a5b4cc;
          font-size: 12px;
          line-height: 1.8;
        }

        .probability-box {
          margin-top: 27px;
          padding: 16px;
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 12px;
          background: rgba(5, 10, 24, 0.45);
          text-align: left;
        }

        .probability-heading {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
          color: #cbd5e1;
          font-size: 11px;
        }

        .probability-heading strong {
          color: #67e8f9;
          white-space: nowrap;
        }

        .probability-track {
          height: 6px;
          overflow: hidden;
          border-radius: 10px;
          background: rgba(148, 163, 184, 0.16);
        }

        .probability-fill {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #0891b2, #818cf8, #c4b5fd);
          box-shadow: 0 0 12px rgba(103, 232, 249, 0.3);
          animation: fill-bar 1s ease both;
        }

        .probability-box small {
          display: block;
          margin-top: 10px;
          color: #8492aa;
          font-size: 10px;
          line-height: 1.6;
        }

        .next-step {
          display: flex;
          gap: 12px;
          margin-top: 22px;
          padding: 14px;
          border: 1px solid rgba(103, 232, 249, 0.15);
          border-radius: 12px;
          background: rgba(8, 145, 178, 0.06);
          text-align: left;
        }

        .next-step > span {
          color: #67e8f9;
          font-size: 20px;
        }

        .next-step strong {
          font-size: 12px;
        }

        .next-step p {
          margin: 6px 0 0;
          color: #94a3b8;
          font-size: 11px;
          line-height: 1.7;
        }

        .secondary-button {
          width: 100%;
          margin-top: 18px;
          padding: 12px;
          border: 1px solid rgba(148, 163, 184, 0.24);
          border-radius: 10px;
          background: rgba(15, 23, 42, 0.6);
          color: #cbd5e1;
          font-size: 12px;
          cursor: pointer;
          transition:
            border-color 0.25s ease,
            color 0.25s ease,
            transform 0.25s ease;
        }

        .secondary-button:hover {
          transform: translateY(-2px);
          border-color: rgba(103, 232, 249, 0.5);
          color: #a5f3fc;
        }

        .privacy-note {
          display: flex;
          gap: 12px;
          margin-top: 27px;
          padding-top: 20px;
          border-top: 1px solid rgba(148, 163, 184, 0.13);
        }

        .privacy-note > span {
          color: #67e8f9;
          font-size: 19px;
        }

        .privacy-note p {
          margin: 0;
          color: #8492aa;
          font-size: 10px;
          line-height: 1.8;
        }

        .privacy-note strong {
          color: #cbd5e1;
          font-size: 11px;
        }

        .footer {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 22px 0 28px;
          border-top: 1px solid rgba(148, 163, 184, 0.13);
          color: #7c8aa3;
          font-size: 11px;
        }

        .footer-brand {
          color: #cbd5e1;
          font-weight: 750;
          text-decoration: none;
        }

        .footer-dot {
          color: #34d399;
          font-size: 8px;
        }

        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-down {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes result-enter {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes orb-drift {
          from {
            transform: translate3d(0, 0, 0) scale(0.9);
          }
          to {
            transform: translate3d(40px, -30px, 0) scale(1.15);
          }
        }

        @keyframes core-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes ring-rotate {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-dot {
          0%,
          100% {
            opacity: 1;
            box-shadow: 0 0 10px #34d399;
          }
          50% {
            opacity: 0.55;
            box-shadow: 0 0 3px #34d399;
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            opacity: 0.65;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        @keyframes gradient-flow {
          0%,
          100% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fill-bar {
          from {
            width: 0;
          }
        }

        @media (max-width: 850px) {
          .workspace {
            grid-template-columns: 1fr;
          }

          .result-card {
            position: relative;
            top: auto;
            min-height: auto;
          }

          .hero {
            margin-top: 55px;
          }
        }

        @media (max-width: 540px) {
          .page-content {
            width: min(100% - 24px, 1160px);
          }

          .topbar {
            padding: 17px 0;
          }

          .brand {
            gap: 8px;
            font-size: 17px;
          }

          .brand-icon {
            width: 32px;
            height: 32px;
          }

          .status-pill {
            gap: 6px;
            padding: 8px;
            font-size: 9px;
          }

          .hero {
            margin: 48px auto 35px;
          }

          .hero h1 {
            font-size: clamp(36px, 10vw, 48px);
            letter-spacing: -1.8px;
          }

          .hero-description {
            font-size: 13px;
          }

          .hero-highlights {
            gap: 12px;
            font-size: 10px;
          }

          .form-card,
          .result-card {
            padding: 19px;
            border-radius: 17px;
          }

          .fields-grid {
            gap: 16px 10px;
          }

          .field label {
            font-size: 11px;
          }

          .field input,
          .field select {
            min-height: 43px;
            padding: 10px 8px;
            font-size: 12px;
          }

          .field small {
            font-size: 9px;
          }

          .footer {
            justify-content: center;
            text-align: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }

          .particle-canvas {
            opacity: 0.35;
          }
        }
      `}</style>
    </main>
  );
}
