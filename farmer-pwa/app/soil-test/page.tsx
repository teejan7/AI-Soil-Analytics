// Task: Connect the Soil Test page to the FastAPI soil analysis backend with multilingual support.

"use client";

import { useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  FlaskConical,
  CheckCircle2,
  Sprout,
  Atom,
  CircleHelp,
  Droplets,
  Gauge,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../translations/LanguageProvider";
import { API_BASE_URL } from "../../lib/api";

export default function SoilTestPage() {
  // Task: Access the selected application language and translation function.
  const { t } = useLanguage();

  // Task: Store soil input values
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
    moisture: "",
    organicMatter: "",
  });

  // Task: Store validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Task: Track whether soil analysis is in progress
  const [isLoading, setIsLoading] = useState(false);

  // Task: Store analysis error messages
  const [analysisError, setAnalysisError] = useState("");

  // Task: Store soil analysis results returned by FastAPI
  const [analysisResult, setAnalysisResult] = useState<{
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
  } | null>(null);

  // Task: Handle input changes
  const handleChange = (
    field: string,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    // Task: Clear field validation error
    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));

    // Task: Clear previous analysis error
    setAnalysisError("");

    // Task: Clear previous analysis result
    setAnalysisResult(null);
  };

  // Task: Validate all soil parameters
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const nitrogen = Number(formData.nitrogen);
    const phosphorus = Number(formData.phosphorus);
    const potassium = Number(formData.potassium);
    const ph = Number(formData.ph);
    const moisture = Number(formData.moisture);
    const organicMatter = Number(formData.organicMatter);

    // Task: Validate Nitrogen
    if (formData.nitrogen === "") {
      newErrors.nitrogen = t("pleaseEnterNitrogen");
    } else if (nitrogen < 0) {
      newErrors.nitrogen = t("nitrogenCannotBeNegative");
    }

    // Task: Validate Phosphorus
    if (formData.phosphorus === "") {
      newErrors.phosphorus =
        t("pleaseEnterPhosphorus");
    } else if (phosphorus < 0) {
      newErrors.phosphorus =
        t("phosphorusCannotBeNegative");
    }

    // Task: Validate Potassium
    if (formData.potassium === "") {
      newErrors.potassium =
        t("pleaseEnterPotassium");
    } else if (potassium < 0) {
      newErrors.potassium =
        t("potassiumCannotBeNegative");
    }

    // Task: Validate soil pH
    if (formData.ph === "") {
      newErrors.ph = t("pleaseEnterSoilPh");
    } else if (ph < 0 || ph > 14) {
      newErrors.ph = t("phBetween");
    }

    // Task: Validate moisture
    if (formData.moisture === "") {
      newErrors.moisture =
        t("pleaseEnterMoisture");
    } else if (
      moisture < 0 ||
      moisture > 100
    ) {
      newErrors.moisture =
        t("moistureBetween");
    }

    // Task: Validate organic matter
    if (formData.organicMatter === "") {
      newErrors.organicMatter =
        t("pleaseEnterOrganicMatter");
    } else if (
      organicMatter < 0 ||
      organicMatter > 100
    ) {
      newErrors.organicMatter =
        t("organicMatterBetween");
    }

    // Task: Store validation errors
    setErrors(newErrors);

    // Task: Return form validation status
    return Object.keys(newErrors).length === 0;
  };

  // Task: Send soil test data to the FastAPI backend
  const handleSubmit = async () => {
    // Task: Validate form before sending data
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    // Task: Clear previous analysis error
    setAnalysisError("");

    // Task: Clear previous analysis result
    setAnalysisResult(null);

    // Task: Start loading state
    setIsLoading(true);

    try {
      // Task: Send soil parameters to FastAPI
      const response = await fetch(
        `${API_BASE_URL}/soil/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nitrogen: Number(formData.nitrogen),
            phosphorus: Number(formData.phosphorus),
            potassium: Number(formData.potassium),
            ph: Number(formData.ph),
            moisture: Number(formData.moisture),
            organic_matter: Number(
              formData.organicMatter
            ),
          }),
        }
      );

      // Task: Handle unsuccessful FastAPI response
      if (!response.ok) {
        throw new Error(
          t("unableToAnalyzeSoil")
        );
      }

      // Task: Read the response from FastAPI
      const result = await response.json();

      // Task: Store the complete soil analysis result
      setAnalysisResult(result);

      // Task: Save the complete analysis result for the Results page
      localStorage.setItem(
        "soil_analysis_result",
        JSON.stringify(result)
      );

      // Task: Save submitted soil parameters for the Results page
      localStorage.setItem(
        "soil_test_data",
        JSON.stringify({
          nitrogen: Number(formData.nitrogen),
          phosphorus: Number(formData.phosphorus),
          potassium: Number(formData.potassium),
          ph: Number(formData.ph),
          moisture: Number(formData.moisture),
          organic_matter: Number(
            formData.organicMatter
          ),
        })
      );

      // Task: Create a history entry for the completed soil analysis
      const historyEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        score: result.soil_health?.score ?? 0,
        status:
          result.soil_health?.status ?? "Unknown",
        crop:
          result.crop_recommendation?.crop ?? "",
        deficiency:
          result.nutrient_analysis
            ?.deficiency_category ?? "",
      };

      // Task: Load existing soil analysis history
      const existingHistory =
        localStorage.getItem(
          "soil_analysis_history"
        );

      // Task: Prepare the history array
      let history: typeof historyEntry[] = [];

      try {
        history = existingHistory
          ? JSON.parse(existingHistory)
          : [];

        // Task: Make sure stored history is an array
        if (!Array.isArray(history)) {
          history = [];
        }
      } catch (error) {
        // Task: Handle invalid history data
        console.error(
          "Unable to read soil analysis history:",
          error
        );

        history = [];
      }

      // Task: Add the newest analysis to the beginning of history
      history.unshift(historyEntry);

      // Task: Save updated soil analysis history
      localStorage.setItem(
        "soil_analysis_history",
        JSON.stringify(history)
      );

      // Task: Display backend response in the browser console
      console.log(
        "FastAPI soil analysis response:",
        result
      );

      // Task: Display saved history in the browser console
      console.log(
        "Soil analysis history:",
        history
      );
    } catch (error) {
      // Task: Log backend connection error
      console.error(
        "Soil analysis error:",
        error
      );

      // Task: Display backend connection error
      setAnalysisError(
        t("unableToConnectServer")
      );
    } finally {
      // Task: Stop loading state
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7FAF5]">

      {/* HEADER */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-md items-center gap-3 px-5 py-4">

          {/* Task: Navigate directly to Home page */}
          <Link
            href="/home"
            className="rounded-full bg-gray-100 p-2"
            aria-label={t("back")}
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="font-bold text-gray-900">
              {t("soilTest")}
            </h1>

            <p className="text-xs text-gray-500">
              {t("enterSoilParameters")}
            </p>
          </div>

        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-md px-5 py-6">

        {/* INTRO */}
        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <FlaskConical
              size={30}
              className="text-green-700"
            />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            {t("enterSoilDetails")}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {t("soilTestReportDescription")}
          </p>

        </div>

        {/* ANALYSIS ERROR MESSAGE */}
        {analysisError && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">

            <AlertCircle
              size={20}
              className="mt-0.5 shrink-0 text-red-600"
            />

            <div>
              <p className="font-semibold text-red-700">
                {t("analysisFailed")}
              </p>

              <p className="mt-1 text-sm text-red-600">
                {analysisError}
              </p>
            </div>

          </div>
        )}

        {/* FORM */}
        <div className="mt-7 space-y-4">

          {/* NITROGEN */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700" htmlFor="nitrogen">
              <Atom size={19} className="text-green-700" aria-hidden="true" />
              <span>{t("nitrogen")} (N)</span>
              <span className="text-xs font-normal text-gray-500">mg/kg</span>
              <CircleHelp size={16} aria-label="Nitrogen in milligrams per kilogram" />
            </label>

            <input
              id="nitrogen"
              type="number"
              inputMode="decimal"
              min="0"
              value={formData.nitrogen}
              onChange={(e) =>
                handleChange(
                  "nitrogen",
                  e.target.value
                )
              }
              placeholder={t("enterNitrogen")}
              className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 outline-none ${
                errors.nitrogen
                  ? "border-red-400"
                  : "border-gray-200 focus:border-green-600"
              }`}
            />

            {errors.nitrogen && (
              <p className="mt-1 text-xs text-red-600">
                {errors.nitrogen}
              </p>
            )}
          </div>

          {/* PHOSPHORUS */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700" htmlFor="phosphorus">
              <Atom size={19} className="text-green-700" aria-hidden="true" />
              <span>{t("phosphorus")} (P)</span>
              <span className="text-xs font-normal text-gray-500">mg/kg</span>
              <CircleHelp size={16} aria-label="Phosphorus in milligrams per kilogram" />
            </label>

            <input
              id="phosphorus"
              type="number"
              inputMode="decimal"
              min="0"
              value={formData.phosphorus}
              onChange={(e) =>
                handleChange(
                  "phosphorus",
                  e.target.value
                )
              }
              placeholder={t("enterPhosphorus")}
              className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 outline-none ${
                errors.phosphorus
                  ? "border-red-400"
                  : "border-gray-200 focus:border-green-600"
              }`}
            />

            {errors.phosphorus && (
              <p className="mt-1 text-xs text-red-600">
                {errors.phosphorus}
              </p>
            )}
          </div>

          {/* POTASSIUM */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700" htmlFor="potassium">
              <Atom size={19} className="text-green-700" aria-hidden="true" />
              <span>{t("potassium")} (K)</span>
              <span className="text-xs font-normal text-gray-500">mg/kg</span>
              <CircleHelp size={16} aria-label="Potassium in milligrams per kilogram" />
            </label>

            <input
              id="potassium"
              type="number"
              inputMode="decimal"
              min="0"
              value={formData.potassium}
              onChange={(e) =>
                handleChange(
                  "potassium",
                  e.target.value
                )
              }
              placeholder={t("enterPotassium")}
              className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 outline-none ${
                errors.potassium
                  ? "border-red-400"
                  : "border-gray-200 focus:border-green-600"
              }`}
            />

            {errors.potassium && (
              <p className="mt-1 text-xs text-red-600">
                {errors.potassium}
              </p>
            )}
          </div>

          {/* SOIL pH */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700" htmlFor="ph">
              <Gauge size={19} className="text-clay-700 text-amber-700" aria-hidden="true" />
              <span>{t("ph")}</span>
              <span className="text-xs font-normal text-gray-500">0–14</span>
              <CircleHelp size={16} aria-label="Soil acidity from 0 to 14" />
            </label>

            <input
              id="ph"
              type="number"
              inputMode="decimal"
              min="0"
              max="14"
              step="0.1"
              value={formData.ph}
              onChange={(e) =>
                handleChange(
                  "ph",
                  e.target.value
                )
              }
              placeholder={t("examplePh")}
              className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 outline-none ${
                errors.ph
                  ? "border-red-400"
                  : "border-gray-200 focus:border-green-600"
              }`}
            />

            {errors.ph && (
              <p className="mt-1 text-xs text-red-600">
                {errors.ph}
              </p>
            )}
          </div>

          {/* MOISTURE */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700" htmlFor="moisture">
              <Droplets size={19} className="text-blue-600" aria-hidden="true" />
              <span>{t("moisture")} (%)</span>
              <CircleHelp size={16} aria-label="Soil moisture percentage" />
            </label>

            <input
              id="moisture"
              type="number"
              inputMode="decimal"
              min="0"
              max="100"
              value={formData.moisture}
              onChange={(e) =>
                handleChange(
                  "moisture",
                  e.target.value
                )
              }
              placeholder={t("exampleMoisture")}
              className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 outline-none ${
                errors.moisture
                  ? "border-red-400"
                  : "border-gray-200 focus:border-green-600"
              }`}
            />

            {errors.moisture && (
              <p className="mt-1 text-xs text-red-600">
                {errors.moisture}
              </p>
            )}
          </div>

          {/* ORGANIC MATTER */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700" htmlFor="organicMatter">
              <Sprout size={19} className="text-green-700" aria-hidden="true" />
              <span>{t("organicMatter")} (%)</span>
              <CircleHelp size={16} aria-label="Organic matter percentage" />
            </label>

            <input
              id="organicMatter"
              type="number"
              inputMode="decimal"
              min="0"
              max="100"
              step="0.1"
              value={formData.organicMatter}
              onChange={(e) =>
                handleChange(
                  "organicMatter",
                  e.target.value
                )
              }
              placeholder={t("exampleOrganicMatter")}
              className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 outline-none ${
                errors.organicMatter
                  ? "border-red-400"
                  : "border-gray-200 focus:border-green-600"
              }`}
            />

            {errors.organicMatter && (
              <p className="mt-1 text-xs text-red-600">
                {errors.organicMatter}
              </p>
            )}
          </div>

          {/* ANALYZE BUTTON */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="mt-3 w-full rounded-xl bg-green-700 py-4 font-semibold text-white shadow-md transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading
              ? t("analyzingSoil")
              : t("analyzeSoil")}
          </button>

        </div>

        {/* ANALYSIS RESULT */}
        {analysisResult && (
          <div className="mt-7 space-y-4">

            {/* RESULT HEADER */}
            <div className="rounded-2xl border border-green-200 bg-green-50 p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2
                    size={22}
                    className="text-green-700"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-green-800">
                    {t("soilAnalysisComplete")}
                  </h3>

                  <p className="text-sm text-green-700">
                    {t("soilAnalyzedSuccessfully")}
                  </p>
                </div>

              </div>

            </div>

            {/* SOIL HEALTH RESULT */}
            <div className="rounded-2xl bg-white p-5 shadow-sm">

              <h3 className="font-bold text-gray-900">
                {t("soilHealth")}
              </h3>

              <div className="mt-4 flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    {t("healthScore")}
                  </p>

                  <p className="mt-1 text-2xl font-bold text-green-700">
                    {analysisResult.soil_health?.score !==
                    undefined
                      ? `${analysisResult.soil_health.score}/100`
                      : t("notAvailable")}
                  </p>
                </div>

                <CheckCircle2
                  size={30}
                  className="text-green-600"
                />

              </div>

              <p className="mt-2 text-sm font-semibold text-green-700">
                {analysisResult.soil_health?.status ||
                  t("notAvailable")}
              </p>

            </div>

            {/* NUTRIENT RESULT */}
            <div className="rounded-2xl bg-white p-5 shadow-sm">

              <h3 className="font-bold text-gray-900">
                {t("nutrientAnalysis")}
              </h3>

              <div className="mt-4 flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    {t("nutrientStatus")}
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {analysisResult.nutrient_analysis
                      ?.deficiency_category
                      ?.replaceAll("_", " ") ||
                      t("notAvailable")}
                  </p>
                </div>

                <FlaskConical
                  size={28}
                  className="text-green-700"
                />

              </div>

            </div>

            {/* CROP RECOMMENDATION */}
            <div className="rounded-2xl bg-white p-5 shadow-sm">

              <div className="flex items-center gap-3">

                <Sprout
                  size={28}
                  className="text-green-700"
                />

                <div>
                  <h3 className="font-bold text-gray-900">
                    {t("recommendedCrop")}
                  </h3>

                  <p className="mt-1 text-lg font-bold capitalize text-green-700">
                    {analysisResult.crop_recommendation
                      ?.crop || t("notAvailable")}
                  </p>
                </div>

              </div>

              <div className="mt-4 rounded-xl bg-green-50 p-3">

                <p className="text-sm text-gray-600">
                  {t("modelConfidence")}
                </p>

                <p className="mt-1 text-xl font-bold text-green-700">
                  {analysisResult.crop_recommendation
                    ?.confidence !== undefined
                    ? `${analysisResult.crop_recommendation.confidence}%`
                    : t("notAvailable")}
                </p>

              </div>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}
