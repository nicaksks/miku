import type { ChannelType } from "@miku/enum/Channel";
import type { PermissionOverWrites, Snowflake } from "./Channel";

export type Channel = {
    name?: string;
    type?: ChannelType;
    user_limit?: number;
    parent_id?: string;
    permission_overwrites?: PermissionOverWrites;
    position: number;
    usersId: Array<Snowflake>
}

export type Invite = {
    max_uses: number
}