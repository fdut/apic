
Exemple SOAP to RESP API
------------------------

https://developer.ibm.com/apiconnect/resources/exposing-soap-service-rest-api-hands-tutorial/

La banque A dispose d'un ensemble de services SOAP existants qu'elle souhaite exposer via des API afin de favoriser la croissance du marché des appareils mobiles et des appareils. L'équipe commerciale de Bank A sait qu'une meilleure présence des applications mobiles et périphériques améliorera leur image de marque et augmentera la satisfaction des clients.
L'équipe commerciale de Bank A a reçu les exigences de ses développeurs d'applications mobiles pour exposer ses services Web existants en tant qu'API JSON REST. Les charges utiles JSON sont plus petites que les mêmes données au format SOAP, ce qui réduit la quantité de bande passante requise pour les applications mobiles. JSON est aussi une donnée plus facile
format pour travailler avec JavaScript - un langage de programmation populaire pour le développement mobile.
Après avoir envisagé de créer sa propre solution de gestion d'API, l'équipe technologique de Bank A a plutôt décidé de mettre en œuvre une solution IBM API Management, qui lui permettra d'entrer rapidement sur le marché à un coût réduit.


http://banka.mybluemix.net/home/index.html

http://banka.mybluemix.net/services/AccountService?wsdl

Create Product bankproduct
--------------------------

name: bankproduct

Create API
----------

name: bank

Add Path 
Get /getbalance/{accountId}

Parameter

accountId   Path  	integer

Create definition

name : jsonResponse

Propety :

accountValue   Type String

{
  “accountValue”: “76628730”
}

Creation du service

import du wsdl : http://banka.mybluemix.net/services/AccountService?wsdl

Assemblage

map input

request.paramter.accountId				accountId

none 									integer


map accountId ----> arg0

....

map output

message.body							ouput

application/json    					def/jsonResponse

(5 min) 

Test
----

Add API to Product

Publish product

Test

(2 min)

Update API
----------

Add Quote API

Doc : http://dev.markitondemand.com/MODApis/Api/v2/doc

Add Path

get /getquote

Parameter

symbol 	Path	required	string

Assemblage

Add condition switch

Add invoke for /getquote

http://$(Hostname)/MODApis/Api/v2/Quote?symbol=$(request.parameters.symbol)

Add property

Hostname dev.markitondemand.com

Save

Test 

Republish

Enter IBM for parameter

See xml result

Add XML to JSON

Test

Back to the product

Define Plan -> Limit 10/1 min with absolut limit

Publish to Sandbox

Goto Sanbox

Move staging to Publish

Go to Portal  (Montrer d'autre portails)

S'abonner

Test dans le portail

Test avec app mobile

Montrer Analytic




(Option)

Micro Service
------------

apic loopback

name : bankms
empty

cd bankms

apic edit

create datasource

db in-memory-db   (stockage) localdb

model

account

accountId number id
agence number
name string

test microservice

Post  (Generate)

Get





