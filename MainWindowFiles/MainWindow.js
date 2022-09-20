$(document).ready(function() {
    $("div.specialPage").css("display", "none");
    $("div.homePage").css("display", "");
    var currDateAndTime = new Date();
    document.getElementById("dateAndTime").innerHTML = currDateAndTime.toLocaleString();
    populateProfile();
    addPatients();
});

var DB = JSON.parse(localStorage.getItem("localDB"));
var USER = JSON.parse(localStorage.getItem("localDB"))["currentUser"];
var currentPatient = {};
var valuesVent = {1:"VT", 2:"PEEP", 3:"OXY", 4:"VENTRATE", 5:"PPEAK", 6:"EXPMINVOL", 7:"VTE", 8:"FTOTAL"};
var vitals = {1:"ECG", 2:"SPO2", 3:"CO2", 4:"BP"};
var vitalUnits = {1:"bpm", 2:"%", 3:"mmol/L", 4:"mmHg"};
var resultVent = 0;
var ventCounter = 0;
var pressureLimit = 0;
var peakPressure = 2;
var vital1 = parseFloat(document.getElementById(vitals[1]).innerText);
var vital2 = parseFloat(document.getElementById(vitals[2]).innerText);
var vital3 = parseFloat(document.getElementById(vitals[3]).innerText);
var vital4 = parseFloat(document.getElementById("S_BP").innerText);
var vital5 = parseFloat(document.getElementById("D_BP").innerText);
var pages = {1:"homePage", 2:"patientsPage", 3:"vitalsPage", 
             4:"chartsPage", 5:"labResultsPage", 6:"vitalsAlertSettingsPage",
             7:"deviceControlsPage", 8:"settingsPage", 9:"aboutPage",
             10:"contactPage", 11:"faqPage", 12:"privacyPolicyPage",
             13:"profilePage", 14:"tosPage"};

function revealPage(x) {
    var allPages = document.getElementsByClassName("specialPage");

    for (var i = 0; i < allPages.length; i++) {
        allPages[i].style.display = "none";

        if (i + 1 == x) {
            document.getElementsByClassName(pages[x])[0].style.display = "";
        }
    }
}

function showPopUp() {
    var popup = document.getElementById("infoPopup");
    popup.classList.toggle("show");
}

function showPopUp2() {
    var popup2 = document.getElementById("infoPopup2");
    popup2.classList.toggle("show");
}

function populateProfile() {
    if (USER["resourceType"] == "Patient") {
        document.getElementById("profileName").innerText = USER["name"];
        document.getElementById("profileAddress").value = USER["address"].split(",")[0];
        document.getElementById("profileCity").value = USER["address"].split(",")[1].trim();
        document.getElementById("profileZip").value = USER["address"].split(",")[3].trim();
    }

    else if (USER["resourceType"] == "Doctor" || USER["resourceType"] == "Physician") {
        document.getElementById("profileName").innerText = "Dr. " + USER["name"]; 
    }

    else if (USER["resourceType"] == "Nurse") {
        document.getElementById("profileName").innerText = "R.N. " + USER["name"]; 
    }

    document.getElementById("profileRole").innerText = USER["resourceType"];
    document.getElementById("profileEmail").value = USER["EMAIL"];
    document.getElementById("profileNick").value = USER["nickname"];
    document.getElementById("profileFirstName").value = USER["name"].split(" ")[0];
    document.getElementById("profileLastName").value = USER["name"].split(" ")[1];
}

