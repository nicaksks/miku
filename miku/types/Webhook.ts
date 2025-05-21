import type EmbedBuilder from "@miku/builder/Embed";
import type { User } from "./User";
import type { Embed } from "./Embed";
import type { Button } from "./Button";
import type ButtonBuilder from "@miku/builder/Button";

export type Webhook = {
    username?: string;
    avatar_url?: string;
    content?: string;
    embeds?: Array<EmbedBuilder | Embed>;
    flags?: 32768,
    components?: Array<ButtonBuilder | Button>;
};

export type WebhookSettings = {
    id: string;
    token: string
}

export type WebhookOptions = Webhook;

export type WebhookResponse = {
    type: number;
    mentions: Array<string>;
    mention_roles: Array<string>;
    attachments: Array<string>
    timestamp: string;
    edited_timestamp?: string;
    flags: number;
    components: Array<object>;
    id: string;
    channel_id: string;
    pinned: boolean;
    mention_everyone: boolean;
    tts: boolean;
    webhook_id: string
    user: User
} & Webhook