document.getElementById("loginButton").onclick = function() {
    loadDB();
    retrieve();
};
        
function loginFunc() {
    window.location.href = "MainWindow.html";
}

function loadDB() {
    localStorage.setItem("localDB", JSON.stringify(db["localDB"]));
}

function saveCurrenUser(email) {
    db["localDB"]["currentUser"] = db["localDB"]["users"][email];
    localStorage.clear();
    localStorage.setItem("localDB", JSON.stringify(db["localDB"]));
}

function retrieve() {
    var JSONObject = localStorage.getItem("localDB");
    var JSObject = JSON.parse(JSONObject);
    var userEmail = document.getElementById("inputEmail").value;
    var userPass = document.getElementById("inputPassword").value;

    if (JSObject["users"][userEmail] != null && JSObject["users"][userEmail].PASS == userPass && userEmail != null) {
        saveCurrenUser(userEmail);
        document.getElementById("message").innerHTML = "Login successful!";
        window.location.href = "MainWindow.html";
    }

    else {
        document.getElementById("message").innerHTML = "Your account was not found. Please try again!";
        document.getElementById("inputEmail").value = "";
        document.getElementById("inputPassword").value = "";
    }
}

var db = {
    "localDB":{
        "institution": "ACME Hospital",
        "users":{
            "jHinkle28@gmail.com" : {
                "resourceType" : "Patient",
                "accessLevel" : 3,
                "EMAIL" : "jHinkle28@gmail.com",
                "PASS" : "pass",
                "PASS_2": "pass",
                "identifier" : "02154746",
                "fileID" : 005354,
                "active" : true,
                "name" : "John Hinkle",
                "nickname" : "John",
                "telecom" : "(423)-555-9616",
                "gender" : "male",
                "birthDate" : "03/17/1993",
                "deceasedBoolean" : false,
                "deceasedDateTime" : "N/A",
                "address" :"1515 Poole Rd, Street, Maryland(MD), 21154",
                "maritalStatus" : "Single",
                "photo" : "PatientPhotos/",
                "contact" : {
                    "relationship" : "mother",
                    "name" : "Heather Hinkle",
                    "telecom" : "(410) 555-2042",
                    "address" : "1142 Priestford Rd, Street, Maryland(MD), 21154",
                    "gender" : "female",
                    "organization" : "N/A",
                    "period" : "N/A"},

                "communication" : {
                    "language" : "english",
                    "preferred" : "english"},

                "generalPractitioner" : "Dr. Acula",
                "managingOrganization" : "ACME Healthcare, Inc",
                "link" : {"other" : "", "type" : "<code>"},
                "medication": {},
                "devices":["temp","pulseRate","respRate","bloodPressure"],
                "bloodType" : "B+",
                "vitals":{
                    "carbonLevels" : 31,
                    "pulseRate" : 104,
                    "oxygenSat" : 79,
                    "bloodPress" :[145,    105]
                },
                "alerts":{
                    "temp":[0,0],
                    "pulseRate":[0,0],
                    "respRate":[0,0],
                    "bloodPress":[[0,0],[0,0]]
                },
                "vitalLogs" : [
                    {"staff":"stubbsD@gmail.com", "vitalSign":"ECG", "time": "14:36, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"SpO2", "time": "14:35, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"RR", "time": "14:34, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"BP", "time": "14:32, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"ECG", "time": "10:20, July 7, 2021"},

                ]

            },
            
            "mmasters@gmail.com" : {
                "resourceType" : "Patient",
                "accessLevel" : 3,
                "EMAIL" : "mmasters@gmail.com",
                "PASS" : "pass",
                "PASS_2": "pass",
                "identifier" : "12354589",
                "fileID" : 617692,
                "active" : true,
                "name" : "Maggie Masters",
                "nickname" : "Maggie",
                "telecom" : "(410) 555-2356",
                "gender" : "female",
                "birthDate" : "11/15/1966",
                "deceasedBoolean" : false,
                "deceasedDateTime" : "Single",
                "address" :"3207 A Dublin Rd #A, Street, Maryland(MD), 21154",
                "maritalStatus" : true,
                "photo" : "PatientPhotos/",
                "contact" : {
                    "relationship" : "husband",
                    "name" : "Sam Masters",
                    "telecom" : "(410) 555-2042",
                    "address" : "1142 Priestford Rd, Street, Maryland(MD), 21154",
                    "gender" : "male",
                    "organization" : "N/A",
                    "period" : "N/A"},

                "communication" : {
                    "language" : "english",
                    "preferred" : "english"},

                "generalPractitioner" : "Dr. Acula",
                "managingOrganization" : "ACME Healthcare, Inc",
                "link" : {"other" : "", "type" : "<code>"},
                "medication": {},
                "devices":["temp","pulseRate","respRate","bloodPressure"],
                "bloodType" : "A+",
                "vitals":{
                    "carbonLevels" : 29,
                    "pulseRate" : 112,
                    "oxygenSat" : 85,
                    "bloodPress" :[115,    70]
                },
                "alerts":{
                    "temp":[0,0],
                    "pulseRate":[0,0],
                    "respRate":[0,0],
                    "bloodPress":[[0,0],[0,0]]
                },
                "vitalLogs" : [
                    {"staff":"stubbsD@gmail.com", "vitalSign":"ECG", "time": "14:36, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"SpO2", "time": "14:35, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"RR", "time": "14:34, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"BP", "time": "14:32, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"ECG", "time": "10:20, July 7, 2021"},

                ]
            },
            
            "hRami@gmail.com": {
                "resourceType" : "Patient",
                "accessLevel" : 3,
                "EMAIL" : "hRami@gmail.com",
                "PASS" : "pass",
                "PASS_2": "pass",
                "identifier" : "02521545",
                "fileID" : 354619,
                "active" : true,
                "name" : "Hector Ramirez",
                "nickname" : "Hector",
                "telecom" : "(410) 555-5606",
                "gender" : "male",
                "birthDate" : "05/25/2000",
                "deceasedBoolean" : false,
                "deceasedDateTime" : "N/A",
                "address" :"Friendship Farm Cardiff, Street, Maryland(MD), 21154",
                "maritalStatus" : "Single",
                "photo" : "PatientPhotos/",
                "contact" : {
                    "relationship" : "father",
                    "name" : "Kevin Ramirez",
                    "telecom" : "(410) 555-606",
                    "address" : "Friendship Farm Cardiff, Street, Maryland(MD), 21154",
                    "gender" : "male",
                    "organization" : "N/A",
                    "period" : "N/A"},

                "communication" : {
                    "language" : "english",
                    "preferred" : "english"},

                "generalPractitioner" : "Dr. Acula",
                "managingOrganization" : "ACME Healthcare, Inc",
                "link" : {"other" : "", "type" : "<code>"},
                "medication": {},
                "devices":["temp","pulseRate","respRate","bloodPressure"],
                "bloodType" : "O-",
                "vitals":{
                    "carbonLevels" : 29,
                    "pulseRate" : 105,
                    "oxygenSat" : 78,
                    "bloodPress" :[100,    72]
                },
                "alerts":{
                    "temp":[0,0],
                    "pulseRate":[0,0],
                    "respRate":[0,0],
                    "bloodPress":[[0,0],[0,0]]
                },
                "vitalLogs" : [
                    {"staff":"stubbsD@gmail.com", "vitalSign":"ECG", "time": "14:36, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"SpO2", "time": "14:35, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"RR", "time": "14:34, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"BP", "time": "14:32, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"ECG", "time": "10:20, July 7, 2021"},

                ]
            },
            
            "jessPars@gmail.com" : {
                "resourceType" : "Patient",
                "accessLevel" : 3,
                "EMAIL" : "jessPars@gmail.com",
                "PASS" : "pass",
                "PASS_2": "pass",
                "identifier" : "02154346",
                "fileID" : 200284,
                "active" : true,
                "name" : "Jessica Parsons",
                "nickname" : "Jess",
                "telecom" : "(410) 457-0185",
                "gender" : "female",
                "birthDate" : "01/01/1983",
                "deceasedBoolean" : false,
                "deceasedDateTime" : "N/A",
                "address" :"1532 Clearview Dr, Street, Maryland(MD), 21154",
                "maritalStatus" : "Married",
                "photo" : "PatientPhotos/",
                "contact" : {
                    "relationship" : "wife",
                    "name" : "Corinne Parsons",
                    "telecom" : "(410) 555-2042",
                    "address" : "1532 Clearview Dr, Street, Maryland(MD), 21154",
                    "gender" : "female",
                    "organization" : "N/A",
                    "period" : "N/A"},

                "communication" : {
                    "language" : "english",
                    "preferred" : "english"},

                "generalPractitioner" : "Dr. Acula",
                "managingOrganization" : "ACME Healthcare, Inc",
                "link" : {"other" : "", "type" : "<code>"},
                "medication": {},
                "devices":["temp","pulseRate","respRate","bloodPressure"],
                "bloodType" : "AB-",
                "vitals":{
                    "carbonLevels" : 25,
                    "pulseRate" : 89,
                    "oxygenSat" : 98,
                    "bloodPress" :[120,    80]
                },
                "alerts":{
                    "temp":[0,0],
                    "pulseRate":[0,0],
                    "respRate":[0,0],
                    "bloodPress":[[0,0],[0,0]]
                },
                "vitalLogs" : [
                    {"staff":"stubbsD@gmail.com", "vitalSign":"ECG", "time": "14:36, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"SpO2", "time": "14:35, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"RR", "time": "14:34, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"BP", "time": "14:32, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"ECG", "time": "10:20, July 7, 2021"},

                ]
            },

            
            "welkerLaw@gmail.com" : {
                "resourceType" : "Patient",
                "accessLevel" : 3,
                "EMAIL" : "welkerLaw@gmail.com",
                "PASS" : "pass",
                "PASS_2": "pass",
                "identifier" : "00546564",
                "fileID" : 235244,
                "active" : true,
                "name" : "Lawrence Welker",
                "nickname" : "Lawry",
                "telecom" : "(410) 555-8688",
                "gender" : "male",
                "birthDate" : "03/17/1993",
                "deceasedBoolean" : false,
                "deceasedDateTime" : "N/A",
                "address" :"610 Cherry Hill Rd, Street, Maryland(MD), 21154",
                "maritalStatus" : "Single",
                "photo" : "PatientPhotos/",
                "contact" : {
                    "relationship" : "daughter",
                    "name" : "Megan Foster",
                    "telecom" : "(410) 555-7547",
                    "address" : "7642 Schoolhouse Rd, Sykesville, Maryland(MD), 21784",
                    "gender" : "female",
                    "organization" : "N/A",
                    "period" : "N/A"},

                "communication" : {
                    "language" : "english",
                    "preferred" : "english"},

                "generalPractitioner" : "Dr. Acula",
                "managingOrganization" : "ACME Healthcare, Inc",
                "link" : {"other" : "", "type" : "<code>"},
                "medication": {},
                "devices":["temp","pulseRate","respRate","bloodPressure"],
                "bloodType" : "B-",
                "vitals":{
                    "carbonLevels" : 23,
                    "pulseRate" : 102,
                    "oxygenSat" : 95,
                    "bloodPress" :[158,    90]
                },
                "alerts":{
                    "temp":[0,0],
                    "pulseRate":[0,0],
                    "respRate":[0,0],
                    "bloodPress":[[0,0],[0,0]]
                },
                "vitalLogs" : [
                    {"staff":"stubbsD@gmail.com", "vitalSign":"ECG", "time": "14:36, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"SpO2", "time": "14:35, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"RR", "time": "14:34, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"BP", "time": "14:32, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"ECG", "time": "10:20, July 7, 2021"},

                ]
            },

            "castleGina@gmail.com" : {
                "resourceType" : "Patient",
                "accessLevel" : 3,
                "EMAIL" : "castleGina@gmail.com",
                "PASS" : "pass",
                "PASS_2": "pass",
                "identifier" : "02154744",
                "fileID" : 234214,
                "active" : true,
                "name" : "Regina Castle",
                "nickname" : "Gina",
                "telecom" : "(443) 555-7171",
                "gender" : "female",
                "birthDate" : "10/24/1960",
                "deceasedBoolean" : false,
                "deceasedDateTime" : "Married",
                "address" :"7626 Elmcrest Rd #APT TH, Hanover, Maryland(MD), 21076",
                "maritalStatus" : "N/A",
                "photo" : "PatientPhotos/",
                "contact" : {
                    "relationship" : "husband",
                    "name" : "Richard Castle",
                    "telecom" : "(410) 555-2152",
                    "address" : "7626 Elmcrest Rd #APT TH, Hanover, Maryland(MD), 21076",
                    "gender" : "male",
                    "organization" : "N/A",
                    "period" : "N/A"},

                "communication" : {
                    "language" : "english",
                    "preferred" : "english"},

                "generalPractitioner" : "Dr. Acula",
                "managingOrganization" : "ACME Healthcare, Inc",
                "link" : {"other" : "", "type" : "<code>"},
                "medication": {},
                "devices":["temp","pulseRate","respRate","bloodPressure"],
                "bloodType" : "A+",
                "vitals":{
                    "carbonLevels" : 31,
                    "pulseRate" : 72,
                    "oxygenSat" : 88,
                    "bloodPress" :[158,    90]
                },
                "alerts":{
                    "temp":[0,0],
                    "pulseRate":[0,0],
                    "respRate":[0,0],
                    "bloodPress":[[0,0],[0,0]]
                },
                "vitalLogs" : [
                    {"staff":"stubbsD@gmail.com", "vitalSign":"ECG", "time": "14:36, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"SpO2", "time": "14:35, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"RR", "time": "14:34, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"BP", "time": "14:32, July 7, 2021"},
                    {"staff":"stubbsD@gmail.com", "vitalSign":"ECG", "time": "10:20, July 7, 2021"},

                ]
            },

            "ricGonz@gmail.com" : {
                "resourceType" : "Doctor",
                "accessLevel" : 1,
                "EMAIL" : "ricGonz@gmail.com",
                "PASS" : "pass",
                "PASS_2": "pass",
                "identifier" : "01655180",
                "active" : true,
                "name" : "Ricardo Gonzalez",
                "nickname" : "Rico",
                "telecom" : "(443) 555-5341",
                "gender" : "male",
                "birthDate" : "08/03/1960",
                "patients" :["jHinkle28@gmail.com", "mmasters@gmail.com", "hRami@gmail.com", "jessPars@gmail.com", "welkerLaw@gmail.com", "castleGina@gmail.com"]
            },

            "sscotts@gmail.com" : {
                "resourceType" : "Physician",
                "accessLevel" : 1,
                "EMAIL" : "sscotts@gmail.com",
                "PASS" : "pass",
                "PASS_2": "pass",
                "identifier" : "54217811",
                "active" : true,
                "name" : "Shaunice Scotts",
                "nickname" : "Shauna",
                "telecom" : "(443) 555-5412",
                "gender" : "female",
                "birthDate" : "02/12/1980",
                "patients" : ["jHinkle28@gmail.com", "mmasters@gmail.com", "hRami@gmail.com", "jessPars@gmail.com", "welkerLaw@gmail.com", "castleGina@gmail.com"]
            },

            "stubbsD@gmail.com" : {
                "resourceType" : "Nurse",
                "accessLevel" : 2,
                "EMAIL" : "stubbsD@gmail.com",
                "PASS" : "pass",
                "PASS_2": "pass",
                "identifier" : "54217811",
                "active" : true,
                "name" : "Dallas Stubbs",
                "nickname" : "Stubby",
                "telecom" : "(443) 555-5412",
                "gender" : "female",
                "birthDate" : "02/12/1980",
                "patients" : ["jHinkle28@gmail.com", "mmasters@gmail.com", "hRami@gmail.com", "jessPars@gmail.com", "welkerLaw@gmail.com", "castleGina@gmail.com"]
            }
        },
        "currentUser":{}
    }
    
}