function addPatients() {
    if (USER["accessLevel"] < 3) {
        for (var i = 0; i < USER["patients"].length; i++) {
            document.getElementById("patientBoard").innerHTML = document.getElementById("patientBoard").innerHTML +  '<div class = "patientListItem"><p class = "patient"><img src = "Icons/user.png" class = "float-left mr-2 mt-1" width = "32" height = "32"><strong>' + DB["users"][USER["patients"][i]]["name"] + '</strong><button class = "float-right" onclick = "authenticationBox(\'' + USER["patients"][i] +'\')">' + "Access" +'</button><br><span>' + "ID: " + DB["users"][USER["patients"][i]]["identifier"]+'</span></p></div>'
        }
    }

    else {
        document.getElementById("patientBoard").innerHTML = document.getElementById("patientBoard").innerHTML +  '<div class = "patientListItem"><p class = "patient"><img src = "Icons/user.png" class = "float-left mr-2 mt-1" width = "32" height = "32"><strong>' + USER["name"] + '<button class = "float-right" onclick = "authenticationBox(\'' + USER["EMAIL"]+ '\')">' + "Access" +'</button><br><span>' + "ID: " + USER["identifier"]+'</span></p></div>'
    }
}

function accessLevelCheck(page) {
    if (USER["accessLevel"] == 3) {
        alert("Only Medical Professionals May Access This");
    }

    else {
        revealPage(page);
    }
}

