export interface Link {
    id: string;
    name: string;
    type?: string;
    av: any;
    tv: any;
    incoming: number [];
    outgoing: number [];
    source: string;
    target: string;
}
