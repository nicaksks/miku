import type { Snowflake } from "./Channel";

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
    primary_guild?: null
}

export type AvatarDecoration = {
    asset: string; //hash
    sku_id: Snowflake
}