function changePatientProfile() {
    document.getElementById("patientProfile1").innerHTML = '<h1>' + currentPatient["name"] + "'s Vitals" + '</h1>'+ '<p class = "lead text-muted"><b>' + "Patient ID: " + '</b>' + currentPatient["identifier"] + " | " + '<b>' + "File Number: " + '</b>' + currentPatient["fileID"] + '<br><b>' + "Age: " + '</b>' + (new Date().getFullYear() - parseInt(currentPatient["birthDate"].split("/")[2])) +  " | " + '<b>' + "Gender: " + '</b>' + currentPatient["gender"] + " | " + '<b>' + "Blood Type: " + '</b>' + currentPatient["bloodType"] + " | " + '<b>' + "Marital Status: " + '</b>' + currentPatient["maritalStatus"] + '<br><b>' + "Email: " + '</b>' + currentPatient["EMAIL"] + " | " + '<b>' + "Phone Number: " + '</b>' + currentPatient["telecom"] + '<br><b>' + "Address: " + '</b>' + currentPatient["address"] + ", United States" + '</p><p><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "revealPage(3)">' + "Vitals" + '</a><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "revealPage(4)">' + "Charts" + '</a><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "revealPage(5)">' + "Lab Results" + '</a><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "accessLevelCheck(\'6\')">' + "Vitals Alert Settings" + '</a><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "accessLevelCheck(\'7\')">' + "Device Controls" + '</a></p>';
    document.getElementById("patientProfile2").innerHTML = '<h1>' + currentPatient["name"] + "'s Charts" + '</h1>'+ '<p class = "lead text-muted"><b>' + "Patient ID: " + '</b>' + currentPatient["identifier"] + " | " + '<b>' + "File Number: " + '</b>' + currentPatient["fileID"] + '<br><b>' + "Age: " + '</b>' + (new Date().getFullYear() - parseInt(currentPatient["birthDate"].split("/")[2])) +  " | " + '<b>' + "Gender: " + '</b>' + currentPatient["gender"] + " | " + '<b>' + "Blood Type: " + '</b>' + currentPatient["bloodType"] + " | " + '<b>' + "Marital Status: " + '</b>' + currentPatient["maritalStatus"] + '<br><b>' + "Email: " + '</b>' + currentPatient["EMAIL"] + " | " + '<b>' + "Phone Number: " + '</b>' + currentPatient["telecom"] + '<br><b>' + "Address: " + '</b>' + currentPatient["address"] + ", United States" + '</p><p><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "revealPage(3)">' + "Vitals" + '</a><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "revealPage(4)">' + "Charts" + '</a><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "revealPage(5)">' + "Lab Results" + '</a><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "accessLevelCheck(\'6\')">' + "Vitals Alert Settings" + '</a><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "accessLevelCheck(\'7\')">' + "Device Controls" + '</a></p>';
    document.getElementById("patientProfile3").innerHTML = '<h1>' + currentPatient["name"] + "'s Lab Results" + '</h1>'+ '<p class = "lead text-muted"><b>' + "Patient ID: " + '</b>' + currentPatient["identifier"] + " | " + '<b>' + "File Number: " + '</b>' + currentPatient["fileID"] + '<br><b>' + "Age: " + '</b>' + (new Date().getFullYear() - parseInt(currentPatient["birthDate"].split("/")[2])) +  " | " + '<b>' + "Gender: " + '</b>' + currentPatient["gender"] + " | " + '<b>' + "Blood Type: " + '</b>' + currentPatient["bloodType"] + " | " + '<b>' + "Marital Status: " + '</b>' + currentPatient["maritalStatus"] + '<br><b>' + "Email: " + '</b>' + currentPatient["EMAIL"] + " | " + '<b>' + "Phone Number: " + '</b>' + currentPatient["telecom"] + '<br><b>' + "Address: " + '</b>' + currentPatient["address"] + ", United States" + '</p><p><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "revealPage(3)">' + "Vitals" + '</a><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "revealPage(4)">' + "Charts" + '</a><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "revealPage(5)">' + "Lab Results" + '</a><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "accessLevelCheck(\'6\')">' + "Vitals Alert Settings" + '</a><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "accessLevelCheck(\'7\')">' + "Device Controls" + '</a></p>';
    document.getElementById("patientProfile4").innerHTML = '<h1>' + currentPatient["name"] + "'s Vitals Alert Settings" + '</h1>'+ '<p class = "lead text-muted"><b>' + "Patient ID: " + '</b>' + currentPatient["identifier"] + " | " + '<b>' + "File Number: " + '</b>' + currentPatient["fileID"] + '<br><b>' + "Age: " + '</b>' + (new Date().getFullYear() - parseInt(currentPatient["birthDate"].split("/")[2])) +  " | " + '<b>' + "Gender: " + '</b>' + currentPatient["gender"] + " | " + '<b>' + "Blood Type: " + '</b>' + currentPatient["bloodType"] + " | " + '<b>' + "Marital Status: " + '</b>' + currentPatient["maritalStatus"] + '<br><b>' + "Email: " + '</b>' + currentPatient["EMAIL"] + " | " + '<b>' + "Phone Number: " + '</b>' + currentPatient["telecom"] + '<br><b>' + "Address: " + '</b>' + currentPatient["address"] + ", United States" + '</p><p><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "revealPage(3)">' + "Vitals" + '</a><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "revealPage(4)">' + "Charts" + '</a><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "revealPage(5)">' + "Lab Results" + '</a><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "accessLevelCheck(\'6\')">' + "Vitals Alert Settings" + '</a><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "accessLevelCheck(\'7\')">' + "Device Controls" + '</a></p>';
    document.getElementById("patientProfile5").innerHTML = '<h1>' + "Device Controls For " + currentPatient["name"] + '</h1>'+ '<p class = "lead text-muted"><b>' + "Patient ID: " + '</b>' + currentPatient["identifier"] + " | " + '<b>' + "File Number: " + '</b>' + currentPatient["fileID"] + '<br><b>' + "Age: " + '</b>' + (new Date().getFullYear() - parseInt(currentPatient["birthDate"].split("/")[2])) +  " | " + '<b>' + "Gender: " + '</b>' + currentPatient["gender"] + " | " + '<b>' + "Blood Type: " + '</b>' + currentPatient["bloodType"] + " | " + '<b>' + "Marital Status: " + '</b>' + currentPatient["maritalStatus"] + '<br><b>' + "Email: " + '</b>' + currentPatient["EMAIL"] + " | " + '<b>' + "Phone Number: " + '</b>' + currentPatient["telecom"] + '<br><b>' + "Address: " + '</b>' + currentPatient["address"] + ", United States" + '</p><p><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "revealPage(3)">' + "Vitals" + '</a><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "revealPage(4)">' + "Charts" + '</a><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "revealPage(5)">' + "Lab Results" + '</a><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "accessLevelCheck(\'6\')">' + "Vitals Alert Settings" + '</a><a href = "#" class = "btn btn-secondary mt-2 mb-2" onclick = "accessLevelCheck(\'7\')">' + "Device Controls" + '</a></p>';
}

