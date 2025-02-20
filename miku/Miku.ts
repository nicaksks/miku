import type { Options } from "@miku/types/Miku";
import Channel from "./Channel";

export default class Miku {

    private static options: Options

    public constructor(opts: Options) {
        Miku.options = opts
    }

    public static get guild_id(): string {
        return this.options.guild_id
    }

    public static get opts(): Options {
        return this.options
    }

    public get channel(): Channel {
        return new Channel(Miku.options)
    }
}