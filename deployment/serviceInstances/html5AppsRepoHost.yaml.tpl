---
apiVersion: services.cloud.sap.com/v1alpha1
kind: ServiceInstance
metadata:
  name: ${NAME_APP}-html5-host
spec:
  serviceOfferingName: html5-apps-repo
  servicePlanName: app-host
  externalName: ${NAME_APP}-html5-host
---
apiVersion: services.cloud.sap.com/v1
kind: ServiceBinding
metadata:
  name: ${NAME_APP}-html5-repo
spec:
  secretName: ${NAME_APP}-html5-repo
  serviceInstanceName: ${NAME_APP}-html5-host