$(document).ready(function()
{
    
    /** Saves new set of data.  **/
    $("#submitBtn").click(function(event)
    {
        var claimnumber = $("#claimnumber").val();
        var firstname = $("#firstname").val();
        var lastname = $("#lastname").val();
        var email = $("#email").val();
        var date = $("#date").val();
        var age = $("#age").val();

        var usersRef = firebase.database().ref("cases/").orderByKey();

        if(hasValidEmail(email))
        {
            //console.log(hasValidUser(claimnumber));

            usersRef.once('value', function(snapshot) 
            {
                if(!snapshot.hasChild(claimnumber))
                {
                    setNewData(claimnumber,firstname,lastname,email,date,age);
                    $("#redStatus").hide();
                    $("#greenStatus").show(800);
                }
                else
                {
                    $("#greenStatus").hide();
                    $("#redStatus").show(800);
                    alert('Claim number already exists. ');
                }
            });
        }
        else
        {
            alert("@ does not exist in email.");
        }  
        //TODO: Look into firebase.reload(); function or AJAX. 
        event.preventDefault(); //Prevents form from refreshing.                    
    });

});

function hasValidEmail(email)
{
    var hasEmail = email.includes("@");
    return email.includes("@");
}

/** Checks for duplicates for claimnumber. **/
function hasValidUser(claimnumber)
{
    var usersRef = firebase.database().ref("cases/").orderByKey();

    var validUser = usersRef.once('value', function(snapshot) 
    {
        if(!snapshot.hasChild(claimnumber))
        {
            return true;
        }
        else
        {
            return false;
        }
    });
        return validUser;
}

function setNewData(claimnumber,firstname,lastname,email,date,age)
{
    var usersRef = firebase.database().ref("cases/").orderByKey();

    firebase.database().ref('cases/' + claimnumber).set(
    {
        firstname: firstname,
        lastname: lastname,
        email : email,
        date : date,
        age : age
    });
}
