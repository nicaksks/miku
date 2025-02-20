import type { Author, Embed, Fields, Footer, Image, Thumbnail, Timestamp } from "@miku/types/Embed";

export default class EmbedBuilder {

    private readonly embed: Embed = {}

    public setAuthor(author: Author): this {
        this.data.author = author
        return this;
    }

    public setTitle(title: string): this {
        this.embed.title = title;
        return this;
    }

    public setDescription(description: string): this {
        this.embed.description = description;
        return this;
    }

    public setColor(color: number): this {
        this.embed.color = color;
        return this;
    }

    public setFields(fields: Array<Fields>): this {
        this.embed.fields = fields
        return this;
    }

    public setThumbnail(thumbnail: Thumbnail): this {
        this.embed.thumbnail = thumbnail
        return this;
    }

    public setImage(image: Image): this {
        this.embed.image = image
        return this;
    }

    public setFooter(footer: Footer): this {
        this.embed.footer = footer
        return this;
    }

    public setTimestamp(timestamp: Timestamp = Date.now()): this {
        this.embed.timestamp = new Date(timestamp).toISOString()
        return this;
    }

    public get data(): Embed {
        return this.embed;
    }
}