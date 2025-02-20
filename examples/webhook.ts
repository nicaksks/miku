import Webhook from "@miku/webhook";
import MikuError from "@miku/errors/MikuError";
import EmbedBuilder from "@miku/builder/Embed";

const webhook = new Webhook({ id: '<WEBHOOK-ID>', token: '<WEBHOOK-TOKEN>' })

const embed = new EmbedBuilder()
    .setTitle('Vida')
    .setDescription('21321312312')
    .setFields([
        { name: "nica", value: "123" },
        { name: "nica", value: "123" }
    ])
    .setFooter({ text: `ola` })
    .setColor(0x00FFFF);

try {
    const hook = await webhook.send({
        username: 'Log',
        content: '123',
        embeds: [embed]
    })

    console.log(hook)
} catch (e: unknown) {
    if (e instanceof MikuError) {
        console.error({ ...e })
    }
}
