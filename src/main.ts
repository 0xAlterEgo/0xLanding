import { SkyRouter } from "skyrouter";
import Layout from "./view/Layout";
import Home from "./view/Home";
import Update from "./view/Update";

(async () => {
    SkyRouter.route("**", Layout);
    SkyRouter.route("", Home);
    SkyRouter.route("updates", Update);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();