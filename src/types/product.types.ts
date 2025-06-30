export interface UpdateProdutoTypes {
    enabled?: boolean;
    name?: string;
    slug?: string;
    use_in_menu?: boolean;
    stock?: number;
    description?: string;
    price?: number;
    price_with_discount?: number;
    category_ids?: number[];
    images?: Array<{
        id?: number;
        type?: string;
        content?: string;
        deleted?: boolean;
    }>;
    options?: Array<{
        id?: number;
        deleted?: boolean;
        title?: string;
        shape?: 'square' | 'circle';
        radius?: string | number;
        type?: 'text' | 'color';
        values?: string[];
    }>;
}

export interface ProdutoTypes {
    id?: number;
    enabled: boolean;
    name: string;
    slug: string;
    use_in_menu: boolean;
    stock: number;
    description: string;
    price: number;
    price_with_discount: number;
    category_ids: number[];
    images: { type: string; content: string }[];
    options: {
        title: string;
        shape: 'square' | 'circle';
        radius?: string | number;
        type: 'text' | 'color';
        values: string[];
    }[];
}

export interface ProdutoFiltroParams {
    limit: number;
    page: number;
    fields?: string;
    match?: string;
    category_ids?: number[];
    price_range?: [number, number];
    options?: Record<number, string[]>;
}

export interface ProdutoResultado {
    id: number;
    enabled: boolean;
    name: string;
    slug: string;
    stock: number;
    description: string | null;
    price: number;
    price_with_discount: number;
    category_ids: number[];
    images: {
        id: number;
        content: string;
    }[];
    options: any[]; // Ou crie um tipo melhor se quiser
    use_in_menu?: boolean; // opcional se precisar
}

export interface ResultadoListaProdutos {
    data: ProdutoResultado[];
    total: number;
    limit: number;
    page: number;
}