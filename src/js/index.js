import "../css/styles.scss";
import playIcon from "../static/play-circle.svg";

const nodePort = 3333;
const baseUrl = `http://localhost:${nodePort}`;

const textArea = document.querySelector("#textarea-message");

textArea.addEventListener("keypress", function handleSubmit(e) {
	const { key } = e;
	const whiteSpaceCharCode = 32;

	if (
		key === String.fromCharCode(whiteSpaceCharCode) &&
		this.value.length === 0
	) {
		e.preventDefault();
	}
});

const commentList = document.querySelector("#comment-list");

function addItemsToCommentList(comment) {
	const listItem = document.createElement("li");
	listItem.setAttribute("id", `comment-${comment.id}`);
	listItem.setAttribute("class", "media row mb-3");

	const itemBody = document.createElement("div");
	itemBody.setAttribute(
		"class",
		"media-body border-bottom d-flex align-items-center"
	);

	const imgPlayIcon = document.createElement("img");
	imgPlayIcon.setAttribute("id", `icon-${comment.id}`);
	imgPlayIcon.setAttribute("class", "mr-3 mb-2 play-icon");
	imgPlayIcon.setAttribute("width", "50");
	imgPlayIcon.setAttribute("src", playIcon);
	imgPlayIcon.setAttribute("alt", "Play Icon");

	const audioPlayer = document.createElement("audio");
	audioPlayer.setAttribute("id", `audio-${comment.id}`);
	audioPlayer.setAttribute("class", "d-none");
	audioPlayer.setAttribute("controls", "");

	const audioSource = document.createElement("source");
	audioSource.setAttribute("src", comment.audio);
	audioSource.setAttribute("type", "audio/mpeg");

	const commentText = document.createElement("p");
	commentText.innerHTML = comment.comment;

	listItem.appendChild(itemBody);
	itemBody.appendChild(imgPlayIcon);
	itemBody.appendChild(audioPlayer);
	audioPlayer.appendChild(audioSource);
	itemBody.appendChild(commentText);

	imgPlayIcon.addEventListener("click", () => audioPlayer.play());

	commentList.appendChild(listItem);
}

fetch(`${baseUrl}/tts`, {
	method: "GET",
}).then((response) =>
	response.json().then((comments) => {
		comments.forEach((comment) => addItemsToCommentList(comment));
	})
);

const commentForm = document.querySelector("#form-message");
const selectLang = document.querySelector("#lang-message");
const postBtn = document.querySelector("#btn-post");

commentForm.addEventListener("submit", (event) => {
	event.preventDefault();
	postBtn.disabled = true;

	textArea.value = textArea.value.trim();

	if (
		textArea.value[0] === String.fromCharCode(32) ||
		textArea.value.length === 0
	) {
		window.alert("ERRO: MENSÁGEM INVÁLIDA");
		commentForm.reset();
	}

	if (!selectLang.value) {
		window.alert("ERRO: LINGUAGEM INVÁLIDA");
	}

	const voiceLang = selectLang.value === "Português - Brasil" ? "1" : "2";

	const requestBody = JSON.stringify({ comment: textArea.value, voiceLang });

	fetch(`${baseUrl}/tts`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: requestBody,
	})
		.then((response) => response.json())
		.then((result) => {
			addItemsToCommentList(result);
			postBtn.disabled = false;
			commentForm.reset();
		});
});
