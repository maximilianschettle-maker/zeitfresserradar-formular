// TODO: nach dem Deploy des Google Apps Script Web-Apps (siehe feedback/apps-script-anleitung.md)
// hier die Web-App-URL eintragen. Ohne URL wird nichts gesendet, es kommt aber trotzdem
// die Danke-Meldung (siehe handleSubmit) - fuers lokale Testen ok, fuer den echten Einsatz
// unbedingt eintragen.
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxkdankhN4-bZG2ne1BSGjzoszOWHQ8FsgLHXb5TypxE-p_L2hCO8BuDxR1SjbH0Cjn/exec'

const ANDERE_VALUE = '__andere__'

// Fuer nicht gelistete Branchen gibt es keine KB-Groessen. Diese generischen Stufen halten
// die Schwellen identisch zu den KB-Tiers (siehe ab/bis in data/zeitfresser-kb.json), damit
// eine spaetere Recherche weiss, welcher Tier gemeint war.
const GENERISCHE_GROESSEN = [
  { groesse: 'klein', beschreibung: '1-5 Mitarbeitende', ab: 1, bis: 5 },
  { groesse: 'mittel', beschreibung: '6-30 Mitarbeitende', ab: 6, bis: 30 },
  { groesse: 'gross', beschreibung: 'ab 31 Mitarbeitende', ab: 31, bis: null },
]

// Kennung aus dem personalisierten Link (z. B. ...?k=thomas-mueller). Wird unveraendert
// mitgeschickt, damit sich eine Antwort dem angeschriebenen Empfaenger zuordnen laesst.
// Bei einem weitergeleiteten oder blanken Link bleibt der Wert leer - das ist ok.
const kennung = new URLSearchParams(window.location.search).get('k') || ''

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
const absenderInput = document.getElementById('absender-input')
const mitarbeiterzahlInput = document.getElementById('mitarbeiterzahl-input')
const groesseHinweis = document.getElementById('groesse-hinweis')
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
    stepBrancheFreitext.hidden = false
    renderGroessen(GENERISCHE_GROESSEN)
    stepGroesse.hidden = false
  } else {
    stepBrancheFreitext.hidden = true
    brancheFreitextInput.value = ''
    renderGroessen(brancheEntry.groessen)
    stepGroesse.hidden = false
  }
}

function renderGroessen(groessen) {
  groessenListe.innerHTML = ''
  for (const groesseEntry of groessen) {
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
  pruefeMitarbeiterzahl()
  if (ausgewaehlteBranche === ANDERE_VALUE) {
    renderFragenFuerAndereBranche()
  } else {
    renderFragenFuerBekannteBranche(groesseEntry)
  }
}

function getMitarbeiterzahl() {
  const roh = mitarbeiterzahlInput.value.trim()
  if (!roh) return null
  const zahl = Number.parseInt(roh, 10)
  return Number.isFinite(zahl) && zahl > 0 ? zahl : null
}

// Die Zahl korrigiert die Auswahl nicht - der Teilnehmer weiss besser, welcher Betriebstyp er
// ist als unsere Schwellen. Der Hinweis macht den Widerspruch nur sichtbar, damit niemand
// versehentlich die falschen Fragen beantwortet. Beide Werte gehen so oder so ins Sheet.
function pruefeMitarbeiterzahl() {
  const zahl = getMitarbeiterzahl()
  if (zahl === null || !ausgewaehlteGroesse) {
    groesseHinweis.hidden = true
    return
  }
  const { ab, bis } = ausgewaehlteGroesse
  const passt = (ab == null || zahl >= ab) && (bis == null || zahl <= bis)
  if (passt) {
    groesseHinweis.hidden = true
    return
  }
  const passenderTier = verfuegbareGroessen().find(
    (g) => (g.ab == null || zahl >= g.ab) && (g.bis == null || zahl <= g.bis)
  )
  groesseHinweis.textContent = passenderTier
    ? `Mit ${zahl} Mitarbeitenden würden wir den Betrieb als „${passenderTier.groesse}" einordnen — „${ausgewaehlteGroesse.groesse}" kann trotzdem stehen bleiben, wenn das besser passt.`
    : `Mit ${zahl} Mitarbeitenden passt keine unserer Stufen richtig — wir schauen uns das an.`
  groesseHinweis.hidden = false
}

function verfuegbareGroessen() {
  if (ausgewaehlteBranche === ANDERE_VALUE) return GENERISCHE_GROESSEN
  return ausgewaehlteBranche ? ausgewaehlteBranche.groessen : []
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
  fragenTitel.textContent = `3. Welche Punkte treffen im Betrieb zu? (${ausgewaehlteBranche.branche} — ${groesseEntry.groesse})`

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

  freitextLabel.textContent = 'Gibt es weitere Zeitfresser, die hier nicht aufgeführt sind?'
  freitextInput.required = false
  freitextInput.value = ''

  stepFragen.hidden = false
}

function renderFragenFuerAndereBranche() {
  fragenTitel.textContent = '3. Welche Zeitfresser gibt es im Betrieb?'

  checkboxListe.hidden = true
  checkboxListe.innerHTML = ''

  freitextLabel.textContent = 'Was sind aktuell die größten Zeitfresser im Arbeitsalltag?'
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
    if (!brancheFreitextInput.value.trim()) return 'Bitte den Namen der Branche eintragen.'
    if (!ausgewaehlteGroesse) return 'Bitte die Betriebsgröße wählen.'
    if (!freitextInput.value.trim()) return 'Bitte kurz beschreiben, was Zeit frisst.'
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
    groesse: ausgewaehlteGroesse ? ausgewaehlteGroesse.groesse : '',
    ausgewaehltePunkte: istAndere ? [] : getAusgewaehlteThemen(),
    weitereZeitfresser: freitextInput.value.trim(),
    lead: getLeadWert(),
    kennung: kennung,
    absender: absenderInput.value.trim(),
    mitarbeiterzahl: getMitarbeiterzahl() ?? '',
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
    fehler.textContent = "Da ist etwas schiefgelaufen — bitte gleich nochmal versuchen."
    fehler.hidden = false
  } finally {
    submitBtn.disabled = false
    submitHinweis.hidden = true
  }
}

form.addEventListener('submit', handleSubmit)
mitarbeiterzahlInput.addEventListener('input', pruefeMitarbeiterzahl)
renderBranchen()