function authenticationBox(code) {
    var codeInp = prompt("Please enter the authentication code to gain access to this patient's files:", "");
    console.log(code);

    if (codeInp == "01101") {
        currentPatient = DB["users"][code];
        console.log(currentPatient);
        changePatientProfile();
        loadVitals();
        setTimeout(vitalValues1, 3000);
        currCondition();
        revealPage(3);
    } 
    
    else {
        alert("The entered code was incorrect. Access was not granted.");
    }
}

function loadVitals() {
    if(USER["resourceType"] == "Patient") {
        document.getElementById(vitals[1]).innerHTML = USER["vitals"]["pulseRate"];
        document.getElementById(vitals[2]).innerHTML = USER["vitals"]["oxygenSat"];
        document.getElementById(vitals[3]).innerHTML = USER["vitals"]["carbonLevels"];
        document.getElementById("S_BP").innerHTML = USER["vitals"]["bloodPress"][0];
        document.getElementById("D_BP").innerHTML = USER["vitals"]["bloodPress"][1];
    }

    else {
        document.getElementById(vitals[1]).innerHTML = currentPatient["vitals"]["pulseRate"];
        document.getElementById(vitals[2]).innerHTML = currentPatient["vitals"]["oxygenSat"]; 
        document.getElementById(vitals[3]).innerHTML = currentPatient["vitals"]["carbonLevels"];
        document.getElementById("S_BP").innerHTML = currentPatient["vitals"]["bloodPress"][0];
        document.getElementById("D_BP").innerHTML = currentPatient["vitals"]["bloodPress"][1];
    }
}

function searchFunction() {
    var input = document.getElementById("searchInp");
    var revealer = document.getElementById("revealAllButton");
    var filter = input.value.toUpperCase();
    var entireItem = document.querySelectorAll("div.patientListItem");

    for (var i = 0; i < entireItem.length; i++) {
        var a = entireItem[i].getElementsByTagName("strong")[0]
        var b = entireItem[i].getElementsByTagName("span")[0];
        var txtValue = a.innerHTML || a.textContent || a.innerText;
        var txtValue2 = b.innerHTML || b.textContent || b.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
            entireItem[i].style.display = "";
            revealer.style.display = "none";
        }

        else {
            revealer.style.display = "";
            entireItem[i].style.display = "none";
        }
    }
}

function revealAllPatients() {
    var entireItem = document.querySelectorAll("div.patientListItem");
    var revealer = document.getElementById("revealAllButton");

    for (var i = 0; i < entireItem.length; i++) {
        entireItem[i].style.display = "";
        revealer.style.display = "none";
    }
}

