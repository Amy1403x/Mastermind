// Inizializza la variabile che tiene traccia della posizione corrente nella tabella1
let currentPosition = 0;

// Seleziona tutte le celle della tabella1 e della tabella2
const tabella1Cells = document.querySelectorAll('#tabella1 .cella'); // Seleziona le celle dove verrà applicato il colore
const tabella2Cells = document.querySelectorAll('#tabella2 td');      // Seleziona le celle cliccabili per scegliere il colore

// Aggiunge un event listener per ogni cella della tabella2 per gestire il click
tabella2Cells.forEach(cell => {
    cell.addEventListener('click', function() {
        // Se la cella in tabella1 è disponibile
        if (currentPosition < tabella1Cells.length) {
            // Prende il colore di background della cella cliccata
            const selectedColor = this.style.backgroundColor || window.getComputedStyle(this).backgroundColor;
            
            // Applica il colore selezionato alla cella corrente della tabella1
            tabella1Cells[currentPosition].style.backgroundColor = selectedColor;
            
            // Incrementa la posizione per prepararsi al colore della prossima cella
            currentPosition++;
        }
    });

});

// Seleziona l'elemento con id 'new-game' e aggiunge un event listener per il click
document.getElementById('new-game').addEventListener('click', function() {
    // document.getElementById seleziona l'elemento DOM con l'id specificato (in questo caso il bottone "new-game")
    
    // Resetta il colore di tutte le celle della tabella1
    tabella1Cells.forEach(cell => {
        cell.style.backgroundColor = '';
    });
    // Resetta la posizione corrente per iniziare un nuovo gioco
    currentPosition = 0;
});


