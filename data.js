// Generiert aus data/zeitfresser-kb.json durch scripts/generate-form-data.js
// Nicht von Hand editieren - stattdessen die KB anpassen und "npm run build:form" erneut ausfuehren.
window.ZEITFRESSER_FORM_DATA = {
  "branchen": [
    {
      "branche": "Handwerk",
      "groessen": [
        {
          "groesse": "klein",
          "beschreibung": "Ein-Mann-Betrieb oder kleiner Betrieb, 1-5 Mitarbeitende",
          "ab": 1,
          "bis": 5,
          "themen": [
            "Angebots- und Rechnungserstellung von Hand",
            "Terminkoordination per Telefon",
            "Stundenzettel auf Papier",
            "Materialbestellung ohne festen Prozess",
            "Belegsammlung fuer die Steuer"
          ]
        },
        {
          "groesse": "mittel",
          "beschreibung": "Betrieb mit mehreren Kolonnen/Teams, 6-30 Mitarbeitende",
          "ab": 6,
          "bis": 30,
          "themen": [
            "Personaleinsatzplanung fuer mehrere Kolonnen in Excel",
            "Stundenzettel/Aufmass ueber mehrere Baustellen konsolidieren",
            "Mehrfache Dateneingabe zwischen Systemen",
            "Koordination von Material, Fahrzeugen und Maschinen zwischen Kolonnen"
          ]
        },
        {
          "groesse": "gross",
          "beschreibung": "Betrieb mit mehreren Standorten/Betriebsteilen, ab 31 Mitarbeitende",
          "ab": 31,
          "bis": null,
          "themen": [
            "Betriebsmittel- und Maschinenverwaltung ueber mehrere Standorte",
            "Kein einheitliches ERP-System ueber die Betriebsteile",
            "Standortuebergreifende Auftrags- und Kapazitaetssteuerung",
            "Uneinheitliche Prozesse zwischen Betriebsteilen",
            "Change-Management bei der Digitalisierung ueber mehrere Standorte"
          ]
        }
      ]
    },
    {
      "branche": "Steuerberater",
      "groessen": [
        {
          "groesse": "klein",
          "beschreibung": "Einzelkanzlei, 1-5 Mitarbeitende",
          "ab": 1,
          "bis": 5,
          "themen": [
            "Beleg- und Unterlagenanforderung bei Mandanten",
            "Manuelle Datenuebernahme aus Kassensystemen und Kontoauszuegen",
            "Fristueberwachung in Kopf/Papierkalender",
            "Rechnungsstellung an Mandanten von Hand",
            "Belegerfassung ohne automatische Kontierung"
          ]
        },
        {
          "groesse": "mittel",
          "beschreibung": "Kanzlei mit mehreren Beratern/Teams, 6-30 Mitarbeitende",
          "ab": 6,
          "bis": 30,
          "themen": [
            "Interne Abstimmung zwischen Sachbearbeitung und Beratung",
            "Reporting fuer Mandanten manuell zusammenstellen",
            "Ueberblick ueber viele Mandate mit individuellen Anforderungen",
            "Kapazitaets- und Jahresplanung der Kanzlei ohne strukturiertes Tool"
          ]
        },
        {
          "groesse": "gross",
          "beschreibung": "Ueberregionale Kanzlei mit mehreren Standorten, ab 31 Mitarbeitende",
          "ab": 31,
          "bis": null,
          "themen": [
            "Rekrutierung und Onboarding ueber mehrere Standorte",
            "Individuelle Sonderwege statt standardisierter Prozesse",
            "Dezentrale Datenhaltung zwischen Standorten",
            "Ressourcenausgleich zwischen Standorten bei saisonalen Spitzen",
            "Konsolidiertes Reporting fuers Kanzlei-Management"
          ]
        }
      ]
    },
    {
      "branche": "Buchhaltung",
      "groessen": [
        {
          "groesse": "klein",
          "beschreibung": "Buchhaltungsbuero/interne Buchhaltung, 1-5 Mitarbeitende",
          "ab": 1,
          "bis": 5,
          "themen": [
            "Rechnungspruefung und -freigabe per E-Mail-Kette",
            "Zahlungsabgleich per Hand",
            "Mahnwesen wird sporadisch von Hand gemacht",
            "Manuelle Belegerfassung aus Papier-/PDF-Belegen",
            "Wiederkehrende Rechnungsstellung manuell erstellt"
          ]
        },
        {
          "groesse": "mittel",
          "beschreibung": "Buero mit mehreren Mandanten/groesserem Team, 6-30 Mitarbeitende",
          "ab": 6,
          "bis": 30,
          "themen": [
            "Mandantenverwaltung ueber getrennte Einzelsysteme",
            "Medienbrueche zwischen verschiedenen Mandanten-Tools",
            "Onboarding neuer Mandanten ohne Standardprozess",
            "Kapazitaets- und Teamplanung bei wachsender Mandantenzahl"
          ]
        },
        {
          "groesse": "gross",
          "beschreibung": "Mehrere Standorte/Teams, ab 31 Mitarbeitende",
          "ab": 31,
          "bis": null,
          "themen": [
            "Insellösungen zwischen Standorten",
            "Fehlende Schnittstellen zwischen Vorsystemen und Buchhaltung",
            "Budget- und Margenkontrolle ueber mehrere Teams/Standorte",
            "Ueberproportionaler Verwaltungsaufwand bei neuen Standorten",
            "Verwaltung von Lizenzen, Zugaengen und Ausstattung ueber Standorte"
          ]
        }
      ]
    },
    {
      "branche": "Zahnärzte",
      "groessen": [
        {
          "groesse": "klein",
          "beschreibung": "Einzelpraxis, 1-5 Mitarbeitende",
          "ab": 1,
          "bis": 5,
          "themen": [
            "Terminausfaelle ohne Erinnerungssystem",
            "Recall fuer Kontroll- und Prophylaxetermine von Hand",
            "Fehleranfaellige KZV- und Privatabrechnung",
            "Offene Rechnungen manuell nachverfolgen",
            "Medienbrueche zwischen Roentgenbildern und Patientenakte"
          ]
        },
        {
          "groesse": "mittel",
          "beschreibung": "Gemeinschaftspraxis mit mehreren Behandlern, 6-30 Mitarbeitende",
          "ab": 6,
          "bis": 30,
          "themen": [
            "Getrennte Patientenakten je Behandler",
            "Terminplanung ueber mehrere Behandler und Stuehle",
            "Unstrukturierte interne Kommunikation im groesseren Team",
            "Personaleinsatzplanung fuer wachsendes Praxisteam"
          ]
        },
        {
          "groesse": "gross",
          "beschreibung": "Zahnaerztliches MVZ mit mehreren Standorten, ab 31 Mitarbeitende",
          "ab": 31,
          "bis": null,
          "themen": [
            "Insellösungen zwischen Standorten statt zentraler MVZ-Software",
            "Konsolidierte Abrechnung ueber KV, Privat und BG je Standort",
            "Synchrone Patientendaten an jedem Standort sicherstellen",
            "IT-Support und Infrastruktur ueber mehrere Standorte",
            "Standortuebergreifende Personal- und Kapazitaetsplanung"
          ]
        }
      ]
    },
    {
      "branche": "Umweltplanungsbüro",
      "groessen": [
        {
          "groesse": "klein",
          "beschreibung": "Einzelbuero oder kleines Planungsbuero, 1-5 Mitarbeitende",
          "ab": 1,
          "bis": 5,
          "themen": [
            "Honorarberechnung und Angebot von Hand",
            "Belegsammlung und Aufbewahrungsfristen",
            "Gelaendeprotokolle und Fotodokumentation zuordnen",
            "Fristen und Behoerdentermine im Blick behalten"
          ]
        },
        {
          "groesse": "mittel",
          "beschreibung": "Planungsbuero mit mehreren Projektteams, 6-30 Mitarbeitende",
          "ab": 6,
          "bis": 30,
          "themen": [
            "Kartierungsdaten aus dem Gelaende nacherfassen",
            "Projektcontrolling und Stunden auf Leistungsphasen",
            "Ausschreibungen ueber viele Vergabeportale verfolgen",
            "Datenabgabe an Behoerden in uneinheitlichen Formaten"
          ]
        },
        {
          "groesse": "gross",
          "beschreibung": "Planungsbuero mit mehreren Fachbereichen oder Standorten, ab 31 Mitarbeitende",
          "ab": 31,
          "bis": null,
          "themen": [
            "Qualitaetssicherung und Freigaben ueber Fachbereiche",
            "Gebuendelte Vergaben ueber mehrere Fachrichtungen koordinieren",
            "Projektdaten und Vertraege standortuebergreifend archivieren",
            "Kapazitaetsplanung ueber Fachbereiche und Kartiersaison"
          ]
        }
      ]
    },
    {
      "branche": "IT-Dienstleister",
      "groessen": [
        {
          "groesse": "klein",
          "beschreibung": "Einzelunternehmer oder kleiner IT-Dienstleister, 1-5 Mitarbeitende",
          "ab": 1,
          "bis": 5,
          "themen": [
            "Supportanfragen ueber verstreute Kanaele",
            "Kleine Aufwaende gehen bei der Abrechnung verloren",
            "Rechnungen mit Leistungsnachweis erstellen",
            "Belege und Steuerunterlagen sammeln"
          ]
        },
        {
          "groesse": "mittel",
          "beschreibung": "IT-Dienstleister mit mehreren Technikern, 6-30 Mitarbeitende",
          "ab": 6,
          "bis": 30,
          "themen": [
            "Wartungs- und Servicevertraege manuell fakturieren",
            "Lizenzbestand je Kunde nachhalten",
            "Keine gemeinsame Warteschlange fuer Anfragen",
            "Hardwareangebote und Beschaffung abwickeln"
          ]
        },
        {
          "groesse": "gross",
          "beschreibung": "Systemhaus oder Managed-Service-Provider, ab 31 Mitarbeitende",
          "ab": 31,
          "bis": null,
          "themen": [
            "Erbrachte Leistungen zeitgenau abrechnen",
            "Ticketsystem waechst nicht mit den Serviceprozessen mit",
            "Kundendokumentation ueber Systeme verstreut",
            "Technikerdisposition ueber mehrere Teams",
            "SLA-Reporting fuer Kunden manuell zusammenstellen"
          ]
        }
      ]
    }
  ]
}
