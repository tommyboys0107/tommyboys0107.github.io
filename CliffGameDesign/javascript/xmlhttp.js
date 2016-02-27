var xmlhttp;

function LoadXMLDoc(url, func, data){
    if(window.XMLHttpRequest){ // for IE+, firefox, chrome, opera, safari
        xmlhttp = new XMLHttpRequest();
        
    }
    else{ //for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = func;
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(data);
}

function Login(){   //登入時判別使用者
    LoadXMLDoc("php/login.php", function(){             
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                var obj = JSON.parse(xmlhttp.responseText);            
                if(obj == "player"){ //div.js
                    document.getElementById("h1").innerHTML = "Hello Player!";
                    Player();
                }
                else if(obj == "mgr"){
                    document.getElementById("h1").innerHTML = "Hello Manager!";
                    Mgr();
                }
                else if(obj == "admin"){
                    document.getElementById("h1").innerHTML = "Hello Administrator!";
                    Admin();
                }
                else if(obj == "member"){
                    alert("Something wrong with your account. \n Please contact web administrator.");
                }
                else if(obj == "freeze"){
                    alert("Your Account is freezing \n Please contact game manager.");
                }
                else if(obj == "nodata"){
                    alert("Wrong account or wrong password. \n Please try again.");
                }
                else{
                    alert("Something went wrong. \n Please contact web administrator again.");
                }
            }
        }
        , "account=" + account.value + 
        "&password=" + password.value);
}

function Logout(){
    LoadXMLDoc("php/logout.php", function(){
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                window.location.reload();;
            }
            }
            , "");
}

function Histroy(){ // 刷新時判別使用者
    LoadXMLDoc("php/login.php", function(){             
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                var obj = JSON.parse(xmlhttp.responseText);
                if(obj == "player"){ //div.js
                    document.getElementById("h1").innerHTML = "Hello Player!";
                    Player();
                }
                else if(obj == "mgr"){ 
                    document.getElementById("h1").innerHTML = "Hello Manager!";
                    Mgr();
                }
                else if(obj == "admin"){
                    document.getElementById("h1").innerHTML = "Hello Administrator!";
                    Admin();
                }
            }
        }
        , "");
}

function Player(){
    document.getElementsByTagName('body')[0].style.background = "url(http://localhost:81/image/profile.png)";
    IdAttribute("login_div", "0", "400px", "275px", "-1000px","0px");
    IdAttribute("sign_div", "0", "0px", "0px", "-1000px", "0px");               
    IdAttribute("player_div", "1", "120px", "300px", "0px", "750px");
}

function Mgr(){
    document.getElementsByTagName('body')[0].style.background = "url(http://localhost:81/image/profile.png)";
    IdAttribute("login_div", "0", "400px", "275px", "-1000px","0px");
    IdAttribute("sign_div", "0", "0px", "0px", "-1000px", "0px");               
    IdAttribute("player_div", "1", "120px", "300px", "0px", "750px");
    IdAttribute("mgr_div", "1", "120px", "120px", "0px", "750px");
}

function Admin(){
    document.getElementsByTagName('body')[0].style.background = "url(http://localhost:81/image/profile.png)";
    IdAttribute("login_div", "0", "400px", "275px", "-1000px","0px");
    IdAttribute("sign_div", "0", "0px", "0px", "-1000px", "0px");               
    IdAttribute("player_div", "1", "120px", "300px", "0px", "750px");
    IdAttribute("admin_div", "1", "120px", "120px", "0px", "925px");
}

