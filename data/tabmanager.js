document.addEventListener('keydown', onkeydown, false);
document.addEventListener('mousedown', onmousedown, false);
var lang = "en";

function onkeydown(event) {
  if (lang != "en" && (document.activeElement != null || document.activeElement != document.body)) {
    if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90)) {
      var replaced;
      event.preventDefault();
	    if (lang == "hi") {
	      replaced = replacewithhindi(document.activeElement, event.keyCode, window.previouskeytyped);
	    }
      else if (lang == "bn") {
        replaced = replacewithbangla(document.activeElement, event.keyCode, window.previouskeytyped);
      }
      else if (lang == "ur") {
        replaced = replacewithurdu(document.activeElement, event.keyCode, window.previouskeytyped);
      }
      if (!replaced) {
        self.port.emit("typing-end", lang);
      }
      //else {
      //  self.port.emit("typing-end", lang);
      //}
	  }
	  else {
	  	window.previouskeytyped = event.keyCode;
      window.previouscharactertyped = "";
      window.count_prev_pressed = 0;
      self.port.emit("typing-end", lang);
	  }
  }
  else {
    self.port.emit("typing-end", lang);
  }
}
function onmousedown(event) {
  window.previouskeytyped = 0;
  window.previouscharactertyped = "";
  window.count_prev_pressed = 0;
  self.port.emit("typing-end", lang);
}
self.port.on("lang", function (text) {
  //console.log("received");
  //console.log(text);
  lang = text;
});

function getReplacementFromArray(keytoreplace, inparray) {
  if(keytoreplace != previouskeytyped) {
      count_prev_pressed = 0;
    }
    repchar = inparray[count_prev_pressed];
    if(count_prev_pressed > 0) {
      offset = -1;
    }
    count_prev_pressed++;
    if (count_prev_pressed >= inparray.length) {
      count_prev_pressed = 0;
    }
    self.port.emit("typing-begin", inparray);
    return repchar
}
