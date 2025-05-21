import type { ButtonStyle } from "@miku/enum/ButtonStyle"
import type { ComponentType } from "@miku/enum/ComponentType"

export type Button = {
    type: number
    components: Array<ButtonComponent | Button>
}

export type ButtonComponent = {
    type: ComponentType;
    label: string;
    style: ButtonStyle;
    custom_id?: string | null;
    emoji?: string | null;
    url?: string | null;
    disabled?: boolean | null
}