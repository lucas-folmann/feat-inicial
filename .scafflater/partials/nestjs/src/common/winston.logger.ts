import {WinstonModuleOptions} from 'nest-winston';
import * as winston from 'winston';
import {transports} from 'winston';

const winstonConfig: WinstonModuleOptions = {
  handleExceptions: true,
  transports: new transports.Console({
    format: winston.format.json(),
    // esse é o nível de log que será exibido no pod dentro do ArgoCD, 
    // se você não precisa dele, pode remover e usar somente o global
    level: process.env.LOG_LEVEL_ENABLED ?? 'error' 
  }),
  // esse é o nível de log que será enviado para o New Relic, se você remover o de cima, este será o utilizado para todos os logs
  level: process.env.LOG_LEVEL_ENABLED ?? 'error' 
};

export default winstonConfig;
