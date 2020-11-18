import { fetch as fetchPolyfill } from "whatwg-fetch";

import "../css/styles.css";

const form = document.querySelector("#comment-form");
const commentInput = document.querySelector("#comment-text");
const list = document.querySelector("#list");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const jsonRequest = JSON.stringify({ comment: commentInput.value });
  
  const fetchConfigs = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  }
  
  fetch("http://localhost:3333/tts", {
    method: fetchConfigs.method,
    headers: fetchConfigs.headers,
    body: jsonRequest
  }).then(response => response.json() ).then(result => {
    console.log(result);

    const listItem = document.createElement("li");
    listItem.setAttribute("id", `speech-${result.id}`);
    
    const speech = document.createElement("audio");
    speech.setAttribute("controls", "")
    
    const playAudioBtn = document.createElement("button");
    playAudioBtn.innerHTML = "Ouvir";
    
    const textComment = document.createElement("p");
    textComment.innerHTML = result.comment;
    
    const mp3 = `http://localhost:3333/uploads/${result.audio}`;
    
    const mp3src = document.createElement("source");
    mp3src.setAttribute("src", mp3);
    mp3src.setAttribute("type", "audio/mpeg");
    
    listItem.appendChild(textComment);
    listItem.appendChild(speech);
    
    list.appendChild(listItem);
    
    setTimeout(() => {
      listItem.appendChild(playAudioBtn);
      speech.appendChild(mp3src);
    },6000)
    
    playAudioBtn.addEventListener("click", () => {
      speech.play();
    })
  })
})