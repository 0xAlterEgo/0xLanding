import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Home implements View {

    private container: DomNode;

    private video: DomNode<HTMLVideoElement>;
    private audio: DomNode<HTMLAudioElement>;
    private playButton: DomNode;
    private isPlay: boolean = false;

    constructor() {
        Layout.current.content.append(
            this.container = el(".home-view",
                el(".video-container",
                    this.video = el("video", { "autoplay": "", "loop": "", "muted": "" },
                        el("source", { src: "/video/home.mp4", type: "video/mp4" })
                    ),
                ),
                el(".audio-container", {
                    click: () => {
                        if (this.isPlay) {
                            this.audio.domElement.pause();
                            this.isPlay = false;
                            this.playButton.deleteClass("playing");
                        } else {
                            this.audio.domElement.play();
                            this.isPlay = true;
                            this.playButton.addClass("playing");
                        }
                    }
                },
                    el("img", { src: "/images/view/home/player.png", alt: "player" }),
                    el(".play-container",
                        this.playButton = el(".play-button"),
                        this.audio = el("audio", { "controls": "", "loop": "", },
                            el("source", { src: "/video/bgm-loop.mp3", type: "audio/mp3" }),
                        ),
                    ),
                ),
                el(".npc-container",
                    el(".dialog", "Hello...!"),
                ),
            ).appendTo(BodyNode)
        );
        this.init()
    }

    private init() {
        this.video.domElement.muted = true;
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}