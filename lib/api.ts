import axios from "axios";

const api = axios.create({
  baseURL: "https://travel-trucks-backend-gv9o.onrender.com/",
  // baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/",

  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});

export default api;