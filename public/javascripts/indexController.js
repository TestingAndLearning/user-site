$(document).ready(function()
{

	sortByKey();

	$("#dialog-modal").dialog(
	{
		autoOpen: false,
		height: 600,
		width: 600, 
		modal: true
	});

	$("#modal-opener").click(function(event)
	{
		$("#dialog-modal").dialog("open");
        $("#dialog-modal").dialog("option", "title", "Create a Claim");
		$("#dialog-modal").load("create");

    });

    $("#sortUser").click(function(event)
    {
        clearTable();
        sortByKey();
    });

    $("#sortFirst").click(function(event)
    {
        clearTable();
        sortByChild("firstname");
    });

    $("#sortLast").click(function(event)
    {
        clearTable();
        sortByChild("lastname");
    });

    $("#sortEmail").click(function(event)
    {
        clearTable();
        sortByChild("email");
    });

    $("#sortDate").click(function(event)
    {
        clearTable();
        sortByChild("date");
    });

    $("#sortAge").click(function(event)
    {
        clearTable();
        sortByChild("age");
    });

});

function sortByChild(toSort)
{
    appendHeaders();

    var query = firebase.database().ref("cases/").orderByChild(toSort);
    query.once("value").then(function(snapshot)
    {
        snapshot.forEach(function(childSnapshot) 
        {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();

            $('#claimsList tr:last').after
            ('<tr>'+
                '<td>'+ key +'</td>'+
                '<td>'+ childData["firstname"] +'</td>'+
                '<td>'+ childData["lastname"] +'</td>'+
                '<td>'+ childData["email"] + '</td>'+
                '<td>'+ childData["date"] +'</td>'+
                '<td>'+ childData["age"] +'</td>'+
            '</tr>');
        });
    });
}

function sortByKey()
{
    appendHeaders();

    var query = firebase.database().ref("cases/").orderByKey();
    query.once("value").then(function(snapshot)
    {
        snapshot.forEach(function(childSnapshot) 
        {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();

            $('#claimsList tr:last').after
            ('<tr>'+
                '<td>'+ key +'</td>'+
                '<td>'+ childData["firstname"] +'</td>'+
                '<td>'+ childData["lastname"] +'</td>'+
                '<td>'+ childData["email"] + '</td>'+
                '<td>'+ childData["date"] +'</td>'+
                '<td>'+ childData["age"] +'</td>'+
            '</tr>');
        });
    });
}

function clearTable()
{
    $("#claimsList tr").empty();
}

function appendHeaders()
{
    $('#claimsList').append
    ('<table>'+
        '<thead>'+
        '<th>'+ 'Username' +'</th>'+
        '<th>'+ 'First Name' +'</th>'+
        '<th>'+ 'Last Name' +'</th>'+
        '<th>'+ 'Email' + '</th>'+
        '<th>'+ 'Date' + '</th>'+
        '<th>'+ 'Age' + '</th>'+
        '</thead>'+
    '</table>');
}