const wsUri = "wss://echo-ws-service.herokuapp.com";

function pageLoaded() {
   const infoOutput = document.querySelector(".info_output");
   const chatOutput = document.querySelector(".chat_output");
   const input = document.querySelector("input");
   const sendBtnChat = document.querySelector(".btn_send");
   const sendBtnGeo = document.querySelector(".btn_geo");

   let socket = new WebSocket(wsUri);

   socket.onopen = () => {
      infoOutput.innerText = "Соединение установлено";
   }

    socket.onmessage = (event) => {
      writeToChat(event.data, true);
   }

   socket.onerror = () => {
      infoOutput.innerText = "При передаче данных произошла ошибка";
    }
    
    sendBtnChat.addEventListener("click", sendMessage);
    
    function sendMessage() {
      if (!input.value) return;
      socket.send(input.value);
      writeToChat(input.value, false);
      input.value === "";
    }

   function writeToChat(message, isRecieved) {
      let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
      chatOutput.innerHTML += messageHTML;
   }

   sendBtnGeo.addEventListener("click", getLocation);

   function getLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError,);
      } else {
        writeOutput("Ваш браузер не поддерживает функцию определения местоположения");
      }
    }

    function writeOutput(message) {
      chatOutput.innerHTML = `<p>${message}</p>`;
    }

    function locationError() {
      writeOutput("При получении местоположения произошла ошибка");
    }

    function locationSuccess(data) {
      let link = `https://www.openstreetmap.org/#map=18/${data.coords.longitude},${data.coords.latitude}`;
      writeOutput(`<a href="${link}" target="_blank">Вы находитесь здесь</a>`);
    }

   }
  
document.addEventListener("DOMContentLoaded", pageLoaded);