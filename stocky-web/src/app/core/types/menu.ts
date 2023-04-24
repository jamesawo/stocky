export interface Menu {
    position: number;
    title: string;
    link: string;
    icon?: string;
    children?: Menu[];
}
