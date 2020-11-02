$(document).ready(function () {
    $("#jsTaskInput").on("keypress", checkInput);
});

function checkInput(event) {
    let regexp = /[0-9]/;
    let word = String.fromCharCode(event.keyCode);
    return regexp.test(word);
}

function chooseProduct(){
    let money = $("#jsTaskInput").val();
    let answer = $("#jsTaskAnswer");
    if (money < 300) {
      answer.html("Вы не можете ничего приобрести, купите деньги");
    } else if (money >= 300 && money <= 3000) {
      answer.html("Вы можете приобрести наш замечательный ЧАЙНИК!");
    } else if (money >= 3001 && money <= 10000) {
      answer.html("Вы можете приобрести нашу великолепную МИКРОВОЛНОВКУ!");
    } else {
      answer.html("Вы можете приобрести наш грандиозный ХОЛОДИЛЬНИК!");
    }
    answer.css("display", "block");
}

function firstTaskPressed() {
    $('#site').show();
    $('.cssTask').hide();
    $('.flexTask').hide();
    $('.jsTask').hide();
    $(".functionTask").hide();
    $(".DOMTask").hide();
}

function secondTaskPressed() {
    $('#site').hide();
    $('.cssTask').show();
    $('.flexTask').hide();
    $('.jsTask').hide();
    $(".functionTask").hide();
    $(".DOMTask").hide();
} 

function thirdTaskPressed() {
    $('#site').hide();
    $('.cssTask').hide();
    $('.flexTask').show();
    $('.jsTask').hide();
    $(".functionTask").hide();
    $(".DOMTask").hide();
}

function fourthTaskPressed(){
    $('#site').hide();
    $('.cssTask').hide();
    $('.flexTask').hide();
    $('.jsTask').show();
    $(".functionTask").hide();
    $(".DOMTask").hide();
}

function fifthTaskPressed(){
    $('#site').hide();
    $(".cssTask").hide();
    $(".flexTask").hide();
    $(".jsTask").hide();
    $(".functionTask").show();
    $(".DOMTask").hide();
}

function DOMTaskPressed(){
    $('#site').hide();
    $(".cssTask").hide();
    $(".flexTask").hide();
    $(".jsTask").hide();
    $(".functionTask").hide();
    $(".DOMTask").show();
}