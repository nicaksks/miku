import type { Channel, Invite } from "./Body";
import type { Webhook } from "./Webhook";

export type Options = {
    token: string;
    guild_id: string;
    url?: string
}

export type Instance = {
    method: 'GET' | 'POST' | 'DELETE';
    endpoint: string;
    body?: Channel | Invite | Webhook;
}