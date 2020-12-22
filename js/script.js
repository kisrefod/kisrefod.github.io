let sortedSequence = []
let blockPositions = []
let blockNum = 5

let lvlNum = 11

let timerValue = 30
let timerCount = 30

const forbiddenTop = 50
const forbiddenBottom = 400
const blockRadius = 75
const maxBlockNum = 9

let gameBlocked = false

let username = 'Пользователь'

let timer

let lvl1Passed = false
let lvl2Passed = false

let lvl1Result = 0
let lvl2Result = 0
let lvl3Result = 0

$(document).ready(function () {
    //disableLvls()
    $('#titleUsername').val(username)
});

function titleApply() {
    username = $('#titleUsername').val()
    $('#titleScreen').hide()
    gameBegin()
}

function gameBegin() {
    createBlocks()
    generateLvl()
    generateTimer()
    setTimer()
}

function disableLvls() {
    $('#lvl2Button').hide()
    $('#lvl3Button').hide()
}

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

function removeBlocks() {
    for (let i = 1; i <= blockNum; i++) {
        $('#block'+i).remove()
    }
}

function createBlocks() {
    for (let i = 1; i <= blockNum; i++) {
        let div = '<div class="block" id="block' + i + '" onclick="blockPressed(this)"></div>'
        $('#siteBody').append(div)
    }
}

function generateLvl1_2Blocks() {
    for (let i = 1; i <= blockNum; i++) {
        let div = '<div class="block" id="block' + i + '" onclick="blockPressed(this)"></div>'
        $('#block'+i).replaceWith(div)
    }
}

function generateLvl3Blocks() {
    for (let i = 1; i <= blockNum; i++) {
        let img = '<img class="block" id="block' + i + '" onclick="blockPressed(this)" src="img/' + sortedSequence[i-1] + '.png"></img>'
        $('#block'+i).replaceWith(img)
    }
}

function generateTimer() {
    timerValue = timerCount
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
    $("#instruction").html("Последовательно выберите числа от меньшего к большему")
    $("#instruction").css('font-size', '4vh')

    lvlNum = 11
    lvl3Result = lvl2Result = lvl1Result = 0
    gameBlocked = false
    $('#clickText').html('')
    generateLvl1_2Blocks()
    generateLvl()
    clearInterval(timer)
    generateTimer()
    setTimer()
}

function lvl2Pressed() {
    $("#instruction").html("Выберите буквы в порядке алфавита")
    $("#instruction").css('font-size', '4vh')

    lvlNum = 21
    lvl3Result = lvl2Result = 0
    gameBlocked = false
    $('#clickText').html('')
    generateLvl()
    clearInterval(timer)
    generateTimer()
    setTimer()
} 

function lvl3Pressed() {
    $("#instruction").html("Определите, что за слово изображено на картинке. Последовательно выберите те картинки, у которых первая буква встречается в алфавите раньше")
    $("#instruction").css('font-size', '4vh')

    lvlNum = 31
    lvl3Result = 0
    gameBlocked = false
    $('#clickText').html('')
    generateLvl()
    clearInterval(timer)
    generateTimer()
    setTimer()
}

function generateLvl() {
    if (lvlNum == 11) {
        generateLvl1(1)
    } else if (lvlNum == 12) {
        generateLvl1(2)
    } else if (lvlNum == 13) {
        generateLvl1(3)
    } else if (lvlNum == 21) {
        generateLvl2(1)
    } else if (lvlNum == 22) {
        generateLvl2(2)
    } else if (lvlNum == 23) {
        generateLvl2(3)
    } else if (lvlNum == 31) {
        generateLvl3(1)
    } else if (lvlNum == 32) {
        generateLvl3(2)
    } else {
        generateLvl3(3)
    }
}

function generateLvl1(sublvlNum) {
    removeBlocks()
    blockNum = 5
    createBlocks()
    hideResult()

    let maxNum = 0
    for (i = 0; i < sublvlNum; i++) {
        maxNum = maxNum * 10 + 9
    }
    generateSequanceLVL1(maxNum)

    changeBlockContent()
    generateBlockPositions()
    changeBlockPositon()
}

function generateLvl2(sublvlNum) {
    removeBlocks()
    blockNum = 3 + sublvlNum
    createBlocks()
    generateLvl1_2Blocks()
    
    hideResult()
    generateSequanceLVL2()
    changeBlockContent()
    generateBlockPositions()
    changeBlockPositon()
}

function generateLvl3() {
    removeBlocks()
    blockNum = 10
    createBlocks()
    generateSequanceLVL3()
    generateLvl3Blocks()
    hideResult()
    generateBlockPositions()
    changeBlockPositon()
}