function Sign(){
    var info, sex, cmonth = Fixdate(month.value), cday = Fixdate(day.value);//all input
    var radios = document.getElementsByName('sex');

    for (var i = 0, length = radios.length; i < length; i++) {//找出SEX之值
        if (radios[i].checked){
            sex = radios[i].value;
            break;
        }
    }

    info = "Following are your profile." +
        "\nCGD Account = " + sign_account.value + 
        "\nPassword = " + sign_password.value + 
        "\nPassword confirm = " + sign_confirm.value + 
        "\nFirst name = " + first_name.value +
        "\nLast name = " + last_name.value +
        "\nNickname = " + nickname.value +
        "\nE-mail = " + email.value +
        "\nSex = " + sex +
        "\nBirth = " + year.value + "-" + cmonth + "-" + cday +
        "\n";
    if(!isNaN(parseInt(year.value)) && !isNaN(parseInt(month.value)) && !isNaN(parseInt(day.value)) && sex != undefined){ //check birth and sex
        if(confirm(info)){
            LoadXMLDoc("php/sign.php", function(){
                    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                        var obj = JSON.parse(xmlhttp.responseText);
                        if(obj == "blank"){
                            alert("[GCD Account], [Password], [Password confirm], \n[First name], [Last name], [E-mail] \n[Sex], [Brith] must not be blank. \n Please make sure they are filled.");
                        }
                        else if(obj == "repeat"){
                            alert("The account already exists. \n Please try another one.");
                        }
                        else if(obj == "not_valid"){
                            alert("Your e-mail is not valid. \n Please try another one.");
                        }
                        else if(obj == "not_equal"){
                            alert("Your password and password confirm are not equal. \n Please make sure they are equal.");
                        }
                        else if(obj == "success"){
                            alert("Congratulations !\nYour account is avaliable now. \n Use your account and password to login.");
                        }
                        else if(obj == "roll"){
                            alert("Creation problem occurred. \n Please contact web administrator.");
                        }
                        else{// faliled or other
                            alert("Something went wrong. \n Please contact web administrator.");
                        }
                    }
                    }
                    ,"account=" + sign_account.value + 
                    "&password=" + sign_password.value + 
                    "&confirm=" + sign_confirm.value + 
                    "&first_name="+ first_name.value +
                    "&last_name=" + last_name.value +
                    "&nickname=" + nickname.value +
                    "&email=" + email.value +
                    "&sex=" + sex +
                    "&birth=" + year.value + "-" + cmonth + "-" + cday );
        }
    }
    else{
        alert("[GCD Account], [Password], [Password confirm], \n[First name], [Last name], [E-mail] \n[Sex], [Brith] must not be blank. \n Please make sure they are filled.");
    }
}

function Profile(){
    LoadXMLDoc("php/profile.php", function(){
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                var obj = JSON.parse(xmlhttp.responseText);
                if(obj != "failed"){
                    document.getElementById("profile_item").innerHTML = 
                        '<p class = "item">Account&nbsp:&nbsp<span style="color:black">' + obj.Account + '</span></p>'
                       + '<p class = "item">First&nbspname&nbsp:&nbsp<span style="color:black">' + obj.First_name + '</span></p>'
                       + '<p class = "item">Last&nbspname&nbsp:&nbsp<span style="color:black">' + obj.Last_name + '</span></p>'
                       + '<p class = "item">Nickname&nbsp:&nbsp<span style="color:black">' + obj.Nickname + '</span></p>'
                       + '<p class = "item">E-mail&nbsp:&nbsp<span style="color:black">' + obj.Email + '</span></p>'
                       + '<p class = "item">Sex&nbsp:&nbsp<span style="color:black">' + obj.Sex + '</span></p>'
                       + '<p class = "item">Birth&nbsp:&nbsp<span style="color:black">' + obj.Birth + '</span></p>';
                    All_return();
                    Profile_move();
                }
                else{
                    alert("Something went wrong. \n Please contact web administrator.");
                }
            }
            },
            "");
}

function Profile_edit(){
    All_return();
    Edit_move();
}

