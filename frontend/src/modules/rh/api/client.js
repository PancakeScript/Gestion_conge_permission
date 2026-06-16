const BASE_URL = "http://localhost:3000/api";

const api = {
  get: async (url) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}${url}`, {
      headers: { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
    });
    return { data: await res.json() };
  },
  post: async (url, body) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
      body: JSON.stringify(body),
    });
    return { data: await res.json() };
  },
  put: async (url, body) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
      body: JSON.stringify(body),
    });
    return { data: await res.json() };
  },
  patch: async (url, body) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
      body: JSON.stringify(body),
    });
    return { data: await res.json() };
  },
  delete: async (url) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
    });
    return { data: await res.json() };
  },
};

export { api };
