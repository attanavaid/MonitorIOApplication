# MonitorIO ReadMe
Below you will find all necessary information in order to properly test the application.
Each section will explain how each page works and which users can access which section
of the application.

### Login Page
Here a user may sign in with their approved credentials. Below is a list of users who can use
the application.

#### Different Account Types by Access Level:

	*Access Level 1 / Doctor
		* user: ricGonz@gmail.com | password: pass
		* user: sscotts@gmail.com | password: pass


	*Access Level 2 / Nurse
		* user: stubbsD@gmail.com | password: pass


	*Access Level 3 / Patient
		* user: jHinkle28@gmail.com | password: pass
		* user: mmasters@gmail.com | password: pass
		* user: hRami@gmail.com | password: pass
		* user: jessPars@gmail.com | password: pass
		* user: welkerLaw@gmail.com | password: pass
		* user: castleGina@gmail.com | password: pass


### Patient Access code - *01101*
Due to the nature of this project, the development team has decided to use a standard
access code for each patient to make debugging easier; however, if this were a real application,
the access code for each patient may be different for each individual or by staff member.


### Home Page
The access level for a user will not influence the behavior of this page. It is primarily used for application
notifications and as landing page from logging in. Here a user will be able to use
the navigation bar to go the Home page(redundant), Patients page, Settings page, About Us page,
 Contact Us page, FAQ page, Privacy Policy page, and Profile page.


### Patients Page
The Patients page is the primary feature of the application. Below summarizes what
each access level group can do.

#### Access Level One | Access Level Two
A user that has been granted access levels one or two, may have several patients in their list of patients.
If a user wants to view one of their patients, they may click on access link on the far right of the patient.
An alert will pop up asking for an access code, the default code for now is 01101. This will take the user to
the vitals page of the patient they've just clicked on.

#### Access Level Three
A user that has been granted access levels three, are considered a patient; therefore only one patient will be
listed for that user, and it is the users profile. The user may then click on the access link to view
their vitals. Once the link has been clicked, an alert will notify the user for an access code, this code is 01101.
This will take the user to the vitals page of themselves as the patient.


### Vitals Page
This is the primary landing page from when a user successfully accesses a patient(or themselves).

#### Access Level One | Access Level Two
When user navigates to this page, they will see the current patients general profile along with links to vitals(current page),
charts, lab results, vitals alert settings, and device controls. Below the patients profile is where external medical device
monitoring is displayed. For each of the vital signs, the user may be able to approve whether the condition is alright. Once the
user clicks on the approve button a log will be generated and displayed with the rest of the logs.

#### Access Level Three
When user navigates to this page, they will see the current patients general profile along with links to vitals(current page),
charts, lab results, vitals alert settings, and device controls; however, a user will not be able to click on any of the links
to vitals alert settings and device controls. Below the patients profile is where external medical device monitoring is displayed.
If the user tries to approve any vital sign, they will alerted: A patient may not approve any vitals.


### Charts Page

#### Access Level One | Access Level Two

#### Access Level Three


### Lab Results Page
Here a user may view a patients lab results and can request lab results.

#### Access Level One | Access Level Two
As stated previously, a user may view lab results of a patient. This generally includes any x-rays of the patient.
Or as a user with higher access, they may request a lab test to be done for the patient.

#### Access Level Three
A user with access level three will be able to view any of their previous lab results; however, this
user can not request any lab results and will be prompted with an alert, if they try to request a result.

### Vitals Alert Settings Page
This page is inaccessible for any user that has access level three.

#### Access Level One | Access Level Two
Here a user can view information on which alerts correspond to which level of urgency is needed.

### Device Controls Page
This page is inaccessible for any user that has access level three.

#### Access Level One | Access Level Two
Here a user can access two external medical devices: a ventilator and an infusion pump.

##### Ventilator
Here the user will be able to view and manipulate the ventilator connected to the patient.
The ventilator uses the gender, weight, height, and mode to calculate the variables for the ventilator.
If the variables for the ventilator need to be manually adjusted, the user can click on the "-" or "+"
buttons to adjust the variables. Once all necessary information is populated, the user can click on the
"start ventilator" button to start the ventilator.

##### Infusion Pump
The infusion pump allows a user to start/stop the pump for an allotted time, with an appropriate amount of medication.
The first section of the pump allows the user to enter an amount of time the pump should be running. The user can then
either start or stop the pump with the "start" buttons and "stop" buttons. The next section of the pump allows the user
to select a medication for the pump. The last section of the pump, allows the user to select a desired dosing method,
pump rate, and dosing weight. Once the user had entered all necessary information, they can click on the confirm
infusion.

### Settings Page
This page is accessible by all users. Here a user can switch the GUI to be in dark mode or light mode,
use sliders to adjust "mic" and "audio" levels, and change the language. Although the "mic", "audio",
and language change is purely aesthetic.

### About Us Page
Here the user can view general information about the developers of the application

### Contact Us Page
Here the user can send a message to the developers with a return email address.

### FAQ Page
Here a user can view any FAQs about the product.

### Privacy Policy Page
Here a user can read the privacy policy set forward by the application.