function Edit(){
    var info, sex, cmonth = Fixdate(edit_month.value), cday = Fixdate(edit_day.value);//all input
    var radios = document.getElementsByName('edit_sex');
    for (var i = 0, length = radios.length; i < length; i++) {//找出SEX之值
        if (radios[i].checked){
            sex = radios[i].value;
            break;
        }
    }
    info = "Following are your new profile." + 
        "\nPassword = " + edit_password.value + 
        "\nPassword confirm = " + edit_confirm.value + 
        "\nFirst name = " + edit_first_name.value +
        "\nLast name = " + edit_last_name.value +
        "\nNickname = " + edit_nickname.value +
        "\nE-mail = " + edit_email.value +
        "\nSex = " + sex +
        "\nBirth = " + edit_year.value + "-" + cmonth + "-" + cday +
        "\n";
    if(!isNaN(parseInt(edit_year.value)) && !isNaN(parseInt(edit_month.value)) && !isNaN(parseInt(edit_day.value)) && sex != undefined){ //check birth and sex
        if(confirm(info)){
            LoadXMLDoc("php/edit.php", function(){
                    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                    //document.getElementById("h1").innerHTML = xmlhttp.responseText;
                        var obj = JSON.parse(xmlhttp.responseText);
                        
                        if(obj == "blank"){
                            alert("[Password], [Password confirm], \n[First name], [Last name], [E-mail] \n[Sex], [Brith] must not be blank. \n Please make sure they are filled.");
                        }
                        else if(obj == "not_valid"){
                            alert("Your e-mail is not valid. \n Please try another one.");
                        }
                        else if(obj == "not_equal"){
                            alert("Your password and password confirm are not equal. \n Please make sure they are equal.");
                        }
                        else if(obj == "success"){
                            alert("Success !\nYour account profile has changed.");
                        }
                        else{// faliled or other
                            alert("Something went wrong. \n Please contact web administrator.");
                        }
                    }
                    }
                    , "&password=" + edit_password.value + 
                    "&confirm=" + edit_confirm.value + 
                    "&first_name="+ edit_first_name.value +
                    "&last_name=" + edit_last_name.value +
                    "&nickname=" + edit_nickname.value +
                    "&email=" + edit_email.value +
                    "&sex=" + sex +
                    "&birth=" + edit_year.value + "-" + cmonth + "-" + cday );
        }
    }
    else{
        alert("[Password], [Password confirm], \n[First name], [Last name], [E-mail] \n[Sex], [Brith] must not be blank. \n Please make sure they are filled.");
    }
}

function Game(){    //play  call gamename() function
    LoadXMLDoc("php/game.php", function(){
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
               var objs = Objects_parse(xmlhttp.responseText);
               var content = "";

               for(var i = 0; i < objs.length; i++){
                    content +=  
                        'Game&nbspname&nbsp:&nbsp<span style="color:black">' + objs[i]["Game_name"] + '</span>'
               +         '<input type = "button" value = "Play" style = "cursor : pointer" class = "button"'
               +         'onclick = "' + objs[i]["Game_name"].replace(" ", "_") + '()"'
               +         'onmousedown = "document.getElementById("edit").style.color = "red""' 
               +         'onmouseup = "document.getElementById("edit").style.color = "black""'
               +         'onmouseout = "document.getElementById("edit").style.color = "black""'
               +         '/><br />'
               + 'Develop&nbspteam&nbsp:&nbsp<span style="color:black">' + objs[i]["Develop_team"] + '</span><br />'
               + 'Version&nbsp:&nbsp<span style="color:black">' + objs[i]["Version"] + '</span><br /><br />';
               }
                document.getElementById("game_div").innerHTML = content;
                    
                All_return();
                Game_move();
            }
            },
            "");
}

function Objects_parse(text){   //將多個物件變成陣列
    var objs = new Array(), obj, left_brace, right_brace, index = 0;
    while(text.indexOf("{") != -1){
        left_brace = text.indexOf("{");
        right_brace = text.indexOf("}");
        obj = JSON.parse(text.slice(left_brace, right_brace + 1));
        objs.push(obj);
        if(right_brace < text.length){
            text = text.slice(right_brace + 1, text.length);
        }
        else{//all done
            break;
        }
    }
    return objs;
}

function Profile_move(){
    IdAttribute("profile_div", "1", "600px", "370px", "950px","0px");
}

function Game_move(){
    IdAttribute("game_div", "1", "600px", "370px", "950px","0px");
}

function Freeze_move(){
    IdAttribute("freeze_div", "1", "600px", "370px", "950px","0px");
}

function Edit_move(){
    IdAttribute("edit_div", "1", "600px", "370px", "950px","0px");
}

function Sql_move(){
     IdAttribute("sql_div", "1", "600px", "370px", "950px","0px");
}

function Rank_move(){
    IdAttribute("rank_div", "1", "0px", "0px", "1025px","0px");
}

function Vicious_spiral_move(){
     IdAttribute("vicious_spiral", "1", "700px", "400px", "925px","0px");
}

function All_return(){  //all div that login user can call out
    IdAttribute("profile_div", "0", "600px", "370px", "0px","0px");
    IdAttribute("game_div", "0", "600px", "370px", "0px","0px");
    IdAttribute("freeze_div", "0", "600px", "370px", "0px","0px");
    IdAttribute("edit_div", "0", "600px", "370px", "0px","0px");
    IdAttribute("vicious_spiral", "0", "700px", "400px", "0px","0px");
    IdAttribute("sql_div", "0", "700px", "400px", "0px","0px");
    IdAttribute("rank_div", "0", "0px", "0px", "0px","0px");
}

