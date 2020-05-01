//JQuery

//export {users}; //so the validation can see the users
var users;

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

$(function () {
    $().ready(function () {
        users = [];
        $("#game_form").submit(function(e){
            e.preventDefault();
        })
        $("#registerForm").submit(function(e){
            e.preventDefault();
        })
        $("#login_f").submit(function(e){
            e.preventDefault();
        })
        users.push(pUser = {
            username: "p",
            password: "p",
            firstname: "p",
            lastname: "p",
            email: "p@p.com",
            day: "1",
            month: "1",
            year: "2020"
        });

        $.validator.addMethod("validateStringWithoutInt", function (value) {
            var reg = new RegExp("^[^0-9]+$");
            if (reg.test(value)) {
                return true;
            }
            else {
                return false;
            }
        }, "Please Enter this field without numbers");

        $.validator.addMethod("validatePassword", function (value) {
            var regLetter = new RegExp("[A-Za-z]");
            var regDigit = new RegExp(".*[0-9].*");
            if (regLetter.test(value) && regDigit.test(value)) {
                return true;
            }
            else {
                return false;
            }
        }, "Please enter a valid password with digits and letters");

        $.validator.addMethod("validateEmail", function (value) {
            var reg = new RegExp('^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})$');
            if (reg.test(value)) {
                return true;
            }
            else {
                return false;
            }
        }, "Please enter a valid mail address");

        $.validator.addMethod("uniqueUsername", function (value) {
            var i = 0;
            while (i < users.length) {
                if (users[i].username == value) {
                    return false;
                }
                i++;
            }
            return true;
        }, "Username already exists in the system");

        $("form[name='registerForm']").validate({
            rules: {
                username: {
                    required: true,
                    uniqueUsername: true
                },
                password: {
                    validatePassword: true,
                    required: true,
                    minlength: 6
                },
                firstname: {
                    validateStringWithoutInt: true,
                    required: true
                },
                lastname: {
                    validateStringWithoutInt: true,
                    required: true
                },
                email: {
                    validateEmail: true,
                    required: true
                },
                year: {
                    required: true
                },
                day: {
                    required: true
                },
                month: {
                    required: true
                }
            },
            messages:{
                username:{
                    required: "Please fill the username",
                    uniqueUsername: "Username already exists in the system",
                },
                password:{
                    required: "Please fill the password",
                    minlength: "The length of your password must be at least 6",
                    validatePassword:"Please enter a valid password with digits and letters"
                },
                firstname:{
                    required: "Please fill the first name",
                    validateStringWithoutInt: "Please Enter the first name without number"
                },
                lastname:{
                    required: "Please fill the last name",
                    validateStringWithoutInt: "Please Enter the last name without number"
                },
                email:{
                    required: "Please fill the email",
                    validateEmail: "Please enter a valid mail address"
                }          
            },
            errorContainer: $('#errorContainer'),
            errorLabelContainer: $('#errorContainer ul'),
            wrapper: 'li',
            submitHandler: function (form) {
                form.submit();
            }
        })
    });
});


function addNewUser() {
    if ($("form[name='registerForm']").valid()) {
        var tempUser = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            firstname: document.getElementById("firstname").value,
            lastname: document.getElementById("lastname").value,
            email: document.getElementById("email").value,
            day: document.getElementById("day").value,
            month: document.getElementById("month").value,
            year: document.getElementById("year").value
        }

        //put the user in the users array
        users.push(tempUser);
        window.alert("You are now registered");

        //clean the text box
        document.getElementById('username').value = "";
        document.getElementById('password').value = "";
        document.getElementById('firstname').value = "";
        document.getElementById('lastname').value = "";
        document.getElementById('email').value = "";
        document.getElementById('day').setAttribute = 1;
        document.getElementById('month').setAttribute = 1;
        document.getElementById('year').setAttribute = 2020;

        document.getElementById("register").style.display="none";
        document.getElementById("welcome_page").style.display="block";


    }
    else {
        alert("Please finish to fix the registeration form");
    }
}


function validateUser(event) {
    var flag = 0;
    var username = document.getElementById('login_username').value;
    var password = document.getElementById('login_password').value;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            if (users[i].password === password) {
                flag = 1;
                //open the game page
                alert("Enjoy!") //delete later
                document.getElementById("user_label").innerText="Hello"+" "+username+"!";
                changePage(event,'game_settings');
            }
            else {
                alert("Wrong password, please try again");
                flag = 1;
            }
        }
    }
    if (!Boolean(flag)) {
        alert("Username doesn't exist in the system");
    }
}

function changePage(event, page) {

    // Get all elements with class="tabcontent" and hide them
    var tabcontent = document.getElementsByClassName("tabcontent");
    var i = 0;
    while (i < tabcontent.length) {
        tabcontent[i].style.display = "none";
        i++;
    }

    var welcome = document.getElementById("welcome_page").style.display="none";

    // Get all elements with class="tablinks" and remove the class "active"
    var tablinks = document.getElementsByClassName("tablinks");

    var j = 0;
    while (j < tablinks.length) {
        tablinks[j].className = tablinks[j].className.replace(" active", "");
        j++;
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    var tempPage = document.getElementById(page);
    tempPage.style.display = "block";

    event.currentTarget.className += " active";

}

function openGamePage(){
    var gamePage = document.getElementById("game");
    gamePage.style.display="block";
    document.getElementById("play").disabled = true;
	document.getElementById("restart").disabled = false;
    Start();
}

function getRandomGameSettings(){
    //random colors
    document.getElementById("favcolor_leg").value='#'+Math.random().toString(16).substr(-6);
    document.getElementById("favcolor_com").value='#'+Math.random().toString(16).substr(-6);
    document.getElementById("favcolor_ep").value='#'+Math.random().toString(16).substr(-6);
    //random monster
    //Math.random() * (max - min) + min
    var valueM = Math.floor((Math.random()*(4-1)+1));
    document.getElementById("rangeMonstersInput").value=valueM;
    document.getElementById("amountMonsters").value=valueM;

    //random food
    var valueF = Math.floor((Math.random()*(90-50)+50));
    document.getElementById("rangeBallsInput").value=valueF;
    document.getElementById("amountBalls").value=valueF;

    //default key boards
    document.getElementById("key_up").value="ArrowUp";
    document.getElementById("key_down").value="ArrowDown";
    document.getElementById("key_right").value="ArrowRight";
    document.getElementById("key_left").value="ArrowLeft";

    //number of seconds
    document.getElementById("num_seconds").value=Math.floor((Math.random()*(180-60)+60));

}







