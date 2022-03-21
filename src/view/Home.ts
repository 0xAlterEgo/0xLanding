import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import superagent from "superagent";
import DiscordUserInfo from "../DiscordUserInfo";
import EthereumWallet from "../ethereum/EthereumWallet";
import Layout from "./Layout";

export default class Home implements View {

    private container: DomNode;

    public discordUser: DiscordUserInfo | undefined;

    private video: DomNode<HTMLVideoElement>;
    private audio: DomNode<HTMLAudioElement>;

    private helloDialog: DomNode;
    private walletDialog: DomNode;

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
                el(".audio-container",
                    el("a", { href: "https://opensea.io/collection/penguins-dwvim00c90", target: "_blank" },
                        el("img", { src: "/images/view/home/player.png", alt: "player" })
                    ),
                    el(".play-container", {
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
                        this.playButton = el(".play-button"),
                        this.audio = el("audio", { "controls": "", "loop": "", },
                            el("source", { src: "/video/bgm-loop.mp3", type: "audio/mp3" }),
                        ),
                    ),
                ),
                el(".npc-container",
                    this.helloDialog = el(".dialog", "Hello...!", {
                        click: () => {
                            this.helloDialog.style({ display: "none" });
                            this.walletDialog.style({ display: "block" });
                        }
                    }),
                    this.walletDialog = el(".wallet-dialog", "Please connect your wallet and sign\nthis transaction to access the bot \nservices provided by 0xAlterEgo...!", {
                        click: () => {
                            window.open("https://discord.com/api/oauth2/authorize?client_id=939799839129096244&redirect_uri=https%3A%2F%2Fapp.0xalterego.com%2Flink-wallet-to-discord&response_type=code&scope=identify");
                        },
                    }, el("a", "CONNECT WALLET"),
                    ),
                ),
            ).appendTo(BodyNode)
        );
        this.init();
    }

    private init() {
        this.video.domElement.muted = true;
        this.checkDiscordLogin();
    }

    private async checkDiscordLogin() {

        let code: string | undefined = new URLSearchParams(window.location.search).get("code")!;
        if (code !== null) {
            try {
                await superagent.get("https://api.0xalterego.com/discord/token").query({
                    code,
                    redirect_uri: `${window.location.protocol}//${window.location.host}/link-wallet-to-discord`,
                });
            } catch (error) {
                console.error(error);
                code = undefined;
            }
        } else {
            code = undefined;
        }

        if (code !== undefined) {
            try {
                const result = await superagent.get("https://api.0xalterego.com/discord/me").query({ code });
                this.discordUser = result.body;
                this.checkWalletConnected(code);
            } catch (error) {
                console.error(error);
            }
        }
    }

    private async checkWalletConnected(code: string) {
        if (await EthereumWallet.connected() !== true) {
            await EthereumWallet.connect();
        }
        const address = await EthereumWallet.loadAddress();
        if (address !== undefined) {

            const message = "Link Wallet to Discord";
            const signedMessage = await EthereumWallet.signMessage(message);

            try {
                const result = await fetch("https://api.0xalterego.com/link-wallet-to-discord", {
                    method: "POST",
                    body: JSON.stringify({
                        code,
                        signedMessage,
                        address,
                    }),
                });
                if ((await result.json()).linked === true) {
                    alert("Link Succeed.");
                } else {
                    alert("Link Failed.");
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}