var leftTopStrs = [
    'Если проблему можно решить за деньги, то это не проблема, это – расходы',
    'Продам гараж',
    'ʕ༼◕ ౪ ◕✿༽ʔ',
    'Надпись на голубом фоне',
    'Ну почему никто не замечает, что я ягодка?!',
    'От знаний еще никто не умирал... Хотя скелет в кабинете биологии настораживает'
];

var leftTopStrIndex = 0;
var rightBottomMode = 'clock';
var rightTopMode = 'cat';

$(document).ready(function () {
    setupLeftTop();
    setupRightTop();
    setupLeftBottom(255, 85, 255);
    setupRightBottom();

    setInterval (setupRightBottom, 100);
});

function setupLeftTop() {
    let leftTop = $('#left-top');
    leftTop.css('font-size', '200%');
    leftTop.css('font-family', 'Consolas');

    leftTop.html(leftTopStrs[leftTopStrIndex]);
}

function setupRightTop() {
    let rightTop = $('#right-top img');
    
    if (rightTopMode == 'cat') {
        rightTop.attr('src', 'img/cat.jpg');
    } else {
        rightTop.attr('src', 'img/dog.jpg');
    }
}

function setupLeftBottom(r, g, b) {
    let colorStr = '#' + r.toString(16) + g.toString(16) + b.toString(16);

    $('#left-bottom').css('background-color', colorStr);
}

function setupRightBottom() {
    let rightBottom = $('#right-bottom');
    rightBottom.css('font-size', '450%');
    rightBottom.css('font-family', 'Consolas');

    let time = new Date();
    if (rightBottomMode == 'clock') {
        let hour = time.getHours();
        if (hour < 10) hour = '0' + hour;
        let minute = time.getMinutes();
        if (minute < 10) minute = '0' + minute;
        let second = time.getSeconds();
        if (second < 10) second = '0' + second;

        rightBottom.html(hour + ':' + minute + ':' + second);
    } else {
        let day = time.getDate();
        if (day < 10) day = '0' + day;
        let month = time.getMonth();
        if (month < 10) month = '0' + month;
        let year = time.getFullYear();

        rightBottom.html(day + '.' + month + '.' + year);
    }
}

function leftTopClick () {
    leftTopStrIndex++;
    leftTopStrIndex %= leftTopStrs.length;
    setupLeftTop();
}

function rightTopClick() {
    if (rightTopMode == 'cat') {
        rightTopMode = 'dog';
    } else {
        rightTopMode = 'cat';
    }

    setupRightTop();
}

function leftBottomClick() {
    let r = randInt(0, 255);
    let g = randInt(0, 255);
    let b = randInt(0, 255);

    setupLeftBottom(r, g, b);
}

function rightBottomClick() {
    if (rightBottomMode == 'clock') {
        rightBottomMode = 'date';
    } else {
        rightBottomMode = 'clock';
    }
}

function randInt(min, max) {
    var rand = min + Math.random() * (max - min + 1)
    rand = Math.floor(rand);
    return rand;
}