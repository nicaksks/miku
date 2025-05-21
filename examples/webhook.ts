import Webhook from "@miku/webhook";
import MikuError from "@miku/errors/MikuError";
import EmbedBuilder from "@miku/builder/Embed";

const webhook = new Webhook({ id: '<WEBHOOK-ID>', token: '<WEBHOOK-TOKEN>' })

const embed = new EmbedBuilder()
    .setTitle('Hastune Miku')
    .setDescription('21321312312')
    .setFields([
        { name: "Hastune", value: "Miku" },
        { name: "Hastune", value: "Miku" }
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
