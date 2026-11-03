"use client";

// Task: Create a dynamic and multilingual soil analysis history page.

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Leaf,
} from "lucide-react";
import Link from "next/link";

// Task: Enable multilingual text on the History page.
import { useLanguage } from "../translations/LanguageProvider";

// Task: Define the structure of a stored soil analysis.
type AnalysisHistoryItem = {
  id: string;
  date: string;
  score: number;
  status: string;
  crop: string;
  deficiency: string;
};

// Task: Create the History page.
export default function HistoryPage() {
  // Task: Get the selected language and translation function.
  const { t } = useLanguage();

  // Task: Store previous soil analyses.
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([]);

  // Task: Load analysis history from localStorage.
  useEffect(() => {
    const storedHistory =
      localStorage.getItem("soil_analysis_history");

    if (!storedHistory) {
      setHistory([]);
      return;
    }

    try {
      const parsedHistory = JSON.parse(storedHistory);

      // Task: Check that stored history is an array.
      if (Array.isArray(parsedHistory)) {
        setHistory(parsedHistory);
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error(
        "Unable to read analysis history:",
        error
      );

      setHistory([]);
    }
  }, []);

  // Task: Format the analysis date for display.
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return t("unknownDate");
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-[#F7FAF5]">

      {/* HEADER */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-md items-center gap-3 px-5 py-4">

          {/* Task: Navigate back to Home page. */}
          <Link
            href="/home"
            className="rounded-full bg-gray-100 p-2"
            aria-label={t("back")}
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="font-bold text-gray-900">
              {t("analysisHistory")}
            </h1>

            <p className="text-xs text-gray-500">
              {t("previousSoilAnalyses")}
            </p>
          </div>

        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-md px-5 py-6">

        {/* SUMMARY */}
        <div className="rounded-2xl bg-green-700 p-5 text-white shadow-md">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-white/20 p-3">
              <Clock3 size={24} />
            </div>

            <div>

              <p className="text-sm text-green-100">
                {t("totalAnalyses")}
              </p>

              <p className="text-2xl font-bold">
                {history.length}
              </p>

            </div>

          </div>

        </div>

        {/* HISTORY LIST */}
        <section className="mt-6">

          <h2 className="text-lg font-bold text-gray-900">
            {t("recentAnalyses")}
          </h2>

          {/* Task: Display empty state when no analysis exists. */}
          {history.length === 0 ? (
            <div className="mt-4 rounded-2xl bg-white p-6 text-center shadow-sm">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">

                <Leaf
                  size={26}
                  className="text-green-700"
                />

              </div>

              <h3 className="mt-4 font-semibold text-gray-900">
                {t("noAnalysesYet")}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {t("completeSoilTestHistory")}
              </p>

              <Link
                href="/soil-test"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white"
              >
                {t("startSoilTest")}
                <ChevronRight size={16} />
              </Link>

            </div>
          ) : (

            <div className="mt-4 space-y-3">

              {/* Task: Display each stored analysis. */}
              {history.map((analysis) => (

                <Link
                  key={analysis.id}
                  href="/results"
                  className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md"
                >

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-green-100 p-3">

                      <Leaf
                        size={22}
                        className="text-green-700"
                      />

                    </div>

                    <div>

                      <p className="font-semibold text-gray-900">
                        {t("soilAnalysis")}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {formatDate(analysis.date)}
                        {" • "}
                        {analysis.crop
                          ? `${analysis.crop} ${t("recommended")}`
                          : t("cropRecommendationUnavailable")}
                      </p>

                      <div className="mt-2 flex items-center gap-1">

                        <CheckCircle2
                          size={15}
                          className="text-green-600"
                        />

                        <span className="text-xs font-semibold text-green-700">
                          {t("score")} {analysis.score}/100
                        </span>

                      </div>

                    </div>

                  </div>

                  <ChevronRight
                    size={20}
                    className="text-gray-400"
                  />

                </Link>

              ))}

            </div>

          )}

        </section>

      </div>

    </main>
  );
}