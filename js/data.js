
	let actifs = [
	{ id: 1,
	nom: "Thales Avionics – systèmes de navigation",
	categorie: "Avionique",
	probabilite: 4,
	impact: 5,
	menace:"Compromission des systèmes embarqués via mise à jour logicielle malveillante",
	recommandation:"Imposer une signature cryptographique sur toutes les mises à jour et auditer les accès fournisseurs"
},
	{ id: 2,
	nom: "Safran – calculateurs de vol",
	categorie: "Avionique",
	probabilite: 3,
	impact: 5,
	menace:"Falsification des données de vol par injection de code dans le firmware",
	recommandation: "Mettre en place un environnement de développement isolé et des tests d'intégrité systématiques"
},
{ id: 3,
	nom: "Airbus Defense & Space - Si interne",
	categorie: "SI / Données",
	probabilite: 4,
	impact: 4,
	menace: "Exfiltration de données confidentielles de programmes classifiés via phishing ciblé",
	recommandation: "Cartographier tous les sous-traitants de rang 2 et 3, exiger une conformité NIS2"
},
{
	id:4,
	nom: "Dassault Aviation - chaine logistique",
	categorie: "Supply chain",
	probabilite: 3,
	impact: 4,
	menace: "Attaque sur un sous-traitant de rang 2 pour rebondir vers les systèmes Dassault",
	recommandation: "Cartographier tous les sous-traitant de rang 2 et 3, exiger une conformité NIS2",
},
{
	id: 5,
	nom: "MTU Aero Engines - maitenance moteurs",
	categorie: "Maitenance",
	probabilite: 2,
	impact: 4,
	menace: "Accès non autorisé aux outils de diagnostic via connexion distante non sécurisée",
	recommandation: "Segmenter le réseau de maintenance et imposer un VPN avec authentification forte"
},
{
	id: 6,
	nom: "Sopra Steria - ERP supply chain",
	categorie: "Logiciel embarqué",
	probabilite: 3,
	impact: 3,
	menace: "Ransomware ciblant les outils de conception des pièces composites",
	recommandation: "Sauvegarde hors-ligne quotidiennes et plan de continuité d'activité testé"
},
{
	id: 7,
	nom: "Hexcel – composites structures",
	categorie : "Supply chain",
	probabilite : 2,
	impact: 3,
	menace: "Ransomware ciblant les outils de conception des pièces composites",
	recommandation: "Sauvegardes hors-ligne quotidiennes et plan de continuité d'activité testé",
},
{
	id: 8,
	nom: "Naval Group - systèmes défense navale",
	categorie: "SI / Données",
	probabilite: 4,
	impact: 5,
	menace: "Espionnage industriel via un prestataire ayant accès aux plans de systèmes classifiés",
	recommandation: "Cloisonner les accès par habilitation et journaliser tous les accès aux documents sensibles"
},
{
	id: 9,
	nom :"Liebherr Aerospace – systèmes climatisation",
	categorie : "Maintenance",
	probabilite : 2,
	impact : 2,
	menace : "Accès physique non contrôlé aux interfaces de maintenance en atelier",
	recommandation : "Mettre en place des contrôles d'accès physiques et des journaux d'intervention signés"
}
]
