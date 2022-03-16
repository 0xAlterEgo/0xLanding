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
                        }
                        this.audio.domElement.play();
                        this.isPlay = true;
                        this.playButton.addClass("playing");
                    }
                },
                    this.playButton = el(".play-button"),
                    this.audio = el("audio", { "controls": "" },
                        el("source", { src: "/video/bgm.mp3", type: "audio/mp3" })
                    )
                )
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