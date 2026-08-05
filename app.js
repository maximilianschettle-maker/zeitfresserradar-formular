// TODO: nach dem Deploy des Google Apps Script Web-Apps (siehe feedback/apps-script-anleitung.md)
// hier die Web-App-URL eintragen. Ohne URL wird nichts gesendet, es kommt aber trotzdem
// die Danke-Meldung (siehe handleSubmit) - fuers lokale Testen ok, fuer den echten Einsatz
// unbedingt eintragen.
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxkdankhN4-bZG2ne1BSGjzoszOWHQ8FsgLHXb5TypxE-p_L2hCO8BuDxR1SjbH0Cjn/exec'

const ANDERE_VALUE = '__andere__'

const data = window.ZEITFRESSER_FORM_DATA

const branchenListe = document.getElementById('branchen-liste')
const stepBrancheFreitext = document.getElementById('step-branche-freitext')
const brancheFreitextInput = document.getElementById('branche-freitext-input')
const stepGroesse = document.getElementById('step-groesse')
const groessenListe = document.getElementById('groessen-liste')
const stepFragen = document.getElementById('step-fragen')
const fragenTitel = document.getElementById('fragen-titel')
const checkboxListe = document.getElementById('checkbox-liste')
const freitextLabel = document.getElementById('freitext-label')
const freitextInput = document.getElementById('freitext-input')
const submitBtn = document.getElementById('submit-btn')
const submitHinweis = document.getElementById('submit-hinweis')
const form = document.getElementById('feedback-form')
const danke = document.getElementById('danke')
const fehler = document.getElementById('fehler')

let ausgewaehlteBranche = null // { branche, groessen } aus der KB, oder ANDERE_VALUE
let ausgewaehlteGroesse = null // { groesse, beschreibung, themen }, oder null bei "Andere"

function renderBranchen() {
  branchenListe.innerHTML = ''
  for (const brancheEntry of data.branchen) {
    const li = document.createElement('li')
    li.textContent = brancheEntry.branche
    li.addEventListener('click', () => selectBranche(brancheEntry))
    branchenListe.appendChild(li)
  }

  const andereLi = document.createElement('li')
  andereLi.textContent = 'Andere / nicht gelistet'
  andereLi.addEventListener('click', () => selectBranche(ANDERE_VALUE))
  branchenListe.appendChild(andereLi)
}

function selectBranche(brancheEntry) {
  ausgewaehlteBranche = brancheEntry
  ausgewaehlteGroesse = null
  updateSelectionStyles(branchenListe, (li) =>
    li.textContent === (brancheEntry === ANDERE_VALUE ? 'Andere / nicht gelistet' : brancheEntry.branche)
  )

  hideStep(stepFragen)

  if (brancheEntry === ANDERE_VALUE) {
    hideStep(stepGroesse)
    stepBrancheFreitext.hidden = false
    renderFragenFuerAndereBranche()
  } else {
    stepBrancheFreitext.hidden = true
    brancheFreitextInput.value = ''
    renderGroessen(brancheEntry)
    stepGroesse.hidden = false
  }
}

function renderGroessen(brancheEntry) {
  groessenListe.innerHTML = ''
  for (const groesseEntry of brancheEntry.groessen) {
    const li = document.createElement('li')
    const label = document.createElement('span')
    label.textContent = groesseEntry.groesse
    const beschreibung = document.createElement('span')
    beschreibung.className = 'groesse-beschreibung'
    beschreibung.textContent = groesseEntry.beschreibung
    li.appendChild(label)
    li.appendChild(beschreibung)
    li.addEventListener('click', () => selectGroesse(groesseEntry))
    groessenListe.appendChild(li)
  }
}

function selectGroesse(groesseEntry) {
  ausgewaehlteGroesse = groesseEntry
  updateSelectionStyles(groessenListe, (li) => li.firstChild.textContent === groesseEntry.groesse)
  renderFragenFuerBekannteBranche(groesseEntry)
}

