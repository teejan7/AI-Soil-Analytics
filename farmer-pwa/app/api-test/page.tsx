// Task: Test communication between the Next.js frontend and FastAPI backend

"use client";

import { useEffect, useState } from "react";
import { testBackendConnection } from "@/lib/api";

export default function ApiTestPage() {
  const [message, setMessage] = useState("Connecting...");
  const [error, setError] = useState("");

  useEffect(() => {
    testBackendConnection()
      .then((data) => {
        setMessage(data.message);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7FAF5] p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow">
        <h1 className="text-2xl font-bold text-[#075C42]">
          Backend Connection
        </h1>

        {error ? (
          <p className="mt-4 text-red-600">{error}</p>
        ) : (
          <p className="mt-4 text-green-700">{message}</p>
        )}
      </div>
    </main>
  );
}