// src/services/api.ts
import type {
    HealthReport,
    DashboardStats,
    HotspotData,
    PredictionData,
    SuggestedAction,
    BayesianParameter,
    Location,
    Symptom,
    CreateHealthReport,
} from "@/types/index";

// 1. Configuration
const API_URL = "http://localhost:5000/api";

// 2. Generic Request Handler (NOW WITH TOKEN)
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers ?? {}),
        },
    });

    const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");

    if (!response.ok) {
        const error = isJson
            ? await response.json().catch(() => ({ message: "Unknown error" }))
            : { message: await response.text().catch(() => "Unknown error") };

        throw new Error(error.message || `API Error: ${response.statusText}`);
    }

    return (isJson ? response.json() : (null as any)) as T;
}

// 3. The API Object
export const api = {
    // --- Student Features ---
    reports: {
        /** Submit a new sickness report (AUTH REQUIRED) */
        submit: (data: CreateHealthReport) =>
            request<HealthReport>("/reports", {
                method: "POST",
                body: JSON.stringify(data),
            }),

        /** Get my history (AUTH REQUIRED) */
        getMyHistory: () => request<HealthReport[]>("/reports/me"),

        /** Admin: Fetch ALL reports (AUTH + ADMIN) */
        getAll: () => request<HealthReport[]>("/reports"),

        /** Admin: Update report status (AUTH + ADMIN) */
        updateStatus: (id: string, status: string) =>
            request<HealthReport>(`/reports/${id}/status`, {
                method: "PATCH",
                body: JSON.stringify({ status }),
            }),
    },

    auth: {
        /** Login (NO TOKEN REQUIRED) */
        login: (email: string, password: string, role: "student" | "admin") =>
            request<{ user: { id: string; email: string; role: string; fullName?: string }; token: string }>(
                "/auth/login",
                {
                    method: "POST",
                    body: JSON.stringify({ email, password, role }),
                    headers: {}, // do not override Authorization
                }
            ),

        /** Signup (NO TOKEN REQUIRED) */
        signup: (payload: any) =>
            request<{ user: any; token: string }>("/auth/signup", {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {}, // do not override Authorization
            }),

        logout: () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return Promise.resolve();
        },
    },

    resources: {
        /** Fetch locations (AUTH REQUIRED if backend protects it) */
        getLocations: () => request<Location[]>("/resources/locations"),

        /** Fetch symptoms (AUTH REQUIRED if backend protects it) */
        getSymptoms: () => request<Symptom[]>("/resources/symptoms"),
    },

    // --- Admin Features ---
    dashboard: {
        /** Get ALL dashboard data (AUTH + ADMIN) */
        getAllData: () =>
            request<{
                stats: DashboardStats;
                hotspots: HotspotData[];
                predictions: PredictionData[];
                actions: SuggestedAction[];
                bayesian: BayesianParameter;
            }>("/dashboard"),

        /** Update an action status (AUTH + ADMIN) */
        updateAction: (id: string, status: "pending" | "in-progress" | "completed") =>
            request<SuggestedAction>(`/dashboard/actions/${id}/status`, {
                method: "PATCH",
                body: JSON.stringify({ status }),
            }),
    },
};
