# Zestes de France-IOI

Cette extension a pour but d'améliorer l'interface utilisateur de la plateforme [France-IOI](http://www.france-ioi.org/), en changeant son style via une feuille CSS et en apportant quelques modifications en JavaScript. Elle apporte également quelques fonctionnalités pratiques.

## Installer l'extension

- Sur Chrome : [depuis le Chrome Web Store](https://chrome.google.com/webstore/detail/zestes-de-france-ioi/cicodgkglkobbopicpidlbgeohjjjapc) 
- Sur Firefox : [depuis Firefox Add-ons](https://addons.mozilla.org/fr/firefox/addon/zestes-de-france-ioi/) 

## Fonctionnalités

- Amélioration du style du site, avec une apparence librement inspirée de celle de [Zeste de Savoir](https://zestedesavoir.com/).
- Changement de toutes les icônes du site par des icônes SVG correspondant à un design plus moderne.
- Conservation de l'onglet lors de l'actualisation sur la page « Cours et problèmes » et pour le sujet (il est sauvegardé dans l'URL). Cette fonctionnalité très pratique avait disparu, elle est remise par cette extension.
- Sauvegarde et consultation des sujets hors ligne.
- Suivi d'utilisateurs.
- Boite à outils améliorée pour formater ses messages sur le forum.

## Modifier l'extension

L'extension fonctionne avec Chrome et Firefox. Pour l'empaqueter, il suffit d'utliser `web-ext` (installable avec npm) :

```
web-ext build
```

## Licence

[Licence MIT](LICENSE)
