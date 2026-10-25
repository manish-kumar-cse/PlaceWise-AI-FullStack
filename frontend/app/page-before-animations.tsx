
"use client";

import { useState } from "react";

type StudentForm = {
  cgpa: string;
  internships: string;
  projects: string;
  workshops: string;
  aptitude: string;
  softSkills: string;
  extracurricular: string;
  training: string;
  sscMarks: string;
  hscMarks: string;
};

type PredictionResponse = {
  prediction: string;
  probability?: number;
};

const initialForm: StudentForm = {
  cgpa: "8.0",
  internships: "2",
  projects: "3",
  workshops: "2",
  aptitude: "80",
  softSkills: "4",
  extracurricular: "Yes",
  training: "Yes",
  sscMarks: "85",
  hscMarks: "80",
};

const fields = [
  { key: "cgpa", label: "CGPA", min: 0, max: 10, step: 0.1 },
  { key: "internships", label: "Internships", min: 0, step: 1 },
  { key: "projects", label: "Projects", min: 0, step: 1 },
  { key: "workshops", label: "Workshops / Certifications", min: 0, step: 1 },
  { key: "aptitude", label: "Aptitude Test Score", min: 0, max: 100, step: 1 },
  { key: "softSkills", label: "Soft Skills Rating (0–5)", min: 0, max: 5, step: 0.1 },
  { key: "sscMarks", label: "SSC Marks (%)", min: 0, max: 100, step: 0.1 },
  { key: "hscMarks", label: "HSC Marks (%)", min: 0, max: 100, step: 0.1 },
] as const;

const inputClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20";

