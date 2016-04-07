var foods = ["apple", "orange", "banana", "grapes", "pear", "plum", "asparagus", "broccoli", "steak", "fish", "peas", "tapioca", "fries", "hamburger", "milk", "cookies", "fudge", "apricot", "salmon", "chicken", "cheese", "onion", "garlic", "meatballs", "pizza", "gouda", "feta", "soda", "mustard", "sausage", "guacamole", "mozzarella", "marshmallow", "watermelon", "antidisestablishmentarianism"];

var animals = ["lion","tiger", "bear", "cat", "dog", "mouse", "bird", "bee", "monkey", "baboon", "ferret", "hawk", "eagle", "beaver", "otter", "cow", "chicken", "rabbit", "fly", "mosquito", "wasp", "snake", "spider", "worm", "donkey", "mermaid", "centaur", "dragon", "wolf", "bandicoot", "caterpillar", "deer", "alligator", "anteater", "cougar", "cuttlefish", "armadillo", "penguin", "hummingbird", "zebra", "yak", "vulture", "weasel", "stingray", "sloth", "quail", "antidisestablishmentarianism"];

var startrek =["spock", "kirk", "sisko", "enterprise", "dabo", "data", "tasha", "ferengi", "voyager", "starfleet", "klingon", "borg", "lore", "romulan", "vulcan", "federation", "earth", "riker", "picard", "zimmerman", "transporter", "holodeck", "bashir", "dax", "bajoran", "bajor", "romulus", "kes", "boothby", "chakotay", "janeway", "brunt", "quark", "rom", "maquis", "doctor", "beverly", "wesley", "damar", "tribble", "darmok", "joran", "curzon", "dukat", "cardassian", "dominion", "betazoid", "vorta", "nog", "transporter", "odo", "kira", "garak", "kai", "pardek", "q", "bolian", "kang", "kahless", "batleth", "antidisestablishmentarianism"];

var anime = ["bishojo", "bishonen", "catgirl", "anime", "hentai", "moe", "tsundere", "yandere", "harem", "josei", "kodomo", "shojo", "seinen", "dojinshi", "fansub", "fandub", "yaoi", "shota", "otake", "mecha", "yuri", "omake", "otome", "seiyu", "goku", "dragonball", "bleach", "naruto", "luna", "baka", "chibi", "ecchi", "gakuran", "itai", "kawaii", "manga", "loli", "ramune", "weeabo", "zettai", "ichigo", "tenchi", "chuunibyo", "dandere", "genki", "megane", "cosplay", "mahou", "ova", "ronin", "ninja", "sentai", "clamp", "ost", "ganguro", "kimono", "lemon", "scanlation", "arigatoo", "chigau", "futanari", "gaijin", "hajimemashite", "himitsu", "kamisama", "kanpai", "karaoke", "kimochi", "gundam", "macross", "evangelion", "akira", "totoro", "pantsu", "ranma", "antidisestablishmentarianism"];

var boxes = ["cardboard", "storage", "electrical", "postal", "telephone", "corrugated", "lock", "safe", "pizza", "crate", "gift", "jewelry", "tool", "lamp", "letter", "call", "penalty", "signal", "ammunition", "black", "check", "dispatch", "pandoras", "cable", "x", "lunch", "squeeze", "sound", "ballot", "puzzle", "envelope", "toy", "poster", "hat", "litter", "recipe", "hot", "planter", "sand", "red", "brillo", "shaker", "monster", "waffer", "ice", "ring", "chocoalte", "candy", "cigar", "wine", "watch", "donut", "cat", "bento", "shoe", "loot", "cupcake", "cake", "light", "opera", "cereal", "sky", "antidisestablishmentarianism"];

var wordArr = foods;
var currWord = '';
var score = 1;
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
    $('#info-box').text("YOU WIN!!!");
    $('#score .points').text(score);
    score ++;
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
  $('.points').text('0');
  intervalOn = false;
})
