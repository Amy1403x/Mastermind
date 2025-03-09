
const colorCells = document.querySelectorAll('#tabella2 .cella');

const targetCells = document.querySelectorAll('#tabella1 .cella');


colorCells.forEach(cell => {
    cell.addEventListener('dragstart', function(e) {

        e.dataTransfer.setData('text/plain', this.style.backgroundColor || window.getComputedStyle(this).backgroundColor);
    });
});


targetCells.forEach(cell => {
    cell.addEventListener('dragover', function(e) {
        e.preventDefault(); 
    });

    cell.addEventListener('drop', function(e) {
        e.preventDefault();

        const color = e.dataTransfer.getData('text/plain');
        this.style.backgroundColor = color;
    });
});
