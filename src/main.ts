import './style.css'


// Utilities
const $ = (selector: string) => {
  const element = document.querySelector(selector);
  if (element) {
    return element;
  } else {
    throw new Error(`No existe el elemento: ${selector}`);
  }
};

const getRandomArbitrary = (min: number, max: number) => {
  return parseInt((Math.random() * (max - min) + min).toString());
}



const getRamdomWordWithGuiones = (secretWord: string) => secretWord.replace(/./g, "_ ");

const getRamdomWordWithGuionesNotSpace = (secretWord: string) => secretWord.replace(/./g, "_");


const replaceAt = (value: string, index: number, replacement: string) => {
  let a = value.split("");
  a[index] = replacement;
  return a.join("");
}
const findWordIndex = (searchValue: string, word: string) => {
  let indexWord = [];
  for (let index = 0; index < word.length; index++) {

    if (word[index] == searchValue.toLowerCase()) {
      indexWord.push(index);
    }
  }
  return indexWord;
}
const replaceWord = (palabraConGuiones: string, word: string, letter: string,) => {


  const indexArray = findWordIndex(letter, word);
  console.log(indexArray);
  indexArray.forEach(e => {
    palabraConGuiones = replaceAt(palabraConGuiones, e, letter)
  });

  return {
    resultNotSpace: palabraConGuiones,
    resultWithSpace: palabraConGuiones.split("").join(" "),
    notFound: indexArray.length === 0 ? true : false
  }
};

// APP

const words = ["palo", "pepito", "pedro", "ramdom"];

const secretWord = words[getRandomArbitrary(0, words.length)];
console.log({ secretWord });

const wordResultInput = $("#word-result");

wordResultInput.innerHTML = getRamdomWordWithGuiones(secretWord);

let palabraConGuionesSinEspacio = getRamdomWordWithGuionesNotSpace(secretWord);

const imgAhorcado = $("#img-ahorcado") as HTMLImageElement;
let counterError = 1;
$("#form-ahorcado").addEventListener("submit", (e) => {
  e.preventDefault();
  const letter = $("#letter") as HTMLInputElement;
  const letterValue = letter.value.toLowerCase();

  const { notFound, resultWithSpace, resultNotSpace } = replaceWord(palabraConGuionesSinEspacio, secretWord, letterValue);

  if (notFound) {
    // ++1
    if (!(counterError == 6)) {
      counterError = counterError + 1;
      imgAhorcado.style.display = "block";
      imgAhorcado.src = `./ahorcado/${counterError}.png`;
      console.log("no es encontraron resultados");
    } else {
      alert("Fin del juego")
      setTimeout(() => {
        location.reload();
      }, 3000);
    }
  }

  palabraConGuionesSinEspacio = resultNotSpace;
  wordResultInput.innerHTML = resultWithSpace;

  // console.log("result:", palabraConGuiones);

});

