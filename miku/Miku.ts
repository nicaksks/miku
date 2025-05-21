import type { Options } from "@miku/types/Miku";
import Channel from "./Channel";
import MikuBeam from "@miku/errors/MikuBeam";

export default class Miku {

    private static options: Options

    public constructor(private readonly opts: Options) {
        if(!this.opts.token) throw new MikuBeam({ code: 40001, type: 'Authentication', message: 'Authentication failed', error_details: 'Unauthorized. Provide a valid token and try again'})
        Miku.options = this.opts
    }
    
    public static get opts(): Options {
        return this.options
    }

    public get channel(): Channel {
        return new Channel()
    }
}