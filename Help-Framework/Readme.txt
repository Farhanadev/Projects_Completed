1. To use the Help Framework, the Help_Framework.js need to be included in the page(here it is Help_Wizard_Screen.html).
2. In Help_Framework.js file, remote url variable and data file (here it is: Data.json file) need to be set.
3. In the HTML/PHP page, the html elements with data-help attribute(div,paragraph,anchor tag,span etc) need to be placed in area,
where help areas need to be displayed.
4. The positioning of the elements can be specified  by making change in the Help_Framework.css file. That need to be also included in the HTML/PHP page.
5. In the HTML/PHP page(follow Help_Wizard_Screen.html), at the bottom of the page, section variable need to be specified and call the Help_Wizard function with the section data.
6. In the Help_Wizard.js file, it will check whether the section variable is set and if it is set, it will read the data from Data.json file using ajax.
7. If the data in Data.json file need to be changed, then in Help_Wizard.js file, SetHelpData() and create_next_help() need to be changed accordingly.
8. To change the cookie information,setCookie(),getCookie(),checkCookie() and check_user() need to be changed.
9. The Following files need to be included in the file to use the Bootstrap popover.

    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">

    <!-- jQuery library -->

    <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>

    <!-- Latest compiled JavaScript -->
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>

    <link rel="stylesheet" href="Help_Framework.css">