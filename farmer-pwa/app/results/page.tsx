"use client";

// Task: Display soil analysis results and provide a downloadable PDF report.

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Leaf,
  Download,
  Sprout,
  Volume2,
} from "lucide-react";

// Task: Import the soil analysis PDF generator.
import { generateSoilReport } from "../utils/generateSoilReport";

type AnalysisResult = {
  soil_data?: {
    nitrogen?: number;
    phosphorus?: number;
    potassium?: number;
    ph?: number;
    moisture?: number;
    organic_matter?: number;
  };

  nutrient_analysis?: {
    deficiency_category?: string;
  };

  crop_recommendation?: {
    crop?: string;
    confidence?: number;
  };

  soil_health?: {
    score?: number;
    status?: string;
  };

  fertilizer_recommendation?: {
    fertilizer_type?: string;
    recommendation?: string;
    timing?: string;
    method?: string;
    precaution?: string;
  };

  soil_management?: string[];
};

export default function ResultsPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    // Task: Load the saved soil analysis result.
    const savedResult = localStorage.getItem("soil_analysis_result");

    if (savedResult) {
      try {
        setResult(JSON.parse(savedResult));
      } catch (error) {
        console.error("Failed to load soil analysis result:", error);
      }
    }
  }, []);

  // Task: Get soil values from the saved analysis.
  const soilData = result?.soil_data;

  const nitrogen = soilData?.nitrogen ?? 0;
  const phosphorus = soilData?.phosphorus ?? 0;
  const potassium = soilData?.potassium ?? 0;
  const ph = soilData?.ph ?? 0;
  const moisture = soilData?.moisture ?? 0;
  const organicMatter = soilData?.organic_matter ?? 0;

  // Task: Get analysis results from the backend.
  const deficiency =
    result?.nutrient_analysis?.deficiency_category ?? "No_Deficiency";

  const healthScore = result?.soil_health?.score ?? 0;
  const healthStatus = result?.soil_health?.status ?? "Unknown";

  const recommendedCrop =
    result?.crop_recommendation?.crop ?? "Not available";

  const cropConfidence =
    result?.crop_recommendation?.confidence ?? 0;

  const fertilizer = result?.fertilizer_recommendation;

  const management = result?.soil_management ?? [];

  // Task: Check whether individual nutrient values indicate a deficiency.
  const nitrogenLow =
    deficiency === "N_Deficiency" ||
    deficiency === "Multiple_Deficiency";

  const phosphorusLow =
    deficiency === "P_Deficiency" ||
    deficiency === "Multiple_Deficiency";

  const potassiumLow =
    deficiency === "K_Deficiency" ||
    deficiency === "Multiple_Deficiency";

  // Task: Convert crop confidence into a suitable-crop label.
  const cropSuitability =
    cropConfidence >= 90
      ? "Highly Suitable"
      : cropConfidence >= 70
        ? "Moderately Suitable"
        : "Suitable";

  // Task: Generate the soil analysis PDF report.
  const handleDownloadReport = () => {
    if (!result) {
      return;
    }

    generateSoilReport(result);
  };

  const handleListen = () => {
    if (!result || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(
      `Soil health score ${healthScore} out of 100. Nutrient status: ${deficiency.replaceAll("_", " ")}. Recommended crop: ${recommendedCrop}.`
    );
    speech.lang = "en-IN";
    speech.rate = 0.9;
    window.speechSynthesis.speak(speech);
  };

  return (
    <main className="min-h-screen bg-[#F7FAF5]">

      {/* HEADER */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-md items-center gap-3 px-5 py-4">

          {/* Task: Navigate back to the Home page. */}
          <Link
            href="/home"
            className="rounded-full bg-gray-100 p-2"
          >
            <ArrowLeft size={19} />
          </Link>

          <div>
            <h1 className="font-bold text-gray-900">
              Soil Results
            </h1>

            <p className="text-xs text-gray-500">
              Your soil analysis
            </p>
          </div>

        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-md px-5 pb-10 pt-6">

        {/* SOIL HEALTH SCORE */}
        <section className="rounded-3xl bg-white p-5 shadow-sm">

          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Soil Health Score
          </p>

          <div className="mt-5 flex items-center gap-5">

            <div
              className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(from_270deg,#1f7a4d_0deg,#1f7a4d_calc(var(--score)*1.8deg),#e7eee8_calc(var(--score)*1.8deg),#e7eee8_180deg,transparent_180deg)]"
              style={{ "--score": healthScore } as CSSProperties}
              aria-label={`Soil health score ${healthScore} out of 100`}
              role="img"
            >
              <div className="absolute inset-2 rounded-full bg-white" />

              <div className="relative text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {healthScore}
                </p>

                <p className="text-xs text-gray-400">
                  / 100
                </p>
              </div>

            </div>

            <div>

              <div className="flex items-center gap-2">

                <CheckCircle2
                  size={21}
                  className="text-green-600"
                />

                <p className="text-xl font-bold text-green-700">
                  {healthStatus}
                </p>

              </div>

              <p className="mt-2 text-sm leading-5 text-gray-500">
                Your soil condition is based on the
                current analysis.
              </p>

            </div>

          </div>

        </section>

        {/* NUTRIENT STATUS */}
        <section className="sticky bottom-20 z-20 mt-6 rounded-2xl border border-green-100 bg-white/95 p-2 shadow-lg backdrop-blur">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleListen}
              disabled={!result}
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-green-200 bg-white px-3 text-sm font-bold text-green-800 disabled:opacity-50"
            >
              <Volume2 size={18} aria-hidden="true" />
              Listen
            </button>
            <button
              type="button"
              onClick={handleDownloadReport}
              disabled={!result}
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-700 px-3 text-sm font-bold text-white disabled:opacity-50"
            >
              <Download size={18} aria-hidden="true" />
              Download PDF
            </button>
          </div>
        </section>

        <section className="mt-6">

          <h2 className="text-lg font-bold text-gray-900">
            Nutrient Status
          </h2>

          <div className="mt-4 grid grid-cols-3 gap-3">

            {/* NITROGEN */}
            <div
              className={
                nitrogenLow
                  ? "rounded-2xl border border-amber-100 bg-amber-50 p-3"
                  : "rounded-2xl border border-green-100 bg-green-50 p-3"
              }
            >

              <p className="text-xs font-medium text-gray-500">
                Nitrogen (N)
              </p>

              <div className="mt-3 flex items-center gap-1.5">

                {nitrogenLow ? (
                  <AlertTriangle
                    size={15}
                    className="text-amber-600"
                  />
                ) : (
                  <CheckCircle2
                    size={15}
                    className="text-green-600"
                  />
                )}

                <p
                  className={
                    nitrogenLow
                      ? "text-xs font-bold text-amber-700"
                      : "text-xs font-bold text-green-700"
                  }
                >
                  {nitrogenLow ? "Review" : "Good level"}
                </p>

              </div>

            </div>

            {/* PHOSPHORUS */}
            <div
              className={
                phosphorusLow
                  ? "rounded-2xl border border-amber-100 bg-amber-50 p-3"
                  : "rounded-2xl border border-green-100 bg-green-50 p-3"
              }
            >

              <p className="text-xs font-medium text-gray-500">
                Phosphorus (P)
              </p>

              <div className="mt-3 flex items-center gap-1.5">

                {phosphorusLow ? (
                  <AlertTriangle
                    size={15}
                    className="text-amber-600"
                  />
                ) : (
                  <CheckCircle2
                    size={15}
                    className="text-green-600"
                  />
                )}

                <p
                  className={
                    phosphorusLow
                      ? "text-xs font-bold text-amber-700"
                      : "text-xs font-bold text-green-700"
                  }
                >
                  {phosphorusLow ? "Review" : "Good level"}
                </p>

              </div>

            </div>

            {/* POTASSIUM */}
            <div
              className={
                potassiumLow
                  ? "rounded-2xl border border-amber-100 bg-amber-50 p-3"
                  : "rounded-2xl border border-green-100 bg-green-50 p-3"
              }
            >

              <p className="text-xs font-medium text-gray-500">
                Potassium (K)
              </p>

              <div className="mt-3 flex items-center gap-1.5">

                {potassiumLow ? (
                  <AlertTriangle
                    size={15}
                    className="text-amber-600"
                  />
                ) : (
                  <CheckCircle2
                    size={15}
                    className="text-green-600"
                  />
                )}

                <p
                  className={
                    potassiumLow
                      ? "text-xs font-bold text-amber-700"
                      : "text-xs font-bold text-green-700"
                  }
                >
                  {potassiumLow ? "Review" : "Good level"}
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* SOIL PARAMETERS */}
        <section className="mt-6 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

          <h2 className="text-lg font-bold text-gray-900">
            Soil Parameters
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Values used for this soil analysis.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">

            <div className="rounded-2xl bg-gray-50 p-3">
              <p className="text-xs text-gray-500">
                Nitrogen (N)
              </p>
              <p className="mt-1 font-bold text-gray-900">
                {nitrogen} mg/kg
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-3">
              <p className="text-xs text-gray-500">
                Phosphorus (P)
              </p>
              <p className="mt-1 font-bold text-gray-900">
                {phosphorus} mg/kg
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-3">
              <p className="text-xs text-gray-500">
                Potassium (K)
              </p>
              <p className="mt-1 font-bold text-gray-900">
                {potassium} mg/kg
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-3">
              <p className="text-xs text-gray-500">
                Soil pH
              </p>
              <p className="mt-1 font-bold text-gray-900">
                {ph}
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-3">
              <p className="text-xs text-gray-500">
                Moisture
              </p>
              <p className="mt-1 font-bold text-gray-900">
                {moisture}%
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-3">
              <p className="text-xs text-gray-500">
                Organic Matter
              </p>
              <p className="mt-1 font-bold text-gray-900">
                {organicMatter}%
              </p>
            </div>

          </div>

        </section>

        {/* SOIL RECOMMENDATION */}
        <section className="mt-6 rounded-3xl border border-green-100 bg-green-50 p-5">

          <div className="flex items-center gap-2">

            <Leaf
              size={20}
              className="text-green-700"
            />

            <h2 className="text-lg font-bold text-gray-900">
              Soil Recommendation
            </h2>

          </div>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            {deficiency === "No_Deficiency"
              ? "Your soil does not show a nutrient deficiency according to the current analysis. Continue monitoring soil nutrients and maintain good soil management practices."
              : `The analysis indicates ${deficiency.replaceAll(
                  "_",
                  " "
                )}. Follow the fertilizer and soil-management recommendations below.`}
          </p>

        </section>

        {/* FERTILIZER RECOMMENDATION */}
        <section className="mt-6 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

          <h2 className="text-lg font-bold text-gray-900">
            Fertilizer Recommendation
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Recommendation based on the current nutrient status.
          </p>

          <div className="mt-4 rounded-2xl bg-amber-50 p-4">

            <div className="flex items-center gap-2">

              <AlertTriangle
                size={19}
                className="text-amber-600"
              />

              <p className="font-semibold text-amber-800">
                {fertilizer?.fertilizer_type ??
                  "No immediate fertilizer requirement"}
              </p>

            </div>

            <p className="mt-2 text-sm leading-5 text-gray-600">
              {fertilizer?.recommendation ??
                "Continue regular soil monitoring and follow crop-specific nutrient requirements."}
            </p>

            {fertilizer?.timing && (
              <p className="mt-2 text-xs text-gray-500">
                <strong>Timing:</strong> {fertilizer.timing}
              </p>
            )}

            {fertilizer?.method && (
              <p className="mt-1 text-xs text-gray-500">
                <strong>Method:</strong> {fertilizer.method}
              </p>
            )}

            {fertilizer?.precaution && (
              <p className="mt-1 text-xs text-gray-500">
                <strong>Precaution:</strong> {fertilizer.precaution}
              </p>
            )}

          </div>

        </section>

        {/* SOIL MANAGEMENT */}
        <section className="mt-6 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

          <h2 className="text-lg font-bold text-gray-900">
            Soil Management
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Recommended practices for maintaining soil health.
          </p>

          <div className="mt-4 space-y-3">

            {management.length > 0 ? (
              management.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-green-600"
                  />

                  <p className="text-sm text-gray-600">
                    {item}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex gap-3">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-green-600"
                />

                <p className="text-sm text-gray-600">
                  Continue regular soil monitoring.
                </p>
              </div>
            )}

          </div>

        </section>

        {/* SUITABLE CROPS */}
        <section className="mt-6">

          <div className="flex items-center gap-2">

            <Sprout
              size={20}
              className="text-green-700"
            />

            <h2 className="text-lg font-bold text-gray-900">
              Suitable Crops
            </h2>

          </div>

          <div className="mt-4 space-y-3">

            {/* RECOMMENDED CROP */}
            <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">

              <div>
                <p className="font-semibold capitalize text-gray-900">
                  {recommendedCrop}
                </p>

                <p className="mt-1 text-xs font-medium text-green-700">
                  {cropSuitability}
                </p>
              </div>

              <p className="text-lg font-bold text-green-700">
                {cropConfidence.toFixed(2)}%
              </p>

            </div>

          </div>

        </section>

        {/* DOWNLOAD REPORT */}
        <section className="mt-6">

          {/* Task: Download the generated soil analysis PDF. */}
          <button
            type="button"
            onClick={handleDownloadReport}
            disabled={!result}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 py-4 font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download size={19} />
            Download Soil Health Report
          </button>

        </section>

        {/* BACK HOME */}
        <Link
          href="/home"
          className="mt-4 flex w-full items-center justify-center rounded-2xl border border-gray-200 bg-white py-3.5 text-sm font-semibold text-gray-700"
        >
          Back to Home
        </Link>

      </div>

    </main>
  );
}
