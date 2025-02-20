import type { Snowflake } from "./Channel";

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
    premium_subscription_count: number
  }