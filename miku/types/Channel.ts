import type { PermissionsBitField, PermissionType } from "@miku/enum";
import type { Guild } from "./Guild";
import type { User } from "./User";
import type { Channel } from "./Body";
import type PermissionsBuilder from "@miku/builder/Permissions";

export type Snowflake = string;

export type ChannelPermissions = {
    id?: Snowflake;
    type?: PermissionType;
    allow?: number | Array<PermissionsBitField>;
    deny?: number | Array<PermissionsBitField>
}

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
    rtc_region?: string | null
    position: number;
    permission_overwrites: Array<ChannelPermissions>;
    nsfw: boolean
}

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
    temporary: boolean
}

export type ChannelResponse = ChannelStructure & { invite: string } | undefined;
export type ChannelDeleteResponse = ChannelStructure;
export type InviteResponse = InviteStructure & { url: string } | undefined;
export type ChannelOptions = Omit<Channel, | 'position' | 'user_limit'>;
export type PermissionOverWrites = Array<PermissionsBitField> | Array<Omit<ChannelPermissions, 'id'>> | PermissionsBuilder