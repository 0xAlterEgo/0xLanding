import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Home implements View {

    private container: DomNode;

    constructor() {
        Layout.current.content.append(
            this.container = el(".home-view",
                el(".video-container",
                    el("video", { "autoplay": "", "loop": "" },
                        el("source", { src: "/video/home.mp4", type: "video/mp4" })
                    ),
                ),
            ).appendTo(BodyNode)
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}