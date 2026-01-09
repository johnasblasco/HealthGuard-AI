import { Outlet, useNavigate } from "react-router-dom";
import { Heart, Shield } from "lucide-react";

export default function AppLayout() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) {
        navigate("/login", { replace: true });
        return null;
    }

    const userRole = user.role;

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <nav className="bg-white border-b-2 border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${userRole === "admin" ? "bg-purple-600" : "bg-blue-600"}`}>
                            {userRole === "admin"
                                ? <Shield className="w-6 h-6 text-white" />
                                : <Heart className="w-6 h-6 text-white" />}
                        </div>
                        <div>
                            <h1 className="text-xl text-gray-900">SickSense</h1>
                            <p className="text-xs text-gray-500">
                                {userRole === "student" ? "Student Portal" : "Admin Dashboard"}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="border px-4 py-2 rounded-lg"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Routed content */}
            <Outlet />
        </div>
    );
}
