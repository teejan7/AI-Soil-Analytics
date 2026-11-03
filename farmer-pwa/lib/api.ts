// Task: Create a reusable API service for communicating with FastAPI

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function testBackendConnection() {
  const response = await fetch(`${API_BASE_URL}/api/test`);

  if (!response.ok) {
    throw new Error("Unable to connect to FastAPI backend.");
  }

  return response.json();
}
