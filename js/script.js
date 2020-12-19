let sortedSequence = []
let blockPositions = []
let blockNum = 5

let lvlNum = 1

let timerValue = 20
const timerConst = 20

const forbiddenTop = 180
const forbiddenBottom = 550
const blockRadius = 75

let gameBlocked = false

let timer

$(document).ready(function () {
    createBlocks()
    generateLvl1()
    generateTimer()
    setTimer()
});

function setTimer() {
    timer = setInterval(function() {
        if (timerValue > 0) {
            timerValue--
            $('#timer').text(timerValue)
        } else {
            timeOut()
        }
    }, 1000)
}

function createBlocks() {
    for (let i = 1; i <= blockNum; i++) {
        let div = '<div class="block" id="block' + i + '" onclick="block' + i + 'Pressed()"></div>'
        $('#siteBody').append(div)
    }
}

function generateLvl1_2Blocks() {
    for (let i = 1; i <= blockNum; i++) {
        let div = '<div class="block" id="block' + i + '" onclick="block' + i + 'Pressed()"></div>'
        $('#block'+i).replaceWith(div)
    }
}

function generateLvl3Blocks() {
    for (let i = 1; i <= blockNum; i++) {
        let img = '<img class="block" id="block' + i + '" onclick="block' + i + 'Pressed()" src="img/' + sortedSequence[i-1] + '"></img>'
        $('#block'+i).replaceWith(img)
    }
}

function generateTimer() {
    timerValue = timerConst
    $('#timer').text(timerValue)
}

function timeOut() {
    gameBlocked = true
    clearInterval(timer)
    $('#resultText').text('Вы не успели : (')
    $('#resultText').show()
    $('#restartButton').show()
}

function changeBlockContent() {
    for (i = 0; i < blockNum; i++) {
        $('#block'+(i+1)).html(sortedSequence[i])
    }
}

function generateBlockPositions() {
    let width = $(window).width() - 150
    let height = $(window).height() - forbiddenTop - 200
    for (i = 0; i < blockNum; i++) {
        let x = getRandNum(width)
        let y = getRandNum(height)
        if (y < forbiddenTop || y > forbiddenBottom) {//Сгенерировать заново
            i--
            continue
        }

        let blocksAreIntersecting = false
        for(j = 0; j < i; j++) {
            if(areBlocksIntersecting(x, blockPositions[j].x, y, blockPositions[j].y)) {
                blocksAreIntersecting = true
            }
        }

        if (blocksAreIntersecting) {//Сгенерировать заново
            i--
            continue
        }

        blockPositions[i] = {x: x, y: y}
    }
}

function areBlocksIntersecting(x1, x2, y1, y2) {
    if(Math.abs(x1 - x2) < (blockRadius * 2) && Math.abs(y1-y2) < (blockRadius * 2)) {
        return true
    }
    else {
        return false
    }
}

function changeBlockPositon() {
    for (i = 0; i < blockNum; i++) {
        let x = blockPositions[i].x
        let y = blockPositions[i].y
        $('#block' + (i+1)).css('left', '' + x + 'px')
        $('#block' + (i+1)).css('top', '' + y + 'px')
    }
}

function lvl1Pressed() {
    $("#instruction").html("LVL1: Последовательно выберите числа от меньшего к большему")
    $("#instruction").css('font-size', '64px')

    lvlNum = 1
    gameBlocked = false
    generateLvl1_2Blocks()
    generateLvl1()
    clearInterval(timer)
    generateTimer()
    setTimer()
}

function lvl2Pressed() {
    $("#instruction").html("LVL2: Последовательно выберите буквы в порядке алфавита")
    $("#instruction").css('font-size', '64px')

    lvlNum = 2
    gameBlocked = false
    generateLvl1_2Blocks()
    generateLvl2()
    clearInterval(timer)
    generateTimer()
    setTimer()
} 

function lvl3Pressed() {
    $("#instruction").html("LVL3: Определите, что за слово изображено на картинке. Последовательно выберите те, первая буква которых встречается в алфавите раньше остальных")
    $("#instruction").css('font-size', '48px')

    lvlNum = 3
    gameBlocked = false
    generateSequanceLVL3()
    generateLvl3Blocks()
    generateLvl3()
    clearInterval(timer)
    generateTimer()
    setTimer()
}

function generateLvl1() {
    $('#resultText').hide()
    $('#restartButton').hide()
    $('#saveButton').hide()
    $('#congratulations').hide()

    generateSequanceLVL1()
    changeBlockContent()
    generateBlockPositions()
    changeBlockPositon()
}

function generateLvl2() {
    $('#resultText').hide()
    $('#restartButton').hide()
    $('#saveButton').hide()
    $('#congratulations').hide()

    generateSequanceLVL2()
    changeBlockContent()
    generateBlockPositions()
    changeBlockPositon()
}

function generateLvl3() {
    $('#resultText').hide()
    $('#restartButton').hide()
    $('#saveButton').hide()
    $('#congratulations').hide()

    generateBlockPositions()
    changeBlockPositon()
}

