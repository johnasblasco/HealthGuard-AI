import StudentDashboard from "@/features/student/pages/StudentDashboard";
import { MyReports } from "@/features/student/pages/MyReports";

export const clientRoutes = [
    { path: "/student", element: <StudentDashboard /> },
    { path: "/student/:studentId/health-report", element: <MyReports /> }
];
