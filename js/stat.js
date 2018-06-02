'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_BORDER_RADIUS = 30;
var GAP = 10;
var FONT_GAP = 15;
var GRAPH_HEIGHT = 150;
var GRAPH_Y_OFFSET = 75;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var TEXT_X = 40;
var TEXT_Y = 250;
var TITLE_OFFSET = 100;

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
  ctx.fillStyle = '#000000';
  for (var i = 0; i < titleStrings.length; i++) {
    ctx.fillText(titleStrings[i], CLOUD_X + offset, CLOUD_Y + GAP + FONT_GAP * (i + 1));
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)', CLOUD_BORDER_RADIUS);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff', CLOUD_BORDER_RADIUS);

  var maxTime = getMaxElement(times);

  renderTitle(ctx, 'Ура вы победили!\nСписок результатов:', '16px PT Mono', TITLE_OFFSET);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], CLOUD_X + TEXT_X + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + TEXT_Y);
    var barHeight = (GRAPH_HEIGHT * times[i]) / maxTime;
    var opacity = 0.2 + Math.random() * 0.8;
    ctx.fillStyle = 'rgba(0, 0, 255,' + opacity + ')';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(CLOUD_X + TEXT_X + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + GRAPH_HEIGHT - barHeight + GRAPH_Y_OFFSET, COLUMN_WIDTH, barHeight);
  }
};
