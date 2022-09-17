import './style.css'


// Utilities
const $ = (selector: string) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw new Error(`No existe el elemento: ${selector}`);
};

const getRandomNumber = (min: number, max: number) => {
  return parseInt((Math.random() * (max - min) + min).toString());
}



const getRamdomWordWithGuiones = (secretWord: string) => secretWord.replace(/./g, "_ ");

const getRamdomWordWithGuionesNotSpace = (secretWord: string) => secretWord.replace(/./g, "_");


const replaceAt = (value: string, index: number, replacement: string) => {
  let a = value.split("");
  a[index] = replacement;
  return a.join("");
}

const findIndexInWord = (searchValue: string, word: string) => {
  let indexWord = [];
  for (let index = 0; index < word.length; index++) {
    if (word[index] == searchValue.toLowerCase()) {
      indexWord.push(index);
    }
  }
  return indexWord;
}

const replaceWordByLetter = (palabraConGuiones: string, word: string, letter: string,) => {
  const indexArray = findIndexInWord(letter, word);
  console.log(indexArray);
  indexArray.forEach(e => {
    palabraConGuiones = replaceAt(palabraConGuiones, e, letter)
  });

  return {
    resultNotSpace: palabraConGuiones,
    resultWithSpace: palabraConGuiones.split("").join(" "),
    notFound: indexArray.length === 0 || false
  }
};

// APP

const words = ["palo", "pepito", "pedro", "ramdom"];

const secretWord = words[getRandomNumber(0, words.length)];
console.log({ secretWord });

const wordResultParrafo = $("#word-result");

wordResultParrafo.innerHTML = getRamdomWordWithGuiones(secretWord);

let palabraConGuionesSinEspacio = getRamdomWordWithGuionesNotSpace(secretWord);

const imgAhorcado = $("#img-ahorcado") as HTMLImageElement;
let counterError = 1;

function submitForm(e: Event) {
  e.preventDefault();
  const letter = $("#letter") as HTMLInputElement;
  const letterValue = letter.value.toLowerCase();

  const { notFound, resultWithSpace, resultNotSpace } = replaceWordByLetter(palabraConGuionesSinEspacio, secretWord, letterValue);

  if (notFound) {
    // ++1
    if (counterError == 6) {
      alert("Fin del juego")
      setTimeout(() => {
        location.replace("https://cdn.memegenerator.es/imagenes/memes/full/4/14/4149174.jpg");
      }, 2000);
    } else {
      counterError++;
      imgAhorcado.src = `./ahorcado/${counterError}.png`;
    }

  }

  palabraConGuionesSinEspacio = resultNotSpace;
  wordResultParrafo.innerHTML = resultWithSpace;

  // console.log("result:", palabraConGuiones);

}
$("#form-ahorcado").addEventListener("submit",submitForm);

