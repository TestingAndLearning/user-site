$(document).ready(function()
{
    //populateTable();
    var repopulate = false;
    console.log("0");
    /** Saves new set of data.  **/
    $("#submitBtn").click(function(event)
    {
        console.log("1");
        //firebase.database.enableLogging(true);
        //test123.innerText = claimnumber;
        var claimnumber = $("#claimnumber").val();
        var firstname = $("#firstname").val();
        var lastname = $("#lastname").val();
        var email = $("#email").val();
        var date = $("#date").val();
        var usersRef = firebase.database().ref("cases/").orderByKey();

        /** Checks for duplicates for claimnumber. **/
        usersRef.once('value', function(snapshot) 
        {
            if(!snapshot.hasChild(claimnumber))
            {
                //populated = true;
                firebase.database().ref('cases/' + claimnumber).set(
                {
                    firstname: firstname,
                    lastname: lastname,
                    email : email,
                    date : date
                });
                $("#redStatus").hide();
                $("#greenStatus").show(800);
            }
            else
            {
                //repopulate = false;
                $("#greenStatus").hide();
                $("#redStatus").show(800);
                alert('Claim number already exists. ');
            }
        });

        console.log("2");

        /** Displayed in table if not already loaded. **/
        //TODO: Look into firebase.reload(); function. 
        //if (repopulate)
        //{
            //repopulate = false;
            //$("#claimsList tr").empty();
            //setTimeout(populateTable, 1000);    //Sets delay to 1000 milliseconds, if too fast then sometimes firebase does not get it fast enough. 
            event.preventDefault(); //Prevents form from refreshing. 
        //}                    
            
    });

});
