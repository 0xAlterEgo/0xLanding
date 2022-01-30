import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Update implements View {

    private container: DomNode;

    constructor() {
        Layout.current.content.append(
            this.container = el(".update-view",
                el("aside",
                    el("h1", "UPDATES"),
                    el(".update-item",
                        el("img"),
                        el(".title", "Introducing 0xAlterEgo")
                    )
                )
            ).appendTo(BodyNode)
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}