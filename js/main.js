import languages from './languages.js';

const $selectOne = document.querySelector('.selectOne');
const $selectTwo = document.querySelector('.selectTwo');
const $translate = document.querySelector('.translate');
const $textInitial = document.querySelector('.textInitial');
const $textPost = document.querySelector('.textPost');
const $buttonIntercambio = document.querySelector('.buttonIntercambio');
const $buttonVoice = document.querySelectorAll('.buttonVoice');

$textInitial.style.resize = 'none';
$textPost.style.resize = 'none';

for (const i in languages) {
  const key = Object.keys(languages[i]).toString();
  const values = Object.values(languages[i]).toString();

  $selectOne.innerHTML += `<option value=${key}>${values}</option>`;
  $selectTwo.innerHTML += `<option value=${key}>${values}</option>`;
}

$selectOne.value = 'es-ES';
$selectTwo.value = 'en-GB';

$translate.addEventListener('click', async () => {
  if (!$textInitial.value) return;
  try {
    await fetch(
      `https://api.mymemory.translated.net/get?q=${$textInitial.value}&langpair=${$selectOne.value}|${$selectTwo.value}`
    )
      .then((data) => data.json())
      .then((data) => traducir(data));
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
});

function traducir(response) {
  $textPost.value = response.responseData.translatedText;
}

$buttonIntercambio.addEventListener('click', () => {
  const $selectOneFirst = $selectOne.value;
  $selectOne.value = $selectTwo.value;
  $selectTwo.value = $selectOneFirst;

  const $textInicialFirst = $textInitial.value;
  $textInitial.value = $textPost.value;
  $textPost.value = $textInicialFirst;
});

$buttonVoice.forEach((elem, index) => {
  elem.addEventListener('click', () => {
    const toRead = index === 0 ? $textInitial.value : $textPost.value;
    if (!toRead) return;
    speechSynthesis.speak(new SpeechSynthesisUtterance(toRead));
  });
});
