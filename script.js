const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';

const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');

//thos could be done with keyup too
quoteInputElement.addEventListener('input', () => {
	const arrayQuoteSpans = quoteDisplayElement.querySelectorAll('span');
	const arrayValue = quoteInputElement.value.split('');
	let isCorrectParagraph = true;

	arrayQuoteSpans.forEach((characterSpan, index) => {
		const typedCharacter = arrayValue[index];
		if (typedCharacter) {
			if (typedCharacter == characterSpan.textContent) {
				characterSpan.classList.add('correct');
			} else {
				isCorrectParagraph = false;
				characterSpan.classList.add('incorrect');
			}
		} else {
			isCorrectParagraph = false;
			characterSpan.classList.remove('incorrect');
			characterSpan.classList.remove('correct');
		}
	});

	if (isCorrectParagraph) {
		renderNewQuote();
	}
});

let startTime;
function startTimer() {
	timerElement.textContent = 0;
	startTime = new Date();
	setInterval(() => {
		timerElement.textContent = getTimerTime();
	}, 1000);
}

function getTimerTime() {
	return Math.floor((new Date() - startTime) / 1000);
}

async function getRandomQuote() {
	return fetch(RANDOM_QUOTE_API_URL).then((response) => response.json()).then((data) => data.content);
}

async function renderNewQuote() {
	const quote = await getRandomQuote();
	quoteDisplayElement.textContent = '';
	quoteInputElement.value = '';
	quote.split('').forEach((letter) => {
		const characterSpan = document.createElement('span');
		characterSpan.textContent = letter;
		quoteDisplayElement.appendChild(characterSpan);
	});

	startTimer();
}

renderNewQuote();
