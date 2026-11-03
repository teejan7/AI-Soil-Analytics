// Task: Connect the crop recommendation page to the FastAPI backend with multilingual support.

"use client";

import { useState } from "react";

import {
  ArrowLeft,
  Sprout,
  Search,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

import Link from "next/link";
import { useLanguage } from "../translations/LanguageProvider";
import { API_BASE_URL } from "../../lib/api";

export default function CropsPage() {
  // Task: Access the selected language and translation function.
  const { t } = useLanguage();

  // Task: Store crop recommendation input values
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
    moisture: "",
    rainfall: "",
  });

  // Task: Store backend crop recommendation result
  const [result, setResult] = useState<{
    crop: string;
    confidence: number;
  } | null>(null);

  // Task: Store error message
  const [error, setError] = useState("");

  // Task: Track crop recommendation loading state
  const [isLoading, setIsLoading] = useState(false);

  // Task: Handle input changes
  const handleChange = (
    field: string,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    // Task: Clear previous result when input changes
    setResult(null);

    // Task: Clear previous error
    setError("");
  };

  // Task: Validate crop recommendation inputs
  const validateForm = () => {
    // Task: Check for empty fields
    if (
      formData.nitrogen === "" ||
      formData.phosphorus === "" ||
      formData.potassium === "" ||
      formData.ph === "" ||
      formData.moisture === "" ||
      formData.rainfall === ""
    ) {
      setError(
        t("pleaseEnterAllSoilConditions")
      );
      return false;
    }

    // Task: Convert input values to numbers
    const nitrogen = Number(formData.nitrogen);
    const phosphorus = Number(formData.phosphorus);
    const potassium = Number(formData.potassium);
    const ph = Number(formData.ph);
    const moisture = Number(formData.moisture);
    const rainfall = Number(formData.rainfall);

    // Task: Check for invalid numeric values
    if (
      !Number.isFinite(nitrogen) ||
      !Number.isFinite(phosphorus) ||
      !Number.isFinite(potassium) ||
      !Number.isFinite(ph) ||
      !Number.isFinite(moisture) ||
      !Number.isFinite(rainfall)
    ) {
      setError(
        t("pleaseEnterValidNumbers")
      );
      return false;
    }

    // Task: Prevent negative soil values
    if (
      nitrogen < 0 ||
      phosphorus < 0 ||
      potassium < 0 ||
      moisture < 0 ||
      rainfall < 0
    ) {
      setError(
        t("soilValuesCannotBeNegative")
      );
      return false;
    }

    // Task: Validate pH range
    if (ph < 0 || ph > 14) {
      setError(t("phMustBeBetween"));
      return false;
    }

    // Task: Validate moisture range
    if (moisture > 100) {
      setError(
        t("moistureMustBeBetween")
      );
      return false;
    }

    return true;
  };

  // Task: Send crop recommendation request to FastAPI
  const handleSubmit = async () => {
    // Task: Validate the form before sending the request
    if (!validateForm()) {
      return;
    }

    // Task: Start loading state
    setIsLoading(true);

    // Task: Clear previous error and result
    setError("");
    setResult(null);

    try {
      // Task: Send soil values to the FastAPI soil analysis endpoint
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

            // Task: Use default organic matter because this page does not collect it
            organic_matter: 0,

            // Task: Use default temperature because this page does not collect it
            temperature: 25,

            rainfall: Number(formData.rainfall),
          }),
        }
      );

      // Task: Handle unsuccessful backend response
      if (!response.ok) {
        throw new Error(
          t("unableToGetCropRecommendation")
        );
      }

      // Task: Read the FastAPI response
      const data = await response.json();

      // Task: Validate crop recommendation response
      if (
        !data?.crop_recommendation?.crop ||
        typeof data?.crop_recommendation?.confidence !==
          "number"
      ) {
        throw new Error(
          t("invalidCropRecommendation")
        );
      }

      // Task: Create the crop recommendation result
      const cropResult = {
        crop: data.crop_recommendation.crop,
        confidence:
          data.crop_recommendation.confidence,
      };

      // Task: Store the crop recommendation result in component state
      setResult(cropResult);

      // Task: Save the latest crop recommendation for other pages
      localStorage.setItem(
        "crop_recommendation_result",
        JSON.stringify(cropResult)
      );

      // Task: Save crop recommendation input values
      localStorage.setItem(
        "crop_recommendation_data",
        JSON.stringify({
          nitrogen: Number(formData.nitrogen),
          phosphorus: Number(formData.phosphorus),
          potassium: Number(formData.potassium),
          ph: Number(formData.ph),
          moisture: Number(formData.moisture),
          rainfall: Number(formData.rainfall),
        })
      );

      // Task: Display backend response in browser console
      console.log(
        "Crop recommendation response:",
        data
      );
    } catch (error) {
      // Task: Log crop recommendation error
      console.error(
        "Crop recommendation error:",
        error
      );

      // Task: Display crop recommendation error
      setError(
        t("unableToConnectCropServer")
      );
    } finally {
      // Task: Stop loading state
      setIsLoading(false);
    }
  };

  // Task: Calculate farmer-friendly suitability label
  const getSuitabilityLabel = (
    confidence: number
  ) => {
    if (confidence >= 90) {
      return t("highlySuitable");
    }

    if (confidence >= 70) {
      return t("moderatelySuitable");
    }

    return t("suitable");
  };

  return (
    <main className="min-h-screen bg-[#F7FAF5]">

      {/* HEADER */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-md items-center gap-3 px-5 py-4">

          <Link
            href="/"
            className="rounded-full bg-gray-100 p-2"
            aria-label={t("back")}
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="font-bold text-gray-900">
              {t("findSuitableCropsTitle")}
            </h1>

            <p className="text-xs text-gray-500">
              {t("findCropsForSoil")}
            </p>
          </div>

        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-md px-5 py-7">

        {/* INTRO */}
        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Sprout
              size={30}
              className="text-green-700"
            />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            {t("findRightCrop")}
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {t("cropRecommendationDescription")}
          </p>

        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">

            <AlertCircle
              size={20}
              className="mt-0.5 shrink-0 text-red-600"
            />

            <div>
              <p className="font-semibold text-red-700">
                {t("recommendationFailed")}
              </p>

              <p className="mt-1 text-sm text-red-600">
                {error}
              </p>
            </div>

          </div>
        )}

        {/* SOIL VALUES */}
        <section className="mt-7 rounded-2xl bg-white p-5 shadow-sm">

          <h3 className="text-lg font-bold text-gray-900">
            {t("soilConditions")}
          </h3>

          <div className="mt-4 space-y-4">

            {/* NITROGEN */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                {t("nitrogen")} (N)
              </label>

              <input
                type="number"
                min="0"
                value={formData.nitrogen}
                onChange={(e) =>
                  handleChange(
                    "nitrogen",
                    e.target.value
                  )
                }
                placeholder={t("enterNValue")}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />
            </div>

            {/* PHOSPHORUS */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                {t("phosphorus")} (P)
              </label>

              <input
                type="number"
                min="0"
                value={formData.phosphorus}
                onChange={(e) =>
                  handleChange(
                    "phosphorus",
                    e.target.value
                  )
                }
                placeholder={t("enterPValue")}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />
            </div>

            {/* POTASSIUM */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                {t("potassium")} (K)
              </label>

              <input
                type="number"
                min="0"
                value={formData.potassium}
                onChange={(e) =>
                  handleChange(
                    "potassium",
                    e.target.value
                  )
                }
                placeholder={t("enterKValue")}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />
            </div>

            {/* PH */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                {t("ph")}
              </label>

              <input
                type="number"
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
                placeholder={t("examplePhValue")}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />
            </div>

            {/* MOISTURE */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                {t("moisture")}
              </label>

              <input
                type="number"
                min="0"
                max="100"
                value={formData.moisture}
                onChange={(e) =>
                  handleChange(
                    "moisture",
                    e.target.value
                  )
                }
                placeholder={t("enterMoistureValue")}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />
            </div>

            {/* RAINFALL */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                {t("rainfall")}
              </label>

              <input
                type="number"
                min="0"
                value={formData.rainfall}
                onChange={(e) =>
                  handleChange(
                    "rainfall",
                    e.target.value
                  )
                }
                placeholder={t("enterRainfallValue")}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />
            </div>

          </div>

          {/* BUTTON */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 py-4 font-semibold text-white shadow-md transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Search size={19} />

            {isLoading
              ? t("findingCrops")
              : t("findSuitableCropsButton")}
          </button>

        </section>

        {/* RESULT */}
        {result && (
          <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm">

            <h3 className="text-lg font-bold text-gray-900">
              {t("recommendedCrop")}
            </h3>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-green-50 p-4">

              <div>
                <p className="font-semibold capitalize text-gray-900">
                  {result.crop}
                </p>

                <p className="text-xs text-green-700">
                  {getSuitabilityLabel(
                    result.confidence
                  )}
                </p>
              </div>

              <div className="text-right">

                <p className="font-bold text-green-700">
                  {result.confidence.toFixed(2)}%
                </p>

                <ChevronRight
                  size={17}
                  className="ml-auto text-green-600"
                />

              </div>

            </div>

          </section>
        )}

      </div>
    </main>
  );
}
