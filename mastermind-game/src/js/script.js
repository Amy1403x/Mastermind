// colore
const bottoniColore = document.querySelectorAll('.colore-scelta');
//ighe della tabella
const tutteLeRighe = document.querySelectorAll('.tabella-gioco table tr');
//  controlla
const bottoneControlla = document.getElementById('controlla-pulsante');
//  nuova partita
const bottoneNuovaPartita = document.getElementById('nuova-partita');

//colori disponibili
const coloriDisponibili = ['red', 'blue', 'green', 'yellow', 'white', 'black'];
//numero di colori nel codice
const numeroColori = 4;
//numero di tentativi
const numeroTentativi = tutteLeRighe.length;

//codice segreto da indovinare
let codiceSegreto = [];
//riga corrente del tentativo
let rigaCorrente = 0;
//colore selezionato
let coloreAttualmenteSelezionato = null;


//geera codice da indovinare
function generaCodice() {
    codiceSegreto = [];
    for (let i = 0; i < numeroColori; i++) {
        let indiceCasuale = Math.floor(Math.random() * coloriDisponibili.length);
        codiceSegreto.push(coloriDisponibili[indiceCasuale]);
    }
}
generaCodice();

//listener per i bottoni dei colori
for (let i = 0; i < bottoniColore.length; i++) {
    let bottone = bottoniColore[i];
   
    bottone.addEventListener('click', function(event) {
        coloreAttualmenteSelezionato = event.target.style.backgroundColor;
    });
}
const tuttiGliSpazi = document.querySelectorAll('.tabella-gioco .spazio');

//listener a ogni spazio della griglia
for (let i = 0; i < tuttiGliSpazi.length; i++) {
    let spazio = tuttiGliSpazi[i];

    spazio.addEventListener('click', function(event) {
        const cellaCliccata = event.target; 
        const rigaElement = cellaCliccata.parentElement; 
        let indiceRigaCliccata = -1;    //per ora -1 non trovato


        for(let r = 0; r < tutteLeRighe.length; r++) {
            if (tutteLeRighe[r] === rigaElement) {
                indiceRigaCliccata = r;
                break;
            }
        }

        
        if (indiceRigaCliccata === rigaCorrente && coloreAttualmenteSelezionato !== null) {
            cellaCliccata.style.backgroundColor = coloreAttualmenteSelezionato;
            cellaCliccata.style.border = 'none';
        } else if (coloreAttualmenteSelezionato === null && indiceRigaCliccata === rigaCorrente) {
            
            alert("Seleziona un colore");
        }
       
    });
}


bottoneControlla.addEventListener('click', function() {
    const rigaAttiva = tutteLeRighe[rigaCorrente];
    const spaziRigaCorrente = rigaAttiva.querySelectorAll('.spazio');

    let tentativoUtente = [];
    let rigaCompleta = true; 

    
    for (let i = 0; i < spaziRigaCorrente.length; i = i + 1) {
        let coloreCella = spaziRigaCorrente[i].style.backgroundColor;

        
        if (coloreCella === "") {
             rigaCompleta = false; 
             break; 
        }
        
        tentativoUtente.push(coloreCella);
    }

    
    if (rigaCompleta === false) {
        alert("Mancano dei colori nella riga");
        return; 
    }


    let palliniNeri = 0;
    let palliniBianchi = 0;
    let copiaCodice = [];
    for (let i=0; i<codiceSegreto.length; i=i+1) { copiaCodice.push(codiceSegreto[i]); }
    let copiaTentativo = [];
    for (let i=0; i<tentativoUtente.length; i=i+1) { copiaTentativo.push(tentativoUtente[i]); }

    for (let i = 0; i < numeroColori; i = i + 1) {
        if (copiaTentativo[i] === copiaCodice[i]) {
            palliniNeri = palliniNeri + 1;
            copiaTentativo[i] = null;
            copiaCodice[i] = null;
        }
    }
    for (let i = 0; i < numeroColori; i = i + 1) {
        if (copiaTentativo[i] !== null) {
            let trovatoIndice = -1;
            for (let j = 0; j < numeroColori; j = j + 1) {
                if (copiaCodice[j] === copiaTentativo[i]) {
                    trovatoIndice = j;
                    break;
                }
            }
            if (trovatoIndice !== -1) {
                palliniBianchi = palliniBianchi + 1;
                copiaCodice[trovatoIndice] = null;
                copiaTentativo[i] = null;
            }
        }
    }

    const cellaSuggerimento = rigaAttiva.querySelector('.suggerimento');
    let risultatoHTML = "";
    for (let i = 0; i < palliniNeri; i = i + 1) {
        risultatoHTML = risultatoHTML + "● ";
    }
    for (let i = 0; i < palliniBianchi; i = i + 1) {
        risultatoHTML = risultatoHTML + "○ ";
    }
    cellaSuggerimento.innerHTML = risultatoHTML.trim();

    if (palliniNeri === numeroColori) {
        alert("hai vinto");
        bottoneControlla.disabled = true;
    } else {
        rigaCorrente = rigaCorrente + 1;
        coloreAttualmenteSelezionato = null;
        if (rigaCorrente >= numeroTentativi) {
            alert("Hai perso! La sequenza era: " + codiceSegreto.join(', '));
            bottoneControlla.disabled = true;
        }
    }
    });

    bottoneNuovaPartita.addEventListener('click', function() {
        location.reload();
    });
