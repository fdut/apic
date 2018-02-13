# CMC REST API for IBM API Connect v5

 RESTful commands

- Simple health check
- Simple health check with details
- GET the list of existing TLS/SSL Profiles
- GET the list of Gateway Clusters
- GET the list of servers (Mgmt & Gateways)
- Create a Gateway Cluster
- Create a new API Gateway (i.e. DataPower)
- Delete an existing API Gateway
- Bind an API Gateway to a Cluster
- Delete an API Gateway from a Cluster
- Delete a Gateway Cluster


## Simple health check

- ($)> curl -k https://< mgmt-server >/v1/servers/self/lb-health-check 

- < mgmt-server >: hostname or @ip of the APIC mgmt server

- JSON array response example:

```
{
    "status": "success"
}
```

## Simple health check with details

- ($)> curl -k https://< mgmt-server >/v1/servers/self/lb-health-check/details 
-u cmc/admin:< admin_password >

- < mgmt-server >: hostname or @ip of the APIC mgmt server
- < admin_password >: password of the admin account

- JSON array response example:

```
{
    "isInServers": "true",
    "isInCluster": "unknown",
    "isCouchUp": "true",
    "isWritable": "unknown",
    "isReadable": "true",
    "isActive": "true",
    "isDissociated": "false",
    "error": null
}
```


## CMC - GET Cloud Manager information

- ($)> curl -k https://< mgmt-server >/v1/cloud -u cmc/admin:< admin_password >

- < mgmt-server >: hostname or @ip of the APIC mgmt server
- < admin_password >: password of the admin account

- JSON array response example:

```
{
    "url": "https://192.168.225.100/v1/cloud",
    "id": "5a786bbc0cf228e2d598490b",
    "createdAt": "2018-02-05T14:35:40.326+0000",
    "updatedAt": "2018-02-05T14:35:40.326+0000",
    "createdBy": "SYSTEM",
    "updatedBy": "SYSTEM",
    "displayName": "apim_cloud",
    "dynamicDNS": false,
    "multiOrg": true,
    "smtp": {
        "url": "",
        "id": "5a786efe0cf20955d29f0233",
        "createdAt": "2018-02-05T14:49:34.306+0000",
        "updatedAt": "2018-02-05T14:49:34.306+0000",
        "createdBy": "admin",
        "updatedBy": "admin",
        "name": "192.168.225.1",
        "hostname": "192.168.225.1",
        "port": "2525",
        "senderEmailAddress": "manager@pot.ibm",
        "senderDescriptiveName": "Manager Admin"
    },
    "eurekaEnabled": false,
    "ibmIdEnabled": false,
    "supportedAPIDocExtensions": [],
    "idp": "5a786b980cf228e2d598488a",
    "advancedPortalEnabled": true,
    "advancedPortalAddress": "192.168.225.200",
    "advancedPortalPort": 22,
    "advancedPortalPublicKey": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCZg8nbKYh7dfLCGRsalP0LfYo6fs+B2JKfP2qwRPdCb5P/kh+xQXN72HNIKlgCWu35iq73CFazzdxyhGG6zJtmz4glcQFwoQRdGI5KreVH2/+ySDLB6iVAasV3Bjfr2EAGhRQX0WWa1goXKRWz1oAUsSopCdmboK+4SrmYpZ4rD8CYeBa7Jdgtq52+D3x4CzEFkb/rJAlogHWMMFTMGy/FcBiAESDKisZzGiySxlOsCAX5wTrAa/yPQE+81EImWS3yetqCx/WW90YmfohSSeRZnhnJMnnQjm0nQxoEp7JoUrDRB0nMpBfcnoWnlmNiaDcRHLwnJ+NnElbE0IJFxx9j apim_advanced_portal_ssh_key\n",
    "licenseAccepted": true,
    "configurationDatabaseFailoverTimeout": 60,
    "bluemixIntegrationEnabled": false,
    "runLoginServiceSync": false,
    "logMode": "ALL",
    "maxFailedAttempts": 5,
    "absoluteMaxFailedAttemptsForHrDelay": 13,
    "syslogPort": 0,
    "syslogProtocol": "NONE",
    "haEnabledDefault": true,
    "logLevel": "INFO",
    "sandboxGatewayClusterUrl": "/gatewayClusters/5a786ca10cf20955d29efeb0"
}

```



