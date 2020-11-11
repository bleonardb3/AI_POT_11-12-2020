Introduction
============

This lab will introduce users to the use of IBM\'s predictive analytics
and decision optimization technologies to solve COVID-19 problems. The
coronavirus has infected millions of people leading to severe illness
symptoms resulting in deaths totalling in the hundreds of thousands. 
During the initial outbreak not all areas were affected the same. Hospitals located in
COVID-19 epidemic outbreak locations were overwhelmed with sick and
dying patients. This lab will apply predictive analytics to analyze
different factors among people to predict future COVID-19 infection
rates in an area. Based on areas predicted to have high COVID-19
infections -- this lab will apply optimization techniques to optimize
the planning of transferring COVID-19 patients from hospitals located in
epidemic areas to hospitals with less COVID-19 patients. Our hope is to
educate people who are involved in the COVID-19 response decision-making
process, in applying IBM\'s predictive and optimization technologies to
help them improve planning and responding to the next wave of COVID-19
cases.

Objectives
==========

The goal of this lab is to educate users on how to apply IBM predictive
analytics and optimization tools to different applications of COVID-19
such as (1) predicting future infections and (2) optimizing response for
better decision making. Students will use Watson Studio to load and step
through a notebook that applies Decision Optimization to optimize the
transport of affected people between hospitals to avoid being
over capacity. Working through this notebook -- we intend for students to learn
these skills.

1.  Learn how to load data form different places (departments, current
    situation, etc) to be used for analysis.

2.  Learn how to represent the current situation on a map using folium.
    folium makes it easy to visualize data that\'s been manipulated in
    Python on an interactive leaflet map. 

3.  Learn how to use a LinearRegression from sklearn to predict new
    cases for each department.

4.  Learn how to use Decision Optimization to model and optimize patient
    transfers.

5.  Learn how to use folium to display the optimized future patient
    transfers plan i.e. all the transfers from the solution.

Prerequisites
=============

1.  Open a web browser and enter this URL \>
    <https://dataplatform.cloud.ibm.com/>

2.  If you already have a Watson Studio account please \"Log In\" and
    skip to section \" Create a Watson Studio project and set up the
    required services\".

3.  Else click \"Sign Up\" to create a Watson studio account.

> <img src="https://raw.githubusercontent.com/bleonardb3/AI_POT_11-12-2020/master/Lab-4/images/Picture1.png"/>

4.  Pick an IBM Cloud region near you. Enter your email address as your
    user account. Click on \"Accept\" terms & conditions. Click \"Next\"
    button.

> <img src="https://raw.githubusercontent.com/bleonardb3/AI_POT_11-12-20200/master/Lab-4/images/Picture2.png"/>


5.  Enter a password \> click \"Next\" button.

> <img src="https://raw.githubusercontent.com/bleonardb3/AI_POT_11-12-2020/master/Lab-4/images/Picture3.png"/>


6.  Verify your account. Enter the verification code sent to your email
    address. Click \"Next\" button.

> <img src="https://raw.githubusercontent.com/bleonardb3/AI_POT_11-12-2020/master/Lab-4/images/Picture4.png"/>


7.  Enter your personal information. Click \"Next\" button.

> <img src="https://raw.githubusercontent.com/bleonardb3/AI_POT_11-12-2020/master/Lab-4/images/Picture5.png"/>


8.  Please indicate if and how IBM can keep you informed on IBM\'s
    products services. Click \"Create account\" button.

> <img src="https://raw.githubusercontent.com/bleonardb3/AI_POT_11-12-2020/master/Lab-4/images/Picture6.png"/>


Note: Users will see an account progress bar. Click \"Login\" button to
login to your account.

> <img src="https://raw.githubusercontent.com/bleonardb3/AI_POT_11-12-2020/master/Lab-4/images/Picture7.png"/>

Create a Watson Studio project and set up the required services.
----------------------------------------------------------------

1.  Enter the Watson Studio URL in a web browser -\>
    <https://dataplatform.cloud.ibm.com/>. Login to your Watson Studio
    account.

2.  Select your region; e.g. Dallas.  Enter your username then press the \"Continue\" button.  Enter your password then click the \"Logi in\" button.

> <img src="https://raw.githubusercontent.com/bleonardb3/AI_POT_11-12-2020/master/Lab-4/images/Picture8.png"/>

3.  Create a project by clicking on the \"Create a project\" hyperlink.

> <img src="https://raw.githubusercontent.com/bleonardb3/AI_POT_11-12-2020/master/Lab-4/images/Picture9.png"/>

4.  Click on \"Create an empty project\".

> <img src="https://raw.githubusercontent.com/bleonardb3/AI_POT_11-12-2020/master/Lab-4/images/Picture11.png"/>

5.  Enter a project name; e.g. \"COVID-19 Decision Making\". Enter a
    description (optional) \" This project will apply predictive
    analytics and optimization techniques to predict COVID-19 infections
    in areas and optimize response to transfer COVID-19 patients to less
    occupied COVIDD-19 hospitals.\"

6.  Check \"Restrict who can be a collaborator\".

7.  If you already have an Object Storage\" instance -- please select it
    from the \"Select storage service\" selection box. Click \"Create\"
    button. Next, proceed to the section \"Adding a Machine Learning
    Service\" below.

> <img src="https://raw.githubusercontent.com/bleonardb3/AI_POT_11-12-2020/master/Lab-4/images/Picture12.png"/>

8.  Else click on the \"Cloud Object Storage\" URL.

> <img src="https://raw.githubusercontent.com/bleonardb3/AI_POT_11-12-2020/master/Lab-4/images/Picture13.png"/>

9. Click the \"Lite\" plan. Enter a service name for your \"Object
    Storage\' service. Click \"Create\" button.
    
> <img src="https://raw.githubusercontent.com/bleonardb3/AI_POT_11-12-2020/master/Lab-4/images/Picture14.png"/>

10. Select your \"Cloud Object Storage\" service name from the \"Select
    storage service\" selection box. Click \"Create\" button.

> <img src="https://raw.githubusercontent.com/bleonardb3/AI_POT_11-12-2020/master/Lab-4/images/Picture15.png"/>

Associating a Machine Learning Service
---------------------------------

1.  Click on the project Settings tab.

> <img src="https://raw.githubusercontent.com/bleonardb3/AI_POT_11-12-2020/master/Lab-4/images/Picture16.png"/>

2.  Scroll down to Associated Services, then select Add service and
    select Watson.

> <img src="https://raw.githubusercontent.com/bleonardb3/AI_POT_11-12-2020/master/Lab-4/images/Picture17.png"/>

3.  When you created your Watson Studio service, it automatically comes with a Machine Learning (ML) service instance.  
    You just need to associate your ML service to this project.  Check the checkbox next your the Machine Learning service; 
    e.g. /"Machine_Learning_laa/".  Click on the /"Associate service/" button.

> <img src="https://raw.githubusercontent.com/bleonardb3/AI_POT_11-12-2020/master/Lab-4/images/Picture22.png"/>

4.  The Machine Learning service should now have /"Associated"/ in the /"Status/" column.

> <img src="https://raw.githubusercontent.com/bleonardb3/AI_POT_11-12-2020/master/Lab-4/images/Picture23.png"/>

### Please click on the link below to download the instructions to your machine.

[Instructions](https://raw.githubusercontent.com/bleonardb3/AI_POT_11-12-2020/main/Lab-4/Lab%204%20FranceCOVID-19%20Instructions.pdf).

