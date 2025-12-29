import { useMemo } from "react";
import { HashRouter, useRoutes } from "react-router-dom";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";

import { routes } from "@/navigation/routes.tsx";

function AppRoutes() {
    return useRoutes(routes);
}

export function App() {
    const lp = useMemo(() => retrieveLaunchParams(), []);

    return (
        <AppRoot
            appearance="light"
            platform={
                ["macos", "ios"].includes(lp.tgWebAppPlatform) ? "ios" : "base"
            }
        >
            <HashRouter>
                <AppRoutes />
            </HashRouter>
        </AppRoot>
    );
}
