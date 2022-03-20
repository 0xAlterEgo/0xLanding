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
                            el("h1",
                                el("img", { src: "/images/view/home/logo-alter-ego.png", alt: "logo-alter-ego" }),
                            )
                        ),
                        el("input.menu-btn", { type: "checkbox", id: "menu-btn" }),
                        el("label.menu-icon", { for: "menu-btn" },
                            el("span.navicon")
                        ),
                        el("ul.menu",
                            el("li.item",
                                el("a", { href: "https://discord.gg/0xalterego", target: "_blank" },
                                    el("img", { src: "/images/view/home/icn-discord.svg", alt: "discord" }),
                                )
                            ),
                            el("li.item",
                                el("a", { href: "https://twitter.com/0xalterego_nft", target: "_blank" },
                                    el("img", { src: "/images/view/home/icn-twitter.svg", alt: "twitter" }),
                                ),
                            ),
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
