$(document).ready(function()
{
	populateTable();

	$("#dialog-modal").dialog(
	{
		autoOpen: false,
		height: 500,
		width: 500, 
		modal: true
	});

	$("#modal-opener").click(function(event)
	{
		$("#dialog-modal").dialog("open");
        $("#dialog-modal").dialog("option", "title", "Create a Claim");
		$("#dialog-modal").load("create");

    });

});

function populateTable ()
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

    // Loop through users in order with the forEach() method. The callback provided
    // to will be called synchronously with a DataSnapshot for each child:
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

            //$("tr:odd").css("color", "#E4E4E4");
        });
    });
}