---
apiVersion: batch/v1
kind: Job
metadata:
  name: ${NAME_APP}-html5-apps-deployer
  labels:
    app: ${NAME_APP}
  annotations:
    "helm.sh/hook": "post-install,post-upgrade"
    "helm.sh/hook-delete-policy": before-hook-creation,hook-succeeded
spec:
  backoffLimit: 4
  ttlSecondsAfterFinished: 10
  template:
    metadata:
      labels:
        job-name: ${NAME_APP}-html5-apps-deployer
        sidecar.istio.io/inject: "false"
    spec:
      restartPolicy: Never
      volumes:
        - name: html5-apps-repo-secret
          secret:
            secretName: ${NAME_APP}-html5-repo
            defaultMode: 420
        - name: xsuaa-secret
          secret:
            secretName: ${NAME_APP}-html5-auth
            defaultMode: 420
        - name: destination-secret
          secret:
            secretName: ${NAME_APP}-html5-destination
            defaultMode: 420
      containers:
        - name: html5-deployer
          image: 837663801964.dkr.ecr.us-east-1.amazonaws.com/${NAME_APP}
          imagePullPolicy: Always
          volumeMounts:
            - name: xsuaa-secret
              readOnly: true
              mountPath: /bindings/xsuaa
            - name: html5-apps-repo-secret
              readOnly: true
              mountPath: /bindings/html5_apps_repo
            - name: destination-secret
              readOnly: true
              mountPath: /bindings/destination
          resources:
            limits:
              memory: 512Mi
              cpu: "1"
            requests:
              memory: 256Mi
              cpu: "0.2"
          env:
            - name: SERVICE_BINDING_ROOT
              value: /bindings
            - name: EXIT_PROCESS_AFTER_UPLOAD
              value: "true"
            - name: PORT
              value: "5000"
            - name: SAP_CLOUD_SERVICE
              value: ${NAME_CLOUD_SERVICE}
      imagePullSecrets:
        - name: aws-ecr-auth