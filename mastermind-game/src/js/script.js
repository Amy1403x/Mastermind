// Game variables
let secretCode = [];
let currentRow = 0;
let selectedColor = '';

// Generate secret code when page loads
window.onload = function() {
    startNewGame();
};

function startNewGame() {
    // Reset variables
    secretCode = [];
    currentRow = 0;
    selectedColor = '';
    
    // Clear all slots
    const slots = document.querySelectorAll('.slot');
    slots.forEach(slot => {
        slot.style.backgroundColor = '#E0E0E0';
    });
    
    // Clear all hints
    const hints = document.querySelectorAll('.hint');
    hints.forEach(hint => {
        hint.innerHTML = '';
    });

    // Generate new secret code
    for(let i = 0; i < 4; i++) {
        const colors = ['red', 'blue', 'green', 'yellow', 'white', 'black'];
        secretCode.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    console.log('Secret code:', secretCode); // for debugging
}

// Setup color selection
const pallini = document.querySelectorAll('.pallino');
pallini.forEach(pallino => {
    pallino.addEventListener('click', () => {
        selectedColor = pallino.style.backgroundColor;
    });
});

// Setup slot clicking
const slots = document.querySelectorAll('.slot');
slots.forEach(slot => {
    slot.addEventListener('click', function() {
        const rowIndex = Array.from(slot.parentNode.parentNode.children).indexOf(slot.parentNode);
        if (rowIndex === currentRow && selectedColor) {
            slot.style.backgroundColor = selectedColor;
        }
    });
});

// Check button handler
document.getElementById('check-button').addEventListener('click', function() {
    const currentRowSlots = Array.from(document.querySelectorAll('tr')[currentRow].getElementsByClassName('slot'));
    const currentGuess = currentRowSlots.map(slot => slot.style.backgroundColor);
    
    // Check if row is complete
    if (currentGuess.includes('')) {
        alert('Completa tutti gli slot prima di controllare!');
        return;
    }

    let exact = 0;
    let partial = 0;

    // Check exact matches
    for (let i = 0; i < 4; i++) {
        if (currentGuess[i] === secretCode[i]) {
            exact++;
        }
    }

    // Check partial matches
    let tempSecret = [...secretCode];
    let tempGuess = [...currentGuess];
    
    for (let i = 0; i < 4; i++) {
        if (tempSecret.includes(tempGuess[i])) {
            if (tempGuess[i] !== secretCode[i]) {
                partial++;
            }
            tempSecret[tempSecret.indexOf(tempGuess[i])] = null;
        }
    }

    // Show feedback
    const hintCell = document.querySelectorAll('.hint')[currentRow];
    // Mostra i risultati in modo più chiaro
    hintCell.innerHTML = `<span style="font-weight: bold;">${exact}●${partial}○</span>`;

    // Check win
    if (exact === 4) {
        alert('Hai vinto! Congratulazioni!');
        return;
    }

    // Next row or game over
    currentRow++;
    if (currentRow >= 9) {
        alert('Game Over! La sequenza corretta era: ' + secretCode.join(', '));
    }
});

// New game button handler
document.getElementById('new-game').addEventListener('click', startNewGame);