function generateSequanceLVL1() {
    for (i = 0; i < blockNum; i++) {
        let num = getRandNum(999)
        
        let numAlreadyMet = false
        for (j = 0; j < sortedSequence.length; j++) {
            if (sortedSequence[j] === num) {
                numAlreadyMet = true
            }
        }

        if(numAlreadyMet) {
            i--
            continue
        } else {
            sortedSequence[i] = num
        }
    }
    sortedSequence.sort()
}

function generateSequanceLVL2() { 
    let alphabet = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЫЭЮЯ";
    for (i = 0; i < blockNum; i++) {
        let index = getRandNum(alphabet.length)
        let sym = alphabet[index]

        let symAlreadyMet = false
        for (j = 0; j < sortedSequence.length; j++) {
            if (sortedSequence[j] === sym) {
                symAlreadyMet = true
            }
        }
        
        if(symAlreadyMet) {
            i--
            continue
        } else {
            sortedSequence[i] = sym
        }
    }
    sortedSequence.sort()
}

function generateSequanceLVL3() {
    sortedSequence = ['арбуз.png', 'кот.png', 'морковка.png', 'папка.png', 'свечка.png']
}

function savePressed() {
    const a = document.createElement('a');
    let msg = 'Пользователь прошел уровень ' + lvlNum + ' с результатом: ' + timerValue
    const file = new Blob([msg], {type: 'text/plain'});
    
    a.href= URL.createObjectURL(file);
    let dt = new Date()
    a.download = dt.getDate() + '.' + dt.getMonth() + '.' + dt.getFullYear() + ' ' + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + '.txt';
    a.click();
    URL.revokeObjectURL(a.href);
}

function block1Pressed() {
    if(gameBlocked) {
        return
    }

    $('#block1').hide()
}

function block2Pressed() {
    if(gameBlocked) {
        return
    }

    let previousBlocksAreHidden = $('#block1').is(":hidden")
    if (previousBlocksAreHidden) {
        $('#block2').hide()
    } else {
        gameBlocked = true
        clearInterval(timer)
        $('#resultText').text('Вы ошиблись : (')
        $('#resultText').show()   
        $('#restartButton').show()
    }
}

function block3Pressed() {
    if(gameBlocked) {
        return
    }

    let previousBlocksAreHidden = $('#block1').is(":hidden") 
                                && $('#block2').is(":hidden")
    if (previousBlocksAreHidden) {
        $('#block3').hide()
    } else {
        gameBlocked = true
        clearInterval(timer)
        $('#resultText').text('Вы ошиблись : (')
        $('#resultText').show()
        $('#restartButton').show()
    }
}

function block4Pressed() {
    if(gameBlocked) {
        return
    }

    let previousBlocksAreHidden = $('#block1').is(":hidden") 
                                && $('#block2').is(":hidden")
                                && $('#block3').is(":hidden")
    if (previousBlocksAreHidden) {
        $('#block4').hide()
    } else {
        gameBlocked = true
        clearInterval(timer)
        $('#resultText').text('Вы ошиблись : (')
        $('#resultText').show()
        $('#restartButton').show()
    }
}

function block5Pressed() {
    if(gameBlocked) {
        return
    }

    let previousBlocksAreHidden = $('#block1').is(":hidden") 
                                && $('#block2').is(":hidden")
                                && $('#block3').is(":hidden")
                                && $('#block4').is(":hidden")
    if (previousBlocksAreHidden) {
        $('#block5').hide()
        showResult()
    } else {
        gameBlocked = true
        clearInterval(timer)
        $('#resultText').text('Вы ошиблись : (')
        $('#resultText').show()
        $('#restartButton').show()
    }

}

function showResult() {
    clearInterval(timer)
    $('#resultText').text('Вы справились!')
    $('#resultText').show()
    $('#restartButton').show()
    $('#saveButton').show()
    $('#congratulations').show()
}

function restartLvl() {
    showBlocks()
    if (lvlNum === 1) {
        lvl1Pressed()
    } else if (lvlNum === 2) {
        lvl2Pressed()
    } else {
        lvl3Pressed()
    }
}

function showBlocks() {
    for(let i = 1; i <= blockNum; i++) {
        $('#block'+i).show() 
    }
}

function getRandNum(max){//Возвращает целое число < max
    let rand = Math.random()
    for (let i = 0; i < max; i++){
        if (rand >= i/max && rand <= (i+1)/max){
            return i
        }
    }
}

function firstColorDesign() {
    $('header').css("background-color", "#136F63");
    $('nav').css("background-color", "#22AAA1");
    $('#siteBody').css("background-color", "#fcf");
    $('#footer').css("background-color", "#031f13");
}

function secondColorDesign() {
    $('header').css("background-color", "#aa222b");
    $('nav').css("background-color", "#dd555e");
    $('#siteBody').css("background-color", "#cff");
    $('#footer').css("background-color", "#1f0303");
}