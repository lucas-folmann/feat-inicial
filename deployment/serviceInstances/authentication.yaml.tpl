apiVersion: services.cloud.sap.com/v1
kind: ServiceBinding
metadata:
  name: ${NAME_APP}-html5-auth
spec:
  secretName: ${NAME_APP}-html5-auth
  serviceInstanceName: ${NAMESPACE}-xsuaa