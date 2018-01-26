
Exemple SOAP to RESP API (Create Your API in 5 min)
------------------------

https://developer.ibm.com/apiconnect/resources/exposing-soap-service-rest-api-hands-tutorial/

La banque A dispose d'un ensemble de services SOAP existants qu'elle souhaite exposer via des API afin de favoriser la croissance du marché des appareils mobiles et des appareils. L'équipe commerciale de Bank A sait qu'une meilleure présence des applications mobiles et périphériques améliorera leur image de marque et augmentera la satisfaction des clients.
L'équipe commerciale de Bank A a reçu les exigences de ses développeurs d'applications mobiles pour exposer ses services Web existants en tant qu'API JSON REST. Les charges utiles JSON sont plus petites que les mêmes données au format SOAP, ce qui réduit la quantité de bande passante requise pour les applications mobiles. JSON est aussi une donnée plus facile
format pour travailler avec JavaScript - un langage de programmation populaire pour le développement mobile.
Après avoir envisagé de créer sa propre solution de gestion d'API, l'équipe technologique de Bank A a plutôt décidé de mettre en œuvre une solution IBM API Management, qui lui permettra d'entrer rapidement sur le marché à un coût réduit.

http://banka.mybluemix.net/home/index.html

http://banka.mybluemix.net/services/AccountService?wsdl

# Create Product "bankproduct"


Name: **bankproduct**

# Create API


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
- Creation du service

	- import du wsdl : http://banka.mybluemix.net/services/AccountService?wsdl

- Open Assemble panel

-  Remove invoke policy

-  Drag and drop getBalance policy

- Edit input

<img src="img/getBalanceInputEdit.png">

```
request.paramter.accountId				accountId 
none 							integer
````
<img src="img/getBalanceInput.png">


- map input

```	
map property : accountId  with ----> arg0
````
<img src="img/getBalanceInputmapping.png">



- Edit output

<img src="img/getBalanceOutputEdit.png">


```

message.body					ouput

application/json    			def/jsonResponse
```

- map output

```	
map property : return  with ----> accountValue
````
<img src="img/getBalanceOutputmapping.png">

# Test (2 min)

<img src="img/test.png">

- Add API to Product

- Publish product

- Test



# Update API


- Add Quote API

 	-> Doc : http://dev.markitondemand.com/MODApis/Api/v2/doc

- Add Path

```
GET /getquote
```

- Add Parameter

```
symbol 	Path	required	string
```
<img src="img/getQuoteParameters.png">

- Assemblage

- Add condition switch

<img src="img/getQuoteSwitch.png">

- Add invoke for /getquote

<img src="img/assembly1.png">

- update url

http://$(Hostname)/MODApis/Api/v2/Quote?symbol=$(request.parameters.symbol)

<img src="img/updateinvoke.png">


- Add property

Hostname dev.markitondemand.com

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

- Drag and drop "XML to JSON" to getQuote flow

<img src="img/assembly2.png">

- Save
- Test

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




(Option)

# Micro Service

In command line

	apic loopback

	name : **bankms**

<img src="img/apicloopback.png">

- cd bankms

```
	apic edit
````

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
````
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



