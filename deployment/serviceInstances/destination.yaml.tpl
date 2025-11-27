---
apiVersion: services.cloud.sap.com/v1alpha1
kind: ServiceInstance
metadata:
  name: ${NAME_APP}-destination
spec:
  parameters:
    HTML5Runtime_enabled: true
    version: 1.0.0
  serviceOfferingName: destination
  servicePlanName: lite
  externalName: ${NAME_APP}-destination
---
apiVersion: services.cloud.sap.com/v1
kind: ServiceBinding
metadata:
  name: ${NAME_APP}-html5-destination
spec:
  secretName: ${NAME_APP}-html5-destination
  serviceInstanceName: ${NAME_APP}-destination