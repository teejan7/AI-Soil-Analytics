// Task: Create a multilingual farmer profile and preferences page.

"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  Globe2,
  HelpCircle,
  LogOut,
  MapPin,
  Mic,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";

// Task: Enable multilingual text on the Profile page.
import { useLanguage } from "../translations/LanguageProvider";

export default function ProfilePage() {
  // Task: Get the selected language and translation function.
  const { t } = useLanguage();

  // Task: Store the logged-in user's name.
  const [userName, setUserName] = useState("Farmer");

  // Task: Log out the current SoilCare user.
  const handleLogout = () => {
    // Task: Remove the stored login information.
    localStorage.removeItem("soilcare_user");

    // Task: Redirect the user to the login page.
    window.location.href = "/login";
  };

  // Task: Protect the Profile page from unauthenticated users.
  useEffect(() => {
    // Task: Check whether a user is logged in.
    const storedUser = localStorage.getItem("soilcare_user");

    // Task: Redirect logged-out users to the login page.
    if (!storedUser) {
      window.location.href = "/login";
      return;
    }

    // Task: Load the logged-in user's information.
    try {
      const user = JSON.parse(storedUser);

      // Task: Display the logged-in user's name.
      if (user.name) {
        setUserName(user.name);
      }
    } catch (error) {
      console.error(
        "Unable to read user information:",
        error
      );

      // Task: Remove invalid stored user information.
      localStorage.removeItem("soilcare_user");

      // Task: Redirect to login when stored user data is invalid.
      window.location.href = "/login";
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#F7FAF5]">

      {/* HEADER */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-md items-center gap-3 px-5 py-4">

          <Link
            href="/home"
            className="rounded-full bg-gray-100 p-2"
            aria-label={t("back")}
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="font-bold text-gray-900">
              {t("profileTitle")}
            </h1>

            <p className="text-xs text-gray-500">
              {t("accountPreferences")}
            </p>
          </div>

        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-md px-5 py-6">

        {/* FARMER PROFILE */}
        <section className="rounded-2xl bg-white p-5 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <User
                size={30}
                className="text-green-700"
              />
            </div>

            <div>

              {/* Task: Display the logged-in user's name. */}
              <h2 className="text-lg font-bold text-gray-900">
                {userName}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {t("soilCareUser")}
              </p>

            </div>

          </div>

          <button className="mt-5 w-full rounded-xl border border-green-200 py-3 text-sm font-semibold text-green-700">
            {t("editProfile")}
          </button>

        </section>

        {/* FARM DETAILS */}
        <section className="mt-6">

          <h2 className="mb-3 text-sm font-semibold text-gray-500">
            {t("farmInformation")}
          </h2>

          <div className="rounded-2xl bg-white shadow-sm">

            <div className="flex items-center gap-4 border-b border-gray-100 p-5">

              <div className="rounded-xl bg-green-100 p-3">
                <MapPin
                  size={22}
                  className="text-green-700"
                />
              </div>

              <div>

                <p className="font-semibold text-gray-900">
                  {t("farmLocation")}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {t("addVillageLocation")}
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* LANGUAGE */}
        <section className="mt-6">

          <h2 className="mb-3 text-sm font-semibold text-gray-500">
            {t("languageSettings")}
          </h2>

          <div className="rounded-2xl bg-white shadow-sm">

            <button className="flex w-full items-center justify-between p-5">

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-green-100 p-3">
                  <Globe2
                    size={22}
                    className="text-green-700"
                  />
                </div>

                <div className="text-left">

                  <p className="font-semibold text-gray-900">
                    {t("english")}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {t("availableLanguages")}
                  </p>

                </div>

              </div>

              <ChevronRight
                size={20}
                className="text-gray-400"
              />

            </button>

          </div>

        </section>

        {/* PREFERENCES */}
        <section className="mt-6">

          <h2 className="mb-3 text-sm font-semibold text-gray-500">
            {t("preferences")}
          </h2>

          <div className="rounded-2xl bg-white shadow-sm">

            {/* VOICE OUTPUT */}
            <button className="flex w-full items-center justify-between border-b border-gray-100 p-5">

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-blue-50 p-3">
                  <Mic
                    size={22}
                    className="text-blue-600"
                  />
                </div>

                <div className="text-left">

                  <p className="font-semibold text-gray-900">
                    {t("voiceOutput")}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {t("listenRecommendations")}
                  </p>

                </div>

              </div>

              <ChevronRight
                size={20}
                className="text-gray-400"
              />

            </button>

            {/* NOTIFICATIONS */}
            <button className="flex w-full items-center justify-between p-5">

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-yellow-50 p-3">
                  <Bell
                    size={22}
                    className="text-yellow-600"
                  />
                </div>

                <div className="text-left">

                  <p className="font-semibold text-gray-900">
                    {t("notifications")}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {t("soilCropUpdates")}
                  </p>

                </div>

              </div>

              <ChevronRight
                size={20}
                className="text-gray-400"
              />

            </button>

          </div>

        </section>

        {/* HELP */}
        <section className="mt-6">

          <h2 className="mb-3 text-sm font-semibold text-gray-500">
            {t("support")}
          </h2>

          <div className="rounded-2xl bg-white shadow-sm">

            <button className="flex w-full items-center justify-between p-5">

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-purple-50 p-3">
                  <HelpCircle
                    size={22}
                    className="text-purple-600"
                  />
                </div>

                <div className="text-left">

                  <p className="font-semibold text-gray-900">
                    {t("helpSupport")}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {t("getSoilCareHelp")}
                  </p>

                </div>

              </div>

              <ChevronRight
                size={20}
                className="text-gray-400"
              />

            </button>

          </div>

        </section>

        {/* SETTINGS */}
        <section className="mt-6">

          <div className="rounded-2xl bg-white shadow-sm">

            <button className="flex w-full items-center justify-between p-5">

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-gray-100 p-3">
                  <Settings
                    size={22}
                    className="text-gray-700"
                  />
                </div>

                <div className="text-left">

                  <p className="font-semibold text-gray-900">
                    {t("appSettings")}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {t("managePreferences")}
                  </p>

                </div>

              </div>

              <ChevronRight
                size={20}
                className="text-gray-400"
              />

            </button>

          </div>

        </section>

        {/* LOGOUT */}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white py-3 font-semibold text-red-600"
        >
          <LogOut size={18} />
          {t("logout")}
        </button>

        <p className="py-6 text-center text-xs text-gray-400">
          {t("soilCareTagline")}
        </p>

      </div>

    </main>
  );
}