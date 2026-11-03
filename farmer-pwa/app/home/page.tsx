// Task: Create a dynamic farmer-friendly home page with latest soil analysis
// Task: Import the multilingual language selector.
"use client";

// Task: Import the SoilCare voice assistant component.

import VoiceAssistant from "../components/VoiceAssistant";
import LanguageSelector from "../components/LanguageSelector";
import { useLanguage } from "../translations/LanguageProvider";
import { useEffect, useState } from "react";
import {
  Bell,
  Camera,
  ChevronRight,
  FlaskConical,
  Home as HomeIcon,
  Leaf,
  BarChart3,
  User,
  Sprout,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import Link from "next/link";

export default function Home() {
  // Task: Get the selected language and translation function.
  const { t } = useLanguage();

  // Task: Store the logged-in user's name
  const [userName, setUserName] = useState("Farmer");

  // Task: Store the latest soil analysis result
  const [soilResult, setSoilResult] = useState<{
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
  } | null>(null);

  // Task: Load logged-in user and latest soil analysis
  useEffect(() => {
    // Task: Load logged-in user information
    const storedUser = localStorage.getItem("soilcare_user");

    // Task: Load the stored user when available without blocking the Home page.
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);

        if (user.name) {
          setUserName(user.name);
        }
      } catch (error) {
        // Task: Handle invalid user information without redirecting away from Home.
        console.error(
          "Unable to read user information:",
          error
        );

        // Task: Remove invalid user information and keep the default Farmer name.
        localStorage.removeItem("soilcare_user");
        setUserName("Farmer");
      }
    }

    // Task: Load the latest soil analysis result
    const storedSoilResult = localStorage.getItem(
      "soil_analysis_result"
    );

    if (storedSoilResult) {
      try {
        const parsedResult = JSON.parse(
          storedSoilResult
        );

        setSoilResult(parsedResult);
      } catch (error) {
        // Task: Handle invalid soil analysis data
        console.error(
          "Unable to read soil analysis result:",
          error
        );

        setSoilResult(null);
      }
    }
  }, []);

  // Task: Read the latest soil health score
  const soilScore =
    soilResult?.soil_health?.score;

  // Task: Read the latest soil health status
  const soilStatus =
    soilResult?.soil_health?.status;

  // Task: Display the soil health status in the selected language.
  const getTranslatedSoilStatus = () => {
    if (!soilStatus) {
      return t("noAnalysis");
    }

    if (soilStatus === "Good") {
      return t("good");
    }

    if (soilStatus === "Moderate") {
      return t("moderate");
    }

    if (soilStatus === "Needs Improvement") {
      return t("needsImprovement");
    }

    return soilStatus;
  };

  // Task: Read nutrient deficiency category
  const deficiencyCategory =
    soilResult?.nutrient_analysis
      ?.deficiency_category;

  // Task: Determine nutrient display status
  const getNutrientStatus = (
    nutrient: "nitrogen" | "phosphorus" | "potassium"
  ) => {
    // Task: Show no data before the first analysis
    if (!deficiencyCategory) {
      return "No Data";
    }

    // Task: Handle no nutrient deficiency
    if (
      deficiencyCategory === "No_Deficiency"
    ) {
      return "Good";
    }

    // Task: Handle multiple nutrient deficiencies
    if (
      deficiencyCategory ===
      "Multiple_Deficiency"
    ) {
      return "Review";
    }

    // Task: Handle individual nutrient deficiency
    if (
      (nutrient === "nitrogen" &&
        deficiencyCategory ===
          "N_Deficiency") ||
      (nutrient === "phosphorus" &&
        deficiencyCategory ===
          "P_Deficiency") ||
      (nutrient === "potassium" &&
        deficiencyCategory ===
          "K_Deficiency")
    ) {
      return "Low";
    }

    // Task: Show good status when this nutrient is not deficient
    return "Good";
  };

  // Task: Determine whether nutrient status is positive
  const isNutrientGood = (
    nutrient: "nitrogen" | "phosphorus" | "potassium"
  ) => {
    const status = getNutrientStatus(nutrient);

    return (
      status === "Good" ||
      status === "No Data"
    );
  };

  // Task: Display nutrient status in the selected language.
  const getTranslatedNutrientStatus = (
    nutrient: "nitrogen" | "phosphorus" | "potassium"
  ) => {
    const status = getNutrientStatus(nutrient);

    if (status === "Good") {
      return t("good");
    }

    if (status === "Review") {
      return t("review");
    }

    if (status === "Low") {
      return t("low");
    }

    return t("noData");
  };

  return (
    <main className="min-h-screen bg-[#F7FAF5]">

      {/* MOBILE APP CONTAINER */}
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-white shadow-xl">

        {/* HEADER */}
        <header className="border-b border-green-100 bg-[#F1F8F1]">
          <div className="flex items-center justify-between px-5 py-4">

            {/* LOGO */}
            <div className="flex items-center gap-2">

              {/* Task: Display the SoilCare leaf logo */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DDF2D8]">
                <Leaf
                  size={24}
                  className="text-[#16824F]"
                />
              </div>

              <div>
                <h1 className="font-bold text-[#075C42]">
                  SoilCare
                </h1>
                

                <p className="text-[10px] text-[#5C746A]">
                  {t("smartSoilAnalysis")}
                </p>
              </div>

            </div>

          
<div className="flex items-center gap-2">

  {/* LANGUAGE */}
  <LanguageSelector />

  {/* NOTIFICATION */}
  <button
    type="button"
    className="rounded-full bg-[#DDF2D8] p-2 text-[#075C42]"
  >
    <Bell size={19} />
  </button>

</div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <div className="flex-1 px-5 pb-28 pt-6">

          {/* GREETING */}
          <section>
            <p className="text-sm text-gray-500">
              {t("goodMorning")}, {userName}! 👋
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              Let's understand your soil
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {t("aiSoilInsights")}
            </p>
          </section>

          {/* HERO */}
          <section className="mt-6 overflow-hidden rounded-3xl bg-green-800 shadow-lg">

            <div className="relative h-48">

              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85"
                alt="Agricultural field"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/30" />

              <div className="absolute bottom-5 left-5 right-5 text-white">

                <h3 className="text-2xl font-bold">
                  {t("analyzeYourSoil")}
                </h3>

                <p className="mt-1 text-sm text-white/90">
                  {t("simpleSoilCropAdvice")}
                </p>

              </div>

            </div>

            {/* START ANALYSIS */}
            <div className="p-4">

              <Link
                href="/analyze"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 font-semibold text-green-800 shadow-sm transition hover:bg-green-50"
              >
                <Camera size={18} />
                {t("startAnalysis")}
                <ChevronRight size={17} />
              </Link>

            </div>

          </section>

          {/* QUICK ACTIONS */}
          <section className="mt-7">

            <div className="flex items-center justify-between">

              <h3 className="text-lg font-bold text-gray-900">
                {t("quickActions")}
              </h3>

              <span className="text-xs text-gray-400">
                {t("chooseAnOption")}
              </span>

              

            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">

              {/* SOIL TEST */}
              <Link
                href="/soil-test"
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">

                  <FlaskConical
                    size={24}
                    className="text-green-800"
                  />

                </div>

                <h4 className="mt-4 font-semibold text-gray-900">
                  {t("soilTest")}
                </h4>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {t("enterNpkValues")}
                </p>

                <div className="mt-4 flex items-center text-xs font-semibold text-green-800">

                  {t("open")}

                  <ChevronRight size={15} />

                </div>

              </Link>

              {/* FIND CROPS */}
              <Link
                href="/crops"
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">

                  <Sprout
                    size={24}
                    className="text-green-800"
                  />

                </div>

                <h4 className="mt-4 font-semibold text-gray-900">
                  {t("findCrops")}
                </h4>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {t("findSuitableCrops")}
                </p>

                <div className="mt-4 flex items-center text-xs font-semibold text-green-800">

                  {t("check")}

                  <ChevronRight size={15} />

                </div>

              </Link>

            </div>

          </section>

          {/* SOIL HEALTH */}
          <section className="mt-7 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  {t("soilHealth")}
                </p>

                <h3 className="mt-1 text-lg font-bold text-gray-900">
                  {t("overallSoilHealth")}
                </h3>

              </div>

              <Link
                href="/results"
                className="flex items-center gap-1 text-sm font-semibold text-green-800"
              >
                {t("viewResults")}
                <ChevronRight size={16} />
              </Link>

            </div>

            {/* OVERALL SCORE */}
            <div className="mt-6 flex items-center gap-5 rounded-2xl bg-green-50 p-4">

              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-[8px] border-green-700 bg-white shadow-sm">

                <div className="text-center">

                  <p className="text-2xl font-bold text-gray-900">
                    {soilScore !== undefined
                      ? soilScore
                      : "--"}
                  </p>

                  <p className="text-[10px] font-medium text-gray-400">
                    / 100
                  </p>

                </div>

              </div>

              <div>

                <div className="flex items-center gap-2">

                  <CheckCircle2
                    size={19}
                    className="text-green-700"
                  />

                  <p className="text-lg font-bold text-green-800">
                    {soilStatus || "No Analysis"}
                  </p>

                </div>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {soilStatus
                    ? t("basedOnLatestAnalysis")
                    : t("completeAnalysis")}
                </p>

              </div>

            </div>

            {/* NUTRIENT STATUS */}
            <div className="mt-5">

              <p className="text-sm font-semibold text-gray-900">
                {t("nutrientStatus")}
              </p>

              <div className="mt-3 grid grid-cols-3 gap-3">

                {/* NITROGEN */}
                <div
                  className={`rounded-2xl border p-3 ${
                    isNutrientGood("nitrogen")
                      ? "border-green-100 bg-green-50"
                      : "border-amber-100 bg-amber-50"
                  }`}
                >

                  <p className="text-xs font-medium text-gray-500">
                    {t("nitrogen")}
                  </p>

                  <div className="mt-2 flex items-center gap-1.5">

                    {isNutrientGood("nitrogen") ? (
                      <CheckCircle2
                        size={15}
                        className="text-green-700"
                      />
                    ) : (
                      <AlertTriangle
                        size={15}
                        className="text-amber-600"
                      />
                    )}

                    <p
                      className={`text-sm font-bold ${
                        isNutrientGood("nitrogen")
                          ? "text-green-800"
                          : "text-amber-700"
                      }`}
                    >
                      {getTranslatedNutrientStatus("nitrogen")}
                    </p>

                  </div>

                </div>

                {/* PHOSPHORUS */}
                <div
                  className={`rounded-2xl border p-3 ${
                    isNutrientGood("phosphorus")
                      ? "border-green-100 bg-green-50"
                      : "border-amber-100 bg-amber-50"
                  }`}
                >

                  <p className="text-xs font-medium text-gray-500">
                    {t("phosphorus")}
                  </p>

                  <div className="mt-2 flex items-center gap-1.5">

                    {isNutrientGood("phosphorus") ? (
                      <CheckCircle2
                        size={15}
                        className="text-green-700"
                      />
                    ) : (
                      <AlertTriangle
                        size={15}
                        className="text-amber-600"
                      />
                    )}

                    <p
                      className={`text-sm font-bold ${
                        isNutrientGood("phosphorus")
                          ? "text-green-800"
                          : "text-amber-700"
                      }`}
                    >
                      {getTranslatedNutrientStatus("phosphorus")}
                    </p>

                  </div>

                </div>

                {/* POTASSIUM */}
                <div
                  className={`rounded-2xl border p-3 ${
                    isNutrientGood("potassium")
                      ? "border-green-100 bg-green-50"
                      : "border-amber-100 bg-amber-50"
                  }`}
                >

                  <p className="text-xs font-medium text-gray-500">
                    {t("potassium")}
                  </p>

                  <div className="mt-2 flex items-center gap-1.5">

                    {isNutrientGood("potassium") ? (
                      <CheckCircle2
                        size={15}
                        className="text-green-700"
                      />
                    ) : (
                      <AlertTriangle
                        size={15}
                        className="text-amber-600"
                      />
                    )}

                    <p
                      className={`text-sm font-bold ${
                        isNutrientGood("potassium")
                          ? "text-green-800"
                          : "text-amber-700"
                      }`}
                    >
                      {getTranslatedNutrientStatus("potassium")}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* LATEST CROP RECOMMENDATION */}
            <div className="mt-5 rounded-2xl bg-green-50 p-4">

              <div className="flex items-center gap-3">

                <Sprout
                  size={22}
                  className="text-green-700"
                />

                <div>

                  <p className="text-xs text-gray-500">
                    {t("latestCropRecommendation")}
                  </p>

                  <p className="mt-1 font-bold capitalize text-green-800">
                    {soilResult?.crop_recommendation?.crop ||
                      t("noAnalysis")}
                  </p>

                </div>

              </div>

              {soilResult?.crop_recommendation
                ?.confidence !== undefined && (
                <p className="mt-2 text-xs text-gray-600">
                  {t("modelConfidence")}:{" "}
                  {soilResult.crop_recommendation.confidence}%
                </p>
              )}

            </div>

            
            <section className="mt-7">
            <VoiceAssistant />
          </section>
        

          </section>

        </div>

        {/* BOTTOM NAVIGATION */}
        <nav className="sticky bottom-0 z-50 border-t border-green-100 bg-[#F1F8F1]/95 px-3 py-3 backdrop-blur">

          <div className="flex items-center justify-around">

            {/* HOME */}
            <Link
              href="/home"
              className="flex flex-col items-center gap-1 text-[#075C42]"
            >

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DDF2D8]">
                <HomeIcon size={20} />
              </div>

              <span className="text-[10px] font-semibold">
                {t("home")}
              </span>

            </Link>

            {/* ANALYZE */}
            <Link
              href="/analyze"
              className="flex flex-col items-center gap-1 text-[#6A8178] transition hover:text-[#075C42]"
            >

              <div className="flex h-8 w-8 items-center justify-center">
                <Camera size={20} />
              </div>

              <span className="text-[10px]">
                {t("analyze")}
              </span>

            </Link>

            {/* CENTER ACTION */}
            <Link
              href="/soil-test"
              className="-mt-8 flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#F1F8F1] bg-[#16824F] text-white shadow-lg transition hover:bg-[#0D6B3F]"
            >
              <span className="text-2xl">
                🌱
              </span>
            </Link>

            {/* HISTORY */}
            <Link
              href="/history"
              className="flex flex-col items-center gap-1 text-[#6A8178] transition hover:text-[#075C42]"
            >

              <div className="flex h-8 w-8 items-center justify-center">
                <BarChart3 size={20} />
              </div>

              <span className="text-[10px]">
                {t("history")}
              </span>

            </Link>

            {/* PROFILE */}
            <Link
              href="/profile"
              className="flex flex-col items-center gap-1 text-[#6A8178] transition hover:text-[#075C42]"
            >

              <div className="flex h-8 w-8 items-center justify-center">
                <User size={20} />
              </div>

              <span className="text-[10px]">
                {t("profile")}
              </span>

            </Link>

          </div>

        </nav>

      </div>
    </main>
  );
}