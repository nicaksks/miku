import { ButtonStyle } from "@miku/enum/ButtonStyle";
import { ComponentType } from "@miku/enum/ComponentType";
import type { ButtonComponent } from "@miku/types/Button";

export default class ButtonBuilder {

    private readonly button: ButtonComponent = {
        type: ComponentType.Button,
        label: "",
        style: ButtonStyle.PRIMARY,
        custom_id: null,
        emoji: null,
        url: null,
        disabled: null
    }

    public constructor() {
        this.button.type = ComponentType.Button
    }

    public setLabel(label: string): this {
        this.button.label = label
        return this;
    }

    public setStyle(style: ButtonStyle): this {
        this.button.style = style
        return this;
    }

    public setCustomId(id: string): this {
        if (id.length > 100) console.warn("Custom Id max 100 characters");
        this.button.custom_id = id.substring(0, 100);
        return this;
    }

    public setUrl(url: string): this {
        this.button.url = url
        return this;
    }

    public setDisabled(disabled: boolean): this {
        this.button.disabled = disabled
        return this;
    }

    public get data(): ButtonComponent {
        return this.button;
    }
}