## CMC - GET the list of existing TLS/SSL Profiles 

• ($)> curl -k https://< mgmt-server >/v1/cloud/ssl-profiles -u cmc/admin:< admin_password >

- < mgmt-server >: hostname or @ip of the APIC mgmt server
- < admin_password >: password of the admin account

- JSON array response example:

```
[
    {
        "id": "5a786ba10cf228e2d598489b",
        "name": "default-ssl-profile",
        "title": "Cloud Manager and API Manager TLS Profile",
        "mutualAuth": false,
        "public": false,
        "protocols": [
            "TLSv1",
            "TLSv11",
            "TLSv12"
        ],
        "features": [],
        "ciphers": [
            "SSL_RSA_WITH_AES_256_CBC_SHA",
            "SSL_RSA_WITH_AES_128_CBC_SHA",
            "SSL_RSA_WITH_3DES_EDE_CBC_SHA",
            "SSL_RSA_WITH_RCA_128_SHA",
            "SSL_RSA_WITH_RCA_128_MD5"
        ],
        "certs": [
            {
                "name": "factory supplied identity",
                "certType": "PUBLIC",
                "url": "https://192.168.225.100/v1/cloud/ssl-profiles/5a786ba10cf228e2d598489b/keystore/cert",
                "details": {
                    "issuedTo": {
                        "organization": "IBM Corporation",
                        "commonName": "API Connect",
                        "serialNumber": 667779002,
                        "locality": "Armonk",
                        "state": "NY",
                        "country": "US"
                    },
                    "issuedBy": {
                        "organization": "IBM Corporation",
                        "commonName": "API Connect",
                        "country": "US"
                    },
                    "fingerprints": {
                        "sha1": "16 E1 FC C5 29 B1 92 2F CC 35 A6 78 4B 05 11 BA 72 18 0C 71",
                        "md5": "D3 E7 BB 01 8C 2C E9 A9 FD 61 18 79 13 81 F4 7E"
                    },
                    "validity": {
                        "notBefore": "2018 Jan 22",
                        "notAfter": "2037 Oct 09"
                    }
                },
                "certId": "5a786ba90cf228e2d598489c"
            },
            {
                "name": "apimanagement",
                "certType": "CLIENT",
                "url": "https://192.168.225.100/v1/cloud/ssl-profiles/5a786ba10cf228e2d598489b/truststore/certs/5a786baa0cf228e2d598489d",
                "details": {
                    "issuedTo": {
                        "organization": "IBM United Kingdom Limited",
                        "organizationalUnit": "API Management",
                        "serialNumber": 17279292038028304126,
                        "locality": "Winchester",
                        "state": "Hampshire",
                        "country": "UK"
                    },
                    "issuedBy": {
                        "organization": "IBM United Kingdom Limited",
                        "organizationalUnit": "API Management",
                        "country": "UK"
                    },
                    "fingerprints": {
                        "sha1": "40 9D 5C 17 ED 3C B8 F7 F9 2B 11 FB 5B A0 59 09 73 95 52 85",
                        "md5": "E4 79 82 A3 6D 27 A0 FC 13 70 5A FC 51 98 EF 2F"
                    },
                    "validity": {
                        "notBefore": "2013 Apr 22",
                        "notAfter": "2033 May 05"
                    }
                },
                "certId": "5a786baa0cf228e2d598489d"
            },
            {
                "name": "Anonymous Compagny",
                "certType": "CLIENT",
                "url": "https://192.168.225.100/v1/cloud/ssl-profiles/5a786ba10cf228e2d598489b/truststore/certs/5a7d6aba0cf2438dcc773283",
                "details": {
                    "issuedTo": {
                        "organization": "ACME",
                        "organizationalUnit": "IT",
                        "commonName": "Anonymous Compagny",
                        "serialNumber": 15469074516596072011,
                        "locality": "PARIS",
                        "state": "France",
                        "country": "FR"
                    },
                    "issuedBy": {
                        "organization": "ACME",
                        "organizationalUnit": "IT",
                        "commonName": "Anonymous Compagny",
                        "country": "FR"
                    },
                    "fingerprints": {
                        "sha1": "9C 75 0D A1 DB 69 97 E4 9B BB 76 38 91 A1 98 BF D6 F0 EE 6F",
                        "md5": "92 D4 36 F0 4A 2E 38 57 ED 9C 85 17 E5 E5 D5 FF"
                    },
                    "validity": {
                        "notBefore": "2018 Feb 09",
                        "notAfter": "2020 Nov 29"
                    }
                },
                "certId": "5a7d6aba0cf2438dcc773283"
            }
        ],
        "url": "https://192.168.225.100/v1/cloud/ssl-profiles/5a786ba10cf228e2d598489b",
        "defaultSystemProfile": true
    }
]
```