function hideResult() {
    $('#resultText').hide()
    $('#restartButton').hide()
    $('#nextButton').hide()
    $('#saveButton').hide()
    $('#congratulations').hide()
}

function generateSequanceLVL1(number) {
    sortedSequence = []
    for (i = 0; i < blockNum; i++) {
        let num = getRandNum(number)
        
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

    sortedSequence.sort(function(a, b) {
        if (a < b) {
            return -1
        } else if (a > b) {
            return 1
        }
    })
}

function generateSequanceLVL2() { 
    sortedSequence = []
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
   let chaosSequence = ['арбуз', 'балерина', 'веер', 'груша', 'дерево', 'елка', 'кот', 'лампочка', 'морковка', 'носок', 'папка', 'радио', 'свечка', 'телефон', 'утюг', 'фотоаппарат', 'циркуль', 'шестерня', 'юла', 'яблоко']
   chaosSequence.sort(() => Math.random() - 0.5)

   let newSequence = []
   for (i = 0; i < blockNum; i++) {
       newSequence[i] = chaosSequence[i]
   }
   newSequence.sort()
   sortedSequence = newSequence
}

function savePressed() {
    const a = document.createElement('a');
    let msg = 'Пользователь под именем ' + username + ' прошел игру!\n' + 'Значение таймера: ' + timerCount + '\n' + 'Очки за первый уровень: ' + lvl1Result + '\nОчки за второй уровень: ' + lvl2Result + '\nОчки за третий уровень: ' + lvl3Result
    const file = new Blob([msg], {type: 'text/plain'});
    
    a.href= URL.createObjectURL(file);
    let dt = new Date()
    a.download = username + ' ' + dt.getDate() + '.' + dt.getMonth() + '.' + dt.getFullYear() + ' ' + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + '.txt';
    a.click();
    URL.revokeObjectURL(a.href);
}

function blockPressed(evt) {
    if(gameBlocked) {
        return
    }

    let blockIndex = +/\d+/.exec(evt.id)
    let previousBlocksAreHidden = true
    for (i = 1; i < blockIndex; i++) {
        if ($('#block' + i).is(":hidden") === false) {
            previousBlocksAreHidden = false
        }
    }
                                
    if (previousBlocksAreHidden) {
        $('#block' + blockIndex).hide()
        
        let clickText = $('#clickText').html()
        $('#clickText').html(clickText + ' ' + sortedSequence[blockIndex-1])
        
        
        if (blockIndex == blockNum) {
            $('#clickText').html('')
            clearInterval(timer)
            if (lvlNum == 33) {
                showResult()
            } else {
                $('#nextButton').show()
            }
        }
    } else {
        $('#block' + blockIndex).css('background', '#f44')
        $('#block' + blockIndex).css('border-color', '#c00')
        $('#clickText').html('')
        gameBlocked = true
        clearInterval(timer)
        $('#resultText').text('Вы ошиблись : (')
        $('#resultText').show()
        $('#restartButton').show()
    }

}

function nextPressed() {
    if(lvlNum >= 11 && lvlNum <= 13) {
        lvl1Result = lvl1Result + timerValue
    } else if (lvlNum >= 21 && lvlNum <= 23) {
        lvl2Result = lvl2Result + timerValue
    } else {
        lvl3Result = lvl3Result + timerValue
    }

    if(lvlNum >= 11 && lvlNum < 13 || lvlNum >= 21 && lvlNum < 23 || lvlNum >= 31 && lvlNum < 33) {
        lvlNum++
    } else if (lvlNum == 13) {
        lvlNum = 21
        $('#lvl2Button').show()
        lvl2Pressed()
        return
    } else if (lvlNum == 23) {
        blockNum = 5
        lvlNum = 31
        $('#lvl3Button').show()
        lvl3Pressed()
        return
    }

    generateTimer()
    setTimer()
    showBlocks()
    generateLvl()
}

function showResult() {
    $('#resultText').text('Вы справились! Теперь можете сохранить свой результат')
    $('#resultText').show()
    $('#saveButton').show()
    $('#congratulations').show()
}

function restartLvl() {
    showBlocks()
    if (lvlNum === 11 || lvlNum === 12 || lvlNum === 13) {
        lvl1Pressed()
    } else if (lvlNum === 21 || lvlNum === 22 || lvlNum === 23) {
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
    $('header').css("background-color", "#036F03");
    $('nav').css("background-color", "#4A4");
    $('#siteBody').css("background-color", "#fcf");
    $('#footer').css("background-color", "#031f13");
}

function secondColorDesign() {
    $('header').css("background-color", "#aa222b");
    $('nav').css("background-color", "#dd555e");
    $('#siteBody').css("background-color", "#afa");
    $('#footer').css("background-color", "#1f0303");
}

