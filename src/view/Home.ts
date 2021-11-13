import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";

export default class Home implements View {

    private container: DomNode;
    private interval: any;

    constructor() {
        this.container = el(".home-view",
            el("h2", "책과 세계관 소개"),
            el("h2", "커뮤니티"),
            el("h2", "크레이터"),
            el("h2", "인플루엔서"),
            el("h2", "콜렉터"),
            el("h2", "데브팀"),
            el("h2", "로드맵")).appendTo(BodyNode);
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.interval);
        this.container.delete();
    }
}