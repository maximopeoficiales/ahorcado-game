import './main.css'
import './style.css'
import { words } from './common/data';
import { $, getRamdomWordWithHyphens, getRamdomWordWithHyphensNotSpace, getRandomNumber, removeAccents, replaceWordByLetter } from './common/utils';

const IMAGES = {
  GOKU_TA_BIEN: "https://los40.cl/wp-content/uploads/2022/05/dia-de-goku.jpg",
  LOGO: "https://play-lh.googleusercontent.com/8kcyCd2wFrUqaLGWuJJ4FhpqeH0IJv7MNWHNyYwiasskTT0kgB7r0B_XU2bop4oofhQt",
}

// APP

let secretWord = removeAccents(words[getRandomNumber(0, words.length)]);
console.log({ secretWord });

const wordResultParrafo = $("#word-result");
const imgAhorcado = $<HTMLImageElement>("#img-ahorcado");
const letter = $<HTMLInputElement>("#letter");

let counterError = 1;
wordResultParrafo.innerHTML = getRamdomWordWithHyphens(secretWord);
let palabraConGuionesSinEspacio = getRamdomWordWithHyphensNotSpace(secretWord);

const resetActionGame = (image?: string) => {
  // set image
  if (image) imgAhorcado.src = image;
  // set new secretWord
  secretWord = words[getRandomNumber(0, words.length)];
  console.log(secretWord);
  // set secretWord with quiones in html
  wordResultParrafo.innerHTML = getRamdomWordWithHyphens(secretWord);
  palabraConGuionesSinEspacio = getRamdomWordWithHyphensNotSpace(secretWord);
  // reset input and counter
  counterError = 1;
  letter.value = "";
  // reset img logo
  setTimeout(() => {
    imgAhorcado.src = IMAGES.LOGO;
  }, 2000);
}

const notFoundActionGame = () => {
  if (counterError == 6) {
    alert("Fin del juego")
    resetActionGame()
  } else {
    counterError++;
    imgAhorcado.src = `./ahorcado/${counterError}.png`;
  }

}

function submitForm(e: Event) {
  e.preventDefault();
  const letterValue = letter.value.toLowerCase();
  
  const { notFound, resultWithSpace, resultNotSpace } = replaceWordByLetter(palabraConGuionesSinEspacio, secretWord, letterValue);

  if (notFound) notFoundActionGame();

  if (resultNotSpace === secretWord) {
    // WIN
    resetActionGame(IMAGES.GOKU_TA_BIEN);
    return;
  }

  // Normal Execution
  palabraConGuionesSinEspacio = resultNotSpace;
  wordResultParrafo.innerHTML = resultWithSpace;

}
$("#form-ahorcado").addEventListener("submit", submitForm);

