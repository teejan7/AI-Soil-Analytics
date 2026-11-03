// Task: Create the farmer-friendly account registration page and connect it to the FastAPI backend

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Leaf,
} from "lucide-react";
import { API_BASE_URL } from "../../lib/api";

export default function RegisterPage() {
  // Task: Store registration form values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Task: Control password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Task: Store registration error
  const [error, setError] = useState("");

  // Task: Track registration loading state
  const [isLoading, setIsLoading] = useState(false);

  // Task: Handle registration form submission and send data to FastAPI
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    // Task: Clear previous error
    setError("");

    // Task: Validate name
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    // Task: Validate email
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    // Task: Validate email format
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    // Task: Validate password
    if (!password.trim()) {
      setError("Please enter a password.");
      return;
    }

    // Task: Validate password length
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    // Task: Confirm password
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Task: Start registration loading state
    setIsLoading(true);

    try {
      // Task: Send registration details to the FastAPI backend
      const response = await fetch(
        `${API_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password: password,
          }),
        }
      );

      // Task: Read the FastAPI response
      const data = await response.json();

      // Task: Display backend registration errors
      if (!response.ok) {
        setError(
          data.detail ||
            "Registration failed. Please try again."
        );
        return;
      }

      // Task: Show successful registration message
      alert("Account created successfully!");

      // Task: Redirect the user to the login page
      window.location.href = "/login";

    } catch (error) {
      // Task: Handle FastAPI connection errors
      console.error("Registration error:", error);

      setError(
        "Unable to connect to the server. Please make sure the FastAPI backend is running."
      );
    } finally {
      // Task: Stop registration loading state
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7FAF5]">

      {/* MOBILE APP CONTAINER */}
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-white shadow-xl">

        {/* HEADER */}
        <header className="border-b border-gray-100 bg-[#F1F8F1]">

          <div className="flex items-center gap-3 px-5 py-4">

            <Link
              href="/login"
              className="rounded-full bg-white p-2 shadow-sm"
            >
              <ArrowLeft
                size={20}
                className="text-gray-700"
              />
            </Link>

            <div>
              <h1 className="font-bold text-gray-900">
                Create Account
              </h1>

              <p className="text-xs text-gray-500">
                Join SoilCare
              </p>
            </div>

          </div>

        </header>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col px-6 py-8">

          {/* LOGO */}
          <div className="text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#DDF2D8]">
              <Leaf
                size={40}
                className="text-[#16824F]"
              />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-[#075C42]">
              Create Your Account
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Start managing your soil with SoilCare
            </p>

          </div>

          {/* REGISTRATION FORM */}
          <form
            onSubmit={handleRegister}
            className="mt-7 space-y-4"
          >

            {/* NAME */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Enter your name"
                className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#16824F] focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Enter your email"
                className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#16824F] focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative mt-2">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 outline-none transition focus:border-[#16824F] focus:ring-2 focus:ring-green-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Confirm Password
              </label>

              <div className="relative mt-2">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  placeholder="Confirm your password"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 outline-none transition focus:border-[#16824F] focus:ring-2 focus:ring-green-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm text-red-600">
                  {error}
                </p>
              </div>
            )}

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full rounded-xl bg-[#16824F] py-4 font-semibold text-white shadow-md transition hover:bg-[#126B42] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          {/* LOGIN LINK */}
          <div className="mt-7 text-center">

            <p className="text-sm text-gray-500">
              Already have an account?{" "}

              <Link
                href="/login"
                className="font-semibold text-[#16824F]"
              >
                Login
              </Link>
            </p>

          </div>

          {/* FOOTER */}
          <div className="mt-auto pt-8 text-center">

            <p className="text-xs text-gray-400">
              SoilCare • AI-Powered Soil Analytics
            </p>

          </div>

        </div>
      </div>
    </main>
  );
}