function updateSelectionStyles(list, matches) {
  for (const li of list.children) {
    li.classList.toggle('selected', matches(li))
  }
}

function hideStep(step) {
  step.hidden = true
}

function renderFragenFuerBekannteBranche(groesseEntry) {
  fragenTitel.textContent = `3. Welche Punkte treffen bei euch zu? (${ausgewaehlteBranche.branche} — ${groesseEntry.groesse})`

  checkboxListe.hidden = false
  checkboxListe.innerHTML = ''
  for (const thema of groesseEntry.themen) {
    const label = document.createElement('label')
    label.className = 'checkbox-item'
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.value = thema
    label.appendChild(input)
    label.append(` ${thema}`)
    checkboxListe.appendChild(label)
  }

  freitextLabel.textContent = 'Gibt es weitere Zeitfresser bei euch, die hier nicht aufgeführt sind?'
  freitextInput.required = false
  freitextInput.value = ''

  stepFragen.hidden = false
}

function renderFragenFuerAndereBranche() {
  fragenTitel.textContent = '3. Erzähl uns von euren Zeitfressern'

  checkboxListe.hidden = true
  checkboxListe.innerHTML = ''

  freitextLabel.textContent = 'Was sind bei euch aktuell die größten Zeitfresser im Arbeitsalltag?'
  freitextInput.required = true
  freitextInput.value = ''

  stepFragen.hidden = false
}

function getAusgewaehlteThemen() {
  return [...checkboxListe.querySelectorAll('input[type=checkbox]:checked')].map((input) => input.value)
}

function getLeadWert() {
  const checked = form.querySelector('input[name=lead]:checked')
  return checked ? checked.value : ''
}

function validiere() {
  if (!ausgewaehlteBranche) return 'Bitte eine Branche wählen.'
  if (ausgewaehlteBranche === ANDERE_VALUE) {
    if (!brancheFreitextInput.value.trim()) return 'Bitte den Namen deiner Branche eintragen.'
    if (!freitextInput.value.trim()) return 'Bitte kurz beschreiben, was bei euch Zeit frisst.'
  } else if (!ausgewaehlteGroesse) {
    return 'Bitte die Betriebsgröße wählen.'
  }
  return null
}

async function handleSubmit(event) {
  event.preventDefault()
  fehler.hidden = true
  danke.hidden = true

  const fehlermeldung = validiere()
  if (fehlermeldung) {
    fehler.textContent = fehlermeldung
    fehler.hidden = false
    return
  }

  const istAndere = ausgewaehlteBranche === ANDERE_VALUE
  const payload = {
    branche: istAndere ? brancheFreitextInput.value.trim() : ausgewaehlteBranche.branche,
    brancheNichtGelistet: istAndere,
    groesse: istAndere ? '' : ausgewaehlteGroesse.groesse,
    ausgewaehltePunkte: istAndere ? [] : getAusgewaehlteThemen(),
    weitereZeitfresser: freitextInput.value.trim(),
    lead: getLeadWert(),
  }

  submitBtn.disabled = true
  submitHinweis.hidden = false

  try {
    if (GOOGLE_SCRIPT_URL) {
      // text/plain vermeidet einen CORS-Preflight-Request, den Apps-Script-Web-Apps oft nicht sauber beantworten.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })
    } else {
      console.warn('GOOGLE_SCRIPT_URL ist nicht gesetzt - Antwort wurde NICHT gesendet.', payload)
    }
    form.hidden = true
    danke.hidden = false
  } catch (err) {
    console.error(err)
    fehler.textContent = "Da ist etwas schiefgelaufen — bitte versuch's gleich nochmal."
    fehler.hidden = false
  } finally {
    submitBtn.disabled = false
    submitHinweis.hidden = true
  }
}

form.addEventListener('submit', handleSubmit)
renderBranchen()
