import Miku from "@miku";
import { ChannelType } from "@miku/enum";
import MikuError from "@miku/errors/MikuError";

const miku = new Miku({
    token: '<TOKEN>',
    guild_id: '<GUILD_ID>'
})

try {
    const channel = await miku.channel.create({
        type: ChannelType.VOICE,
        name: '<CHANNEL_NAME>',
        parent_id: '<CATEGORY_ID>',
        usersId: ['123', '321']
    })

    console.log(channel)

} catch (e: unknown) {
    if (e instanceof MikuError) {
        console.error({ ...e })
    }
}
