import { PermissionsBitField, PermissionType } from "@miku/enum/Channel";
import PermissionsBuilder from "@miku/builder/Permissions";
import type { ChannelPermissions, PermissionOverWrites, Snowflake } from "@miku/types/Channel";

export default class Permissions {

    public static set(users: Array<Snowflake>, permission_overwrites?: PermissionOverWrites): Array<ChannelPermissions> {

        if (!users?.length) return [];

        const isChannelPermissions = permission_overwrites as Array<ChannelPermissions>;

        if (permission_overwrites instanceof PermissionsBuilder) {
            return permission_overwrites.data
        };

        if (typeof isChannelPermissions?.at(0) === 'object') {
            return this.isChannelPermissions(users, isChannelPermissions)
        };
        
        return new PermissionsBuilder(users)
            .allow(permission_overwrites as Array<PermissionsBitField>)
            .deny_everyone()
            .data
    }

    private static isChannelPermissions(users: Array<Snowflake>, channel: Array<ChannelPermissions>): Array<ChannelPermissions> {
        return users.map((id, i) => ({ id, type: channel[i]?.type ?? PermissionType.Member, allow: this.sum(channel[i]?.allow ?? 0), deny: this.sum(channel[i]?.deny ?? 0) }))
    }

    private static sum(perms: number | Array<PermissionsBitField>): number {

        if (Array.isArray(perms)) {
            return perms.reduce<number>((v, p) => v + p, 0);
        }

        return perms;
    }

}