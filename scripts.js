function Cat() {
    this.theme;
    this.question1;
    this.question2;
    this.print = function() {
        var a = document.getElementById("div_round_div_question"),
            b;
        b = "" + ("<div class='div_cat' onclick='rounds[" + current_round + "].themes[" + Status[0] + "].questions[" + Status[1] + "].value.printQ(1)'>" + rounds[current_round].points[0] + "</div>");
        b += "<div class='div_cat' onclick='rounds[" + current_round + "].themes[" + Status[0] + "].questions[" + Status[1] + "].value.printQ(2)'>" + rounds[current_round].points[rounds[current_round].points.length - 1] +
            "</div>";
        a.innerHTML = b;
        a.style.display = "block"
    };
    this.printQ = function(a) {
        var b = document.getElementById("div_round_div_question");
        b.style.display = "block";
        Status[4] = 0;
        1 == a ? b.innerHTML = this.question1 : (b.innerHTML = this.question2, Status[4] = rounds[current_round].points.length - 1);
        Status[1] += 10;
        Status[3] = setInterval("printTimer();", 1E3)
    }
}

function Question() {
    this.value;
    this.print = function() {
        document.getElementById("div_round_div_table").style.display = "none";
        for (var a = document.getElementById("div_round_team"), b = 0; b < teams.length; b++) a.getElementsByTagName("div")[3 * b + 1].style.display = "inline-block", a.getElementsByTagName("div")[3 * b + 2].style.display = "inline-block";
        document.getElementById("div_question_timer").style.display = "block";
        document.getElementById("div_question_timer").innerHTML = "" + maxTime;
        document.getElementById("div_question_back").style.display =
            "inline-block";
        "string" == typeof this.value ? (a = document.getElementById("div_round_div_question"), a.style.display = "block", a.innerHTML = this.value, Status[3] = setInterval("printTimer();", 1E3)) : this.value.print()
    }
}

function Theme() {
    this.name;
    this.questions = []
}

function Round() {
    this.themes = [];
    this.points = [];
    this.print = function() {
        document.getElementById("div_round_header").innerHTML = "\u0420\u0430\u0443\u043d\u0434 " + (current_round + 1);
        document.getElementById("div_round_div_question").style.display = "none";
        document.getElementById("div_question_timer").style.display = "none";
        document.getElementById("div_question_back").style.display = "none";
        document.getElementById("div_round_div_table").style.display = "block";
        var a = document.getElementById("div_round_table");
        if (0 >
            Status[0])
            for (var b = 0; b < this.themes.length; b++) {
                a.getElementsByTagName("tr")[b].getElementsByTagName("td")[0].innerHTML = this.themes[b].name;
                for (var c = 0; c < this.points.length; c++) a.getElementsByTagName("tr")[b].getElementsByTagName("td")[c + 1].innerHTML = this.points[c]
            }
        a = document.getElementById("div_round_team");
        for (b = 0; b < teams.length; b++) teams[b].print(a.getElementsByTagName("div")[3 * b]), a.getElementsByTagName("div")[3 * b + 1].style.display = "none", a.getElementsByTagName("div")[3 * b + 2].style.display = "none"
    }
}

function Team() {
    this.name;
    this.points;
    this.print = function(a) {
        a.getElementsByTagName("span")[0].innerHTML = this.name;
        a.getElementsByTagName("span")[1].innerHTML = this.points
    }
}

function print_question(a, b) {
    Status[0] = a;
    Status[1] = b;
    Status[2] = maxTime;
    rounds[current_round].themes[a].questions[b].print()
}

function printTimer() {
    Status[2]--;
    0 >= Status[2] && clearInterval(Status[3]);
    var a = "";
    10 > Status[2] && (a += "0");
    document.getElementById("div_question_timer").innerHTML = a + Status[2]
}

function ans_yes(a) {
    teams[a].points = 10 > Status[1] ? teams[a].points + rounds[current_round].points[Status[1]] : teams[a].points + rounds[current_round].points[Status[4]];
    Status[1] %= 10;
    rounds[current_round].print();
    document.getElementById("div_round_table").getElementsByTagName("tr")[Status[0]].getElementsByTagName("td")[Status[1] + 1].innerHTML = "";
    clearInterval(Status[3]);
    Status[1] = -1
}

function ans_no(a) {
    teams[a].points = 10 > Status[1] ? teams[a].points - rounds[current_round].points[Status[1]] : teams[a].points - rounds[current_round].points[Status[4]];
    teams[a].print(document.getElementById("div_round_team").getElementsByTagName("div")[3 * a]);
    document.getElementById("div_round_team").getElementsByTagName("div")[3 * a + 1].style.display = "none";
    document.getElementById("div_round_team").getElementsByTagName("div")[3 * a + 2].style.display = "none"
}

function click_back() {
    rounds[current_round].print();
    clearInterval(Status[3]);
    Status[1] = -1
}

function click_forw() {
    0 > Status[1] ? next_round() : (rounds[current_round].print(), document.getElementById("div_round_table").getElementsByTagName("tr")[Status[0]].getElementsByTagName("td")[Status[1] % 10 + 1].innerHTML = "", clearInterval(Status[3]), Status[1] = -1)
}

function click_switch_count() {
    var a = document.getElementById("div_round_team");
    if (switch_count) {
        for (b = 0; b < teams.length; b++) a.getElementsByTagName("div")[3 * b].getElementsByTagName("span")[1].className = "hide_points";
        document.getElementById("div_switch_count").innerHTML = "o";
        switch_count = !1
    } else {
        for (var b = 0; b < teams.length; b++) a.getElementsByTagName("div")[3 * b].getElementsByTagName("span")[1].className = "points";
        document.getElementById("div_switch_count").innerHTML = "x";
        switch_count = !0
    }
}

function show_count() {
    switch_count || click_switch_count()
}
var count_round = 0,
    current_round = -1,
    maxTime = 30,
    rounds = [],
    teams = [],
    Status = [],
    switch_count = !1;

function start_game() {
    document.getElementById("div_first_step").style.display = "none";
    document.getElementById("div_round").style.display = "block";
    var a = document.getElementById("text_first_step").value;
    eval(a);
    for (var a = "<table id='div_round_table' class='div_round_div_table'>", b = 0; 6 > b; b++) {
        for (var a = a + "<tr><td class='theme'></td>", c = 0; 5 > c; c++) a += "<td class='point' onclick='print_question(" + b + "," + c + ");'></td>";
        a += "</tr>"
    }
    a += "</table>";
    document.getElementById("div_round_div_table").innerHTML = a;
    a = "<div id='div_round_team'>";
    for (b = 0; b < teams.length; b++) a += "<div class='team'><div class='yes' onclick='ans_yes(" + b + ");'>V</div><div class='no' onclick='ans_no(" + b + ");'>X</div><span class='name'></span><span class='hide_points'></span></div>";
    a += "</div>";
    document.getElementById("div_round_div_team").innerHTML = a;
    next_round()
}

function next_round() {
    current_round++;
    current_round == count_round ? end_game() : (Status[0] = -1, Status[1] = -1, rounds[current_round].print())
}

function end_game() {
    document.getElementById("div_round").style.display = "none";
    document.getElementById("div_end_game").style.display = "block";
    show_count();
    document.getElementById("div_end_div_team").innerHTML = document.getElementById("div_round_div_team").innerHTML
};