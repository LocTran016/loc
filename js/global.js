import { loadFontawesome } from fontawesome.js

function flashtext(ele, col) {
    var tmpColCheck = document.getElementById(ele).style.color;

    if (tmpColCheck === 'silver') {
        document.getElementById(ele).style.color = col;
    } else {
        document.getElementById(ele).style.color = 'silver';
    }
}

setInterval(function () {
    flashtext('hello-world', 'red');
}, 500); //set an interval timer up to repeat the function