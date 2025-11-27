import * as winston from 'winston';
const additionalInfo = {
  lifecycle: 'experimental',
  type: 'service',
  team: '{{ parameters.team }}',
  system: '{{ parameters.system }}',
  domain: '{{ parameters.domain }}'
};

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.label({ label: JSON.stringify(additionalInfo) }),
      ),
      // esse é o nível de log que será exibido no pod dentro do ArgoCD,
      // se você não precisa dele, pode remover e usar somente o global
      level: process.env.LOG_LEVEL_ENABLED ?? 'error'
    })
  ],
  // esse é o nível de log que será enviado para o New Relic, se você remover o de cima, este será o utilizado para todos os logs
  level: process.env.LOG_LEVEL_ENABLED ?? 'error'
});

// Este bloco é utilizado para que as chamadas ao console respeitem o log level configurado no winston
console.log = (...args) => logger.info(...args);
console.info = (...args) => logger.info(...args);
console.warn = (...args) => logger.warn(...args);
console.error = (...args) => logger.error(...args);
console.debug = (...args) => logger.debug(...args);
