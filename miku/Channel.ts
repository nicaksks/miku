import type { ChannelStructure, ChannelOptions, ChannelResponse, InviteStructure, InviteResponse, ChannelDeleteResponse } from "@miku/types/Channel";
import Client from "./Client";
import Miku from "@miku";
import { ChannelType } from "@miku/enum/Channel";
import { discord } from "@miku/constants";
import Permissions from "./Permissions";

export default class Channel extends Client {

    public constructor() { super(Miku.opts) }

    public async create({ type = ChannelType.VOICE, ...channel }: ChannelOptions): Promise<ChannelResponse> {

        const users = channel.usersId;
        const user_limit = users?.length ?? 0;

        const response = await this.instance<ChannelStructure>({
            method: 'POST',
            endpoint: `guilds/${Miku.opts.guild_id}/channels`,
            body: {
                ...channel,
                type,
                name: this.name(channel.name),
                user_limit,
                permission_overwrites: Permissions.set(users, channel.permission_overwrites),
                position: 0
            }
        })

        const invite = await this.invite(response.id, user_limit);

        return {
            ...response,
            invite: invite?.url ?? `${discord.channels}/${response.guild_id}/${response.id}`
        }
    }

    private name(channel_name?: string): string {
        if (!channel_name) return 'miku-'.concat(Math.floor(Math.random() * 100).toString());
        return channel_name.substring(0, 100);
    }

    public async delete(id: string): Promise<ChannelDeleteResponse> {
        return this.instance<ChannelDeleteResponse>({ method: 'DELETE', endpoint: 'channels/'.concat(id) })
    }

    private async invite(channel_id: string, max_uses: number): Promise<InviteResponse> {
        try {
            const response = await this.instance<InviteStructure>({ method: 'POST', endpoint: `channels/${channel_id}/invites`, body: { max_uses } })
            return { ...response, url: discord.invite.concat(response.code) }
        } catch (e) { return }
    }
}