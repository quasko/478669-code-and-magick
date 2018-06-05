'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_BORDER_RADIUS = 30;
var CLOUD_MAIN_COLOR = '#ffffff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_GAP = 10;
var FONT_GAP = 15;
var GRAPH_HEIGHT = 150;
var GRAPH_Y_OFFSET = 75;
var SCORE_Y_OFFSET = 10;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var TEXT_X = 40;
var TEXT_Y = 250;
var TITLE_OFFSET = 100;
var TITLE_FONT = '16px PT Mono';
var TITLE_TEXT = 'Ура вы победили!\nСписок результатов:';
var TITLE_COLOR = '#000000';
var NAMES_COLOR = '#000000';
var PLAYER_NAME = 'Вы';
var MY_COLUMN_COLOR = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color, radius) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + CLOUD_WIDTH - radius, y);
  ctx.quadraticCurveTo(x + CLOUD_WIDTH, y, x + CLOUD_WIDTH, y + radius);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT - radius);
  ctx.quadraticCurveTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT, x + CLOUD_WIDTH - radius, y + CLOUD_HEIGHT);
  ctx.lineTo(x + radius, y + CLOUD_HEIGHT);
  ctx.quadraticCurveTo(x, y + CLOUD_HEIGHT, x, y + CLOUD_HEIGHT - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var renderTitle = function (ctx, text, font, offset) {
  var titleStrings = text.split('\n');
  ctx.font = font;
  ctx.fillStyle = TITLE_COLOR;
  for (var i = 0; i < titleStrings.length; i++) {
    ctx.fillText(titleStrings[i], CLOUD_X + offset, CLOUD_Y + CLOUD_GAP + FONT_GAP * (i + 1));
  }
};

var getRandomColor = function () {
  return 'rgba(0, 0, 255,' + (0.2 + Math.random() * 0.8).toFixed(2) + ')';
};

var renderColumn = function (ctx, startX, startY, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(startX, startY, width, height, color);
};

var renderText = function (ctx, text, startX, startY, color) {
  ctx.fillStyle = color;
  ctx.fillText(text, startX, startY);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, CLOUD_SHADOW_COLOR, CLOUD_BORDER_RADIUS);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_MAIN_COLOR, CLOUD_BORDER_RADIUS);

  var maxTime = getMaxElement(times);

  renderTitle(ctx, TITLE_TEXT, TITLE_FONT, TITLE_OFFSET);

  for (var i = 0; i < names.length; i++) {

    var nameX = CLOUD_X + TEXT_X + (COLUMN_WIDTH + COLUMN_GAP) * i;
    var nameY = CLOUD_Y + TEXT_Y;

    renderText(ctx, names[i], nameX, nameY, NAMES_COLOR);

    var barHeight = (GRAPH_HEIGHT * times[i]) / maxTime;
    var columnColor = getRandomColor();
    if (names[i] === PLAYER_NAME) {
      columnColor = MY_COLUMN_COLOR;
    }

    var columnX = CLOUD_X + TEXT_X + (COLUMN_WIDTH + COLUMN_GAP) * i;
    var columnY = CLOUD_Y + GRAPH_HEIGHT - barHeight + GRAPH_Y_OFFSET;
    renderColumn(ctx, columnX, columnY, COLUMN_WIDTH, barHeight, columnColor);

    var scoreX = CLOUD_X + TEXT_X + (COLUMN_WIDTH + COLUMN_GAP) * i;
    var scoreY = CLOUD_Y + GRAPH_HEIGHT - barHeight + GRAPH_Y_OFFSET - SCORE_Y_OFFSET;
    renderText(ctx, Math.round(times[i]), scoreX, scoreY, columnColor);
  }
};
