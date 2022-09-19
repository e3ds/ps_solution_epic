var username = document.currentScript.getAttribute("username");
var mail = document.currentScript.getAttribute("mail");

console.log("logged in by "+username+" ("+mail+")");

function logOff() {
    console.log("logoff");
    window.location.assign("https://login1.eagle3dstreaming.com/signin?uri="+base);
}