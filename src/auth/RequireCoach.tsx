import { Navigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { userState } from "@/helpers/recoil";

export function RequireCoach({ children }: { children: React.ReactNode }) {
    const [user] = useRecoilState(userState);
    if (user.role !== "coach") return <Navigate to="/" replace />;
    return children;
}
