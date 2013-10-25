title: Au programme

- Découverte de XBee
- Modes de communication
- Configurer son XBee
- Communiquer via XBee: ordi <-> Arduino
- Communiquer via XBee: Arduino <-> Arduino
- Communiquer via XBee: Arduino vers plusieurs Arduino
- Communiquer via XBee: Arduino <-> Web
- Travaux de groupe

---

title: Découverte de XBee
subtitle:
class: segue dark nobackground

---

title: Découverte de XBee
content_class: flexbox vcenter

XBee est un module de communication sans fil reposant sur la norme [802.15.4](http://fr.wikipedia.org/wiki/802.15.4) et le protocole [ZigBee](http://fr.wikipedia.org/wiki/ZigBee).

Il s'agit d'une norme pour les réseaux sans fil personnels à faible consommation (LR-WPAN : Low Rate Wireless Personal Area Network)

![xbee](./images/xbee.png)

---

title: Découverte de XBee

Les principales [caractéristiques](http://www.digi.com/products/wireless-wired-embedded-solutions/zigbee-rf-modules/point-multipoint-rfmodules/xbee-series1-module#specs) du XBee 1:

- portée : ~30m max en milieu urbain et intérieur, ~90m en extérieur dégagé
- faible débit : 250kbps
- faible consommation : ~50mA à 3.3V
- communication série ([UART](http://fr.wikipedia.org/wiki/UART))
- mise en place de réseaux point à point ou en étoile
- cout relativement peu élevé (~25€)
- sécurité : chiffrement AES 128 bits

---
title: Découverte de XBee
content_class: flexbox vcenter

- communication directe depuis entrées/sorties analogiques et digitales
- I/O "line passing" : un DIO (configuré en input) sur un XBee active un DIO (configuré en output) sur un autre XBee

![xbee](./images/schemaXbee1.png)

<footer class="source">crédit schéma: <a href="http://daniel.menesplier.free.fr/Doc/MODULE%20%20XBEE.pdf">http://daniel.menesplier.free.fr/Doc/MODULE%20%20XBEE.pdf</a><br/><br/>source: p.14 du manuel</footer>


---

title: Modes de communication
subtitle:
class: segue dark nobackground

---

title: Point à point
content_class: flexbox vcenter

![pointToPoint](./images/pointTopoint.png)

---

title: Point à point

- Mode par défaut
- Les deux XBee doivent être sur le même réseau (PAN ID) et le même canal RF
- Envoi sur une adresse spécifique du réseau.
	- le receveur envoie un message de confirmation de réception (ACK) à l'emmetteur
	- l'emmetteur renvoie le message jusqu'à 3 fois ou jusqu'à réception de l'ACK

<footer class="source">source: p.15 à p.19 du manuel</footer>

---

title: API
content_class: flexbox vcenter

![star](./images/star.png)

---

title: API

- Les deux XBee doivent être sur le même réseau (PAN ID) et le même canal RF
- L'adresse du destinataire se trouve dans le message lui même
- Possibilité de communiquer avec plusieurs autres XBees
- Possibilité simple d'envoyer un message à plusieurs XBees en même temps (broadcast)

<footer class="source">source: <a href="http://code.google.com/p/xbee-api/wiki/WhyApiMode">http://code.google.com/p/xbee-api/wiki/WhyApiMode</a></footer>

---

title: Nos premières commandes AT
subtitle: Configurer XBee
class: segue dark nobackground

---

title: Nos premières commandes AT

Démarrer X-CTU, choisir le port série du XBee puis cliquer sur l'onglet Terminal

![xctu](./images/xctu.png) ![xctu2](./images/xctu2.png)

---

title: Nos premières commandes AT

- `+++` : passer en mode commande AT, attendre le OK de retour
- `ATID` (+ param de 0000 à FFFF) : lit ou modifie l'ID du réseau XBee (PAN ID)
- `ATMY` (+ param de 0000 à FFFF) : lit ou modifie l'adresse du XBee
- `ATDL` (+ param de 0000 à FFFF) : lit ou modifie l'adresse du XBee de destination
- `ATWR` : sauve les paramètres dans la mémoire du XBee, attendre le OK de retour
- `ATRE` : restaure les paramêtres par défaut d'usine du XBee
- `ATCN` : quitte le mode configuration

---

title: Communiquer via XBee
subtitle: ordi <-> Arduino
class: segue dark nobackground

---

title: Montage XBee <-> Arduino

![arduinoXBee](./images/arduinoXbee.png)

---

title: Configuration du XBee "ordi"

- Partir d'une configuration d'usine
- `ATID` à 1
- `ATMY` à 1
- `ATDL` à 2
- Sauvegarder et quitter le mode commande

---

title: Configuration du XBee "arduino"

- Partir d'une configuration d'usine
- `ATID` à 1
- `ATMY` à 2
- `ATDL` à 1
- Sauvegarder et quitter le mode commande

---

title: Programmation de l'arduino

Ecrire un programme qui :

- allume la led 13 lorsque `1` est reçu
- éteind la led 13 lorsque `0` est reçu

Lorsque le XBee est branché sur l'arduino cela condamne l'upload de programme. Débrancher les cables Rx et Tx de l'arduino avant l'upload d'un nouveau programme.

Taper ces 1 et 0 dans X-CTU, connecté au XBee "ordi" et regarder la led s'allumer et s'éteindre.

Modifier le programme à votre guise.
---

title: Communiquer via XBee
subtitle: Arduino <-> Arduino
class: segue dark nobackground

---

title: Montage

Ajouter un bouton sur la PIN 3, pour les deux Arduino.

![arduinoArduino](./images/arduinoArduino.png)

---

title: Configuration

Les deux XBees sont déjà configurés pour communiquer entre eux grace à l'exercice précédent.

Si ce n'est pas le cas reprendre la configuration précédente.

---

title: Programmation

Ecrire un programme qui :

- envoie `1` lorsque le boutton est pressé
- allume la led 13 lorsque `1` est reçu

Uploader le même programme sur les deux Arduinos. (N'oubliez pas de débrancher les XBee!!)

---

title: Communiquer via XBee
subtitle: Plus de deux XBee
class: segue dark nobackground

---

title: Plus de deux XBee

La communication "point à point" comme présentée précedemment ne permet pas de choisir le destinataire des messages envoyés par le XBee.

Ce type de communication permet simplement de relayer des messages "série" d'un XBee à un autre.

Pour palier à celà, il existe le mode "API" qui permet de spécifier le destinataire d'un message XBee, à l'image d'un paquet "internet" destiné à une adresse IP.

---

title: Utiliser une librairie Arduino

Le format des messages XBee en mode "API" sont spécifiques et complexes. Au lieu de les "créer" à la main, nous pouvons utiliser une librairie qui nous simplifie le travail.

Pour les curieux, vous pouvez toujours aller voir à quoi ressemble une trame XBee [ici](http://rubenlaguna.com/wp/2009/03/12/example-of-xbee-api-frames/)

Nous allons utiliser la librairie [xbee-arduino](http://code.google.com/p/xbee-arduino/).

- Téléchargez la : [http://xbee-arduino.googlecode.com/files/xbee-arduino-0.4-softwareserial-beta.zip](http://xbee-arduino.googlecode.com/files/xbee-arduino-0.4-softwareserial-beta.zip)
- Et placez le dossier XBee contenu dans l'archive dans le dossier `libraries` de votre sketchbook Arduino.

---

title: Configurer un XBee en mode API

Dans X-CTU executez les commandes suivantes :

- `+++`
- Restaurer les paramètres d'origine: `ATRE`
- Activer le mode API : `ATAP2`
- Adresse du XBee, chacun une différente : `ATMY1`, `ATMY2`, etc.
- Adresse du réseau : `ATID1111`
- Canal de radio fréquence : `ATCH0C` (c'est un zéro!)
- Sauver la conf : `ATWR`
- Redémarrer le XBee : `ATFR`

---

title: Programmer l'Arduino

A partir du montage et code précédent (un bouton et une led).

Configurer la librairie Xbee:
<pre class="prettyprint" data-lang="arduino">
&#35;include &lt;XBee.h&gt;
XBee xbee = XBee();
Rx16Response rx16 = Rx16Response();
Tx16Request tx;
uint8_t message[] = {0};
uint16_t adress = 0x0001;
</pre>

---
title: Programmer l'Arduino

Ecouter les messages XBee en lieu et place du port série
<pre class="prettyprint" data-lang="arduino">
xbee.readPacket();
  if (xbee.getResponse().isAvailable()) {
    if (xbee.getResponse().getApiId() == RX_16_RESPONSE) {
      xbee.getResponse().getRx16Response(rx16);
      char data = rx16.getData(0);
</pre>

Envoyer un message XBee API en lieu et place d'un message série
<pre class="prettyprint" data-lang="arduino">
tx = Tx16Request(adress, message, sizeof(message));
xbee.send(tx);
</pre>

---

title: Programmer l'Arduino

Choisissez une adresse parmis celles disponible sur le réseau pour faire clignoter la led d'un autre XBee.

---

title: Communiquer via XBee
subtitle: Arduino <-> Web
class: segue dark nobackground

---

title: Principe général

L'idée est de recevoir les données du Xbee "ordi" dans son programme et de les transférer sur le web. Et inversement.

Il faut donc :

- écouter/communiquer sur le port "série" (USB) sur lequel est connecté le XBee
- traiter les infos reçues
- les "servir" dans une page web, ce qui implique la création d'un serveur

Pleins de langages permettent de faire cela, nous utiliserons Node.js car :

- syntaxe assez facile à prendre en main
- plein de librairies utiles pour ce cas
- gestion évenementielle très adaptée (boucle infinie vs. évènements)

---

title: Ecouter le port série

Créer un dossier et s'y placer en ligne de commande, puis installer la librairie d'écoute du port série.
<pre class="prettyprint" data-lang="cmd">
cd /mon/dossier
npm install serialport
</pre>


Il faut que les XBee soient configurés mode "point à point".
Repartir du programme Arduino `arduinoArduino` et créer un petit programme : `test.js`

<pre class="prettyprint" data-lang="node.js">
var SerialPort = require('serialport').SerialPort,
	xbee = new SerialPort('YOURPORT'); // spécifier votre port

xbee.on('data', function(data) {
	console.log(data); // un buffer? décodez le avec data.toString()
});
</pre>

---

title: Travaux de groupe
subtitle: champ libre, ou presque!
class: segue dark nobackground

---

title: Servir les données en temps réel

HTML5 arrive à notre secours! Grace aux WebSockets un serveur peut communiquer en temps réel sans que l'utilisateur doive recharger la page web!

Au programme:

- Arduino et XBee en mode point à point
- Communication serveur/client
- Node.js, JavaScript, HTML5 et WebSockets

Voir l'exemple arduinoWeb

---

title: Controler le monde réel depuis le web

Depuis la page web nous allons requêter le serveur pour que celui-ci transmette la commande voulue au XBee, afin d'allumer lampes et autres dispositifs électriques.

Au programme:

- Arduino et XBee en mode point à point
- Communication serveur/client
- Node.js, JavaScript, HTML5 et WebSockets

Voir l'exemple web

---

title: Créer une console de commande

Depuis un Arduino, nous allons commander un ensemble de lampes et autres dispositifs électriques

Au programme:

- Arduino et XBee en mode API

Voir les exemples xbeeApi