$("#darkModeButton").on("click", function() {
    if ($("body").hasClass("dark")) {
        $("body").removeClass("dark");
        $("div.homePage").css("background-color", "#f5f5f5");
        $("div.patientsPage").css("background-color", "#f5f5f5");
        $("div.settingsPage").css("background-color", "#f5f5f5");
        $("div.aboutPage").css("background-color", "#f5f5f5");
        $("div.contactPage").css("background-color", "#f5f5f5");
        $("div.faqPage").css("background-color", "#f5f5f5");
        $("div.privacyPolicyPage").css("background-color", "#f5f5f5");
        $("div.profilePage").css("background-color", "#f5f5f5");
        $("body").css("background-color", "#e5e5e5");
        $("#commitmentStatement").css("color", "navy");
        $("#headerStrip").css("background-color", "#f5f5f5");
        $("div.footer").css("border-color", "#d6d6d6");
        $("nav").css("background-color", "white");
        $("#patientBoard").css("background-color", "white");
        $("div.patientListItem").css("color", "#6c757d");
        $("a.nav-link").css("color", "black");
        $("p.navbar-brand").css("color", "black");
        $("#darkModeButton").text("Dark Mode");
        $("#currMode").text("Dark Mode");
        $("h4.modeTitle").css("color", "black");
        $("div.settingsBox").css("background-color", "white");
    } 
    
    else {
        $("body").addClass("dark");
        $("div.homePage").css("background-color", "#222");
        $("div.patientsPage").css("background-color", "#222");
        $("div.settingsPage").css("background-color", "#222");
        $("div.aboutPage").css("background-color", "#222");
        $("div.contactPage").css("background-color", "#222");
        $("div.faqPage").css("background-color", "#222");
        $("div.privacyPolicyPage").css("background-color", "#222");
        $("div.profilePage").css("background-color", "#222");
        $("body").css("background-color", "#3b3b3b");
        $("#headerStrip").css("background-color", "#222");
        $("#commitmentStatement").css("color", "yellow");
        $("div.footer").css("border-color", "black");
        $("nav").css("background-color", "#4f4f4f");
        $("#patientBoard").css("background-color", "#878787");
        $("div.patientListItem").css("color", "#e6e6e6");
        $("a.nav-link").css("color", "#f5f5f5");
        $("p.navbar-brand").css("color", "#f5f5f5");
        $("#darkModeButton").text("Light Mode");
        $("#currMode").text("Light Mode");
        $("h4.modeTitle").css("color", "#f5f5f5");
        $("div.settingsBox").css("background-color", "#878787");
    }
});

function vitalValues1() {
    vital1 = vital1 + 1;
    vital2 = vital2 - 2;
    vital3 = vital3 - 1;
    vital4 = vital4 + 1;
    vital5 = vital5 + 2;
    document.getElementById(vitals[1]).innerText = vital1.toFixed(0);
    document.getElementById(vitals[2]).innerText = vital2.toFixed(0);
    document.getElementById(vitals[3]).innerText = vital3.toFixed(0);
    document.getElementById("S_BP").innerText = vital4.toFixed(0);
    document.getElementById("D_BP").innerText = vital5.toFixed(0);
    setTimeout(vitalValues2, 3000);
}

function vitalValues2() {
    vital1 = vital1 - 1;
    vital2 = vital2 + 2;
    vital3 = vital3 + 1;
    vital4 = vital4 - 1;
    vital5 = vital5 - 2;
    document.getElementById(vitals[1]).innerText = vital1.toFixed(0);
    document.getElementById(vitals[2]).innerText = vital2.toFixed(0);
    document.getElementById(vitals[3]).innerText = vital3.toFixed(0);
    document.getElementById("S_BP").innerText = vital4.toFixed(0);
    document.getElementById("D_BP").innerText = vital5.toFixed(0);
    setTimeout(vitalValues1, 3000);
}

