"use client";

import { useState } from "react";

type PredictionResponse = {
  prediction: string;
  probability?: number;
};

export default function Home() {
  const [cgpa, setCgpa] = useState("8");
  const [internships, setInternships] = useState("1");
  const [projects, setProjects] = useState("2");
  const [workshops, setWorkshops] = useState("2");
  const [aptitude, setAptitude] = useState("75");
  const [softSkills, setSoftSkills] = useState("4");
  const [extracurricular, setExtracurricular] = useState("Yes");
  const [training, setTraining] = useState("Yes");
  const [sscMarks, setSscMarks] = useState("85");
  const [hscMarks, setHscMarks] = useState("80");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prediction, setPrediction] =
    useState<PredictionResponse | null>(null);

  async function handlePrediction() {
    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CGPA: Number(cgpa),
          Internships: Number(internships),
          Projects: Number(projects),
          Workshops_Certifications: Number(workshops),
          AptitudeTestScore: Number(aptitude),
          SoftSkillsRating: Number(softSkills),
          ExtracurricularActivities:
            extracurricular === "Yes" ? 1 : 0,
          PlacementTraining: training === "Yes" ? 1 : 0,
          SSC_Marks: Number(sscMarks),
          HSC_Marks: Number(hscMarks),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.detail === "string"
            ? data.detail
            : JSON.stringify(data.detail ?? "Prediction failed")
        );
      }

      setPrediction(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not connect to the prediction server."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#080d1c] text-white">
      <nav className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-12">
        <div className="text-2xl font-bold tracking-tight">
          PlaceWise<span className="text-cyan-400"> AI</span>
        </div>

        <div className="hidden gap-8 text-sm text-slate-300 md:flex">
          <a href="#features" className="hover:text-cyan-300">Features</a>
          <a href="#predictor" className="hover:text-cyan-300">Predictor</a>
          <a href="#about" className="hover:text-cyan-300">About</a>
        </div>

        <a href="#predictor" className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950">
          Get Started ↗
        </a>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:px-12 md:py-28">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
            ✦ AI-powered career intelligence
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Your future.
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
              Your placement.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
            Turn your academic performance and skills into a smarter
            placement strategy. Discover where you stand and what you
            can improve.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#predictor" className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
              Check My Readiness →
            </a>
            <a href="#features" className="rounded-xl border border-white/15 px-6 py-3 text-slate-200 hover:bg-white/5">
              Explore features
            </a>
          </div>

          <div className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <div>
              <p className="text-2xl font-bold">AI</p>
              <p className="mt-1 text-xs text-slate-400">Powered insights</p>
            </div>
            <div>
              <p className="text-2xl font-bold">10</p>
              <p className="mt-1 text-xs text-slate-400">Student factors</p>
            </div>
            <div>
              <p className="text-2xl font-bold">1</p>
              <p className="mt-1 text-xs text-slate-400">Clear next step</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-5 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="relative rounded-3xl border border-white/10 bg-[#111a2e] p-7 shadow-2xl shadow-cyan-950/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">STUDENT OVERVIEW</p>
                <h2 className="mt-1 text-xl font-semibold">Placement journey</h2>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                Personalized
              </span>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-[#0b1222] p-5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Academic profile</span>
                <span className="text-cyan-300">In progress</span>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" />
              </div>
              <div className="mt-3 flex justify-between text-xs text-slate-500">
                <span>Build your profile</span>
                <span>80% illustrative</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm text-slate-400">Skill development</p>
                <p className="mt-3 text-2xl font-bold">↗ Growth</p>
                <p className="mt-2 text-xs text-slate-500">Keep learning consistently</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm text-slate-400">Career planning</p>
                <p className="mt-3 text-2xl font-bold">✦ Focus</p>
                <p className="mt-2 text-xs text-slate-500">Turn goals into action</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-violet-400/10 p-5">
              <p className="text-sm text-slate-300">Your next step</p>
              <p className="mt-2 font-semibold">Assess your placement readiness</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-white/10 bg-white/[0.02] px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Why PlaceWise AI
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Make your preparation count.
          </h2>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: "◈",
                title: "Placement prediction",
                text: "Explore a model-based estimate using your academic and skill profile.",
              },
              {
                icon: "◎",
                title: "Skill gap insights",
                text: "Identify areas to work on and plan your learning priorities.",
              },
              {
                icon: "↗",
                title: "Action roadmap",
                text: "Build a practical routine for interviews, aptitude and projects.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#111a2e] p-6 transition hover:-translate-y-1 hover:border-cyan-400/40">
                <div className="text-3xl text-cyan-300">{item.icon}</div>
                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="predictor" className="mx-auto max-w-5xl px-6 py-20 md:px-12">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Student assessment
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Explore your placement readiness
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Enter all 10 student factors to request a prediction from your
            trained placement model.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-[#111a2e] p-6 md:p-10">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="text-sm text-slate-300">
              CGPA (0–10)
              <input type="number" min="0" max="10" step="0.1" value={cgpa} onChange={(e) => setCgpa(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1222] px-4 py-3 text-white outline-none focus:border-cyan-400" />
            </label>

            <label className="text-sm text-slate-300">
              Internships completed
              <input type="number" min="0" value={internships} onChange={(e) => setInternships(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1222] px-4 py-3 text-white outline-none focus:border-cyan-400" />
            </label>

            <label className="text-sm text-slate-300">
              Projects completed
              <input type="number" min="0" value={projects} onChange={(e) => setProjects(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1222] px-4 py-3 text-white outline-none focus:border-cyan-400" />
            </label>

            <label className="text-sm text-slate-300">
              Workshops / Certifications
              <input type="number" min="0" value={workshops} onChange={(e) => setWorkshops(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1222] px-4 py-3 text-white outline-none focus:border-cyan-400" />
            </label>

            <label className="text-sm text-slate-300">
              Aptitude test score (0–100)
              <input type="number" min="0" max="100" value={aptitude} onChange={(e) => setAptitude(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1222] px-4 py-3 text-white outline-none focus:border-cyan-400" />
            </label>

            <label className="text-sm text-slate-300">
              Soft skills rating (0–5)
              <input type="number" min="0" max="5" step="0.1" value={softSkills} onChange={(e) => setSoftSkills(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1222] px-4 py-3 text-white outline-none focus:border-cyan-400" />
            </label>

            <label className="text-sm text-slate-300">
              Extracurricular activities
              <select value={extracurricular} onChange={(e) => setExtracurricular(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1222] px-4 py-3 text-white outline-none focus:border-cyan-400">
                <option>Yes</option>
                <option>No</option>
              </select>
            </label>

            <label className="text-sm text-slate-300">
              Placement training completed?
              <select value={training} onChange={(e) => setTraining(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1222] px-4 py-3 text-white outline-none focus:border-cyan-400">
                <option>Yes</option>
                <option>No</option>
              </select>
            </label>

            <label className="text-sm text-slate-300">
              SSC marks (0–100)
              <input type="number" min="0" max="100" value={sscMarks} onChange={(e) => setSscMarks(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1222] px-4 py-3 text-white outline-none focus:border-cyan-400" />
            </label>

            <label className="text-sm text-slate-300">
              HSC marks (0–100)
              <input type="number" min="0" max="100" value={hscMarks} onChange={(e) => setHscMarks(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1222] px-4 py-3 text-white outline-none focus:border-cyan-400" />
            </label>
          </div>

          <button
            onClick={handlePrediction}
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-cyan-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Predicting..." : "Predict My Placement →"}
          </button>

          {error && (
            <div role="alert" className="mt-6 rounded-2xl border border-red-400/30 bg-red-400/10 p-5 text-red-200">
              <h3 className="font-semibold">Prediction could not be completed</h3>
              <p className="mt-2 break-words text-sm">{error}</p>
              <p className="mt-2 text-sm">
                Make sure the backend is running at http://127.0.0.1:8000.
              </p>
            </div>
          )}

          {prediction && (
            <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
              <h3 className="text-xl font-semibold text-cyan-300">
                Prediction result
              </h3>
              <p className="mt-3 text-slate-200">
                Model output: <strong>{prediction.prediction}</strong>
              </p>

              {prediction.probability !== undefined && (
                <p className="mt-2 text-slate-300">
                  Highest class probability:{" "}
                  <strong>{prediction.probability.toFixed(2)}%</strong>
                </p>
              )}

              <p className="mt-3 text-sm leading-6 text-slate-400">
                This is a machine-learning estimate, not a guarantee of
                placement. Confirm what the model's output classes mean
                before interpreting the result as placed or not placed.
              </p>
            </div>
          )}
        </div>
      </section>

      <footer id="about" className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500">
        PlaceWise AI · Helping students prepare with clarity, confidence and data.
      </footer>
    </main>
  );
}
