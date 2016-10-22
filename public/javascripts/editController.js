$(document).ready(function()
{
    var getClaim = window.location.hash.substring(1);

    var setTest = document.getElementById("setTest");
    setTest.innerText = getClaim;
});