function currCondition() {
    vital1 = parseFloat(document.getElementById(vitals[1]).innerText);
    vital2 = parseFloat(document.getElementById(vitals[2]).innerText);
    vital3 = parseFloat(document.getElementById(vitals[3]).innerText);
    vital4 = parseFloat(document.getElementById("S_BP").innerText);

    if ((vital1 < 111 && vital1 > 49) || (vital2 > 94 && vital2 < 101) || (vital3 < 30 && vital3 > 22) || (vital4 > 99 && vital4 < 131)) {
        document.getElementById("alertButton").innerHTML = '<button class = "btn btn-success mt-2 mb-2" onclick = "">Low Alert</button>';
        document.getElementById("currCondition").innerHTML = "Stable";
        
        if (vital1 < 111 && vital1 > 49) {
            document.getElementById("conditionMsgECG").innerHTML = '<p>Normal ECG Rate.</p>';
        }

        if (vital2 > 94 && vital2 < 101) {
            document.getElementById("conditionMsgSPO2").innerHTML = '<p>Normal SpO2 Levels.</p>';
        }

        if (vital3 < 30 && vital3 > 22) {
            document.getElementById("conditionMsgCO2").innerHTML = '<p>Normal CO2 Levels.</p>';
        }
        
        if (vital4 > 99 && vital4 < 131) {
            document.getElementById("conditionMsgBP").innerHTML = '<p>Normal Systolic Blood Pressure.</p>';
        }
    }

    if ((vital1 < 50 && vital1 > 39) || (vital1 < 121 && vital1 > 110) || (vital2 > 89 && vital2 < 95) || (vital3 < 23 && vital3 > 9) || (vital4 > 89 && vital4 < 100)) {
        document.getElementById("alertButton").innerHTML = '<button class = "btn mt-2 mb-2" style = "background-color: yellow;" onclick = "">Medium Alert</button>';
        document.getElementById("currCondition").innerHTML = "Slightly Stable";

        if ((vital1 < 50 && vital1 > 39) || (vital1 < 121 && vital1 > 110)) {
            document.getElementById("conditionMsgECG").innerHTML = '<p><strong>Concerning</strong> ECG Rate!</p>';
        }

        if (vital2 > 89 && vital2 < 95) {
            document.getElementById("conditionMsgSPO2").innerHTML = '<p><strong>Concerning</strong> SpO2 Levels!</p>';
        }

        if (vital3 < 23 && vital3 > 9) {
            document.getElementById("conditionMsgCO2").innerHTML = '<p><strong>Concerning</strong> CO2 Levels!</p>';
        }
        
        if (vital4 > 89 && vital4 < 100) {
            document.getElementById("conditionMsgBP").innerHTML = '<p><strong>Dangerous</strong> Systolic Blood Pressure!</p>';
        }
    }

    if (vital1 < 40 || (vital1 < 131 && vital1 > 120) || (vital2 > 79 && vital2 < 90) || (vital3 < 41 && vital3 > 29) || (vital4 > 79 && vital4 < 90)) {
        document.getElementById("alertButton").innerHTML = '<button class = "btn btn-warning mt-2 mb-2" onclick = "">High Alert</button>';
        document.getElementById("currCondition").innerHTML = "Unstable";

        if (vital1 < 40 || (vital1 < 131 && vital1 > 120)) {
            document.getElementById("conditionMsgECG").innerHTML = '<p><strong>Dangerous</strong> ECG Rate!</p>';
        }

        if (vital2 > 79 && vital2 < 90) {
            document.getElementById("conditionMsgSPO2").innerHTML = '<p><strong>Dangerous</strong> SpO2 Levels!</p>';
        }

        if (vital3 < 41 && vital3 > 29) {
            document.getElementById("conditionMsgCO2").innerHTML = '<p><strong>Dangerous</strong> CO2 Levels!</p>';
        }
        
        if (vital4 > 79 && vital4 < 90) {
            document.getElementById("conditionMsgBP").innerHTML = '<p><strong>Dangerous</strong> Systolic Blood Pressure!</p>';
        }
    }

    if (vital1 > 130 || vital2 < 80 || vital3 < 10 || vital3 > 40 || vital4 < 80 || vital4 > 130) {
        document.getElementById("alertButton").innerHTML = '<button class = "btn btn-danger mt-2 mb-2" onclick = "">Critical Alert</button>';
        document.getElementById("currCondition").innerHTML = "Very Unstable";

        if (vital1 > 130) {
            document.getElementById("conditionMsgECG").innerHTML = '<p><strong>Critical</strong> ECG Rate.</p>';
        }

        if (vital2 < 80) {
            document.getElementById("conditionMsgSPO2").innerHTML = '<p><strong>Critical</strong> SpO2 Levels.</p>';
        }

        if (vital3 < 10 || vital3 > 40) {
            document.getElementById("conditionMsgCO2").innerHTML = '<p><strong>Critical</strong> CO2 Levels.</p>';
        }
        
        if (vital4 < 80 || vital4 > 130) {
            document.getElementById("conditionMsgBP").innerHTML = '<p><strong>Critical</strong> Systolic Blood Pressure!</p>';
        }
    }
}

