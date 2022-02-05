const form = document.forms.transform;
const { inputWord, selectCase } = form;
const inputErrorForm = document.getElementById("input-error-form");
const resultText = document.getElementById("result");

const isEmpty = (value) => value.length === 0;

const handleFocus = (e) => {
  if (e.target.classList.contains("invalid")) {
    e.target.classList.remove("invalid");
    const error = e.target.parentElement.querySelector(".form__hint");
    error.innerText = "";
  }
};

const handleBlur = (e) => {
  if (e.target.value.length === 0) {
    e.target.classList.add("invalid");
    const error = e.target.parentElement.querySelector(".form__hint");
    error.innerText = "Обязательно для заполнения";
  }
};

inputWord.addEventListener("focus", handleFocus);
inputWord.addEventListener("blur", handleBlur);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const { inputWord, selectCase } = e.target.elements;

  if (isEmpty(inputWord.value)) {
    inputErrorForm.innerText = "Неправильно заполнено поле";
    console.log("Провал");
  } else {
    inputErrorForm.innerText = "";
    console.log(wordTransform(inputWord.value, selectCase.value));
    resultText.innerText = `${wordTransform(
      inputWord.value,
      selectCase.value
    )}`;
  }
});

function wordTransform(str, choice) {
  let strEnding = {
    а: ["ы", "е", "у", "ой", "е"],
    б: ["%а", "%у", "%а", "%ом", "%е"],
    в: ["%а", "%у", "%а", "%ом", "%е"],
    г: ["%а", "%у", "%а", "%ом", "%е"],
    д: ["%а", "%у", "%а", "%ом", "%е"],
    ж: ["%а", "%у", "%а", "%ом", "%е"],
    з: ["%а", "%у", "%а", "%ом", "%е"],
    и: ["ей", "ям", "%", "ями", "ях"],
    й: ["я", "ю", "я", "ем", "е"],
    к: ["%а", "%у", "%а", "%ом", "%е"],
    л: ["%а", "%у", "%а", "%ом", "%е"],
    м: ["%а", "%у", "%а", "%ом", "%е"],
    н: ["%а", "%у", "%а", "%ом", "%е"],
    о: ["%а", "%у", "%а", "%ом", "%е"],
    п: ["%а", "%у", "%а", "%ом", "%е"],
    р: ["%а", "%у", "%а", "%ом", "%е"],
    с: ["а", "у", "%", "ом", "е"],
    т: ["%а", "%у", "%а", "%ом", "%е"],
    у: ["%", "%", "%", "%", "%"],
    ф: ["%а", "%у", "%а", "%ом", "%е"],
    х: ["%а", "%у", "%а", "%ом", "%е"],
    ц: ["%а", "%у", "%а", "%ом", "%е"],
    ч: ["%а", "%у", "%а", "%ом", "%е"],
    ш: ["а", "у", "%", "ом", "е"],
    щ: ["%а", "%у", "%а", "%ом", "%е"],
    ы: ["ов", "ам", "%", "ами", "ах"],
    ь: ["я", "ю", "я", "ем", "е"],
    я: ["и", "е", "ю", "ей", "е"],
    ша: ["%и", "%е", "%у", "%ой", "%е"],
    жа: ["%и", "%е", "%у", "%ой", "%е"],
    ка: ["%и", "%е", "%у", "%ой", "%е"],
    ча: ["%и", "%е", "%у", "%ой", "%е"],
    ый: ["ого", "ому", "%", "ым", "ом"],
    чь: ["%и", "%и", "%ь", "%ью", "%и"],
    шь: ["%и", "%и", "%ь", "%ью", "%и"],
    дь: ["%и", "%и", "%ь", "%ью", "%и"],
    ть: ["%и", "%и", "%ь", "%ью", "%и"],
    уль: ["ули", "уле", "улю", "улей", "уле"],
  };
  let cases = {
    // номера для падежей
    genitive: 0,
    dative: 1,
    accusative: 2,
    ablative: 3,
    prepositional: 4,
  };
  let exceptions = {
    // исключения, сколько символов забирать с конца
    ц: 2,
    ок: 2,
  };
  let lastIndex;
  let reformedStr;

  for (let i in strEnding) {
    if (i.length > 1 && str.slice(-i.length) === i) {
      // для окончаний, длиной > 1
      lastIndex = i; // окончание, длиной > 1
      reformedStr = str.slice(0, -lastIndex.length); // слово без окончания
      break;
    } else {
      // дефолт
      lastIndex = str.slice(-1); // окончание = 1
      reformedStr = str.slice(0, -lastIndex.length); // слово без окончания
    }

    for (let j in exceptions) {
      // поиск исключений
      if (str.slice(-j.length) === j)
        reformedStr = str.slice(0, -exceptions[j]); // слово без окончания
    }
  }

  return (
    reformedStr + strEnding[lastIndex][cases[choice]].replace("%", lastIndex)
  );
}
