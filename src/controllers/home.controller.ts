import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/capturaErrosParaExpressCorrigir.middleware";
import { gerarRespostaDeErro } from "../utils/gerarRespostaDeErro";

const saudacao = async (req: Request, res: Response) => {
    try {
        const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ecommerce GT2 API</title>
    <!-- base SEO -->
    <meta name="description" content="Testando site via servidor (server-side)">
    <!-- Estilos -->
    <style>
        body {
            display: flex;
            justify-content: center;
            mih-height: 100vh; 
            background-color: rebeccapurple;
        }

        header {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40vh;
            padding: 0 4rem;
            margin: 30vh 0;
            background-color: lightgreen;
            border-radius: 1rem;
        }

        h1 {
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            font-size: 2.5rem;
            color: rebeccapurple;
        }
    </style>
</head>
<body>
    <header>
        <h1>Hello World! Welcome to Ecommerce GT2 API!</h1>
    </header>
</body>
</html>
        `.trim();

        return res.status(200).send(html);
    } catch (error: any) {
        return gerarRespostaDeErro(res, 500, `Não foi possível carregar a pagina inicial: ${error.message}`);
    }
};

export const homeHandle = asyncHandler(saudacao);