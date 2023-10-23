let areas = {
    a: null,
    b: null,
    c: null
}

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart); //começa a arrastar
    item.addEventListener('dragend', dragEnd); //terminou de arrastar
});

document.querySelectorAll('.area').forEach(area =>{
    area.addEventListener('dragover', dragOver); // é rodada sempre que estiver arrastando um item e ele estiver em cima da area de drop
    area.addEventListener('dragleave', dragLeave); // é rodada sempre que eu arrastar o item para fora da area de drop
    area.addEventListener('drop', drop);// é quando eu solto o item no local especifico dele, só funciona quando o dragOVer libera que eu posso soltar esse item em cima. 
});

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);



//functions item
function dragStart(e){
    e.currentTarget.classList.add('dragging');
}

function dragEnd(e){
    e.currentTarget.classList.remove('dragging');
}

//Functions area
function dragOver(e){
    // console.log('passou por cima')
    if(e.currentTarget.querySelector('.item') === null){
        e.preventDefault(); // assim eu libero que pode soltar o item em cima.
        e.currentTarget.classList.add('hover');
    }
}

function dragLeave(e){
    // console.log('saiu')
    e.currentTarget.classList.remove('hover');
}

function drop(e){
    // console.log('liberou')
    e.currentTarget.classList.remove('hover');

    //pegar o item que esta sendo arrastado
    if(e.currentTarget.querySelector('.item') === null){
        let dragItem = document.querySelector('.item.dragging');
        e.currentTarget.appendChild(dragItem);
        updateAreas();
    }
}

//Function Neutral Area
function dragOverNeutral(e){
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}

function dragLeaveNeutral(e){
    e.currentTarget.classList.remove('hover');
}

function dropNeutral(e){
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(dragItem);
    updateAreas();
}

//Logic Functions
function updateAreas(){
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');
        if(area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').innerHTML;
        } else {
            areas[name] = null;
        }
    })
    if(areas.a === '1' && areas.b === '2' && areas.c === '3') {
        document.querySelector('.areas').classList.add('correct');
    } else {
        document.querySelector('.areas').classList.remove('correct');
    }
}