function approveVitals(x){
    if(USER["accessLevel"] == 3){
        alert("Only Medical Professionals May Access This");
    }

    else {
        var vital = document.getElementById(vitals[x]).innerHTML;
        var f_name = document.getElementById("profileFirstName").value;
        var l_name = document.getElementById("profileLastName").value;
        var currentLogs = document.getElementsByClassName("logItem");
        console.log(currentLogs);
        var DateAndTime = new Date();
        var dAndT = DateAndTime.toLocaleString();
        currentPatient["vitalLogs"].unshift({"staff":USER["EMAIL"],"vitalSign":vital, "time":dAndT})
    
        document.getElementById("vitalsLog").innerHTML = document.getElementById("vitalsLog").innerHTML + '<div class="logItem" style="padding-top:0%;margin:0%;"><p class="log" style="margin-top:0px;"><img src="Icons/user.png" class="float-left mr-2 mt-1" width="32" height="32"><strong>' + f_name + ' ' + l_name + '</strong><a href="#" class="float-right" style="color:black;text-decoration:none;cursor:default;">Date and Time of Log: ' + dAndT + '</a><br><span>Approved ' + vitals[x] + ' Vitals at their shift. <br><span style="margin-left:40px;">' + vitals[x] + ' vitals: </span><strong>' + vital + vitalUnits[x] + '</strong></span></p></div>';
        
        for(var i = 0; i < currentLogs.length; i++){
            document.getElementById("vitalLogs").innerHTML = document.getElementById("vitalLogs").innerHTML + currentLogs[i];
        }
    }
}

function increment(x) {
    resultVent = parseInt(document.getElementById(valuesVent[x]).innerText);
    resultVent = resultVent + 1;
    document.getElementById(valuesVent[x]).innerText = resultVent;
}

function decrement(x) {
    resultVent = parseInt(document.getElementById(valuesVent[x]).innerText);
    resultVent = resultVent - 1;
    document.getElementById(valuesVent[x]).innerText = resultVent;
}

function ventilatorValuesCalculator() {
    var weight = document.getElementById("patientWeight").value;
    var VT = parseInt(document.getElementById(valuesVent[1]).innerText);
    VT = weight * 8;
    document.getElementById(valuesVent[1]).innerText = VT;
    document.getElementById(valuesVent[2]).innerText = 5;
    document.getElementById(valuesVent[3]).innerText = 21;
    document.getElementById(valuesVent[4]).innerText = (12 - ventCounter);
    document.getElementById(valuesVent[5]).innerText = "---";
    document.getElementById(valuesVent[6]).innerText = "---";
    document.getElementById(valuesVent[7]).innerText = "---";
    document.getElementById(valuesVent[8]).innerText = "---";
    setTimeout(ventilatorValuesCalculator2, 6000);
}

function ventilatorValuesCalculator2() {
    var VT = parseInt(document.getElementById(valuesVent[1]).innerText);
    var RATE = parseInt(document.getElementById(valuesVent[4]).innerText);
    document.getElementById(valuesVent[5]).innerText = 20;
    document.getElementById(valuesVent[6]).innerText = 2.13;
    document.getElementById(valuesVent[7]).innerText = ((VT/2) - RATE);
    document.getElementById(valuesVent[8]).innerText = RATE;
}

