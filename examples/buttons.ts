import Webhook from "@miku/webhook";
import MikuError from "@miku/errors/MikuError";
import ButtonBuilder from "@miku/builder/Button";
import { ButtonStyle } from "@miku/enum/ButtonStyle";

const webhook = new Webhook({ id: '<WEBHOOK-ID>', token: '<WEBHOOK-TOKEN>' })

const button = new ButtonBuilder()
    .setLabel("Hello, Miku")
    .setStyle(ButtonStyle.LINK)
    .setUrl("https://www.google.com")

try {
    const hook = await webhook.send({
        components: [button, button]
    })

    console.log(hook)
} catch (e: unknown) {
    if (e instanceof MikuError) {
        console.error({ ...e })
    }
}
