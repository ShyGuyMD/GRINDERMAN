export interface Option {
    value: string;
    key: string;
}

export interface BookPropertyOption extends Option {
    required: boolean;
}