
/*abbilito l'evento listener sul click del bottone play e attivo la funzione gioca*/

document.getElementById('play').addEventListener('click', gioca);

/*funzione gioca*/
function gioca() {

    const sb = document.querySelector('#difficolta');
    const grid = document.getElementById('grid');
    grid.innerHTML = "";
    let numerocelle = 100;
    const numerobombe = 16;
    const tentativi = [];
    const max_tentativi = 10;
    /*verifico il numero delle celle dentro la griglia in base al livello di difficoltà*/
    if (sb.value == 'facile') {
        numerocelle = 100;

    } else if (sb.value == 'media') {
        numerocelle = 81;

    } else {
        numerocelle = 49;

    }

    /*creo la griglia e generezazione delle bombe*/

    creategrid(numerocelle, sb.value);
    const bombe = generaBombe(numerobombe, numerocelle);

/*funzione creazione della griglia*/
    function creategrid(maxvalue, diffic) {

        const gridElement = document.getElementById('grid');

        const createGridElement = () => {
            const node = document.createElement('div');
            node.classList.add('square', diffic);

            return node;
        }

/*creazione della griglia e aggiuanta  del listener del click sulla cella*/        
        for (let i = 1; i <= maxvalue; i++) {

            const node = createGridElement();

            node.addEventListener('click', handleCell);

            node.innerText = i;
            gridElement.appendChild(node);

        }
        return true;
    }

/*operazioni sulla cella dopo il click*/
    function handleCell() {

        this.classList.add('clicked');
        this.removeEventListener('click', handleCell);
        const cell = parseInt(this.innerText);

/*verifica se il valore è incluso nell'elenco delle bombe*/
        if (bombe.includes(cell)) {
/*se è una bomba termina il gioco*/
            terminagioco();
            alert("bomba");

        }

        else {
/*aggiunge array tentativi aggiunge il valore della cella*/
            tentativi.push(cell);
        }
/*se ha superato il numero massimo di tentativi ha vinto*/ 
        if (tentativi.length > max_tentativi) {
            alert("Hai Vinto " + tentativi.length);
            this.classList.remove('clicked');
            reset_gioco();
        }

    }


/*funzione rest gioco dopo la fine del gioco per vincita*/
    function reset_gioco() {
        const square = document.getElementsByClassName('square');
        for (let i = 0; i < square.length; i++) {

            square[i].removeEventListener('click', handleCell);
        }

    }
/*funzione termina il gioco quando esce una bomba*/
    function terminagioco() {
        const square = document.getElementsByClassName('square');


        for (let i = 0; i < square.length; i++) {
/*visualizza le bombe rosse*/
            if (bombe.includes(parseInt(square[i].innerText))) {

                square[i].classList.add('bomber');

            }
            square[i].removeEventListener('click', handleCell);
        }

    }

/*genera numeri casuali non duplicati*/
    function generaBombe(numerobombe, numeroCelle) {
        const bombeGenerate = [];
        while (bombeGenerate.length < numerobombe) {

            const bomba = getRandomNumber(1, numeroCelle);

            if (!bombeGenerate.includes(bomba)) {
                bombeGenerate.push(bomba);

            }
        }


        return bombeGenerate;
    }
/*numero random*/
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);

    }


}


