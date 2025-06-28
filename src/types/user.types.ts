// Tudo que está no banco (inclui senha)
export interface UsuarioCompleto {
    id: number;
    firstname: string;
    surname: string;
    email: string;
    password: string;
}

// Apenas o que é retornado ao frontend (sem senha)
export interface UsuarioDTO {
    id: number;
    firstname: string;
    surname: string;
    email: string;
}
