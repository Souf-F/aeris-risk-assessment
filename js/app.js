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
  if (score <= 6)       return "low"
  else if (score <= 14) return "mid"
  else                  return "high"
}

// =========================================================
// FONCTION 3 — Sauvegarde le tableau actifs dans le localStorage
// =========================================================
function sauvegarder() {
  localStorage.setItem("actifs", JSON.stringify(actifs))
}

// =========================================================
// FONCTION 4 — Génère la matrice de risques 5x5
// =========================================================
function renderMatrice() {
  const matrice = document.getElementById("matrice")
  matrice.innerHTML = ""

  for (let p = 5; p >= 1; p--) {
    for (let i = 1; i <= 5; i++) {
      const score  = p * i
      const niveau = getNiveau(score)
      const cell   = document.createElement("div")

      cell.className = `matrice__cell matrice__cell--${niveau}`

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
  const container = document.getElementById("assets-list")
  container.innerHTML = ""

  actifs.forEach(function(actif) {
    const score  = getScore(actif)
    const niveau = getNiveau(score)

    const html = `<div class="asset-card asset-card--${niveau}">

      <div class="asset-card__head">
        <div>
          <span class="asset-card__name">${actif.nom}</span>
          <span class="asset-card__category">${actif.categorie}</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <span class="badge badge--${niveau}">Score : ${score}</span>
          <button class="asset-card__delete" id="delete-${actif.id}">Supprimer</button>
        </div>
      </div>

      <div class="asset-card__slider">
        <label>Probabilité</label>
        <input type="range" min="1" max="5" value="${actif.probabilite}" id="prob-${actif.id}">
        <span class="asset-card__slider-value">${actif.probabilite}</span>
      </div>

      <div class="asset-card__slider">
        <label>Impact</label>
        <input type="range" min="1" max="5" value="${actif.impact}" id="impact-${actif.id}">
        <span class="asset-card__slider-value">${actif.impact}</span>
      </div>

      <div class="asset-card__reco">
        <strong>Menace :</strong> ${actif.menace}<br>
        <strong>Recommandation :</strong> ${actif.recommandation}
      </div>

    </div>`

    container.innerHTML += html
  })

  // Branchement des écouteurs sur chaque carte
  actifs.forEach(function(actif) {
    const inputProb   = document.getElementById(`prob-${actif.id}`)
    const inputImpact = document.getElementById(`impact-${actif.id}`)
    const btnDelete   = document.getElementById(`delete-${actif.id}`)

    inputProb.addEventListener("input", function() {
      actif.probabilite = parseInt(inputProb.value)
      render()
      updateStats()
      renderMatrice()
      sauvegarder()
    })

    inputImpact.addEventListener("input", function() {
      actif.impact = parseInt(inputImpact.value)
      render()
      updateStats()
      renderMatrice()
      sauvegarder()
    })

    btnDelete.addEventListener("click", function() {
      actifs = actifs.filter(function(a) { return a.id !== actif.id })
      render()
      updateStats()
      renderMatrice()
      sauvegarder()
    })
  })

  renderMatrice()
}

// =========================================================
// FONCTION 6 — Met à jour les 3 chiffres clés en haut
// =========================================================
function updateStats() {
  let critiques  = 0
  let totalScore = 0

  actifs.forEach(function(actif) {
    const score = getScore(actif)
    totalScore += score
    if (getNiveau(score) === "high") critiques += 1
  })

  const moyenne = Math.round(totalScore / actifs.length)

  document.getElementById("stat-critiques").textContent = critiques
  document.getElementById("stat-moyen").textContent     = moyenne
  document.getElementById("stat-total").textContent     = actifs.length
}

// =========================================================
// CHARGEMENT — Données sauvegardées dans le localStorage
// =========================================================
const donneesSauvegardees = localStorage.getItem("actifs")
if (donneesSauvegardees) {
  actifs = JSON.parse(donneesSauvegardees)
}

// Tri une seule fois au chargement
actifs.sort(function(a, b) { return getScore(b) - getScore(a) })

// =========================================================
// LANCEMENT
// =========================================================
render()
updateStats()

// =========================================================
// FORMULAIRE D'AJOUT
// =========================================================
const inputCategorie       = document.getElementById("input-categorie")
const inputCategorieCustom = document.getElementById("input-categorie-custom")
const inputNom             = document.getElementById("input-nom")

// Affiche / masque le champ custom selon la sélection
inputCategorie.addEventListener("change", function() {
  if (inputCategorie.value === "Autre") {
    inputCategorieCustom.style.display = "block"
    inputCategorieCustom.required      = true
  } else {
    inputCategorieCustom.style.display = "none"
    inputCategorieCustom.required      = false
    inputCategorieCustom.value         = ""
  }
})

// Soumission du formulaire
document.getElementById("add-form").addEventListener("submit", function(e) {
  e.preventDefault()

  const nom = inputNom.value.trim()

  // Si "Autre" est sélectionné, on prend le champ custom
  // Sinon on prend la valeur du select
  const categorie = inputCategorie.value === "Autre"
    ? inputCategorieCustom.value.trim()
    : inputCategorie.value

  // On récupère la recommandation depuis la bibliothèque
  // Si la catégorie n'existe pas dans la bibliothèque → fallback "Autre"
  const reco = recommandations[categorie] || recommandations["Autre"]

  const nouvelActif = {
    id: Date.now(),
    nom: nom,
    categorie: categorie,
    probabilite: 1,
    impact: 1,
    menace: reco.menace,
    recommandation: reco.recommandation
  }

  actifs.push(nouvelActif)
  render()
  updateStats()
  sauvegarder()

  // Réinitialiser le formulaire
  inputNom.value             = ""
  inputCategorieCustom.value = ""
  inputCategorieCustom.style.display = "none"
  inputCategorieCustom.required      = false
  inputCategorie.value       = inputCategorie.options[0].value
})

// =========================================================
// BOUTON RÉINITIALISER
// =========================================================
document.getElementById("btn-reset").addEventListener("click", function() {
  if (confirm("Réinitialiser toutes les données ? Les modifications seront perdues.")) {
    localStorage.removeItem("actifs")
    location.reload()
  }
})

// =========================================================
// NAVIGATION — Loader + transitions entre pages
// =========================================================
const loaderBar     = document.getElementById("loader-bar")
const loaderPercent = document.getElementById("loader-percent")
const loader        = document.getElementById("loader")
const pageHome      = document.getElementById("page-home")
const pageTool      = document.getElementById("page-tool")

// Barre de progression sur ~3 secondes
let progress = 0
const interval = setInterval(function() {
  progress += 1
  loaderBar.style.width     = progress + "%"
  loaderPercent.textContent = progress + "%"

  if (progress >= 100) {
    clearInterval(interval)
    setTimeout(function() {
      loader.classList.add("loader--hidden")
      pageHome.classList.remove("page--hidden")
      pageHome.classList.add("page--entering")
    }, 400)
  }
}, 30)

// Aller vers l'outil
function goToTool() {
  pageHome.classList.add("page--hidden")
  pageTool.classList.remove("page--hidden")
  pageTool.classList.add("page--entering")
  window.scrollTo(0, 0)
}

// Retour vers l'accueil
function goToHome() {
  pageTool.classList.add("page--hidden")
  pageHome.classList.remove("page--hidden")
  pageHome.classList.add("page--entering")
  window.scrollTo(0, 0)
}

document.getElementById("btn-go-tool").addEventListener("click", goToTool)
document.getElementById("btn-go-tool-2").addEventListener("click", goToTool)
document.getElementById("btn-back").addEventListener("click", goToHome)

// =========================================================
// DÉMO INTERACTIVE — curseurs sur la page d'accueil
// =========================================================
const demoProb   = document.getElementById("demo-prob")
const demoImpact = document.getElementById("demo-impact")

function updateDemo() {
  const p     = parseInt(demoProb.value)
  const i     = parseInt(demoImpact.value)
  const score = p * i

  document.getElementById("demo-prob-val").textContent   = p
  document.getElementById("demo-impact-val").textContent = i
  document.getElementById("demo-score").textContent      = score

  const badge     = document.getElementById("demo-badge")
  badge.textContent = "Score : " + score
  badge.className   = "badge badge--" + (score <= 6 ? "low" : score <= 14 ? "mid" : "high")
}

demoProb.addEventListener("input", updateDemo)
demoImpact.addEventListener("input", updateDemo)