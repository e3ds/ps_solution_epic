var username = document.currentScript.getAttribute("username");
var mail = document.currentScript.getAttribute("mail");

console.log("logged in by "+username+" ("+mail+")");

function logOff() {
    let text= JSON.stringify({continueUrl:window.location.href , timestamp: Date.now() });
    let base=btoa(text);
    window.location.assign("/signoff?route="+window.location.pathname);
}