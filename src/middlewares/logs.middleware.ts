import morgan from 'morgan';
import { env } from '../config/env';

// Configuração de logs Morgan para diferentes ambientes de trabalho
const logsMorgan = () => {
    if (env.NODE_ENV === 'production') {
        return morgan('combined');
    } else if (env.NODE_ENV === 'test') {
        return morgan('tiny');
    } else {
        return morgan('dev');
    }
}

export default logsMorgan;