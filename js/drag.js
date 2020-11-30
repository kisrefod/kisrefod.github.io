var angleCatTail = 0;
var angleCatBack = 0;
var angleCatFront = 0;
var angleCatHead = 0;

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('walkingCat').hidden = true 
    document.getElementById('congratulations').hidden = true

    let cats = document.getElementsByClassName('cats')
    let count = 0
    for(let cat of cats) {
        let moved
        cat.onmousedown = function(e) {
            moved = false

            let coords = getCoords(cat);
            let shiftX = e.pageX - coords.left;
            let shiftY = e.pageY - coords.top;

            cat.style.position = 'absolute';
            document.body.appendChild(cat);
            moveAt(e);

            function moveAt(e) {
                let left = e.pageX - shiftX
                if (left >= 0 && left <= 900) {
                    cat.style.left = left + 'px'
                }
                

                let top = e.pageY - shiftY
                if (top >= 160 && top <= 500) {
                    cat.style.top = top + 'px'
                }
                
            }

            document.onmousemove = function(e) {
                moved = true
                moveAt(e);
            };

            cat.onmouseup = function() {
                if (moved === false) {
                    catRotate(cat)
                }

                checkImg()

                document.onmousemove = null;
                cat.onmouseup = null;
            };

        }

        cat.ondragstart = function() {
            return false;
        };

        cat.style.left = count*200 + 'px'
        count++
        cat.style.top = (count % 2)*200 + 50 + 'px'
    }
});

function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

function catRotate(cat) {
    let angle = 0
    if(cat.id === 'catTail') {
        angleCatTail = (angleCatTail+90) % 360
        angle = angleCatTail
    } else if (cat.id === 'catBack') {
        angleCatBack = (angleCatBack+90) % 360
        angle = angleCatBack
    } else if (cat.id === 'catFront') {
        angleCatFront = (angleCatFront+90) % 360
        angle = angleCatFront
    } else if (cat.id === 'catHead') {
        angleCatHead = (angleCatHead+90) % 360
        angle = angleCatHead
    }
}

function checkImg() {
    let catTail = document.getElementById('catTail')
    let catBack = document.getElementById('catBack')
    let catFront = document.getElementById('catFront')
    let catHead = document.getElementById('catHead')

    let ideal = calcIdeal(angleCatTail)

    let tailBackX = catBack.x - catTail.x 
    let tailBackY = catBack.y - catTail.y 
    let backFrontX = catFront.x - catBack.x 
    let backFrontY = catFront.y - catBack.y 
    let frontHeadX = catHead.x - catFront.x 
    let frontHeadY = catHead.y - catFront.y 
    let headTailX = catTail.x - catHead.x 
    let headTailY = catTail.y - catHead.y 

    let deviation = Math.max(
        Math.abs(tailBackX - ideal.tailBackX),
        Math.abs(tailBackY - ideal.tailBackY),
        Math.abs(backFrontX - ideal.backFrontX),
        Math.abs(backFrontY - ideal.backFrontY),
        Math.abs(frontHeadX - ideal.frontHeadX),
        Math.abs(frontHeadY - ideal.frontHeadY),
        Math.abs(headTailX - ideal.headTailX),
        Math.abs(headTailY - ideal.headTailY)
    )

    let anglesAreEqual = (angleCatTail === angleCatBack) && (angleCatBack === angleCatFront) && (angleCatFront === angleCatHead)
    
        console.log(deviation)

    if (anglesAreEqual && deviation < 10) {
        animateWalkingCat(catTail.x, catTail.y)
    }
}

function calcIdeal(angle) {
    if(angle === 0) {
        return {    
            tailBackX: 21,
            tailBackY: 84,
            backFrontX: 156,//В идеале = 156
            backFrontY: 70, //В идеале = 70
            frontHeadX: 20, //В идеале = 20
            frontHeadY: -80, //В идеале = -80
            headTailX: -197, //В идеале = -197
            headTailY: -74//В идеале = -74
        }
    } else if (angle === 90) {
        return {
            tailBackX: -167,
            tailBackY: 20,
            backFrontX: 14,
            backFrontY: 156,
            frontHeadX: 152,
            frontHeadY: 15,
            headTailX: 1,
            headTailY: -191,
        }
    } else if (angle === 180) {
        return {
            tailBackX: -75,
            tailBackY: -168,
            backFrontX: -185,
            backFrontY: 13,
            frontHeadX: 1,
            frontHeadY: 153,
            headTailX: 259,
            headTailY: 2
        }
    } else if (angle === 270) {
        return {
            tailBackX: 85,
            tailBackY: -78,
            backFrontX: 70,
            backFrontY: -183,
            frontHeadX: -80,
            frontHeadY: 0,
            headTailX: -75,
            headTailY: 261
        }
    }
}

function animateWalkingCat(x, y) {
    document.getElementById('catTail').hidden = true
    document.getElementById('catBack').hidden = true
    document.getElementById('catFront').hidden = true
    document.getElementById('catHead').hidden = true
    document.getElementById('walkingCat').hidden = false
    document.getElementById('congratulations').hidden = false
    document.getElementById('walkingCat').style.marginLeft = x/1.2 + 'px'
    document.getElementById('walkingCat').style.marginTop = y/3.5 + 'px'
}