import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { AllTennisSessionsPage } from "@/pages/AllTennisSessionsPage/AllTennisSessionsPage";
import { CreateTrainingPage } from "@/pages/CreateTrainingPage/CreateTrainingPage";
import { HomePage } from "@/pages/HomePage/HomePage";
import { PlayersPage } from "@/pages/PlayersPage/PlayersPage";
import { StatsPage } from "@/pages/StatsPage/StatsPage";
import { TabsLayout } from "@/shared/Miniapps/TabsLayout";

export const routes: RouteObject[] = [
    {
        element: <TabsLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "all-tennis-sessions", element: <AllTennisSessionsPage /> },
            { path: "players", element: <PlayersPage /> },
            { path: "stats", element: <StatsPage /> },
        ],
    },
    // Routes without tabbar (flows / details / create forms etc.)
    { path: "create-training", element: <CreateTrainingPage /> },
    { path: "*", element: <Navigate to="/" replace /> },
];
