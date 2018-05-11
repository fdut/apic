# Proof of Technology API Connect

## Lab 2 : Publication et Portail Developpeur

## Objectif

> Nous avons créé une ou plusieurs APIs. L'objectif est maintenant de publier ces APIs pour être ensuite utilisées par des applications tierces.

> Les composants API Gateway, API Manager et API Portal interviennent ici.


> - L'API Gateway expose les APIs aux consommateurs d'API 
> - L'API Manager déploit les produits d'APIs sur l'API Gateway et l'API Portal
> - L'API Portal permet aux développeurs d'application de souscrire aux Produits d'API.
 

## Publication (Fournisseur d'API)
---

>Pour cet exercice nous allons travailler directement dans l'environnement "Bac à Sable" (Sandbox) de l'API Manager sur IBM Cloud.

- Ouvrir le l'onglet "Brouillon" dans API Manager

![alt](img/draftfr.gif)

### Configurer votre produit d'API
---

Dans le contexte de API Connect un **Produit** contient les informations suivantes :

* Informations contractuelles	d'usage des APIs
* La visibilité vis à vis des développeurs d'application
* Les API disponibles via ce produits d'API
* Les Plans associés. Incluant les notions de quotas et de monétisations des APIs disponibles via ce Produits d'APIs
* Catégories relatives aux APIs de ce Produit.

![alt](img/plan2.png)

Ouvrir le produit d'API **bankproduct 1.0.0**

- Cliquer sur ->  **Brouillon** *(Draft)* > **Produits** *(Product)* >  **bankproduct 1.0.0**

Une fois le produit ouvert, vous pouvez parcourir l'ensemble des sections du produit et plus particuliérement les sections Visibilité, API, Plans.

> A noter : Un plan est créé par defaut avec une **Limites de débit (appels/intervalle de temps)** de 100 appels par Heure (avec dépassement autorisé). Vous pouvez ici créer & modifier un ou plusieurs nouveaux Plan.

Comme décrit dans le schéma ci-dessous le développeur d'API (Provider) développe et publie des APIs. Le développeur d'application (Consumer) souscrit à un Plan d'API pour consommer les APIs d'un produit d'API

![alt](img/subscription.png)


### Publier un produit d'API dans le catalogue SandBox 
---

> Un **catalogue** dans API Connect représente un ensemble de groupe de passerelles (Gateway) et d'un portail developpeur.
Cela ressemble à un environnement mais il contient aussi une dimension métier. Par exemple, les bons noms pour un catalogue sont Sandbox, Dev, Integration, Production, CRM (pour mes API CRM exposées à une population spécifique), etc ...

- Cliquer sur ->  **Brouillon** *(Draft)* > **Produits** *(Product)* >  **bankproduct 1.0.0**
- Cliquer ensuite sur l'icone **Publication** (le nuage en haut à droite) et selectionner le catalogue **Sandbox**
- A ce stade le produit d'API est publiée sur l'API Manager en état **pré-prodution**. Il n'est pas encore disponible sur le Portail Developpeur.
- Cliquer sur l'icone **>>** -> **Tableau de bord** *(Dashboard)* > **Sandbox**
- Changer l'état **Mise en pré-production** en **Publier** en cliquant sur l'icone avec les 3 points verticaux et en sélectionnant **Publier**

![alt](img/publish.gif)

Le produit d'API (qui inclut l'API **bank 1.0.0** et les rêgles d'utilisation des APIs contenues dans ce produit) est maintenant publié sur le Portail Developpeur et disponible pour les consommateurs d'API.

## le Portail Developpeur (Consommateur d'API)
---

En tant que développeur d'application, je souhaite utiliser l'API **bank 1.0.0** depuis mon application.

Pour cela ...

- Je dois me connecter au Portail Developpeur. 

>Pour connaitre l'url du Portail Developpeur : Cliquer sur l'icone **>>** > **Tableau de bord** *(Dashboard)* > **Sandbox** > **Paramêtres** *(Settings)*> **Portail** 

![alt](img/urlportal.png)

- Dans le Portail Developpeur, cliquez sur le menu **Produit d'API**
- Le produit **bankproduct (1.0.0)** doit être visible

![alt](img/produitdapi.png)