function Vicious_spiral(){
        LoadXMLDoc("php/vicious_spiral.php", function(){
                if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                    //document.getElementById("h1").innerHTML = xmlhttp.responseText;
                    All_return();
                    Vicious_spiral_move();
                }

                }
                ,"");
}

function Test(){
    alert("Not avalible for now");
}

function Sql(){
    All_return();
    Sql_move();
}

function Sql_query(){
    if(confirm("Make sure your format is right.\n" + sql_input.value)){
        LoadXMLDoc("php/sql_query.php", function(){
                if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                    alert(xmlhttp.responseText);
                }
                }
                ,"sql=" + sql_input.value);
    }
}

function Freeze(){
    LoadXMLDoc("php/account.php", function(){
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                var objs = Objects_parse(xmlhttp.responseText);

                for(var i = 0; i < objs.length; i++){
                    var temp = document.getElementById("freeze_account");
                    temp.innerHTML += ("<option value = " + objs[i]["Account"] + ">" + objs[i]["Account"] + "</option>");
                }
                All_return();
                Freeze_move();
            }
            }
            ,"");
}

function Freeze_confirm(){
    var cmonth = Fixdate(freeze_month.value), cday = Fixdate(freeze_day.value), chour = Fixdate(freeze_hour.value), cminute = Fixdate(freeze_minute.value);
    info = "Following are your request." + 
        "\nFreeze Account = " + freeze_account.value + 
        "\nUnfreeze_dat = " + freeze_year.value + "-" + cmonth + "-" + cday + " " + chour + ":" + cminute + ":00" + 
        "\nReason = " + freeze_reason.value;
    if(!isNaN(parseInt(freeze_year.value)) && !isNaN(parseInt(freeze_month.value)) && !isNaN(parseInt(freeze_day.value)) && !isNaN(parseInt(freeze_hour.value)) && !isNaN(parseInt(freeze_minute.value))){ //check birth and sex
        if(confirm(info)){
                LoadXMLDoc("php/freeze.php", function(){
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                var obj = xmlhttp.responseText;

                
                if(obj == "blank"){
                    alert("All fields must not be blank. \n Please make sure they are filled.");
                }
                else if(obj == "success"){
                    alert("Success !\nYour freeze request is done.");
                }
                else{// faliled or other
                    alert("Something went wrong. \n Please contact web administrator.");
                }
            }
            }
            ,"account=" + freeze_account.value +
            "&unfreeze_date=" + freeze_year.value + "-" + cmonth + "-" + cday + " " + chour + ":" + cminute + ":00" +
            "&reason=" + freeze_reason.value);
        }
    }
    else{
        alert("All fields must not be blank. \n Please make sure they are filled.");
    }
}

function Fixdate(data){// 小於10 補10位數
    if(!isNaN(parseInt(data))){
        if(parseInt(data) < 10){
                return ("0" + data);
            }
            else{
                return data;
            }
    }
}

function Stage(){
    LoadXMLDoc("php/stage.php", function(){
                if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                    var obj = xmlhttp.responseText;
                    //document.getElementById("h1").innerHTML = xmlhttp.responseText;
                    if(obj == "not_valid"){
                        alert("All fields must not be blank. \n Please make sure they are filled.\n and with correct type\n[Score] and [Exploit] must be number");
                    }
                    else if(obj == "success"){
                        alert("Success !\nYou just pass pass through a mission!");
                    }
                    else if(obj == "repeat"){
                        alert("Stage is already passed");
                    } 
                    else{//faliled or other
                        alert("Something went wrong. \n Please contact web administrator.");
                }
                }
                }
                , "mode=" + mode.value +
                "&area=" + area.value +
                "&mission=" + mission.value +
                "&state=" + state.value +
                "&rank=" + stage_rank.value + 
                "&score=" + score.value +
                "&exploit=" + exploit.value);
}

function Rank(){
     LoadXMLDoc("php/rank.php", function(){
                if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                    if(xmlhttp.responseText == "failed"){
                        alert("Something went wrong. \n Please contact web administrator.");
                    }
                    else{
                        document.getElementById("rank_div").innerHTML = xmlhttp.responseText;
                    }
                    All_return();
                    Rank_move();
                }

                }
                ,"");
}
