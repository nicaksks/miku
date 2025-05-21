import Miku from "@miku";
import { PermissionType, type PermissionsBitField } from "@miku/enum/Channel";
import MikuError from "@miku/errors/MikuError";
import type { ChannelPermissions, Snowflake } from "@miku/types/Channel";

export default class PermissionsBuilder {

    private readonly permissions: ChannelPermissions = { type: PermissionType.Member, allow: 0, deny: 0 }
    private readonly users: Array<ChannelPermissions> = []

    public constructor(private readonly user: Array<Snowflake>) {
        if (this.user.length == 0) throw new MikuError({ code: 10013, type: 'Miku', message: 'Unknown user' })
    }

    public type(type: PermissionType): this {
        this.permissions.type = type;
        return this;
    }

    public allow(allow: Array<PermissionsBitField>): this {
        this.permissions.allow = this.sum(allow ?? []);
        return this;
    }

    public deny(deny: Array<PermissionsBitField>): this {
        this.permissions.deny = this.sum(deny ?? []);
        return this;
    }

    public deny_everyone(): this {
        this.users.push({ id: Miku.opts.guild_id, type: PermissionType.Role, allow: 0, deny: this.permissions.allow })
        return this;
    }

    private sum(perms: Array<PermissionsBitField>): number {
        return perms.reduce<number>((v, p) => v + p, 0);
    }

    public get data(): Array<ChannelPermissions> {
        this.user.forEach(id => this.users.push({ id, ...this.permissions }));
        return this.users;
    }
}