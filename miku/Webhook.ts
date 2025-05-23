import type { WebhookOptions, WebhookResponse } from "@miku/types/Webhook";
import Client from "./Client";
import Miku from "@miku";
import EmbedBuilder from "@miku/builder/Embed";
import type { Embed } from "@miku/types/Embed";

type WebhookSettings = {
    readonly id: string,
    token: string
}

export default class Webhook extends Client {

    private readonly _id: string;
    private readonly _token: string;

    public constructor({ id, token }: WebhookSettings) {
        super(Miku.opts)
        this._id = id;
        this._token = token;
    }

    private embeds(embeds?: Array<EmbedBuilder | Embed>): Array<Embed> {
        return embeds?.map(embed => embed instanceof EmbedBuilder ? embed.data : embed) ?? [];
    }

    public async send(body: WebhookOptions): Promise<WebhookResponse> {
        body.embeds = this.embeds(body.embeds)
        return this.instance<WebhookResponse>({ method: 'POST', endpoint: `webhooks/${this._id}/${this._token}?wait=true`, body })
    }
}