# Simply API
--------------

1. Open Draft panel in API Manager

2. Test the backend service (ie the service that will be proxied)
	
	The backend service is located here: [https://myweatherprovider.mybluemix.net/current?zipcode=90210](https://myweatherprovider.mybluemix.net/current?zipcode=90210). Go ahead and try it out on a Web browser to make sure its available. 

```
	{
		"zip":"90210",
		"temperature":61,
		"humidity":93,
		"city":"Beverly Hills",
		"state":"California"
	}
	
```

3. Import Weather API definitions file. Click the **Add (+)** button and select **Import API from a file or URL**. 
	* [https://raw.githubusercontent.com/ozairs/apiconnect/master/getting-started/weather-provider-api_1.0.0.yaml]() 
    * Click the **Weather Provider API** API. In the **Design** tab, make a note of a few items:
    *
    	* API exposed on the path `/current` & `/today`
    	
		![alt](img/paths.png)
		
		* Click the **Assemble** tab at the top. You will notice multiple `Invoke` actions. It currently references a service deployed [here] (https://myweatherprovider.mybluemix.net/current).
		
The API designer includes a built-in test tool, so you don't need any external tool to perform a quick validation. 

### Test

6. Click the **Play icon** ![alt](img/play.png) to open the built-in test tool. 

7. Select the **get /current** operation and enter the zipcodem `90210`. 

8. Click the **Invoke** button to test the API. The first time you test, you will get security warning so open the link to accept the self-signed certifcate. 

9. Click the **Invoke** button again to see the same weather REST response but this time its executed via the API Gateway.




# Exemple SOAP to RESP API (Create Your API in 5 min)
------------------------

https://developer.ibm.com/apiconnect/resources/exposing-soap-service-rest-api-hands-tutorial/

La banque A dispose d'un ensemble de services SOAP existants qu'elle souhaite exposer via des API afin de favoriser la croissance du marché des appareils mobiles et des appareils. L'équipe commerciale de Bank A sait qu'une meilleure présence des applications mobiles et périphériques améliorera leur image de marque et augmentera la satisfaction des clients.
L'équipe commerciale de Bank A a reçu les exigences de ses développeurs d'applications mobiles pour exposer ses services Web existants en tant qu'API JSON REST. Les charges utiles JSON sont plus petites que les mêmes données au format SOAP, ce qui réduit la quantité de bande passante requise pour les applications mobiles. JSON est aussi une donnée plus facile
format pour travailler avec JavaScript - un langage de programmation populaire pour le développement mobile.
Après avoir envisagé de créer sa propre solution de gestion d'API, l'équipe technologique de Bank A a plutôt décidé de mettre en œuvre une solution IBM API Management, qui lui permettra d'entrer rapidement sur le marché à un coût réduit.

http://banka.mybluemix.net/home/index.html

http://banka.mybluemix.net/services/AccountService?wsdl



# Create Product "bankproduct"

> Un produit contient des APIs et le contrat d'utilisation de ces APIs (Quotas, Visibilité, Monétisation etc ...)

Name: **bankproduct**

# Create API

> Dans un premier temps, l'objet de cette API est de retourner le solde d'un compte client. Le compte client (accountId) est placé dans le chemin de la requête.

<img src="img/flow.jpg">

- Menu > Draft > API > Add > New API

- Name: **bank**

- Add Path 

	GET /getbalance/{accountId}

	- Parameter

		accountId   Path  	integer

		<img src="img/getBalanceParameters.png">

- Create definition

	name : **jsonResponse**

	- Propety :

```
	accountValue   Type String    {“accountValue”: “76628730”}
```
- Add service

	- import wsdl : http://banka.mybluemix.net/services/AccountService?wsdl

- Open Assemble panel

- Remove existing **invoke** policy

- Drag and drop **getBalance** policy

- Edit **getBalance: input**

<img src="img/getBalanceInputEdit.png">

```
request.paramter.accountId				accountId 
none 							integer
````
<img src="img/getBalanceInput.png">


- map **getBalance: input**

```	
map property : accountId  with ----> arg0
````
<img src="img/getBalanceInputmapping.png">



- Edit **getBalance: output**

<img src="img/getBalanceOutputEdit.png">


```

message.body					ouput

application/json    			def/jsonResponse
```

- map **getBalance: output**

```	
map property : return  with ----> accountValue
````
<img src="img/getBalanceOutputmapping.png">

# Test

- Clic on the Test button

<img src="img/test.png">

- Add API to Product

- Publish product

- Test

***
> 
> Durant cette premiére partie, nous avons montrer les points suivants :
> * Créer une API
> * Intégrer un web service (SOAP) existant
> * Utiliser les composants de mapping de la solution API Connect
> * Créer un produit d'API
> * Tester une API
> 

# Update API

> Dans un deuxiéme temps, nous ajoutons la capacité de retourner la valeur d'une action pour une entreprise donnée. Pour cela nous allons intégrer une API tiers nommé **Quote** et disponible ici : http://dev.markitondemand.com/MODApis/Api/v2/doc 

- In the same API, Add the following Path

```
GET /getquote
```
(expand GET /getquote)

- Add Parameter

```
symbol 	Path	required	string
```
<img src="img/getQuoteParameters.png">

- Clic **Assemblage**

- Add **Condition switch**

<img src="img/getQuoteSwitch.png">

- Drag and Drop **invoke** policy for /getquote path

<img src="img/assembly1.png">

- Update url

http://$(Hostname)/MODApis/Api/v2/Quote?symbol=$(request.parameters.symbol)

<img src="img/updateinvoke.png">

- Go back to **Design** and Add **property**

```
Hostname dev.markitondemand.com
```
<img src="img/properties.png">

- Save

- Test 

<img src="img/test.png">

- Republish

- Enter **IBM** for parameter

<img src="img/getQuoteTest.png">

See xml result

<img src="img/getQuoteTestXML.png">

## Add XML to JSON

> Maintenant nous souhaitons retourner la réponse au format JSON plus que XML. Il existe un composant pour cela. Il suffit simplement de faire un Drag & Drop de la politique "XML to JSON"

- Drag and drop "XML to JSON" to getQuote flow

<img src="img/assembly2.png">

- Save
- Test

***
> 
> Durant cette deuxième partie, nous avons montrer les points suivants :
> * Mise à jours d'une API
> * Utiliser les composants de routage et de transformation de la solution API Connect
> * Tester une API
> 

# Back to the product

- Define Plan -> Limit 10/1 min with absolut limit

- Publish to Sandbox

- Goto Sanbox

- Move staging to Publish

- Go to Portal  (Montrer d'autre portails)

- Subscribe

- Test in the portal

- Test avec app mobile

- Show Analytic

***
> 
> Durant cette troisième partie, nous avons montrer les points suivants :
> * Définition d'un plan d'API
> * Publication, souscription à une API depuis le portail développeur.
> * Test depuis le Portail développeur.
> * Decouverte de la partie Analytics


Final version of API are available here : [all api] 

https://raw.githubusercontent.com/fdut/apic/master/soap2json/apis/bank_1.0.0.yaml

[all api]: apis "Title"

# Add OAuth Security to your API

> Dans cette partie nous allons montrer comment sécuriser une API

## Objective

In this lab, you will secure your Bank API to protect the resources exposed by **ThinkIBM**. Consumers of your API will be required to obtain and provide a valid OAuth token before they can invoke the Bank API.

You will learn:

+ How to create an OAuth 2.0 Provider, specifically using the Resource Owner Password grant type.
+ How to clone a new version of an API.
+ How to secure the new version of your API using an OAuth 2.0 Provider.

## Create OAuth API

1.  Return to the Draft (API Designer) tab in your browser.

1.  Go to API tab

1.  Click the `+ Add` button and select `OAuth 2.0 Provider API` from the menu.

1.  Specify the following properties and click the `Create API` button to continue.

    > Title: `oauth`
    > 
    > Name: `oauth`
    > 
    > Base Path: `/`
    > 
    > Version: `1.0.0`
	
**IMPORTANT** : Make sure the **Base Path** setting is correct.
 

1.  The API Editor will launch. If this is your first time using the API Editor, you will see an informational message. When you are ready to proceed, click the `Got it!` button to dismiss the message.  
	
    The API Editor opens to the newly created `oauth` API. The left hand side of the view provides shortcuts to various elements within the API definition: Info, Host, Base Path, etc. By default, the API Editor opens to the `Design` view, which provides a user-friendly way to view and edit your APIs.

1.  Use the palette on the left to navigate to the `OAuth 2` section.

    Over the next several steps, we will set up OAuth-specific options, such as client type (public vs confidential), valid access token scopes, supported authorization grant types, etc. The [OAuth 2.0 Specification](http://tools.ietf.org/html/rfc6749){:target="_blank"} has detailed descriptions of each of the properties we are configuring here.

1.  For the `Client type` field, click the drop down menu and select `Confidential`.

    ![](./img/oauth2-client-type.png)

1.  Three scopes were generated for you when the OAuth API Provider was generated: `scope1`, `scope2`, `scope3`.

1.  Modify the values for `scope1`, set the following fields:

    > Name: `inventory`
    > 
    > Description: `Access to bank API`

    Delete `scope2` and `scope3` by clicking the trashcan icons to the right of the scope definitions.
    
>Note :The scope defined here must be identical to the scope that we define later when telling the `bank` API to use this OAuth config. A common mistake is around case sensitivity. To avoid running into an error later, make sure that your scope is set to all **lowercase**.

   ![](./img/oauth2-scopes.png)

1.  We want to configure this provider to *only* support the Resource Owner Password Credentials grant type. Deselect the `Implicit`, `Application` and `Access Code` Grants, but leave `Password` checked.

    ![](./img/oauth2-grants.png)

1.  In the **Identity extraction** section, set the `Collect credentials using` drop-down menu to `Basic`.

    ![](./img/oauth2-id-extraction.png)

1.  In the **Authentication** section, set the following fields:

    > Authenticate application users using: `Authentication URL`
    > 
    > Authentication URL: `https://thinkibm-services.mybluemix.net/auth`
    
    ![](./img/oauth2-authentication.png)

1.  Scroll down to the **Tokens** section, turn off the `Enable revocation` option.
    
    ![](./img/outh2-tokens.png)

1.  Click the `Save` icon in the top right corner of the editor to save your changes.

    ![](./img/save.png)

1.  Click on the `<- All APis` link to return to the draft API list.

## Save as New Version

1.  Click on the `bank 1.0.0` API to open the API designer.

1.  At the top right-hand corner of the screen, click on the menu icon to expand additional options.

1.  Select the option to `Save as a new version`.

    ![](./img/save-new-version.png)

1.  Enter the new version number as `2.0.0` and click the `Save as new version` button.

    ![](./img/new-version-number.png)


## Apply an OAuth Security Policy

1.  Navigate to the `Security Definitions` section.

    Click the `+` icon in the **Security Definitions** section and select `OAuth` from the menu.
	
    ![](./img/api-new-security-definition.png)
	
    A new security definition is created for you, called `oauth-1 (OAuth)`.

1.  Scroll down to edit the newly created security definition.

    Set it to have the following properties:
	
    > Name: `oauth`
    > 
    > Description: `Resource Owner Password Grant Type`
    > 
    > Flow: `Password`
    > 
    > Token URL: `<Catalog Gateway Endpoint>/oauth2/token`

    The Token URL will be based upon the location of your Org and Space running on Bluemix public.
        <br/><br/>
    You can find your Gateway Endpoint URL by logging into Bluemix and launching the API Connect service, then navigate into your catalog (the default catalog created is `Sandbox`).
        <br/><br/>
    From there go into `Settings`, then choose the `Gateways` option from the side menu palette. Locate the **ENDPOINT**, simply copy and paste the contents into the Token URL field of your API OAuth settings, then append `/oauth2/token`.


    ![](./img/bmx-api-endpoint.png)
   
	{% include tip.html content="
	    You will need the Gateway Endpoint URL later. Save the Gateway Endpoing URL value to a text editor for easy access.
    %}
    
    ![](./img/api-oauth-settings-1.png)

1.  Click the `+` icon in the **Scopes** section to create a new scope. Set the following properties. Note the organization portion of the token URL will be different for each student.

    > Scope Name: `inventory`
    > 
    > Description: `Access to all bank resources`
	
    ![](./img/api-oauth-settings-2.png)

1.  Navigate to the `Security` section and check the `oauth (OAuth)` checkbox.  

    ![](./img/api-security.png)
	
1.  Save your changes.

    ![](./img/save.png)

1.  Click on the `<- All APis` link to return to the draft API list.

## Continue

Now you have a new version of the Inventory API that is secured using an OAuth provider. In the next lab, you will use the IBM API Connect Management Server's lifecycle controls to replace the running version 1.0.0 with the new version 2.0.0.


## Create a New Product

1.  Click on the `Products` tab in your API Connect Toolkit.

1.  Click on the `Add +` button and select `New Product`.

1.  Title this product `Secure Bank` and click on the `Create Product` button.

1.  Navigate to the APIs section. Click on the `+` button to add APIs to this Product.

1.  Select the `bank 2.0.0` and `oauth 1.0.0` APIs, then click the `Apply` button.

1.  Save the Product.

1. Publish the Product

## Replace the Old Product

1.  Switch to the **Dashboard** view:

    ![](./img/switch-apic-dashboard.gif)

1.  Click on the **Sandbox** catalog tile to open the catalog configuration screen.

1.  The `Products` tab will list all of the API Products that this Catalog is currently managing.

    Notice that the `bankproduct 1.0.0` product is in a `Published` state. 
    
    Also notice that your new `secure bank` product is available in a Staged state.
    
1.  Click on the menu options for the `secure bank` product and select the `Replace an existing product` option.

    ![](./img/replace-existing-product.png)

1.  Select the `bankproduct 1.0.0` product, since this is the one we are replacing. Then click the `Next` button.

1.  In order to maintain our consumers' entitlements, we need to migrate their plan subscriptions.

    Both of our Products have plans called `Default Plan`, here you will choose to move subscribers from the `bankproduct` Product's default plan to the `secure bank` Product's default plan.
    
    In the drop-down menu, select `Default Plan`, then click on the `Replace` button.
    
1.  The API Manager will take care of retiring the old product and publishing the new one.

## Test you API in Portal

1.  Open your API Portal in a new browser tab and log in with your developer account.

    If you closed the tab from earlier and don't have it bookmarked, you can follow these steps to find your API Portal URL:
    
    
1.  Click on the `API Products` tab.

1.  Notice that the old `bankproduct` product is no longer available. It has been replaced by your new `secure product` product.

1.  Click on the `secure product` product.


	Note: There is no need to re-subscribe your application! Using the `Replace` state change control migrated your subscription for you, so you're already entitled to the API's contained in the new Product's Default Plan - including the `oauth` API.

1.  Click on the `bank` API from the palette menu on the left.

1.  Select the `GET /getbalance/{accountId}` operation. Notice that we now have an additional OAuth security requirement defined.

1.  Scroll down to browse the invocation form.

1.  Select your subscribed application from the `Client ID` drop-down menu.

1.  Paste your secret into the `Client secret` field.

1.  In the `Username` and `Password` fields, you can enter any text.

Note: Recall that when we configured the OAuth API, we provided an Authentication URL as the method for validating the user credentials. The URL that we provided will respond back OK with any credentials.

1.  Click on the `Authorize` button to obtain an OAuth token.

    The API Portal will call out to the OAuth Token URL with your client credentials and user credentials.
    
    The OAuth API which you built in previous will intercept the request, validate the credentials, and generate a token.
    
1.  Click on the `Call operation` button to invoke the API. The request will include the OAuth bearer token in the `Authorization` header.

1.  To prove that the token is being validated, you can either remove or modify the contents of the `Access Token` field, then click the `Call operation` button again and see the `401 Unauthorized` error response.




# Micro Service (Optional)

In command line

	apic loopback

	name : **bankms**

<img src="img/apicloopback.png">

- cd bankms

```
	apic edit
```

- Create datasource

<img src="img/apicloopbackdatasource.png">

```
db in-memory-db   (stockage) localdb
```
<img src="img/apicloopbackdb.png">

- Create model
<img src="img/apicloopbackmodel.png">

```
account

accountId number id
agence number
name string

```
<img src="img/apicloopbackmodel1.png">
<img src="img/apicloopbackmodel2.png">

- Start Micro Service

<img src="img/apicloopbackstart.png">
<img src="img/apicloopbackrunning.png">

## Test

- Test microservice

<img src="img/apicloopbacktest.png">

<img src="img/apicloopbacktest1.png">
<img src="img/apicloopbacktest2.png">

- Post  (Generate)

<img src="img/apicloopbacktestresult.png">

- Get

<img src="img/apicloopbacktestget.png">
<img src="img/apicloopbacktestgetresult.png">



