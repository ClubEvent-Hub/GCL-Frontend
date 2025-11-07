import axios from "axios";
import { setUser, getUser, logout } from "./auth";
import { Event } from "@/app/types";

const API_BASE_URL = "https://sys-multi-agents.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});


export async function loginStudent(data: { email: string; password: string }) {
  const form = new URLSearchParams();
  form.append("username", data.email);
  form.append("password", data.password);

  const res = await api.post("/auth/student/login", form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const token = res.data.access_token;
  if (token) {
    const user = { email: data.email
      
     };
    setUser(user, token, "student");
  }

  return res.data;
}

export async function loginClub(data: { email: string; password: string }) {
  const form = new URLSearchParams();
  form.append("username", data.email);
  form.append("password", data.password);

  const res = await api.post("/auth/club/login", form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const token = res.data.access_token;
  if (token) {
    const user = { email: data.email };
    setUser(user, token, "club");
  }

  return res.data;
}

export async function registerStudent(data: {
  name: string;
  email: string;
  password: string;
  field_of_study: string;
  year_level: number;
}) {
  const res = await api.post("/auth/student/register", data);
  if (res.data.access_token) {
    setUser(data, res.data.access_token, "student");
  }
  return res.data;
}

export async function registerClub(data: {
  name: string;
  email: string;
  password: string;
  description: string;
  mission: string;
  contact_email: string;
  website: string;
  personality_style: string;
}) {
  const res = await api.post("/auth/club/register", data);

  if (res.data.success) {
    try {
      await loginClub({ email: data.email, password: data.password });
    } catch (err) {
      console.error("Auto login after registration failed:", err);
    }
  }

  return res.data;
}



export async function getStudents() {
  const res = await api.get("/students/");
  return res.data;
}

export async function getStudentProfile() {
  const res = await api.get("/students/profile");
  return res.data;
}

export async function updateStudentProfile(data: object) {
  const res = await api.put("/students/profile", data);
  return res.data;
}

export async function deleteStudentProfile() {
  const res = await api.delete("/students/profile");
  return res.data;
}

export async function getClubs() {
  const res = await api.get("/clubs/");
  return res.data;
}

export async function updateClub(data: object) {
  const res = await api.put("/clubs/", data);
  return res.data;
}

export async function deleteClub() {
  const res = await api.delete("/clubs/");
  return res.data;
}



export async function getEvents() {
  const res = await api.get("/events/");
  return res.data;
}

export async function getEventById(event_id: number) {
  const res = await api.get(`/events/${event_id}`);
  return res.data;
}

export async function createEvent(data: object) {
  const res = await api.post("/events/", data);
  return res.data;
}

export async function updateEvent(event_id: number, data: object) {
  const res = await api.put(`/events/${event_id}`, data);
  return res.data;
}

export async function deleteEvent(event_id: number) {
  const res = await api.delete(`/events/${event_id}`);
  return res.data;
}


export const getPosts = async () => (await api.get("/posts/")).data;
export const getPostById = async (id: number) => (await api.get(`/posts/${id}`)).data;
export const createPost = async (data: object) => (await api.post("/posts/", data)).data;
export const updatePost = async (id: number, data: object) => (await api.put(`/posts/${id}`, data)).data;
export const deletePost = async (id: number) => (await api.delete(`/posts/${id}`)).data;

export const likePost = (id: string | number) => api.post(`/posts/${id}/like`);