Pour souscrire à une API nous devons créer un compte développeur (Consommateur d'API)

- Pour cela cliquer sur **Create an account** (en haut à droite) et remplisser le formulaire.

- Un message est envoyé dans la boite mail avec un lien pour l'activation du compte.

Exemple de mail

```
De: IBM API Connect <ibmapi@us.ibm.com>

Bonjour,

Merci d'avoir souscrit à l'accès aux API depuis sb.
Pour activer votre compte, cliquez sur le lien suivant :

https://sb-fdutorg-sydneydev.developer.au.apiconnect.ibmcloud.com/?q=ibm_apim/activate/x&activationToken=eyJ1cmwiOiJodHRwczovL2RldmVsb3Blci5hdS5hcGljb25uZWN0LmlibWNsb3VkLmNvbS92MS9wb3J0YWwvdXNlcnMvNWFmMTc3MGEwY2YyM2I5OGJjOTA2YTEyL2FjdGl2YXRlIiwidXNlcm5hbWUiOiIhQkFTRTY0X1NJVl9FTkMhX0FhVDJJSGxZQVBEenE4NHE1VUR3YkdHREtCYUlmei9tSXNEblZ3SXhlUkw0QUFBQUVDRktqcVhyMC8xUDRKWnFua3pPTEU5UHFiVlA5VGhTQ1AyMUgzWFQ4c2xPIiwiYXV0aGVudGljYXRpb24iOnsidXNlcm5hbWUiOiI1YWYwNDVkZjBjZjIzYjk4YmM4ZmIwZWEvNWFmMDQ1ZTAwY2YyM2I5OGJjOGZiMGViL3BIOHFUNW1RMW5IMmRDM3ZOMmtIMXhPMHJWNGVFNWlPOHFFNnlKMWRHNyIsInBhc3N3b3JkIjoianBhR3V5TTNKTlRLRkw4Z1pCZmZlWDVSSllIZHJDcUp3YXNiRTRneDVNIn0sInByb3ZpZGVyQ29udGV4dCI6eyJvcmdJRCI6IjVhZjA0NWRmMGNmMjNiOThiYzhmYjBkZSIsImVudmlyb25tZW50SUQiOiI1YWYwNDVkZjBjZjIzYjk4YmM4ZmIwZWEifX0

```

- Une fois le compte activé, connectez-vous avec le compte développeur.
- Avant de souscrire à une ou plusieurs API, il faut déclarer une application consommatrice des APIs. 

> Lors de la création de l'Application, 2 clés sont générées : client id et client secret. Ces 2 clés sont trés importante, elle seront requises pour l'appel aux APIs auquelles on a souscrit.

>Cela permettra d'identifier l'application consommatrice d'une API et pourquoi pas en interdire l'accès.

- Cliquer sur **Créer une application** dans le menu et renseigner les valeurs suivantes :

Libéllé       | Valeur
------------- | -------------
Titre         | mobileapp
Description   | une application mobile

- Puis **Soumettre**

![alt](img/app.gif)

||| **IMPORTANT** 
> Copier/Coller les valeurs Client Id et Client Secret dans un editeur de texte. Ces valeurs seront nécéssaires pour consommer les APIs dans la suite des exercices.

Libéllé       | Valeur
------------- | -------------
client id     | *************
client secret | *************


Il est maintenant possible de souscrire aux APIs

- Cliquer sur **Produit d'API**
- Puis **bankproduct 1.0.0**
- Puis **S'abonner**
- Choisir l'application **mobileapp** et cliquer sur le bouton **S'abonner**

![alt](img/subscribe.gif)

Nous pouvons alors tester les APIs dans le Portail Developpeur.

- Cliquer dans le panneau a droite sur l'API **bank**
- Puis sur l'action **GET /getQuote**
- Sur le panneau de gauche, des exemples d'appel de l'API avec différents type de langage sont disponibles.
- Aller dans la section **Exemple de demande**
- Le **Client ID** a été renseigné par defaut.
- Renseigner le paramêtre **symbol** avec la valeur **IBM** et cliquer sur le bouton **Appeler une Opération**

Le resultat devrait être similaire à celui de l'exercice précédent (Lab 01)

![alt](img/testapi.gif)

## Résumé
---

Durant cet exercice nous avons vue comment publier un produit d'API, souscrire à un produit d'API dans le Portail Developpeur et enfin tester une API dans ce même portail.

## Continuer

Aller à - [Lab 3 - Routing et Service SOAP](/potfr/labs/lab03.md)



---
##### 2018 - frederic_dutheil@fr.ibm.com