import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { AllTennisSessionsPage } from "@/pages/AllTennisSessionsPage/AllTennisSessionsPage";
import { CreateTrainingPage } from "@/pages/CreateTrainingPage/CreateTrainingPage";
import { HomePage } from "@/pages/HomePage/HomePage";
import { MySessionsPage } from "@/pages/MySessionsPage/MySessionsPage";
import { PlayersPage } from "@/pages/PlayersPage/PlayersPage";
import { StatsPage } from "@/pages/StatsPage/StatsPage";
import { RequireCoach } from "@/auth/RequireCoach";
import { TabsLayout } from "@/shared/Miniapps/TabsLayout";

export const routes: RouteObject[] = [
    {
        element: <TabsLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "all-tennis-sessions", element: <AllTennisSessionsPage /> },
            { path: "my-sessions", element: <MySessionsPage /> },
            {
                path: "players",
                element: (
                    <RequireCoach>
                        <PlayersPage />
                    </RequireCoach>
                ),
            },
            {
                path: "stats",
                element: (
                    <RequireCoach>
                        <StatsPage />
                    </RequireCoach>
                ),
            },
        ],
    },
    // Routes without tabbar (flows / details / create forms etc.)
    {
        path: "create-training",
        element: (
            <RequireCoach>
                <CreateTrainingPage />
            </RequireCoach>
        ),
    },
    { path: "*", element: <Navigate to="/" replace /> },
];
