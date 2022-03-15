import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";

export default class Layout implements View {

    public static current: Layout;
    private container: DomNode;
    public content: DomNode;

    constructor() {
        Layout.current = this;

        BodyNode.append(
            (this.container = el(".layout",
                el("header",
                    el(".nav",
                        el(".logo",
                            el("a", { href: "/app" },
                                el("h1", "0xALTER EGO")
                            ),
                        ),
                        el("input.menu-btn", { type: "checkbox", id: "menu-btn" }),
                        el("label.menu-icon", { for: "menu-btn" },
                            el("span.navicon")
                        ),
                        el("ul.menu",
                            el("li.item", el("a", "Home", { href: "/" })),
                            el("li.item", el("a", "Manifesto", { href: "/manifesto" })),
                            el("li.item", el("a", "Updates", { href: "/updates" })),
                            el("li.item", el("a", "Minimap", { href: "/minimap" }))
                        ),
                    )
                ),
                el("main", (this.content = el(".content"))),
            ))
        );
    }

    public set title(title: string) {
        document.title = `${title} | 0xAlterEgo`;
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
