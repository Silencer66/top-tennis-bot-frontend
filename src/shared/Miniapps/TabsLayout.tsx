import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { BottomNav } from "@/shared/BottomNav/BottomNav";
import { Page } from "@/shared/Miniapps/Page";
import type { Tab } from "@/types";

function tabFromPathname(pathname: string): Tab {
    if (pathname === "/" || pathname === "") return "home";
    if (pathname.startsWith("/all-tennis-sessions")) return "trainings";
    if (pathname.startsWith("/players")) return "players";
    if (pathname.startsWith("/stats")) return "stats";
    // Fallback
    return "home";
}

function pathFromTab(tab: Tab): string {
    switch (tab) {
        case "home":
            return "/";
        case "trainings":
            return "/all-tennis-sessions";
        case "players":
            return "/players";
        case "stats":
            return "/stats";
        case "create":
            return "/create-training";
    }
}

export function TabsLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const activeTab = tabFromPathname(location.pathname);

    return (
        <Page back={false}>
            <div style={{ paddingBottom: 72 }}>
                <Outlet />
            </div>
            <BottomNav
                activeTab={activeTab}
                onTabChange={(tab) => navigate(pathFromTab(tab))}
                // TODO: when we have roles/auth, pass real value here
                isCoach={false}
            />
        </Page>
    );
}