## CMC – GET the list of Gateway Clusters

- ($)> curl -k https://< mgmt-server >/v1/gatewayClusters -u cmc/admin:< admin_password >

- < mgmt-server >: hostname or @ip of the APIC mgmt server
- < admin_password >: password of the admin account

- JSON array response example:

```
[
    {
        "url": "https://192.168.225.100/v1/gatewayClusters/5a786ca10cf20955d29efeb0",
        "id": "5a786ca10cf20955d29efeb0",
        "createdAt": "2018-02-05T14:39:29.858+0000",
        "updatedAt": "2018-02-09T09:32:42.812+0000",
        "createdBy": "SYSTEM",
        "updatedBy": "admin",
        "name": "Gateway",
        "hostname": "192.168.225.52",
        "multiSite": false,
        "servers": [
            "/servers/5a7b0cd20cf2fbb0c51f985a"
        ],
        "port": 443,
        "portBase": 2443,
        "groupId": 0,
        "gatewayDomainName": "APIMgmt_9DBAD8AC40",
        "sslProfileId": "5a786ba10cf228e2d598489b",
        "configurationTimestamp": "2018-02-09T09:32:42.812+0000",
        "type": [
            "production",
            "development"
        ],
        "sniEnabled": false,
        "sniHostMap": []
    }
]
```

## CMC – GET the list of servers (mgmt & gateways)

- ($)> curl -k https://< mgmt-server >/v1/servers -u cmc/admin:< admin_password >

- < mgmt-server >: hostname or @ip of the APIC mgmt server
- < admin_password >: password of the admin account

- JSON array response example:

```
[
    {
        "url": "https://192.168.225.100/v1/servers/5a786bc40cf228e2d598490c",
        "id": "5a786bc40cf228e2d598490c",
        "createdAt": "2018-02-05T14:35:48.342+0000",
        "updatedAt": "2018-02-05T14:45:57.123+0000",
        "createdBy": "SYSTEM",
        "updatedBy": "admin",
        "name": "apim-192-168-225-100.localdomain",
        "type": "MANAGEMENT",
        "ipAddress": "192.168.225.100",
        "hostname": "management.pot.ibm",
        "port": 443,
        "sharedGateway": false,
        "clusters": [
            "/managementClusters/5a786bc70cf228e2d5984912"
        ],
        "version": "5.0.8.2_20180122-0216_5452c4cb568d_3535d12",
        "serialNumber": "VMWUKPQP795VHEJD",
        "status": "ACTIVE",
        "role": "PRIMARY",
        "statusMsg": "Server apim-192-168-225-156.localdomain was added to cluster Management successfully.",
        "outOfSync": false,
        "dissociated": false,
        "haEnabled": true,
        "fqdn": "management.pot.ibm"
    },
    {
        "url": "https://192.168.225.100/v1/servers/5a7b0cd20cf2fbb0c51f985a",
        "id": "5a7b0cd20cf2fbb0c51f985a",
        "createdAt": "2018-02-07T14:27:30.480+0000",
        "updatedAt": "2018-02-13T10:02:23.232+0000",
        "createdBy": "admin",
        "updatedBy": "SYSTEM",
        "name": "API Gateway",
        "type": "GATEWAY",
        "ipAddress": "192.168.225.52",
        "hostname": "192.168.225.52",
        "port": 5550,
        "username": "admin",
        "networkInterface": "eth0",
        "sharedGateway": false,
        "clusters": [
            "/gatewayClusters/5a786ca10cf20955d29efeb0"
        ],
        "version": "IDG.7.6.0.4-294196-2017/12/02 10:42:23",
        "serialNumber": "564D9545-BAA7-0BB7-BD25-529DAAC9840C",
        "model": "5725 T09",
        "platform": "VMware Virtual Platform",
        "configurationVersion": "5.0.8.2_20180122-0216_5452c4cb568d_3535d12",
        "status": "ACTIVE",
        "managementLoadBalancingAddresses": [
            "192.168.225.100 (up)"
        ],
        "analyticsLoadBalancingAddresses": [
            "192.168.225.100 (up)"
        ],
        "statusMsg": "Server API Gateway was added to cluster Gateway successfully.",
        "outOfSync": true,
        "dissociated": false,
        "haEnabled": true,
        "fqdn": "192.168.225.52"
    }
]
```

