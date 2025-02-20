export type Embed = {
    author?: Author;
    title?: string;
    url?: string;
    description?: string;
    color?: number;
    fields?: Array<Fields>;
    thumbnail?: Thumbnail;
    image?: Image;
    footer?: Footer;
    timestamp?: Timestamp;
};

export type Author = {
    name: string;
    url?: string;
    icon_url?: string;
};

export type Fields = {
    name: string;
    value: string;
    inline?: boolean;
};

export type Thumbnail = {
    url: string;
}

export type Image = Thumbnail;

export type Footer = {
    text: string;
    icon_url?: string;
};

export type Timestamp = Date | number | string;