var wordArr = foods;
var currWord = '';
var score = 0;
var k = 0;
var timer;
var timeNow;
var newWord;
var intervalOn = false;

$('.choices').on('click', function(e){
  var item = e.target.id;
  if (!($(this).prop("disabled"))) {
    if(!($(this).hasClass('picked'))) {
      $('.choices').removeClass('picked');
      $(this).addClass('picked');
      if (item === "foods") {
        wordArr = foods;
      } else if (item === "animals") {
        wordArr = animals;
      } else if (item === "startrek") {
        wordArr = startrek;
      } else if (item === "anime") {
        wordArr = anime;
      } else if (item === "linguist"){
        wordArr = linguist;
      } else if (item === "gaming") {
        wordArr = gaming;
      } else {
        wordArr = boxes;
      }
    }
  }
});

$('#input-box').on('keyup', function(e){
  var char = String.fromCharCode(e.keyCode).toLowerCase();
  if (char == currWord[k]) {
    $('.letters-' + k).css({
      'background-color' : 'rgb(252, 111, 88)',
      'color' : 'white'
    });
    k ++;
  } else {
    var inputVal = $('#input-box').val(
    function(index, value){
      return value.substr(0, value.length - 1);
    })
  }
  if (k > 0 && k === currWord.length) {
    newWord = setTimeout(function() {
      ranWord();
    }, 600);
    score ++;
    $('#info-box').text("YOU WIN!!!");
    $('#score .points').text(score);
  }
})

$('#create-word').on('click', function(e){
  if (e.target.innerText == "Start") {
    clearInterval(timer);
    clearTimeout(newWord);
    $('#create-word').text('Shuffle Word');
  }
  ranWord();
  $('.choices').prop('disabled', true);
})

function ranWord() {
  $('#word-list').children().remove()
  var randomWord = wordArr[Math.floor(Math.random() * wordArr.length)];
  for(var i = 0; i < randomWord.length; i++) {
    $('#word-list').append('<li class="letters' + '-' + i + '">' + randomWord[i] + '</li>');
  }
  if (!intervalOn) {
    timer = setInterval(function(e){
      timeNow = parseInt($('.time').text());
      if (timeNow > 0) {
        timeNow--;
        intervalOn = true;
        $('.time').text(timeNow);
      } else {
        $('#input-box').val("Game Over");
        $('#input-box').prop('disabled', true);
        $('#create-word').prop('disabled', true);
      }
    }, 1500);
  }
  currWord = randomWord;
  k = 0;
  $('#input-box').val('');
  $('#input-box').focus();
  $('#info-box').text('');
  $('.choice').prop("disabled", true);
}

$('.restart').on('click', function(){
  score = 0;
  k = 0;
  clearInterval(timer);
  clearTimeout(newWord);
  $('#create-word').text("Start");
  $('#score h3 .points').text(score);
  $('#word-list').children().remove();
  $('#input-box').val('');
  $('#info-box').text('');
  $('#input-box').focus();
  $('#input-box').prop('disabled', false);
  $('#create-word').prop('disabled', false);
  $('.choices').prop("disabled", false);
  $('.time').text('15');
  $('.points').text(0);
  intervalOn = false;
})
