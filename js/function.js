function calcResult() {
    let A = $("#A").val();
    let B = $("#B").val();
    let answerField = $("#functionTaskAnswer");
    let answerValue = 'D = '

    let D = Math.pow(Math.pow(A, 2)+Math.pow(B, 2),0.5)
    answerValue += D;
    let r = D/2
    answerValue += ' r = ' + r
    let d = r * 2;
    answerValue += " d = " + d;
    let P = 2 * Math.PI * r;
    answerValue += " P = " + P;
    let S = Math.PI * Math.pow(r, 2);
    answerValue += " S = " + S;

    answerField.html(answerValue)
    answerField.css("display", "block");
}