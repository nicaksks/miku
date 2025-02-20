import MikuBeam from "@miku/errors/MikuBeam";
import type { Instance, Options } from "@miku/types/Miku";
import { version } from "@miku/package";
import { rest } from "./utils/constants";

export default abstract class Client {

    private token: string;
    private readonly url: string;

    protected constructor(protected readonly opts: Options) {
        this.token =  opts?.token.replace('Bot', '').replace('Bearer', '').trim();
        this.url = opts?.url ?? 'Miku'
    }

    protected async instance<const T>({ method, endpoint, body }: Instance): Promise<T> {
        
        const response = await fetch(`${rest.api}/v${rest.version}/${endpoint}`, {
            method,
            headers: {
                'User-Agent': `DiscordBot (${this.url}, ${version})`,
                'Content-Type': 'application/json',
                'Authorization': `Bot ${this.token}`
            },
            body: body ? JSON.stringify(body) : undefined
        })

        const data: T = await response.json()

        if (!response.ok) {
            new MikuBeam(data);
        }

        return data
    }
}