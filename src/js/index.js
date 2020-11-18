import "../css/styles.css";

const nodePort = 3333;
const baseUrl = `http://localhost:${nodePort}`;

const registerBtn = document.querySelector("#register-btn");
const form = document.querySelector("#comment-form");
const commentInput = document.querySelector("#comment-text");
const list = document.querySelector("#list");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  registerBtn.disabled = true;
  let voiceLang =document.getElementById("pt-br").value

  if (document.getElementById("en-us").checked)  {
    voiceLang = document.getElementById("en-us").value;
  }

  if (!commentInput.value) {
    registerBtn.disabled = false;
    return window.alert("Invalid Text");
  }
  
  const jsonRequest = JSON.stringify({ comment: commentInput.value, voiceLang });
  
  const fetchConfigs = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  }
  
  fetch(`${baseUrl}/tts`, {
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
    
    const mp3 = `${baseUrl}/uploads/${result.speech}`;
    
    const mp3src = document.createElement("source");
    mp3src.setAttribute("src", mp3);
    mp3src.setAttribute("type", "audio/mpeg");
    
    listItem.appendChild(textComment);
    listItem.appendChild(speech);
    
    list.appendChild(listItem);
    
    setTimeout(() => {
      listItem.appendChild(playAudioBtn);
      speech.appendChild(mp3src);
      registerBtn.disabled = false;
    },6000)
    
    playAudioBtn.addEventListener("click", () => {
      speech.play();
    })
  })
})