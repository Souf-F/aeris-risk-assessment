// =========================================================
// FONCTION 1 — Calcule le score d'un actif
// score = probabilite × impact (entre 1 et 25)
// =========================================================
function getScore(actif) {
  return actif.probabilite * actif.impact
}

// =========================================================
// FONCTION 2 — Détermine le niveau de risque selon le score
// ≤ 6 = low (faible) | 7-14 = mid (moyen) | ≥ 15 = high (critique)
// =========================================================
function getNiveau(score) {
  if (score <= 6)
    return "low"
  else if (score > 6 && score <= 14)
    return "mid"
  else
    return "high"
}

// =========================================================
// FONCTION 3 — Sauvegarde le tableau actifs dans le localStorage
// =========================================================
function sauvegarder() {
  localStorage.setItem("actifs", JSON.stringify(actifs))
}

// =========================================================
// FONCTION 4 — Génère la matrice de risques 5x5
// Chaque case est colorée selon probabilite × impact
// =========================================================
function renderMatrice() {
  const matrice = document.getElementById("matrice")
  matrice.innerHTML = ""

  // On parcourt les probabilités de 5 à 1 (haut vers bas)
  for (let p = 5; p >= 1; p--) {
    // On parcourt les impacts de 1 à 5 (gauche vers droite)
    for (let i = 1; i <= 5; i++) {
      const score = p * i
      const niveau = getNiveau(score)

      // On crée une case
      const cell = document.createElement("div")
      cell.className = `matrice__cell matrice__cell--${niveau}`

      // On marque les cases qui correspondent à un actif existant
      actifs.forEach(function(actif) {
        if (actif.probabilite === p && actif.impact === i) {
          cell.classList.add("matrice__cell--active")
          cell.title = actif.nom
        }
      })

      matrice.appendChild(cell)
    }
  }
}

// =========================================================
// FONCTION 5 — Génère et affiche toutes les cartes d'actifs
// =========================================================
function render() {

  // On récupère le conteneur HTML qui accueille les cartes
  const container = document.getElementById("assets-list")

  // On vide le conteneur avant de le reremplir
  container.innerHTML = ""

  // On parcourt chaque actif pour créer sa carte HTML
  actifs.forEach(function(actif) {

    // On calcule le score et le niveau de cet actif
    const score = getScore(actif)
    const niveau = getNiveau(score)

    // On construit le HTML de la carte avec les données de l'actif
    const html = `<div class="asset-card asset-card--${niveau}">

      <!-- En-tête : nom, catégorie, badge score, bouton supprimer -->
      <div class="asset-card__head">
        <div>
          <span class="asset-card__name">${actif.nom}</span>
          <span class="asset-card__category">${actif.categorie}</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="badge badge--${niveau}">Score : ${score}</span>
          <button class="asset-card__delete" id="delete-${actif.id}">Supprimer</button>
        </div>
      </div>

      <!-- Curseur probabilité -->
      <div class="asset-card__slider">
        <label>Probabilité</label>
        <input type="range" min="1" max="5" value="${actif.probabilite}" id="prob-${actif.id}">
        <span class="asset-card__slider-value">${actif.probabilite}</span>
      </div>

      <!-- Curseur impact -->
      <div class="asset-card__slider">
        <label>Impact</label>
        <input type="range" min="1" max="5" value="${actif.impact}" id="impact-${actif.id}">
        <span class="asset-card__slider-value">${actif.impact}</span>
      </div>

      <!-- Menace et recommandation -->
      <div class="asset-card__reco">
        <strong>Menace :</strong> ${actif.menace}<br>
        <strong>Recommandation :</strong> ${actif.recommandation}
      </div>

    </div>`

    // On ajoute la carte dans le conteneur
    container.innerHTML += html
  })

  // On branche les écouteurs sur chaque carte
  actifs.forEach(function(actif) {

    const inputProb   = document.getElementById(`prob-${actif.id}`)
    const inputImpact = document.getElementById(`impact-${actif.id}`)
    const btnDelete   = document.getElementById(`delete-${actif.id}`)

    // Curseur probabilité
    inputProb.addEventListener("input", function() {
      actif.probabilite = parseInt(inputProb.value)
      render()
      updateStats()
      renderMatrice()
      sauvegarder()
    })

    // Curseur impact
    inputImpact.addEventListener("input", function() {
      actif.impact = parseInt(inputImpact.value)
      render()
      updateStats()
      renderMatrice()
      sauvegarder()
    })

    // Bouton supprimer
    btnDelete.addEventListener("click", function() {
      actifs = actifs.filter(function(a) {
        return a.id !== actif.id
      })
      render()
      updateStats()
      renderMatrice()
      sauvegarder()
    })
  })

  // On rafraîchit la matrice après chaque render
  renderMatrice()
}

// =========================================================
// FONCTION 6 — Met à jour les 3 chiffres clés en haut
// =========================================================
function updateStats() {
  let critiques = 0
  let totalScore = 0

  actifs.forEach(function(actif) {
    const score = getScore(actif)
    totalScore += score
    if (getNiveau(score) === "high") {
      critiques += 1
    }
  })

  const moyenne = Math.round(totalScore / actifs.length)

  document.getElementById("stat-critiques").textContent = critiques
  document.getElementById("stat-moyen").textContent = moyenne
  document.getElementById("stat-total").textContent = actifs.length
}

// =========================================================
// CHARGEMENT — On récupère les données sauvegardées si elles existent
// =========================================================
const donneesSauvegardees = localStorage.getItem("actifs")
if (donneesSauvegardees) {
  actifs = JSON.parse(donneesSauvegardees)
}

// On trie une seule fois au chargement
actifs.sort(function(a, b) {
  return getScore(b) - getScore(a)
})

// =========================================================
// LANCEMENT DE L'APP
// =========================================================
render()
updateStats()

// =========================================================
// FORMULAIRE D'AJOUT
// =========================================================
document.getElementById("add-form").addEventListener("submit", function(e) {
  e.preventDefault()

  const nom = document.getElementById("input-nom").value
  const categorie = document.getElementById("input-categorie").value

  const nouvelActif = {
    id: Date.now(),
    nom: nom,
    categorie: categorie,
    probabilite: 1,
    impact: 1,
    menace: "À définir",
    recommandation: "À définir"
  }

  actifs.push(nouvelActif)
  render()
  updateStats()
  sauvegarder()

  // On vide le formulaire après l'ajout
  document.getElementById("input-nom").value = ""
})

// =========================================================
// BOUTON RÉINITIALISER
// Recharge les données de départ et vide le localStorage
// =========================================================
document.getElementById("btn-reset").addEventListener("click", function() {
  if (confirm("Réinitialiser toutes les données ? Les modifications seront perdues.")) {
    localStorage.removeItem("actifs")
    location.reload()
  }
})