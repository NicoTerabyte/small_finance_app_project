# Finance Tracker App
Un'applicazione mobile per il monitoraggio delle finanze personali sviluppata con Ionic e Angular. Finance Tracker permette agli utenti di registrare, categorizzare e analizzare le proprie entrate e spese.

## Indice
1. Requisiti
2. Configurazione
3. Installazione
4. Avvio dell'Applicazione
5. Funzionalità
6. Guida all'Uso

## Requisiti
Node.js (v14 o superiore)
npm (v6 o superiore)
Angular CLI
Ionic CLI
Account Supabase (per il backend)
Configurazione
Configurazione dell'Ambiente
Crea un file environment.ts nella directory
environments con il seguente contenuto:

## Configurazione
### 1. Configurazione ambiente
Crea un file environment.ts nella directory environments con il seguente contenuto:
```typescript
export const environment = {
  production: false,
  supabaseUrl: 'TUO_SUPABASE_URL',
  supabaseKey: 'TUA_SUPABASE_KEY'
};
```
Nota: Sostituisci TUO_SUPABASE_URL e TUA_SUPABASE_KEY con le tue credenziali Supabase.

### 2. Configurazione supabase
Assicurati che il tuo progetto Supabase abbia le seguenti tabelle:

* transactions - Per memorizzare le transazioni finanziarie
* categories - Per le categorie di transazioni

## Installazione
```bash
# Clona il repository
git clone https://github.com/tuo-username/angular_stagista_lnicoter.git

# Naviga alla directory del progetto
cd angular_stagista_lnicoter/finance-tracker

# Installa le dipendenze
npm install
```

## Avvio dell'applicazione
```bash
# Avvia l'applicazione in modalità sviluppo
ionic serve
```

L'applicazione sarà disponibile all'indirizzo http://localhost:8100/.

## Funzionalità
### 1. Autenticazione
* Registrazione utente
* Login
* Logout

### 2. Dashboard
* Visualizzazione del saldo attuale
* Riepilogo delle transazioni recenti
* Accesso a una API esterna (JSONPlaceholder) per dati di esempio

### 3. Gestione Transazioni
* Aggiunta di nuove transazioni (entrate/uscite)
* Visualizzazione dell'elenco delle transazioni
* Filtro transazioni per tipo (entrate/uscite)
* Ordinamento per importo
* Eliminazione delle transazioni

### 4. Analisi
* Visualizzazione di grafici per analizzare le spese
* Distribuzione delle spese per categoria

### 5. Impostazioni
* Gestione dell'account
* Logout

## Guida all'uso

### Primo Accesso
* Apri l'applicazione
* Registrati con email e password
* Effettua il login

### Aggiungere una Transazione
* Dal menu inferiore, tocca l'icona "+" (Aggiungi)
* Seleziona il tipo di transazione (Entrata/Uscita)
* Inserisci l'importo
* Aggiungi una descrizione
* Seleziona una categoria
* Tocca "Salva"

### Visualizzare le Transazioni
* Dal menu inferiore, tocca l'icona "Lista"
* Usa i filtri in alto per filtrare per tipo
* Tocca su una transazione per visualizzarne i dettagli
* Scorri verso sinistra su una transazione per eliminarla

### Visualizzare le Analisi
* Dal menu inferiore, tocca l'icona "Grafici"
* Visualizza i grafici che mostrano la distribuzione delle tue spese

### Usare l'API Esterna
* Dalla Dashboard, tocca il pulsante "Carica Post da JSONPlaceholder API"
* I dati di esempio verranno caricati e visualizzati

### Logout
* Dal menu inferiore, tocca l'icona "Impostazioni"
* Tocca "Logout"

