const defaultContext = require('./__mocks__/createInfo.json');
const onGenerateStart = require('./onGenerateStart');

describe('setDatabaseInfo', function () {
  test('When you have the correct partial and the resource must return the filled values.', async () => {
    const context = structuredClone(defaultContext);
    await onGenerateStart(context);

    expect(context.parameters.rdsInstanceName).toBe('instance-name');
    expect(context.parameters.rdsDatabaseName).toBe('postgres_db_name');
    expect(context.parameters.hasSql).toBeTruthy();
  });

  test('When you have code partials but do not have rds, you should not fill in the values', async () => {
    let context = structuredClone(defaultContext);
    delete context.parameters.services;
    await onGenerateStart(context);

    expect(context.parameters.rdsInstanceName).toBeUndefined();
    expect(context.parameters.rdsDatabaseName).toBeUndefined();
    expect(context.parameters.hasSql).toBeFalsy();
  });

  test('When you have both database name properties you must use RdsEngine to retrieve the database name.', async () => {
    const context = structuredClone(defaultContext);
    context.parameters.services[0].rdsEngine = 'mysql';
    await onGenerateStart(context);

    expect(context.parameters.rdsInstanceName).toBe('instance-name');
    expect(context.parameters.rdsDatabaseName).toBe('mysql_db_name');
    expect(context.parameters.hasSql).toBeTruthy();
  });
});