function connectVentilator() {
    var VT = parseInt(document.getElementById(valuesVent[1]).innerText);
    var PEEP = parseInt(document.getElementById(valuesVent[2]).innerText);
    var OXY = parseInt(document.getElementById(valuesVent[3]).innerText);
    var RATE = parseInt(document.getElementById(valuesVent[4]).innerText);
    var PPEAK = parseInt(document.getElementById(valuesVent[5]).innerText);
    var EXPMINVOL = parseFloat(document.getElementById(valuesVent[6]).innerText);
    var VTE = parseInt(document.getElementById(valuesVent[7]).innerText);

    document.getElementById(valuesVent[5]).style.color = "white";
    document.getElementById("ventilatorStatus").style.color = "green";
    document.getElementById("ventilatorStatus").innerHTML = "STARTED";

    if (VTE < VT) {
        PPEAK = PPEAK + peakPressure;
        VTE = VTE + (RATE + PEEP);
        EXPMINVOL = (EXPMINVOL + (OXY/100)).toFixed(2);
        vital2 = vital2 + 1.1;
        vital3 = vital3 - 0.2;

        if (EXPMINVOL < 4) {
            document.getElementById(valuesVent[6]).style.color = "red";
            document.getElementById("ventMsg").style.color = "red";
            document.getElementById("ventMsg").innerHTML = 'Low Minute Volume<br>';
        }
    
        if (EXPMINVOL > 3.99) {
            document.getElementById(valuesVent[6]).style.color = "white";
            document.getElementById("ventMsg").innerHTML = '';
        }

        if (PPEAK > 29 + pressureLimit) {
            document.getElementById(valuesVent[5]).style.color = "yellow";
            document.getElementById("ventMsg").style.color = "orange";
            document.getElementById("ventMsg").innerHTML = 'Pressure limitation Reached<br>Increasing Peak Pressure<br>';
            peakPressure = peakPressure - 1;
            pressureLimit = pressureLimit + 10;
        }

        //document.getElementById(vitals[2]).innerText = vital2.toFixed(0);
        //document.getElementById(vitals[3]).innerText = vital3.toFixed(0);
        document.getElementById(valuesVent[5]).innerText = PPEAK;
        document.getElementById(valuesVent[6]).innerText = EXPMINVOL;
        document.getElementById(valuesVent[7]).innerText = VTE;
        setTimeout(connectVentilator, 3000);
    }

    else {
        document.getElementById("ventilatorStatus").style.color = "red";
        document.getElementById("ventilatorStatus").innerHTML = "STOPPED";
        document.getElementById("ventMsg").style.color = "green";
        document.getElementById("ventMsg").innerHTML = 'Tidal Volume Reached<br>';
        setTimeout(currCondition, 5000);
    }
}

function calculateInfusionPumpValues() {
    document.getElementById("secondsInf").value = "60";
    document.getElementById("medsInf").value = "Propofol";
    document.getElementById("dosingMethodInf").value = "mg/kg/hr";
    document.getElementById("rateInf").value = "0.04";
    document.getElementById("doseWeightInf").value = "2.3";
}

var counter = 0.0;

function connectInfusionPump() {
    var medication = document.getElementById("medsInf").value;
    var dosingMethod = document.getElementById("dosingMethodInf").value;
    var rateInfusion = parseFloat(document.getElementById("rateInf").innerText);
    var dosingWeight = parseFloat(document.getElementById("doseWeightInf").innerText);
    var time = parseInt(document.getElementById("secondsInf").value);

    if (rateInfusion == 0 || dosingWeight == 0 || medication == null || dosingMethod == null) {
        document.getElementById("msgInf").innerHTML = '<b style = "color: red;">ERROR:</b> Not all values have been entered!';
        document.getElementById("infusionStatus").style.color = "red";
        document.getElementById("infusionStatus").innerHTML = "STOPPED";
    }

    else {
        var rate = (rateInfusion * counter);
        document.getElementById("infusionStatus").style.color = "orange";
        document.getElementById("infusionStatus").innerHTML = "INFUSING - " + medication + ' ' + dosingMethod;
        document.getElementById("displayInfTimer").innerHTML = "Time Left: " + time;
        document.getElementById("totalInfused").innerHTML = rate + " " + dosingMethod;
        time = time - 1;
        counter = counter + 1;

        if (vital1 < 80) {
            vital1 = vital1 - 0;
        }

        else if (vital1 > 80) {
            vital1 = vital1 - 0.1;
        }

        if (vital4 < 120) {
            vital4 = vital4 - 0;
        }

        else if (vital4 > 120) {
            vital4 = vital4 - 0.5;
        }

        for(var i = 0; i < time; i++) {
            setTimeout(connectInfusionPump, 1000);
        }  
    }
}