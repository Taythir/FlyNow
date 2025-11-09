

const isProd = process.env.NODE_ENV === "production";

export const API_BASE_URL = isProd
  ? "http://127.0.0.1:8000"
  : "http://127.0.0.1:8000";