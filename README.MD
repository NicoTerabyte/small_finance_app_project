# Il progetto note personali e approcci.
Partiamo con un approccio **dividi et impera**
Ok già loro dicono di fare attenzione a come voglio sviluppare l'applicazione quindi devo fare tanta attenzione adesso per quanto riguarda **cosa fare**:

## Tech stack richiesto
* Angular v19
* Ionic Framework
* Capacitor(*opzionale*)


## Requisiti del progetto
### Requisiti Base (*Obbligatori*)
Creazione dell'applicazione con la versione 19 di angular

Struttura dell'applicazione
* l'app deve contenere **Almeno** 5 pagine distinte
* Una delle pagine deve essere protetta da password

Integrazione API:
* Implementare almeno 2 chiamate API diverse
* Puoi utilizzare JSONPlaceholder o altre API pubbliche a tua scelta

### Funzionalità aggiuntive (Plus)
Le seguenti funzionalità non sono obbligatorie ma costituiranno un elemento di valutazione positiva:

* Supporto mobile
  * Integrazione di capacitor per il supporto nativo su dispositivi mobili
* Sistema di autenticazione:
  * Implemetazione di un sistema di login completo
  * Bonus: Integrazione con OAuth 42
* Libero sfogo
  * Abbastanza autoesplicativo

### Tema dell'applicazione
Il tema della tua applicazione è fondamentale per dimostrare creatività e capictà di problem-solving ecco alcune linee guida:
* Scegli un tema orginale che risolva un problema reale
* Evita progetti comuni come portfolio personali o to-do list
* Concentrati su un'applicazione che le persone potrebbero utilizzare quotidianamente


### **Consegna**Per le info sulla consegna vai a vedere il notion :


<aside>
**Scadenza:** 4 aprile 2025

**Modalità di consegna:**

- Creare un repository su GitHub con README dettagliato
- Invitare l'utente GitHub: @zxcvbinz come collaboratore al repository
- Inviare una email di conferma all'indirizzo [davide.lanotte@originsolutions.it](mailto:davide.lanotte@originsolutions.it) con il link del repository

**Il repository dovrà contenere:**

- Codice sorgente completo del progetto
- Istruzioni chiare per l'installazione e l'esecuzione
- Video dimostrativo dell'applicazione (durata: 15 secondi) che mostri le funzionalità principali

Se il progetto utilizza file di ambiente (.env o simili), questi non devono essere inclusi nel repository ma devono essere allegati separatamente all'email di conferma inviata a [davide.lanotte@originsolutions.it](mailto:davide.lanotte@originsolutions.it)

</aside>

**Buona fortuna! ✨**

## Famo sto dividi et impera allora
Da dove partire? è stato detto di non essere banali con il progetto quindi niente robe troppo semplici. stavo pensando di fare qualocosa riguardo alla gestione dei soldi, tipo un'app che traccia i tuoi pagamenti che puoi inserire manualmente. Molto semplice come concetto secondo me e comunque facile da sviluppare per renderlo migliore in fase di sviluppo. Tipo per esempio magari all'inzio devi fare tante procedure per banalmente inserire dei dati e poi invece passi a una procedura più automatizzata dopo ma comunque sempre di inserire soldi si tratta capito?

Ok, ora che abbiamo un'idea in mente mi concetrarei su ionic che tra lei ed angular è la cosa più sconosciuta a me e che devo capire se voglio aggiungerla al progetto e di conseguenza almeno fare la fase obbligatoria.

Quindi:



# Approccio a Ionic appunti
Allora se quello che dice l'ai è corretto ionic è un servizio integrato con angular solo che per sviluppare con esso nel mio caso è convenuto creare il progetto con il comando
```bash
ionic start nome-applicativo blank --type=angular
```

e così ci siamo tolti il problema del come ionic e angular lavorano insieme. L'idea di base è che utilizzando anche ionic abbiamo la possibilità di sviluppare anche per telefono integrando anche pezzi che potrebbero coincidire con un app per cellulare. Questo è ciò che sto capendo dell'applicativo più o meno.
Ora iniziamo a fare la parte di sviluppo.
**Lezione numero 1 sul campo (ripasso):** app.components.ts è il componente principale esso sarà la prima cosa che verrà utilizzata per vedere i vari componenti nel nostro applicativo è il main se possiamo dire.
**Lezione numero 2 sul campo (ripasso):** Essendo tutti componenti standalone per utilizzare le grafiche proposte da ionic devi importarle ogni volta questo per una questione di comodità e semplicità e per gestire ogni componente in maniera indipendente. Importando i materiali/elementi corretti potremo utilizzarli all'interno dell'applicativo _Come utilizziamo i tag in html_

**lezione numero 3 sul campo approfondimento dei modelli:**
Un modello di dati, che è ciò che preserviamo nella cartella models del nostro progetto, è praticamente una struttura dati che manipoleremo nell'applicazione, molto semplicemente è una base dati che verrà utilizzata dagli altri vari elementi all'interno del progetto.
Ha molti vantaggi quali
* TypeScript controlla che usi i dati correttamente
* L'IDE ti suggerisce proprietà disponibili
* Previene errori come typo nei nomi delle proprietà

