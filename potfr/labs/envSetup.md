# Proof of Technology API Connect

## Préparation de l'environnement

## Créer un Compte IBM Cloud
---

1.  Lancer [https://console.bluemix.net/](https://console.bluemix.net/) dans votre navigateur internet.

1.  Cliquer sur le bouton `Créer un compte gratuit`:
 	
    ![](./img/createaccount.png)

1.  Compléter le formulaire et cliquer sur le bouton `Create Account`.

1.  Vous recevrez un e-mail vous demandant de confirmer votre adresse e-mail. Consulter votre e-mail et cliquer sur le lien `Confirm Account`.

1.  Une fois confirmé, vous serez invité à vous connecter. Cliquer sur le lien `Log in` et suivez les instructions pour entrer vos informations d'identification et vous connecter.

    ![](./img/confirmed.png)

## Configurez votre organisation Bluemix

1. Vous serez invité à **Créer une organisation**. Entrez un nom d'organisation (notez qu'il y a des suggestions pour vous). Sélectionnez également une région appropriée. Puis cliquer sur le bouton `Create`.
	
    ![](./img/create-org.png)

1.  Ensuite Vous serez invité à **Créer un espace**. Nommé votre espace `dev` et cliquer sur le bouton `Create`.

1.  Enfin, vous verrez la page ** Résumé ** où vous pourrez consulter vos entrées. Cliquez sur le bouton "Je suis prêt".
	
    ![](./img/im-ready.png)
    

## Parcourir le catalogue Bluemix et instancier le service API Connect

1.  Dans le coin supérieur droit de l'écran, sélectionnez le bouton `Catalogue` pour parcourir la liste des services IBM Cloud (Bluemix) disponibles.

    ![](./img/bmx-catalog.png)

1.  Une fois dans le catalogue, vous pouvez rechercher le service API Connect en entrant «API Connect» dans le champ de recherche situé à côté de l'icône en forme de loupe. Cliquez sur l'icône `API Connect` pour installer une nouvelle instance d'API Connect dans votre espace Bluemix.

    ![](./img/apic-service.png)

1.  Vous pouvez lire quelques détails sur le service. Sélectionnez le plan de tarification ** Lite ** et cliquez sur le bouton «Créer».
 
1.  Une fois le service API Connect associé à votre compte, vous serez automatiquement lancé dans l'écran API Brouillons.


## Configurer le portail développeur 

Maintenant que votre service API Connect est opérationnel, vous allez configurer le portail de développeur pour votre catalogue Sandbox.

1.  Cliquer sur l'icone >> > Tableau de bord (Dashboard) > Sandbox > Paramêtres (Settings)> Portail.  

    ![](./img/move2setupportal.gif)

1.  Dans la liste déroulante de configuration ** Select Portal **, sélectionnez l'option **IBM Developer Portal**.

    ![](./img/portalchoice.png)
    
1. **Sauvegarder** en cliquant sur l'icone en haut a droite 

![alt](img/save.png)

1.  Un écran contextuel vous indique que le processus de création de votre portail a commencé.

1.  La création de votre portail de développeur peut prendre un certain temps. Vous n'avez donc pas besoin d'attendre la création du site portail.

    Vous recevrez un e-mail lorsque votre site portail sera opérationnel.

## Continuer

Aller à - [Lab 1 - Exposition d'une API Rest via API Connect](/potfr/labs/lab01.md)

---
##### 2018 - frederic_dutheil@fr.ibm.com