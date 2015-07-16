var HelpWizard = function (section) {
    var json_data;

    if (section != "") {       //If section is not initialized, set the section data
        section = "listings";
    }


};

HelpWizard.prototype.help_data = function (section) {

    
    var remoteURL = "http://tangobits_landing.localhost/";
    var json_data; //variable to store the Json or listing data
    var json_data_array = [];
    var element1, element2, element3, element4, element5; // //variables to store the each object of Json or listing data
    var _this = this;
    var dataArray = []; //store the data-help attributes of the elements in HTML or PHP page
    var Get_IDs = [];   //store the IDs of the elements having the data-help attributes
    var next_help_element = null;
    var help_area = null;
    var palcement = "";
    var innHTML = "";
    var help_activate = false;
    var user_type = "unvisited";
    var JsonDataArray = [];

    setupHelp(section);


    function setupHelp(section) {   //get the IDs of the html elements that contain data-help attribute  and also store the  data-help attributes

        var gethelps = "";
        var getIDs = "";
        $('*[data-help]').each(function (get) {
            gethelps = $(this).data('help'); //get the data-help attributes of the elements in HTML or PHP page
            getIDs = $(this).attr('id'); //get the IDs of the elements having the data-help attributes
            dataArray.push(gethelps); //store the data-help attributes of the elements
            Get_IDs.push(getIDs); //store the IDs of the elements


        });

        //ajax method call to set the data for the class
        if (section == "listing") {
            $.ajax({
                url: remoteURL + "Help-Framework/Data.json",
                dataType: "json",
                success: function (response) {
                    alert("success");
                    json_data = (response.listing);
                    console.log(json_data);
                    setHelpData(json_data);//to parse or format  the Json data.
                    var main_div = "div.container"; //the container div that contains the elements with data-help attribute
                    create_help_icons(main_div); //create the help icons inside the elements with data-help attribute
                    check_User(); //determine whether the user is first time or not
                },
                error: function (jqXHR, exception) {
                    alert("error " + exception)
                },

                beforeSend: function () {
                    // _this.$loading.fadeIn();
                },
                complete: function () {
                    // _this.$loading.fadeOut();

                },
                complete: function () {
                    // console.log(this.$loading);
                    // this.$loading.fadeOut();
                }
            });
        }
        // this.addListener();
    };

    /* function addListener()  //create listeners to execute events
     {


     };*/


    function setHelpData(json) {   //Function to format or parse the Json  data where array store each of the JSON Objects


        $.each(json, function (key, val) {
            JsonDataArray.push(val);

        });



    };


    function create_help_icons(container) {  //It creates the first icon and calls the function to create all other help icons

        var help_icon = JsonDataArray[0].icon;//get the first help icon
        innHTML =
            '<div class="row help_data" id="tophelp">' +
                '<p>' + 'Your House style &nbsp;' + '<img class="helpicon_top" id="helpIcon" src=' + help_icon + ' />' + '</p>' +
                '</div>';
        $(container).prepend(innHTML);
        create_next_help(container);
    };

    function create_next_help(container) {  //function to create all the  help icons  inside the elements with data-help attributes

        var data_help_conatiner;
        var help_element;
        innHTML = "";
        //compare the data-help attributes of the elements with each of the listing(Json) objects key
        // and if there is match, get the ID of the element,then append the object's help-icon with help-data  in that corresponding element
        for (var i = 0; i < dataArray.length; i++) {
             for(var j=0;j < JsonDataArray.length;j++) {

                 if (dataArray[i] == JsonDataArray[j].key) { //if there is match

                     data_help_conatiner = Get_IDs[i];
                     innHTML = '<img class="helpicon"  data-toggle="popover"   data-content="' + JsonDataArray[j].value
                         + '"  id="img_' + JsonDataArray[j].id + '" src="' + JsonDataArray[j].icon + '"/>';
                     $("#" + data_help_conatiner).append(innHTML);

                     break;
                 }

             }
        }




        // show the popover upon clicking the icon

        $('.helpicon').popover({
            html: true,
            //,trigger: 'click'
            offset: 10,
            placement: get_popover_placement

        });

        //To Dynamically change the location of the popover depending upon where where the element is located on the screen.

        function get_popover_placement(context, source) {
            var position = $(source).position();
           // console.log(position);
            var width = window.innerWidth;
            //console.log("width:" + width);
            if (width < 500) {  //for Mobile Screen
                return 'bottom';
            }
            else { //if Not Mobile
                if (position.left > 515) {  //if the element is positioned far from left, close to right, then popover will be positioned at left
                    return "left";
                }

                if (position.left < 515) {  //if the element is positioned close to left, far from right, then popover will be positioned at right
                    return "right";
                }

                if (position.top < 110) {
                    return "bottom";
                }

            }

            return "bottom";
        }

        $('.helpicon').click(function (e) {
            e.stopPropagation();
        });

        //show only one popover at a time
        $('.helpicon').click(function () {
            $('.helpicon').not(this).popover('hide'); //hide all but this
        });

        //close opened popover by clicking anywhere in the document
        $(document).click(function (e) {
            if (($('.popover').has(e.target).length == 0) || $(e.target).is('.helpicon')) {
                $('.helpicon').popover('hide');
            }
        });

    };


//for setting, retrieving and checking cookie information

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    };

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };

    function checkCookie() {
        var user = getCookie("username");
        if (user != "") {

            user_type = "visited";
            if (user_type == "visited")
                alert("Second Time User");

        } else {
            user = "help";
            if (user == "")
                alert("Unknown User");
            if (user_type == "unvisited")
                alert("First Time User");
            if (user != "" && user != null) {
                setCookie("username", user, 1);
            }
        }
    };

    function check_User() //determine whether the user is first time or not
    {
        checkCookie();
        if (user_type == "unvisited" || user_type == null || user_type == "") {
            find_help_data();//do actions for  first time user

        } else {  //do actions for second time user
            toggle_all_icons();
            help_activate = false;
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC"; //delete the cookie after checking action for second time user for testing purpose
        }
    };


    //for second time user
    function toggle_all_icons() {  //at first hide all icons, upon clicking the top help icon, it will show the all help icons
        // and again will hide all upon clicking again
        var help_dataElement;
        for (var i = 0; i < Get_IDs.length; i++) { //hide all the help data elements
            help_dataElement = Get_IDs[i];
            $("#" + help_dataElement).hide();
        }

        // upon clicking the top help icon, it will show the all help icons
        // and again will hide all upon clicking again

        $("#helpIcon").click(function () {
            help_activate = true;
            if (help_activate == true) {
                for (var i = 0; i < Get_IDs.length; i++) {
                    help_dataElement = Get_IDs[i];
                    $("#" + help_dataElement).toggle();
                }
            }
        });
    };


    function find_help_data() {  //for first time user, hide all  help icons popovers except show the first help with popover,
        // upon clicking any where in the page except help icon, hide popover of the showed one
        //and show the next icon's popover
        help_activate = true;
        var help_visible = 0;
        var current_help_element = null;
        var first_help_element = null;

        if (help_activate == true) {
            first_help_element = Get_IDs[0];

            $("#" + first_help_element).children("img").popover('show');  //this will load the popover of the first help icon upon document load


            help_visible = 1;
            current_help_element = ("#" + first_help_element);

            if (help_visible == 1) {  //hide all the other helps

                $(current_help_element).nextAll().children("img").popover('hide');
            }

            find_next_helps(current_help_element);
        }
    };

    //upon clicking any where in the page,,hide the showed  ones' popover and display the next ones' popover
    function find_next_helps(current_help_element) {

        next_help_element = null;

        help_area = null;
        var current_help = current_help_element;
        next_help_element = $(current_help).next();

        $(document).on('click', function (e) {
            help_area = $(current_help).children("img");
            if (!$(e.target).is(help_area) && !$(e.target).parents().is(help_area)) {  //if clicked anywhere  outside of the current help icon
                // hide the showed  ones' popover and display the next ones' popover
                $(current_help).children("img").popover('hide');
                $(next_help_element).children("img").popover('show');
            }

            current_help = next_help_element;
            next_help_element = $(current_help).next();
        });
    };


}

/**
 * Created with IntelliJ IDEA.
 * User: farhana
 * Date: 15-03-23
 * Time: 12:53 PM
 * To change this template use File | Settings | File Templates.
 */
