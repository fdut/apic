# Mobile App using APIC & Cloudant with OAuth2 Authentication

<img src= ./ressources/draw.io.logicalflow.png>

## Requirement

To test this mobile application, you need the following component :

- Ionic 3.x
- Cordova 6.x or 7.x
- API Connect instance (on IBM Cloud)
- Cloudant instance (on IBM Cloud)
- Chrome as Mobile App Simulator.
- (Optional) Android or iOS Emulator

## Installation

Install Ionic 3.x

```
npm install -g ionic@3.19
```

Install Cordova

```
npm install -g cordova
```

- Create API Connect instance

- Create Cloudant instance

Use "Lite (Free)" Plan to create Cloudant service.

<img src= ./ressources/cloudant.png>

### Create a DB

manage > Databases > Create Database

<img src= ./ressources/cloudantcreatedb.png>
<img src= ./ressources/cloudantcreatedb2.png>

Create a API key to access DB and add **"write permission"** for this API key

<img src= ./ressources/cloudantsetpermission.png>

<img src= ./ressources/cloudantaddkey.png>

Retrieve cloudant service credential

<img src= ./ressources/cloudantcredential.png>



## Configuration

- Deploy Api and product file

Import in Draft of your API environment the following file :

```
events-product_1.0.0.yaml
events_1.0.0.yaml
oauth2-oidc-provider_1.0.0.yaml
```

- Create a new LDAP User Registry

For this sample we use a public LDAP service : http://www.forumsys.com/tutorials/integration-how-to/ldap/online-ldap-test-server/

In your API Connect instance go in the following menu :

```
>> Admin > Security > User registries
```

Click 

```
Add > LDAP registry (API Security Only)
```

and add the following value :

```
Display Name : Online LDAP Test Server
Name : online-ldap-test-server
Description : Online LDAP Test Server
Hostname : ldap.forumsys.com
Port : 389
Select **Compose (DN)**
Prefix : uid=
Suffix : ,dc=example,dc=com
```

Test your configuration with user: **einstein** and password: **password**

- Update oauth2-oidc-provider_1.0.0 api with your user registry configuration.

<img src= ./ressources/authentication.png>

- Update events_1.0.0 api with your cloudant credential.

Update default value for these properties

db-name :  with **name** value of your cloudant db

db-pwd :  with **password** value of your cloudant db API key

db-userid : with **username** value of your cloudant db API key password

db-url : with **host** value of cloudant service credential

<img src= ./ressources/cloudantproperties.png>

Deploy and publish your product in Sandbox Catalog.

<img src= ./ressources/apicpublish.png>

Check if your product is published

<img src= ./ressources/apicpublished.png>

- Update Mobile App

Update value of clientID, ClientSecret and APIConnect Endpoint.

```
  {
      clientid: 'REPLACE_WITH_YOUR_CLIENTID',
      clientsecret: 'REPLACE_WITH_YOUR_CLIENTSECRET',
      apicEndpoint: 'REPLACE_WITH_YOUR_APICENDPOINT'
    };
  
```

An example

```
  {
      clientid: '2e5af234-f92d-4c25-b490-192449f06483',
      clientsecret: 'U8jF8mBmmeX3eX6nV1pP45632K3cS6fM5jV2dB5lU6aE2cW3oD2hN1',
      apicEndpoint: 'https://api.eu-de.apiconnect.ibmcloud.com/fdutorg-dev/sb'
    };
```

## Test the Mobile App

Test the mobile app in the browser (Use Chrome or Firefox)

in **events-mobileapp** folder launch the following command :

```
ionic serve -w "google chrome"
```


<img src= ./ressources/eventsscreenshot.gif>

** NEED TO BE COMPLETED **

