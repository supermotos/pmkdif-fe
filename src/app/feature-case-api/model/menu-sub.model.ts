export interface Menu {
    id?: number;
    code?: string;
    name?: string;
    type?: string;
    menu?: Array<Menu>;
    isSelected?: boolean;
}
