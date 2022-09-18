export const $ = <T = HTMLElement>(selector: string): T => {
  const element = document.querySelector(selector) as T;
  if (element) return element;
  throw new Error(`No existe el elemento: ${selector}`);
};

export const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const getRandomNumber = (min: number, max: number) => {
  return parseInt((Math.random() * (max - min) + min).toString());
}

export const getRamdomWordWithHyphens = (secretWord: string) => secretWord.replace(/./g, "_ ");

export const getRamdomWordWithHyphensNotSpace = (secretWord: string) => secretWord.replace(/./g, "_");


export const replaceAtByIndex = (value: string, index: number, replacement: string) => {
  let a = value.split("");
  a[index] = replacement;
  return a.join("");
}

export const getIndexArrayByWord = (searchValue: string, word: string) => {
  let indexWord = [];
  for (let index = 0; index < word.length; index++) {
    if (word[index] == searchValue.toLowerCase()) {
      indexWord.push(index);
    }
  }
  return indexWord;
}

export const replaceWordByLetter = (palabraConGuiones: string, word: string, letter: string,) => {
  const indexArray = getIndexArrayByWord(letter, word);
  console.log(indexArray);
  indexArray.forEach(e => {
    palabraConGuiones = replaceAtByIndex(palabraConGuiones, e, letter)
  });

  return {
    resultNotSpace: palabraConGuiones,
    resultWithSpace: palabraConGuiones.split("").join(" "),
    notFound: indexArray.length === 0 || false
  }
};