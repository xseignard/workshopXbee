title: Au programme

- Découverte de Xbee
- Topologie des réseaux
- Configurer son Xbee
- Communiquer via Xbee: ordi <-> Arduino
- Communiquer via Xbee: Arduino <-> Arduino

---

title: Découverte de Xbee
subtitle:
class: segue dark nobackground

---

title: Découverte de Xbee
content_class: flexbox vcenter

Xbee est un module de communication sans fil reposant sur la norme [802.15.4](http://fr.wikipedia.org/wiki/802.15.4) et le protocole [ZigBee](http://fr.wikipedia.org/wiki/ZigBee).

Il s'agit d'une norme pour les réseaux sans fil personnels à faible consommation (LR-WPAN : Low Rate Wireless Personal Area Network)

![xbee](./images/xbee.png)

---

title: Découverte de Xbee

Les principales [caractéristiques](http://www.digi.com/products/wireless-wired-embedded-solutions/zigbee-rf-modules/point-multipoint-rfmodules/xbee-series1-module#specs) du XBee 1:

- portée : ~30m max en milieu urbain et intérieur, ~90m en extérieur dégagé
- faible débit : 250kbps
- faible consommation : ~50mA à 3.3V
- communication série ([UART](http://fr.wikipedia.org/wiki/UART))
- mise en place de réseaux point à point ou en étoile
- cout relativement peu élevé (~25€)
- sécurité : chiffrement AES 128 bits

---
title: Découverte de Xbee
content_class: flexbox vcenter

- communication directe depuis entrées/sorties analogiques et digitales
- I/O "line passing" : un DIO (configuré en input) sur un Xbee active un DIO (configuré en output) sur un autre Xbee

![xbee](./images/schemaXbee1.png)

<footer class="source">crédit schéma: <a href="http://daniel.menesplier.free.fr/Doc/MODULE%20%20XBEE.pdf">http://daniel.menesplier.free.fr/Doc/MODULE%20%20XBEE.pdf</a><br/><br/>source: p.14 du manuel</footer>


---

title: Topologie des réseaux
subtitle:
class: segue dark nobackground

---

title: Point à point
content_class: flexbox vcenter

![pointToPoint](./images/pointTopoint.png)

---

title: Point à point

- Mode par défaut
- Les deux Xbee doivent être sur le même réseau (PAN ID) et le même canal RF
- Envoi unicast: envoi sur une adresse spécifique du réseau.
	- le receveur envoie un message de confirmation de réception (ACK) à l'emmetteur
	- l'emmetteur renvoie le message jusqu'à 3 fois ou jusqu'à réception de l'ACK
- Envoi broadcast: envoi sur toutes les adresses du réseau.
	- pas d'ACK des receveurs
	- se fait via l'adresse de broadcast

<footer class="source">source: p.15 à p.19 du manuel</footer>

---

title: En étoile
content_class: flexbox vcenter

![star](./images/star.png)

---

title: En étoile

- Un coordinateur et des "end devices" s'y connectant
-

<footer class="source">source: p.15 à 17 du manuel</footer>

---

title: Nos premières commandes AT
subtitle: Configurer Xbee
class: segue dark nobackground

---

title: Nos premières commandes AT

Démarrer X-CTU, choisir le port série du Xbee puis cliquer sur l'onglet Terminal

![xctu](./images/xctu.png) ![xctu2](./images/xctu2.png)

---

title: Nos premières commandes AT

- `+++` : passer en mode commande AT, attendre le OK de retour
- `ATID` (+ param de 0000 à FFFF) : lit ou modifie l'ID du réseau Xbee (PAN ID)
- `ATMY` (+ param de 0000 à FFFF) : lit ou modifie l'adresse du Xbee
- `ATWR` : sauve les paramètres dans la mémoire du Xbee, attendre le OK de retour
- `ATRE` : restaure les paramêtres par défaut d'usine du XBee
- `ATCN` : quitte le mode configuration

---

title: Communiquer via Xbee
subtitle: ordi <-> Arduino
class: segue dark nobackground

---

title: Montage Xbee <-> Arduino

![arduinoXbee](./images/arduinoXbee.png)

---

title: Configuration du Xbee "ordi"

- Partir d'une configuration d'usine
- `ATID` à 1
- `ATMY` à 0
- Sauvegarder et quitter le mode commande

---

title: Configuration du Xbee "arduino"

- Partir d'une configuration d'usine
- `ATID` à 1
- `ATMY` à 1
- Sauvegarder et quitter le mode commande

---

title: Programmation de l'arduino

Ecrire un programme qui :

- allume la led 13 lorsque `1` est reçu
- éteind la led 13 lorsque `0` est reçu

Lorsque le Xbee est branché sur l'arduino cela condamne l'upload de programme. Débrancher les cables Rx et Tx de l'arduino avant l'upload d'un nouveau programme.

Taper ces 1 et 0 dans X-CTU, connecté au Xbee "ordi" et regarder la led s'allumer et s'éteindre.

Modifier le programme à votre guise.
---

title: Communiquer via Xbee
subtitle: Arduino <-> Arduino
class: segue dark nobackground

---

title: Pouet