export default function Home() {
  const [form, setForm] = useState<StudentForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<PredictionResponse | null>(null);

  function updateField(key: keyof StudentForm, value: string) {
    setForm((previous) => ({ ...previous, [key]: value }));
    setResult(null);
    setError("");
  }

  async function handlePredict(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const apiUrl = (
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
      ).replace(/\/$/, "");

      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          CGPA: Number(form.cgpa),
          Internships: Number(form.internships),
          Projects: Number(form.projects),
          Workshops_Certifications: Number(form.workshops),
          AptitudeTestScore: Number(form.aptitude),
          SoftSkillsRating: Number(form.softSkills),
          ExtracurricularActivities: form.extracurricular === "Yes" ? 1 : 0,
          PlacementTraining: form.training === "Yes" ? 1 : 0,
          SSC_Marks: Number(form.sscMarks),
          HSC_Marks: Number(form.hscMarks),
        }),
      });

      if (!response.ok) {
        throw new Error(
          response.status === 422
            ? "Please check your input values and try again."
            : `Prediction request failed (HTTP ${response.status}).`
        );
      }

      const data: PredictionResponse = await response.json();

      if (data.prediction !== "0" && data.prediction !== "1") {
        throw new Error("The API returned an unexpected prediction value.");
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to the prediction service."
      );
    } finally {
      setLoading(false);
    }
  }

  const predictedPlaced = result?.prediction === "1";

  return (
    <main className="min-h-screen overflow-hidden bg-[#070b18] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -right-40 top-72 h-96 w-96 rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <header className="flex items-center justify-between border-b border-white/10 py-6">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-xl font-black text-slate-950">
              P
            </div>
            <div>
              <p className="text-lg font-bold tracking-wide">PlaceWise AI</p>
              <p className="text-xs text-slate-400">Student Placement Insights</p>
            </div>
          </a>
          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs text-cyan-200">
            ML-powered demo
          </span>
        </header>

        <section className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-4 py-2 text-sm text-cyan-200">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Your career, more informed
            </p>
            <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Turn your student profile into{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                career insights.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
              Explore an ML-generated placement prediction using your
              academic performance, skills, projects and preparation.
            </p>
            <a
              href="#predictor"
              className="mt-8 inline-flex rounded-xl bg-cyan-300 px-6 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-200"
            >
              Try the predictor <span className="ml-2">↓</span>
            </a>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-cyan-950/20 sm:p-8">
            <p className="text-sm text-slate-400">Your profile matters</p>
            <h2 className="mt-2 text-2xl font-bold">Build a stronger future</h2>
            <div className="mt-7 space-y-5">
              {[
                ["Academic performance", "CGPA and school marks"],
                ["Practical experience", "Projects and internships"],
                ["Career readiness", "Aptitude and soft skills"],
              ].map(([title, description], index) => (
                <div
                  key={title}
                  className="flex items-center gap-4 rounded-2xl border border-white/5 bg-slate-900/70 p-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-400/20 font-bold text-cyan-200">
                    0{index + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="mt-1 text-sm text-slate-400">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="predictor" className="scroll-mt-8 py-10 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Placement predictor
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Tell us about yourself
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-slate-400">
                Enter your details below to generate a prediction from the
                configured machine learning model.
              </p>
            </div>

            <form
              onSubmit={handlePredict}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl sm:p-9"
            >
              <div className="mb-7">
                <h3 className="text-lg font-bold">Academic and skill profile</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Use values within the specified ranges.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {fields.map((field) => (
                  <label key={field.key} className="block text-sm font-medium text-slate-200">
                    {field.label}
                    <input
                      className={inputClass}
                      type="number"
                      min={field.min}
                      max={"max" in field ? field.max : undefined}
                      step={field.step}
                      required
                      value={form[field.key]}
                      onChange={(event) =>
                        updateField(field.key, event.target.value)
                      }
                    />
                  </label>
                ))}

                <label className="block text-sm font-medium text-slate-200">
                  Extracurricular Activities
                  <select
                    className={inputClass}
                    value={form.extracurricular}
                    onChange={(event) =>
                      updateField("extracurricular", event.target.value)
                    }
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </label>

                <label className="block text-sm font-medium text-slate-200">
                  Placement Training
                  <select
                    className={inputClass}
                    value={form.training}
                    onChange={(event) =>
                      updateField("training", event.target.value)
                    }
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </label>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mt-6 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200"
                >
                  {error}
                  <p className="mt-1 text-red-200/70">
                    If the API is running locally, make sure its terminal is
                    still open.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-8 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 px-6 py-4 font-bold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Analyzing your profile..." : "Predict My Placement →"}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                For educational purposes. Predictions are estimates and are
                not guarantees of employment or actual placement outcomes.
              </p>
            </form>

            {result && (
              <section
                aria-live="polite"
                className="mt-8 rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-cyan-300/[0.08] to-violet-400/[0.06] p-6 sm:p-9"
              >
                <p className="text-sm font-semibold uppercase tracking-widest text-cyan-200">
                  Prediction result
                </p>
                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-3xl font-black">
                      {predictedPlaced ? "Placed" : "Not Placed"}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">
                      Model-predicted outcome for the entered profile
                    </p>
                  </div>
                  <span
                    className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                      predictedPlaced
                        ? "bg-emerald-400/10 text-emerald-300"
                        : "bg-amber-400/10 text-amber-200"
                    }`}
                  >
                    Model output: {result.prediction}
                  </span>
                </div>

                {typeof result.probability === "number" && (
                  <div className="mt-7 rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-slate-300">
                        Highest class probability
                      </p>
                      <p className="text-xl font-bold text-cyan-200">
                        {result.probability.toFixed(2)}%
                      </p>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400"
                        style={{
                          width: `${Math.max(0, Math.min(100, result.probability))}%`,
                        }}
                      />
                    </div>
                    <p className="mt-3 text-xs leading-5 text-slate-500">
                      This is the model's highest predicted class probability,
                      not a verified real-world placement chance.
                    </p>
                  </div>
                )}

                <p className="mt-5 text-sm leading-6 text-slate-400">
                  Use this result as an educational reference, not a hiring
                  decision. Actual outcomes depend on many factors beyond
                  these inputs.
                </p>
              </section>
            )}
          </div>
        </section>

        <section className="grid gap-4 py-10 sm:grid-cols-3">
          {[
            ["01", "Academic insights", "Review the academic factors supplied to the model."],
            ["02", "Skill awareness", "Consider projects, aptitude and practical preparation."],
            ["03", "Career planning", "Use the result as one input when planning next steps."],
          ].map(([number, title, description]) => (
            <article
              key={number}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="text-sm font-bold text-cyan-300">{number}</p>
              <h3 className="mt-3 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
            </article>
          ))}
        </section>

        <footer className="border-t border-white/10 py-8 text-center">
          <p className="font-semibold tracking-wide">PLACEWISE AI</p>
          <p className="mt-2 text-sm text-slate-500">
            Student Placement Prediction · Built with Next.js and Machine Learning
          </p>
        </footer>
      </div>
    </main>
  );
}
