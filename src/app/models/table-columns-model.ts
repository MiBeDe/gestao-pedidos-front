export interface TableColumns<T> {
    column: keyof T;
    header: string;
    mask?: string;
    currency?: {
        code: string;
        display: string;
        digistsInfo: string;
        locale: string;
    };
}