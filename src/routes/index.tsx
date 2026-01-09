import { useRoutes } from "react-router-dom";
import Login from "@/auth/Login";
import Signup from "@/auth/Signup";
import AppLayout from "@/components/layout/AppLayout";


import { adminRoutes } from "./admin.routes";
import { clientRoutes } from "./student.routes";

export default function AppRoutes() {
    const routes = useRoutes([
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        {
            element: <AppLayout />,

            children: [
                {
                    path: "admin",

                    children: adminRoutes,
                },
                {
                    path: "student",

                    children: clientRoutes,
                },
            ],
        },
        // Redirect any unknown routes to login
        {
            path: "*",
            element: <Login />,
        }
    ]);

    return routes;
}
