import Client from "./Client";
import Miku from "@miku";
import type { WebhookOptions, WebhookResponse } from "@miku/types/Webhook";
import EmbedBuilder from "@miku/builder/Embed";
import type { Embed } from "@miku/types/Embed";
import ButtonBuilder from "@miku/builder/Button";
import type { Button } from "@miku/types/Button";
import { ComponentType } from "./enum/ComponentType";

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

    private components(components?: Array<ButtonBuilder | Button>): Array<any> {

        if (!components) return []

        const buttons: Array<Button> = [{ type: ComponentType.ActionRow, components: [] }]

        for (const button of components) {

            if (button instanceof ButtonBuilder) {
                buttons[0].components.push(button.data)
                continue
            }

            buttons[0].components.push(button)

        }

        return buttons
    }

    public async send(body: WebhookOptions): Promise<WebhookResponse> {
        body.embeds = this.embeds(body.embeds)

        let endpoint = `webhooks/${this._id}/${this._token}?wait=true`

        body.components = this.components(body.components)
        if (body.components.length > 0) {
            delete body.embeds
            delete body.content
            body.flags = 32768
            endpoint += '&with_components=true'
        }

        return this.instance<WebhookResponse>({
            method: 'POST', endpoint, body
        })
    }
}