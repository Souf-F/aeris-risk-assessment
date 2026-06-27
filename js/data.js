// =========================================================
// AERIS — data.js
// Scénario aéronautique & défense
// =========================================================

// ---------------------------------------------------------
// Tableau principal des actifs
// ---------------------------------------------------------
let actifs = [
  {
    id: 1,
    nom: "Thales Avionics – systèmes de navigation",
    categorie: "Avionique",
    probabilite: 4,
    impact: 5,
    menace: "Compromission des systèmes embarqués via mise à jour logicielle malveillante",
    recommandation: "Imposer une signature cryptographique sur toutes les mises à jour et auditer les accès fournisseurs"
  },
  {
    id: 2,
    nom: "Safran – calculateurs de vol",
    categorie: "Avionique",
    probabilite: 3,
    impact: 5,
    menace: "Falsification des données de vol par injection de code dans le firmware",
    recommandation: "Mettre en place un environnement de développement isolé et des tests d'intégrité systématiques"
  },
  {
    id: 3,
    nom: "Airbus Defense & Space – SI interne",
    categorie: "SI / Données",
    probabilite: 4,
    impact: 4,
    menace: "Exfiltration de données confidentielles de programmes classifiés via phishing ciblé",
    recommandation: "Déployer une solution DLP, renforcer la MFA et former les équipes aux attaques de spear-phishing"
  },
  {
    id: 4,
    nom: "Dassault Aviation – chaîne logistique",
    categorie: "Supply chain",
    probabilite: 3,
    impact: 4,
    menace: "Attaque sur un sous-traitant de rang 2 pour rebondir vers les systèmes Dassault",
    recommandation: "Cartographier tous les sous-traitants de rang 2 et 3, exiger une conformité NIS2"
  },
  {
    id: 5,
    nom: "MTU Aero Engines – maintenance moteurs",
    categorie: "Maintenance",
    probabilite: 2,
    impact: 4,
    menace: "Accès non autorisé aux outils de diagnostic via connexion distante non sécurisée",
    recommandation: "Segmenter le réseau de maintenance et imposer un VPN avec authentification forte"
  },
  {
    id: 6,
    nom: "Sopra Steria – ERP supply chain",
    categorie: "Logiciel embarqué",
    probabilite: 3,
    impact: 3,
    menace: "Vulnérabilité non patchée dans l'ERP exploitée pour perturber les commandes fournisseurs",
    recommandation: "Mettre en place un plan de gestion des correctifs mensuel et des tests de pénétration trimestriels"
  },
  {
    id: 7,
    nom: "Hexcel – composites structures",
    categorie: "Structures & Matériaux",
    probabilite: 2,
    impact: 3,
    menace: "Ransomware ciblant les outils de conception des pièces composites",
    recommandation: "Sauvegardes hors-ligne quotidiennes et plan de continuité d'activité testé"
  },
  {
    id: 8,
    nom: "Naval Group – systèmes défense navale",
    categorie: "SI / Données",
    probabilite: 4,
    impact: 5,
    menace: "Espionnage industriel via un prestataire ayant accès aux plans de systèmes classifiés",
    recommandation: "Cloisonner les accès par habilitation et journaliser tous les accès aux documents sensibles"
  },
  {
    id: 9,
    nom: "Liebherr Aerospace – systèmes climatisation",
    categorie: "Maintenance",
    probabilite: 2,
    impact: 2,
    menace: "Accès physique non contrôlé aux interfaces de maintenance en atelier",
    recommandation: "Mettre en place des contrôles d'accès physiques et des journaux d'intervention signés"
  }
]

