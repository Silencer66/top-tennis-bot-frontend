import {
    setDebug,
    mountBackButton,
    restoreInitData,
    init as initSDK,
    bindThemeParamsCssVars,
    mountViewport,
    bindViewportCssVars,
    mockTelegramEnv,
    type ThemeParams,
    themeParamsState,
    retrieveLaunchParams,
    emitEvent,
    miniApp,
    Platform,
} from "@telegram-apps/sdk-react";

/**
 * Initializes the application and configures its dependencies.
 */
export async function init(debug: boolean, platform: Platform): Promise<void> {
    // Set @telegram-apps/sdk-react debug mode and initialize it.
    setDebug(debug);
    initSDK();

    // Add Eruda if needed.
    debug &&
        void import("eruda").then(({ default: eruda }) => {
            eruda.init();
            eruda.position({ x: window.innerWidth - 50, y: 0 });
        });

    // Telegram for macOS has a ton of bugs, including cases, when the client doesn't
    // even response to the "web_app_request_theme" method. It also generates an incorrect
    // event for the "web_app_request_safe_area" method.
    if (platform === "macos") {
        let firstThemeSent = false;
        mockTelegramEnv({
            onEvent(event, next) {
                if (event[0] === "web_app_request_theme") {
                    let tp: ThemeParams = {};
                    if (firstThemeSent) {
                        tp = themeParamsState();
                    } else {
                        firstThemeSent = true;
                        tp ||= retrieveLaunchParams().tgWebAppThemeParams;
                    }
                    return emitEvent("theme_changed", { theme_params: tp });
                }

                if (event[0] === "web_app_request_safe_area") {
                    return emitEvent("safe_area_changed", {
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                    });
                }

                next();
            },
        });
    }

    // Mount all components used in the project.
    mountBackButton.ifAvailable();
    restoreInitData();

    if (miniApp.mountSync.isAvailable()) {
        miniApp.mountSync();
        bindThemeParamsCssVars();
    }

    if (mountViewport.isAvailable()) {
        try {
            await mountViewport();
            bindViewportCssVars();
        } catch (err) {
            console.error("Something went wrong mounting the viewport", err);
        }
    }
}
