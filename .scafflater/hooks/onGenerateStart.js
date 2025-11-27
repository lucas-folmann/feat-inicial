function setDatabaseInfo(context) {
  const sqlEngine = {mysql: 'rdsDbNameMySQL', postgres: 'rdsDbNamePostgres'};
  let hasAppServiceSql;
  let serviceSql;

  if (context.parameters?.appServices) {
    hasAppServiceSql = context.parameters.appServices.some((service) =>
      Object.keys(sqlEngine).includes(service.name?.toLowerCase())
    );
  }

  if (context.parameters?.services) {
    serviceSql = context.parameters.services.find((service) =>
      Object.keys(sqlEngine).includes(service?.rdsEngine?.toLowerCase())
    );

    if (!!serviceSql) {
      const rdsPropName = sqlEngine[serviceSql.rdsEngine.toLowerCase()];
      context.parameters.rdsInstanceName = serviceSql.rdsInstanceName;
      context.parameters.rdsDatabaseName = serviceSql[rdsPropName];
    }
  }

  context.parameters.hasSql = hasAppServiceSql && !!serviceSql;
}

module.exports = async (context) => {
  setDatabaseInfo(context);
};