è dichiarato come segue per esempio:
```typescript
export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: Date;
  category: string;
  type: 'income' | 'expense';
}
```
La cosa buona di questa dichiarazione è che con questa tipologia di implementazione abbiamo creato l'oggetti **Transaction**, esso di conseguenza può essere definito in altre variabile nel modo seguente:
```typescript
// Sintassi corretta
const transazione: Transaction = {
  id: "123",
  amount: 50.0,
  description: "Spesa al supermercato",
  date: new Date(),
  category: "Alimentari",
  type: "expense"
};
```
Come puoi vedere l'oggetto viene instaziato con il suo tipo (Transaction) e con l'inizializzazione degli attributi.

**Lezione numero 4 che cos'è un observable e un BehaviourSubject**
Perché dichiarare come attributo public una variabile con il $ alla fine? e che cos'è un observable?
Un *observable* è un pattern fondamentale della libreria/modulo RxJS utilizzato in angular. Esso rappresenta un flusso di dati che può emettere più valori nel tempo.
Permette di gestire eventi asincroni (HTTP, eventi utente, timer)
I componenti possono "sottoscriversi" (cioè) per ricevere aggiornamenti. Viene definito un **Oggetto a se stante**
Come dice il nome questo oggetto di tipo observable rimane sotto osservazione appunto. Vedilo come un canale di osservazione non come variabile rispetto ad essa che magari potrebbero avere un sol tipo di variabile, L'Observable invece rappresenta un flusso di valori che possono arrivare nel tempo

Un *BehaviourSubject* è un tipo speciale di observable con caratteristiche uniche
Richiede un valore iniziale all'avvio e memorizza sempre l'ultimo valore emesso invia immediatamente il valore corrente ai nuovi sottoscrittori e offre il metodo **getValue()** per ottenere il valore corrente sincronamente.
Esso è modificabile nel nostro servizio e memorizza l'ultimo valore emesso.

## <b><span style="color:red">Aggiornamento</span></b>
Ho compreso la logica corretta tra BehaviorSubject e observable che da come posso aver capito questa è una meccanica chiave all'interno di angular, l'idea è che innanzitutto BehaviorSubject è un oggetto intelligente che **può** lavorare con  gli observable per avvisare tutti gli altri nel caso venga modificato. A differenza di una lista normale non serve controllare in continuazione il contenuto di questo tipo di oggetto appunto perché, rispetto ad una lista normale un BehaviorSubject può essere messo **sotto osservazione** di conseguenza ogni suo cambiamento viene annunciato agli altri.

Invece il behaviorSubject è ubn'evoluzione dell'observable nel cuore, praticamete ha più feature le quali gli permettono non solo di annunciare i cambiamenti ma anche di cambiare e dire quali valori ci sono al suo interno e vengono anche annunciati grazie al metodo next()


In parole povere questo elemento angular ci permette di rappresenta un flusso di dati -> esso gestisce eventi asincroni -> si può sottoscrivere per ricevere aggiornamenti.

Il $ è una convenzione per indicare che una variabile è appunto un observable.



**Lezione numero 5 Connessione tra servizio e componente**
Il componente dashboard come utilizza un servizio, e qual'è lo scopo di un servizio in angular?
I servizi servono a fornire funzionalità condivise in tutta l'app

centralizzano la gestione dati e della logica
separano la logica business dalla UI
facilitano il riutilizzo di codice
viene inniettatato all'interno dei componenti per gestire le sue capacità, In più ho notato che lavora in simbiosi con il modello definito nella cartella modelli visto che praticamente serve a gestire i tipi di pagamenti e i pagamenti stessi

**Lezione numero 6 (ripasso) ngIf come funziona nell'html del componente dashboard?**

# Future implementazioni
- [ ] Aggiunta rapida delle spese basandosi su delle spese quotidiane. Esempio se facessi una spesa simile a quella che ho fatto lunedì durante la settimana posso semplicemente schiacciare il bottone "Aggiunta rapida" / "fast add" per mettere la stessa spesa che ho fatto in precedenza
- [ ] Un backend per gestire l'utenza penso serva per il login bro.... Consigliato l'utilizzo di supabase per il backend

# Accortezze e studi per il futuro

<input disabled="" type="checkbox"> Pipe async e gestione sottoscrizioni: Come | async gestisce automaticamente lifecycle e memory leak
<input disabled="" type="checkbox"> Cicli di vita dei componenti: Come funzionano ngOnInit, ngOnDestroy e altri lifecycle hooks
<input disabled="" type="checkbox"> Change Detection: Come Angular rileva e propaga i cambiamenti nell'UI
<input disabled="" type="checkbox"> RxJS Operators: Operatori per trasformare/filtrare flussi di dati (map, filter, switchMap, etc.)
<input disabled="" type="checkbox"> Reactive Forms: Forms avanzate con validazioni e controlli dinamici
<input disabled="" type="checkbox"> Pattern di immutabilità: Perché usare [...array] e {...object} invece di modifiche dirette
<input disabled="" type="checkbox"> Aggiunta rapida delle spese: Basata su spese precedenti simili

