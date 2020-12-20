$(document).ready(function() {
    var overlay = $('#overlay');
    var openModal = $('.openModal');
    var close = $('.modalClose, #overlay, #settingApply');
    var modal = $('.modalDiv');

    openModal.click( function(event){//Открытие настроек
        gameBlocked = true
        clearInterval(timer)
        showSettings()

        event.preventDefault();
        var div = $(this).attr('href');
        overlay.fadeIn(400,
            function(){
                $(div)
                .css('display', 'block')
                .animate({opacity: 1, top: '30%'}, 200); // плaвнo пoкaзывaем
        });
    });

    close.click( function(){//Закрытие настроек
        lvl1Pressed()
        modal
        .animate({opacity: 0, top: '45%'}, 200,
        function(){
            $(this).css('display', 'none');
            overlay.fadeOut(400);
        }
        );
    });
});

function showSettings() {
    $('#username').val(username)
    $('#timerCount').val(timerCount)
}

function settingApply() {
    let newUsername = $('#username').val()
    let newTimerCount = $('#timerCount').val()

    removeBlocks()

    username = newUsername

    if (newTimerCount < 3) {
        timerCount = 3
    } else {
        timerCount = newTimerCount
    }

    createBlocks()
    disableLvls()
}