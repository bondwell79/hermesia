chrome.contextMenus.create({
  id: "resumirTexto",
  title: "Resumir 50 palabras",
  contexts: ["selection"]
});
chrome.contextMenus.create({
  id: "esquematizarTexto",
  title: "Esquematizar",
  contexts: ["selection"]
});
chrome.contextMenus.create({
  id: "queesTexto",
  title: "¿Qué es?",
  contexts: ["selection"]
});
chrome.contextMenus.create({
  id: "traducirTexto",
  title: "Traducir al español",
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "resumirTexto") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: resumirTexto,
      args: [info.selectionText]
    });
  }
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "esquematizarTexto") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: esquematizarTexto,
      args: [info.selectionText]
    });
  }
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "queesTexto") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function:queesTexto,
      args: [info.selectionText]
    });
  }
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "traducirTexto") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: traducirTexto,
      args: [info.selectionText]
    });
  }
});

function resumirTexto(textoSeleccionado) 
{	
fetch("http://localhost:11434/api/generate", { method: 'POST',mode: 'cors',credentials: 'same-origin',cache: 'no-cache', redirect: 'follow', referrer: 'client', headers: { "Content-Type": 'application/json' },body: '{ "model": "tinyllama", "prompt": "Resume en español en 50 palabras este texto:'+textoSeleccionado+'","stream": false }'})
.then(response => response.json())
.then(data => { 
const message = new SpeechSynthesisUtterance(data.response);
speechSynthesis.speak(message);});
}
function esquematizarTexto(textoSeleccionado) 
{	
fetch("http://localhost:11434/api/generate", { method: 'POST',mode: 'cors',credentials: 'same-origin',cache: 'no-cache', redirect: 'follow', referrer: 'client', headers: { "Content-Type": 'application/json' },body: '{ "model": "tinyllama", "prompt": "Haz un esquema en español de este texto:'+textoSeleccionado+'","stream": false }'})
.then(response => response.json())
.then(data => { 
const message = new SpeechSynthesisUtterance(data.response);
speechSynthesis.speak(message);});
}
function queesTexto(textoSeleccionado) 
{	
fetch("http://localhost:11434/api/generate", { method: 'POST',mode: 'cors',credentials: 'same-origin',cache: 'no-cache', redirect: 'follow', referrer: 'client', headers: { "Content-Type": 'application/json' },body: '{ "model": "tinyllama", "prompt": "Define qué significa esto en español:'+textoSeleccionado+'","stream": false }'})
.then(response => response.json())
.then(data => { 
const message = new SpeechSynthesisUtterance(data.response);
speechSynthesis.speak(message);});
}
function traducirTexto(textoSeleccionado) 
{	
fetch("http://localhost:11434/api/generate", { method: 'POST',mode: 'cors',credentials: 'same-origin',cache: 'no-cache', redirect: 'follow', referrer: 'client', headers: { "Content-Type": 'application/json' },body: '{ "model": "tinyllama", "prompt": "Traduce al español este texto:'+textoSeleccionado+'","stream": false }'})
.then(response => response.json())
.then(data => { 
const message = new SpeechSynthesisUtterance(data.response);
speechSynthesis.speak(message);});
}