## CMC – Create a Gateway Cluster

- ($)> curl --data-binary @post.json -k -H "Content-Type: application/json" https://< mgmt-
server >/v1/gatewayClusters -u cmc/admin:< admin_password > -v

- < mgmt-server >: hostname or @ip of the APIC mgmt server
- < admin_password >: password of the admin account
- @post.json : json content with gateway cluster parameters

```
{
"groupId": 0,
"sslProfileId": "5882373ee4b0b364362010d3", 
(*) "name": "MyGatewayCluster",
"hostname": "192.168.225.62",
"port": "443",
"portBase": "2443"
}

```
(*) : cf “GET the list of existing TLS/SSL Profiles” in order to get the right sslProfileId

## CMC – Create a new API Gateway (DataPower) 

- ($)> curl --data-binary @post.json -k -H "Content-Type: application/json" https://< mgmt-
server >/v1/servers -u cmc/admin:< admin_password > -v

- < mgmt-server >: hostname or @ip of the APIC mgmt server 
- < admin_password >: password of the admin account
- @post.json : json content with api gateway parameters

```
  {
    "type": "GATEWAY",
    "port": "5550",
    "networkInterface": "eth0",
    "name": "apigateway-dp",
    "hostname": "192.168.225.62",
    "username": "admin",
    "password": "Password"
}
```

## CMC – Delete an existing API Gateway

- ($)> curl -k -X DELETE https://< mgmt-server >/v1/servers/<gateway_id> -u
cmc/admin:< admin_password > -v

- < mgmt-server >: hostname or @ip of the APIC mgmt server
- < admin_password >: password of the admin account
- < gateway_id > : id of the api gateway to delete

- Response (OK):

```
	status code 204 No Content
```

## CMC – Bind an API Gateway to a Cluster

- ($)> curl -k --data-binary @post.json -u cmc/admin:< admin_password > https://< mgmt-
server >/v1/gatewayClusters/< gatewayCluster_id >/servers/< gateway_id >

- < mgmt-server >: hostname or @ip of the APIC mgmt server
- < admin_password >: password of the admin account
- < gateway_id > : id of the api gateway to associate ot the cluster
- < gatewayCluster_id > : id of the target gateway cluster

- @post.json: 

```
{
"url": "https://mgr.think.ibm/cmc/proxy/gatewayClusters/5882375ce4b0b3643620114a", "id": "5882375ce4b0b3643620114a",
"createdAt": "2017-01-20T16:14:20.553+0000",
"updatedAt": "2017-01-20T17:27:51.217+0000",
"createdBy": "SYSTEM",
"updatedBy": "admin",
"name": "Gateway",
"hostname": "192.168.225.62",
"multiSite": false,
"servers": [],
"port": 443,
"portBase": 2443,
"groupId": 0,
"gatewayDomainName": "APIMgmt_B45D556F10",
"sslProfileId": "5882373ee4b0b364362010d3",
"configurationTimestamp": "2017-01-20T17:27:51.217+0000"
}
```

- Response (if OK):

```
status code 201 Created
```

- Response (if error) – Example of SOMA error in JSON format


## CMC – Delete an API Gateway from a Cluster 

- Cf. delete an existing API Gateway

**Important**: the <APIMgmt_xxx> domain is automatically deleted from the gateway server that has been deleted from a gateway cluster

## CMC – Delete a Gateway Cluster

- ($)> curl -k -X DELETE https://< mgmt-server >/v1/gatewayClusters/< gatewayCuster_id > -u
cmc/admin:< admin_password > -v

- < mgmt-server >: hostname or @ip of the APIC mgmt server
- < admin_password >: password of the admin account
- < gatewayCluster_id > : id of the gateway cluster that has to be deleted

- Response (OK):

```
status code 204 No Content
```

> Fréderic Dutheil - frederic_dutheil@fr.ibm.com