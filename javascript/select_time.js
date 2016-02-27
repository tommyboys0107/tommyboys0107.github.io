
function Year(){
    var select1 = document.getElementById("year");
    var select2 = document.getElementById("edit_year");
    var select3 = document.getElementById("freeze_year");

    for(var i = 1930; i <= new Date().getFullYear(); i++){
        select1.innerHTML += ("<option value = " + i.toString() + ">" + i.toString() + "</option>");
        select2.innerHTML += ("<option value = " + i.toString() + ">" + i.toString() + "</option>");
    }

    for(var i = new Date().getFullYear(); i <= new Date().getFullYear() + 2; i++){
        select3.innerHTML += ("<option value = " + i.toString() + ">" + i.toString() + "</option>");
    }
}

function Month(){
    var select1 = document.getElementById("month");
    var select2 = document.getElementById("edit_month");
    var select3 = document.getElementById("freeze_month");

    for(var i = 1; i <= 12; i++){
        select1.innerHTML += ("<option value = " + i.toString() + ">" + i.toString() + "</option>");
        select2.innerHTML += ("<option value = " + i.toString() + ">" + i.toString() + "</option>");
        select3.innerHTML += ("<option value = " + i.toString() + ">" + i.toString() + "</option>");
    }
}

function Day(){
    var select1 = document.getElementById("day");
    var select2 = document.getElementById("edit_day");
    var select3 = document.getElementById("freeze_day");

    for(var i = 1; i <= 31; i++){
        select1.innerHTML += ("<option value = " + i.toString() + ">" + i.toString() + "</option>");
        select2.innerHTML += ("<option value = " + i.toString() + ">" + i.toString() + "</option>");
        select3.innerHTML += ("<option value = " + i.toString() + ">" + i.toString() + "</option>");
    }
}

function Hour(){
    var select3 = document.getElementById("freeze_hour");

    for(var i = 0; i <= 23; i++){
        select3.innerHTML += ("<option value = " + i.toString() + ">" + i.toString() + "</option>");
    }
}

function Minute(){
    var select3 = document.getElementById("freeze_minute");

    for(var i = 0; i <= 59; i++){
        select3.innerHTML += ("<option value = " + i.toString() + ">" + i.toString() + "</option>");
    }
}
