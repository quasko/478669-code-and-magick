'use strict';

var WIZARDS_COUNT = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var getRandomInteger = function (max) {
  return Math.round(Math.random() * max);
};

var getRandomElement = function (array) {
  return array[getRandomInteger(array.length - 1)];
};

var getRandomName = function () {
  return getRandomElement(FIRST_NAMES) + ' ' + getRandomElement(LAST_NAMES);
};

var generateRandomWizard = function () {
  return {
    name: getRandomName(),
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYES_COLORS)
  };
};

var createWizardListFragment = function (array) {
  var fragment = document.createDocumentFragment();
  for (i = 0; i < array.length; i++) {
    fragment.appendChild(createWizardElement(array[i]));
  }

  return fragment;
};

var createWizardElement = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var wizards = [];
for (var i = 0; i < WIZARDS_COUNT; i++) {
  wizards.push(generateRandomWizard());
}

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

similarListElement.appendChild(createWizardListFragment(wizards));

userDialog.querySelector('.setup-similar').classList.remove('hidden');
