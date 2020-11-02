var strCollectionLat = ['"Consuetudo est altera natura"', '"Nota bene"', '"Nulla calamitas sola"', '"Per aspera ad astra"']
var strCollectionRu = ['"Привычка - вторая натура"', '"Заметьте хорошо!"', '"Беда не приходит одна"', '"Через тернии к звёздам"']
var strCount = 1

class class1 {
    color = '#999999'
    getColor() {return this.color}
}

class class2 {
    color = '#555555'
    getColor() {return this.color}
}

function repaint(){
    let allElems = document.getElementById('rand').getElementsByClassName('DOMEvenString')
    for (let i of allElems) {
        i.style.fontWeight = 'bold'
    }
    
    //JQuery решение
    //$('.DOMEvenString').css('font-weight', 'bold')
}

function create(){
    if (strCount > 4) {
        alert("Все строки выведены")
        return
    }

    let className = 'DOMOddString'
    if (strCount % 2 === 0){
        className = 'DOMEvenString'
    }

    let strNum = '<u>n=' + strCount+'</u>'+' '

    let index = getRandomIndex(4)
    while(strCollectionLat[index]===0){
        index = getRandomIndex(4)
    }

    let latText = '<i>'+strCollectionLat[index]+'</i>'+' '
    let ruText = strCollectionRu[index]
    let p = document.createElement('p')
    p.className = "DOMText " + className
    p.innerHTML = '' + strNum + latText + ruText
    document.getElementById('rand').append(p)

    //JQuery-версия
    //let p = '<p class="DOMText ' + className + '">' + strNum + latText + ruText +'</p>'
    //$('#rand').append(p)

    setColor()

    strCount++
    strCollectionLat[index]=0
    strCollectionRu[index]=0
}

function getRandomIndex(max){//Возвращает целое число < max
    let rand = Math.random()
    for (let i = 0; i < max; i++){
        if (rand >= i/max && rand <= (i+1)/max){
            return i
        }
    }
}

function setColor(){
    let c1 = new class1()
    let evenColor = c1.getColor()
    let evenElems = document.getElementsByClassName('DOMEvenString')
    for (let i of evenElems){
        i.style.backgroundColor = evenColor
    }
    //JQuery решение
    //$('.DOMEvenString').css('background-color', evenColor)
    
    let c2 = new class2()
    let oddColor = c2.getColor()
    let oddElems = document.getElementsByClassName('DOMOddString')
    for (let i of oddElems){
        i.style.backgroundColor = oddColor
    }
    //JQuery решение
    //$('.DOMOddString').css('background-color', oddColor)
}
