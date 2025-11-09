
import { API_BASE_URL } from "../config";


export async function apiGet(url) {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`GET ${url} failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("GET error:", error);
    throw error;
  }
}


export async function apiPost(url, data) {
  try {
    // const response = await fetch(`${API_BASE_URL}${url}`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //
    //   body: JSON.stringify(data),
    // });
      console.log("🚀 Sending body:", JSON.stringify(data));
     const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`POST ${url} failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("POST error.:", error);
    throw error;
  }
}