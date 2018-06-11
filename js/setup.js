'use strict';

var WIZARDS_COUNT = 4;

var wizardParams = {
  FIRST_NAMES: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],

  LAST_NAMES: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],

  COAT_COLORS: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],

  EYES_COLORS: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ]
};

/**
 * @typedef {Object} Wizard - объект с параметрами волшебника
 * @param {string} fullName - полное имя волшебника
 * @param {string} coatColor - цвет плаща волшебника
 * @param {string} eyesColor - цвет глаз волшебника
 */
var userDialog = document.querySelector('.setup');
var setupSimilarElement = userDialog.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

/**
 * генерация случайного числа от 0 до указанного значения.
 * @param {number} maxValue - максимальное значение.
 * @return {number}
 */
var getRandomInteger = function (maxValue) {
  return Math.round(Math.random() * maxValue);
};

/**
 * получение случайного элемента массива.
 * @param {Array} array - массив из которого нужно получить случайный элемент.
 * @return {*}
 */
var getRandomArrayItem = function (array) {
  return array[getRandomInteger(array.length - 1)];
};


/**
 * генерация случайного полного имени волшебника
 * @return {string}
 */
var getRandomWizardFullName = function () {
  return getRandomArrayItem(wizardParams.FIRST_NAMES) + ' ' + getRandomArrayItem(wizardParams.LAST_NAMES);
};

/**
 * генерация случайного волшебника
 * @return {Wizard}
 */
var generateRandomWizard = function () {
  return {
    fullName: getRandomWizardFullName(),
    coatColor: getRandomArrayItem(wizardParams.COAT_COLORS),
    eyesColor: getRandomArrayItem(wizardParams.EYES_COLORS)
  };
};

/**
 * создание фрагмента содержащего список волшебников
 * @param {Array.<Wizard>} array - массив объектов с параметрами волшебников
 * @return {Node}
 */
var createWizardListFragment = function (array) {
  var fragment = document.createDocumentFragment();
  array.forEach(function (item) {
    fragment.appendChild(createWizardElement(item));
  });

  return fragment;
};

/**
 * создание DOM элемента волшебника
 * @param {Wizad} wizard - объект с параметрами волшебника
 * @return {Node}
 */
var createWizardElement = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.fullName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

/**
 * генерация массива случайных волшебников
 * @param {number} count - количество волшебников
 * @return {Array.<Wizard>}
 */
var generateWizards = function (count) {
  var wizards = [];
  for (var i = 0; i < count; i++) {
    wizards.push(generateRandomWizard());
  }

  return wizards;
};

/**
 * инициализация окна с параметрами волшебника
 */
var initSetup = function () {
  var wizards = generateWizards(WIZARDS_COUNT);
  similarListElement.appendChild(createWizardListFragment(wizards));
  userDialog.classList.remove('hidden');
  setupSimilarElement.classList.remove('hidden');
};

initSetup();
