declare module "utils/constants" {
    export const rest: {
        version: number;
        api: string;
        cdn: string;
    };
    export const discord: {
        invite: string;
        channels: string;
    };
}
declare module "Client" {
    import type { Instance, Options } from "types/Miku";
    export default abstract class Client {
        private readonly opts;
        private readonly token;
        protected constructor(opts: Options);
        protected instance<const T>({ method, endpoint, body }: Instance): Promise<T>;
    }
}
declare module "Permissions" {
    import type { ChannelPermissions, PermissionOverWrites, Snowflake } from "types/Channel";
    export default class Permissions {
        static set(users: Array<Snowflake>, permission_overwrites?: PermissionOverWrites): Array<ChannelPermissions>;
        private static isChannelPermissions;
        private static sum;
    }
}
declare module "Channel" {
    import type { ChannelOptions, ChannelResponse, ChannelDeleteResponse } from "types/Channel";
    import Client from "Client";
    export default class Channel extends Client {
        constructor();
        create({ type, ...channel }: ChannelOptions): Promise<ChannelResponse>;
        private name;
        delete(id: string): Promise<ChannelDeleteResponse>;
        private invite;
    }
}
declare module "errors/MikuError" {
    interface CustomError {
        readonly code: number;
        readonly type: Errors | string;
        readonly message: string;
        readonly errors?: Errors | any;
    }
    interface Errors {
        _errors: Array<{
            code: string;
            message: string;
        }>;
    }
    export default class MikuError extends Error implements CustomError {
        readonly code: number;
        readonly type: Errors | string;
        readonly errors?: Errors | any;
        constructor({ code, type, message, errors }: CustomError);
    }
}
declare module "Miku" {
    import type { Options } from "types/Miku";
    import Channel from "Channel";
    export default class Miku {
        private readonly opts;
        private static options;
        constructor(opts: Options);
        static get opts(): Options;
        get channel(): Channel;
    }
}
declare module "Webhook" {
    import type { WebhookOptions, WebhookResponse } from "types/Webhook";
    import Client from "Client";
    type WebhookSettings = {
        readonly id: string;
        token: string;
    };
    export default class Webhook extends Client {
        private readonly _id;
        private readonly _token;
        constructor({ id, token }: WebhookSettings);
        send(body: WebhookOptions): Promise<WebhookResponse>;
    }
}
declare module "types/Guild" {
    import type { Snowflake } from "types/Channel";
    export type Guild = {
        id: Snowflake;
        name: string;
        splash: string | null;
        banner: string | null;
        description: string | null;
        icon: string;
        features: Array<string>;
        verification_level: number;
        vanity_url_code: string | null;
        nsfw_level: number;
        nsfw: boolean;
        premium_subscription_count: number;
    };
}
declare module "types/User" {
    import type { Snowflake } from "types/Channel";
    export type User = {
        id: Snowflake;
        username: string;
        avatar: string | null;
        discriminator: string;
        public_flags: number;
        flags: number;
        bot?: boolean;
        banner: string | null;
        accent_color: number | null;
        global_name: string | null;
        avatar_decoration_data: AvatarDecoration | null;
        banner_color: null;
        clan?: null;
        primary_guild?: null;
    };
    export type AvatarDecoration = {
        asset: string;
        sku_id: Snowflake;
    };
}
declare module "types/Channel" {
    import type { PermissionsBitField, PermissionType } from "enum/Channel";
    import type { Guild } from "types/Guild";
    import type { User } from "types/User";
    import type { Channel } from "types/Body";
    import type PermissionsBuilder from "builder/Permissions";
    export type Snowflake = string;
    export type ChannelPermissions = {
        id?: Snowflake;
        type?: PermissionType;
        allow?: number | Array<PermissionsBitField>;
        deny?: number | Array<PermissionsBitField>;
    };
    export type ChannelStructure = {
        id: Snowflake;
        type: number;
        last_message_id: string | null;
        flags: number;
        guild_id: Snowflake;
        name: string | null;
        parent_id: string | null;
        rate_limit_per_user?: number;
        bitrate?: number;
        user_limit?: number;
        rtc_region?: string | null;
        position: number;
        permission_overwrites: Array<ChannelPermissions>;
        nsfw: boolean;
    };
    export type InviteStructure = {
        type: number;
        code: string;
        inviter?: User;
        max_age: number;
        created_at: string;
        expires_at?: string | null;
        guild?: Guild;
        guild_id: Snowflake;
        channel: Pick<ChannelStructure, 'id' | 'type' | 'name'> | null;
        uses: number;
        max_uses: number;
        temporary: boolean;
    };
    export type ChannelResponse = ChannelStructure & {
        invite: string;
    } | undefined;
    export type ChannelDeleteResponse = ChannelStructure;
    export type InviteResponse = InviteStructure & {
        url: string;
    } | undefined;
    export type ChannelOptions = Omit<Channel, 'position' | 'user_limit'>;
    export type PermissionOverWrites = Array<PermissionsBitField> | Array<Omit<ChannelPermissions, 'id'>> | PermissionsBuilder;
}
declare module "types/Body" {
    import type { ChannelType } from "enum/Channel";
    import type { PermissionOverWrites, Snowflake } from "types/Channel";
    export type Channel = {
        name?: string;
        type?: ChannelType;
        user_limit?: number;
        parent_id?: string;
        permission_overwrites?: PermissionOverWrites;
        position: number;
        usersId: Array<Snowflake>;
    };
    export type Invite = {
        max_uses: number;
    };
}
declare module "types/Embed" {
    export type Embed = {
        author?: Author;
        title?: string;
        url?: string;
        description?: string;
        color?: number;
        fields?: Array<Fields>;
        thumbnail?: Thumbnail;
        image?: Image;
        footer?: Footer;
        timestamp?: Timestamp;
    };
    export type Author = {
        name: string;
        url?: string;
        icon_url?: string;
    };
    export type Fields = {
        name: string;
        value: string;
        inline?: boolean;
    };
    export type Thumbnail = {
        url: string;
    };
    export type Image = Thumbnail;
    export type Footer = {
        text: string;
        icon_url?: string;
    };
    export type Timestamp = Date | number | string;
}
declare module "types/Webhook" {
    import type EmbedBuilder from "builder/Embed";
    import type { User } from "types/User";
    import type { Embed } from "types/Embed";
    export type Webhook = {
        username?: string;
        avatar_url?: string;
        content: string;
        embeds?: Array<EmbedBuilder | Embed>;
    };
    export type WebhookSettings = {
        id: string;
        token: string;
    };
    export type WebhookOptions = Webhook;
    export type WebhookResponse = {
        type: number;
        mentions: Array<string>;
        mention_roles: Array<string>;
        attachments: Array<string>;
        timestamp: string;
        edited_timestamp?: string;
        flags: number;
        components: Array<object>;
        id: string;
        channel_id: string;
        pinned: boolean;
        mention_everyone: boolean;
        tts: boolean;
        webhook_id: string;
        user: User;
    } & Webhook;
}
declare module "types/Miku" {
    import type { Channel, Invite } from "types/Body";
    import type { Webhook } from "types/Webhook";
    export type Options = {
        token: string;
        guild_id: string;
        url?: string;
    };
    export type Instance = {
        method: 'GET' | 'POST' | 'DELETE';
        endpoint: string;
        body?: Channel | Invite | Webhook;
    };
}
declare module "errors/MikuBeam" {
    import MikuError from "errors/MikuError";
    export default class MikuBeam extends MikuError {
        private data;
        constructor(data: any);
    }
}
declare module "enum/Channel" {
    export enum ChannelType {
        TEXT = 0,
        VOICE = 2
    }
    export enum PermissionsBitField {
        STREAM = 512,
        VIEW_CHANNEL = 1024,
        SEND_MESSAGE = 2048,
        READ_MESSAGE_HISTORY = 65536,
        CONNECT = 1048576,
        SPEAK = 2097152
    }
    export enum PermissionType {
        Role = 0,
        Member = 1
    }
}
declare module "builder/Embed" {
    import type { Author, Embed, Fields, Footer, Image, Thumbnail, Timestamp } from "types/Embed";
    export default class EmbedBuilder {
        private readonly embed;
        setAuthor(author: Author): this;
        setTitle(title: string): this;
        setDescription(description: string): this;
        setColor(color: number): this;
        setFields(fields: Array<Fields>): this;
        setThumbnail(thumbnail: Thumbnail): this;
        setImage(image: Image): this;
        setFooter(footer: Footer): this;
        setTimestamp(timestamp?: Timestamp): this;
        get data(): Embed;
    }
}
declare module "builder/Permissions" {
    import { PermissionType, type PermissionsBitField } from "enum/Channel";
    import type { ChannelPermissions, Snowflake } from "types/Channel";
    export default class PermissionsBuilder {
        private readonly user;
        private readonly permissions;
        private readonly users;
        constructor(user: Array<Snowflake>);
        type(type: PermissionType): this;
        allow(allow: Array<PermissionsBitField>): this;
        deny(deny: Array<PermissionsBitField>): this;
        deny_everyone(): this;
        private sum;
        get data(): Array<ChannelPermissions>;
    }
}
