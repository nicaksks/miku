import MikuBeam from "@miku/errors/MikuBeam";
import type { Instance, Options } from "@miku/types/Miku";
import { version } from "@miku/package";
import { rest } from "./utils/constants";

export default abstract class Client {

    private readonly token: string;

    protected constructor(private readonly opts: Options) {
        this.token = this.opts?.token?.replace('Bot', '').replace('Bearer', '').trim();
    }

    protected async instance<const T>({ method, endpoint, body }: Instance): Promise<T> {

        const response = await fetch(`${rest.api}/v${rest.version}/${endpoint}`, {
            method,
            headers: {
                'User-Agent': `DiscordBot (Hatsune Miku, ${version})`,
                'Content-Type': 'application/json',
                'Authorization': `Bot ${this.token}`
            },
            body: body ? JSON.stringify(body) : undefined
        })

        const data = await response.json()

        if (!response.ok) {
            throw new MikuBeam(data);
        }

        return data
    }
}