// ---------------------------------------------------------
// Bibliothèque de recommandations par catégorie
// Utilisée pour pré-remplir les nouveaux actifs ajoutés
// ---------------------------------------------------------
const recommandations = {

  // ── Techniques métier ──────────────────────────────────
  "Avionique": {
    menace: "Compromission des systèmes embarqués via mise à jour logicielle malveillante ou accès non autorisé au firmware",
    recommandation: "Imposer une signature cryptographique sur toutes les mises à jour, exiger une certification DO-326A, auditer les accès fournisseurs annuellement"
  },
  "Logiciel embarqué": {
    menace: "Injection de code malveillant dans le firmware lors du développement ou de la chaîne de livraison logicielle",
    recommandation: "Mettre en place un environnement de développement isolé, des tests d'intégrité systématiques (SBOM) et une revue de code sécurisé obligatoire"
  },
  "Propulsion": {
    menace: "Sabotage des systèmes de contrôle moteur via accès distant aux outils de diagnostic embarqués",
    recommandation: "Isoler les réseaux de contrôle moteur, imposer une authentification forte sur tous les accès distants, journaliser chaque intervention"
  },
  "Capteurs & Radar": {
    menace: "Altération ou brouillage des données capteurs via injection de signaux parasites ou compromission du traitement du signal",
    recommandation: "Mettre en place une détection d'anomalie sur les flux capteurs, chiffrer les communications entre capteurs et systèmes de traitement"
  },
  "Communication": {
    menace: "Interception ou brouillage des liaisons de communication air-sol, datalink ou satellite par un acteur étatique ou criminel",
    recommandation: "Chiffrer toutes les liaisons de données, mettre en place des protocoles de communication de secours et tester régulièrement la résilience"
  },
  "Navigation": {
    menace: "Usurpation de signal GPS (GPS spoofing) ou attaque sur les systèmes de navigation inertielle pour induire des erreurs de trajectoire",
    recommandation: "Déployer des systèmes de navigation hybrides redondants (GPS + INS), mettre en place une détection d'anomalie de trajectoire"
  },
  "Armement": {
    menace: "Compromission des systèmes de guidage ou des chaînes de commandement des systèmes d'armes via intrusion réseau",
    recommandation: "Appliquer un cloisonnement strict des réseaux d'armement, exiger une habilitation Secret Défense pour tous les accès, audits de sécurité semestriels"
  },
  "Structures & Matériaux": {
    menace: "Ransomware ciblant les outils de conception CAO/FAO des pièces structurelles ou vol de propriété intellectuelle",
    recommandation: "Sauvegardes hors-ligne quotidiennes, segmentation réseau des postes de conception, chiffrement des fichiers de propriété intellectuelle"
  },
  "Simulation & Entrainement": {
    menace: "Compromission des simulateurs de vol pour altérer la formation des pilotes ou exfiltrer des données tactiques classifiées",
    recommandation: "Isoler les réseaux de simulation, contrôler strictement les accès physiques et logiques, chiffrer les scénarios d'entraînement sensibles"
  },

  // ── Supply chain & production ──────────────────────────
  "Supply chain": {
    menace: "Attaque sur un sous-traitant de rang 2 ou 3 pour rebondir vers les systèmes critiques de l'avionneur",
    recommandation: "Cartographier tous les sous-traitants jusqu'au rang 3, exiger la conformité NIS2, réaliser des audits tiers annuels et des questionnaires de maturité cyber"
  },
  "Maintenance": {
    menace: "Accès non autorisé aux outils de diagnostic ou aux interfaces de maintenance via connexion distante non sécurisée",
    recommandation: "Segmenter le réseau de maintenance, imposer un VPN avec MFA, journaliser tous les accès distants et former les techniciens aux bonnes pratiques cyber"
  },
  "Assemblage final": {
    menace: "Intrusion sur le réseau de la ligne d'assemblage final (FAL) pour perturber la production ou dérober des plans de fabrication",
    recommandation: "Segmenter strictement le réseau FAL des systèmes bureautiques, déployer une surveillance OT en temps réel, contrôler tous les accès physiques"
  },
  "Logistique": {
    menace: "Compromission du système de gestion logistique pour perturber les livraisons de pièces critiques ou falsifier les traçabilités",
    recommandation: "Mettre en place une authentification forte sur le WMS, surveiller les anomalies de commandes, chiffrer les échanges EDI avec les partenaires"
  },
  "Qualité & Certification": {
    menace: "Falsification des données de contrôle qualité ou des rapports de certification pour masquer des non-conformités",
    recommandation: "Horodater et signer cryptographiquement tous les rapports qualité, restreindre les droits de modification, auditer les accès aux bases de données qualité"
  },

  // ── Numérique & données ────────────────────────────────
  "SI / Données": {
    menace: "Exfiltration de données confidentielles ou classifiées via phishing ciblé, insider threat ou compromission d'un prestataire",
    recommandation: "Déployer une solution DLP, renforcer la MFA sur tous les accès sensibles, cloisonner les données par habilitation et former les équipes au spear-phishing"
  },
  "Infrastructure IT/OT": {
    menace: "Attaque sur les systèmes SCADA ou les automates industriels pour perturber la production ou provoquer des dommages physiques",
    recommandation: "Segmenter les réseaux IT et OT, déployer un SOC industriel, appliquer les correctifs de sécurité OT et surveiller les communications réseau en temps réel"
  },
  "Cloud & SaaS": {
    menace: "Compromission d'un service cloud ou SaaS hébergeant des données sensibles via des identifiants volés ou une mauvaise configuration",
    recommandation: "Appliquer le principe du moindre privilège, activer la MFA sur tous les comptes cloud, auditer régulièrement les configurations et chiffrer les données au repos"
  },
  "Intelligence Artificielle": {
    menace: "Empoisonnement des données d'entraînement ou manipulation des modèles IA pour altérer les décisions opérationnelles critiques",
    recommandation: "Mettre en place une validation humaine systématique des décisions IA critiques, sécuriser les pipelines de données, auditer les modèles régulièrement"
  },
  "Cybersécurité": {
    menace: "Compromission du prestataire de cybersécurité lui-même, donnant un accès privilégié à l'ensemble des systèmes surveillés",
    recommandation: "Appliquer le principe du moindre privilège aux accès SOC, journaliser toutes les actions des prestataires, réaliser des audits indépendants annuels"
  },

  // ── RH & accès ────────────────────────────────────────
  "RH / Habilitations": {
    menace: "Accès non révoqué d'un employé ou prestataire ayant quitté l'organisation, exploité pour exfiltrer des données ou saboter des systèmes",
    recommandation: "Automatiser la révocation des accès au départ, réaliser des revues d'habilitation trimestrielles, journaliser tous les accès aux systèmes sensibles"
  },
  "Prestataires & Consultants": {
    menace: "Accès excessif d'un consultant externe aux systèmes d'information internes, exploité intentionnellement ou via compromission de son poste",
    recommandation: "Appliquer le principe du moindre privilège, fournir des postes dédiés aux prestataires, surveiller leurs activités et révoquer immédiatement les accès en fin de mission"
  },
  "Formation": {
    menace: "Exfiltration de données opérationnelles ou tactiques via les systèmes de formation ayant accès aux environnements de production",
    recommandation: "Isoler les environnements de formation de la production, utiliser des données anonymisées pour la formation, contrôler les accès des formateurs externes"
  },

  // ── Réglementaire & gouvernance ────────────────────────
  "Conformité & Audit": {
    menace: "Accès non contrôlé d'un auditeur externe aux systèmes critiques, avec risque d'exfiltration ou d'introduction de vulnérabilités",
    recommandation: "Définir un périmètre d'audit strict, superviser toutes les sessions d'audit, journaliser les accès et exiger des engagements de confidentialité renforcés"
  },
  "Juridique & Contrats": {
    menace: "Fuite de données contractuelles sensibles (prix, clauses techniques, propriété intellectuelle) via compromission du système de gestion documentaire",
    recommandation: "Chiffrer tous les documents contractuels sensibles, restreindre les accès par besoin d'en connaître, tracer tous les accès et téléchargements"
  },

  // ── Fallback ───────────────────────────────────────────
  "Autre": {
    menace: "À définir selon le contexte spécifique de cet actif",
    recommandation: "Réaliser une analyse de risque spécifique selon la méthode EBIOS RM et consulter un expert en cybersécurité du secteur"
  }
}