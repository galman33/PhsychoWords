var wordsData = [];

var wordTxt = document.getElementById("wordTxt");
var showBtn = document.getElementById("showBtn");
var definitionTxt = document.getElementById("definitionTxt");
var categorySelectFrom = document.getElementById("categorySelectFrom");
var categorySelectTo = document.getElementById("categorySelectTo");
var scoreSelectFrom = document.getElementById("scoreSelectFrom");
var scoreSelectTo = document.getElementById("scoreSelectTo");
var scoreTxt = document.getElementById("scoreTxt");

var curCategoryWords;
var curWord;

var shouldRefresh = false;

var scoreTexts = ["לא יודע", "קצת יודע", "יודע טוב", "יודע מצוין"];

{
  var json = localStorage.getItem("wordsData");
  if(json == null)
  {
    var i = 0;
    hebrewWords.split("#").forEach(function(item)
    {
      var wordData = {};
      wordData.word = item.split("%")[0];
      wordData.definition = item.split("%")[1];
      wordData.score = 0;
      wordData.category = i % 12;
      i++;
      wordsData.push(wordData);
    });
    localStorage.setItem("wordsData", JSON.stringify(wordsData));
  }
  else
  {
    wordsData = JSON.parse(json);
  }

  for(var i = 0; i < 12; i++)
  {
    categorySelectFrom.innerHTML += '<option value="' + i + '">' + (i + 1) + '</option>';
    categorySelectTo.innerHTML += '<option value="' + i + '">' + (i + 1) + '</option>';
  }

  for(var i = 0; i < scoreTexts.length; i++)
  {
    scoreSelectFrom.innerHTML += '<option value="' + i + '">' + scoreTexts[i] + '</option>';
    scoreSelectTo.innerHTML += '<option value="' + i + '">' + scoreTexts[i] + '</option>';
  }

  shouldRefresh = true;
  nextWord();
}


function isFromCategory(minCategory, maxCategory)
{
  return function (item) { return (item.category >= minCategory && item.category <= maxCategory ); };
}

function isFromScore(minScore, maxScore)
{
  return function (item) { return (item.score >= minScore && item.score <= maxScore ); };
}

function nextWord()
{
  if(shouldRefresh)
  {
    var minCat = parseInt(categorySelectFrom.value);
    var maxCat = parseInt(categorySelectTo.value);
    var minScore = parseInt(scoreSelectFrom.value);
    var maxScore = parseInt(scoreSelectTo.value);
    curCategoryWords = wordsData.filter(isFromCategory(minCat, maxCat)).filter(isFromScore(minScore, maxScore));
  }

  curWord = curCategoryWords[Math.floor(Math.random() * curCategoryWords.length)];
  wordTxt.innerText = curWord.word;
  definitionTxt.style.visibility = "hidden";
  definitionTxt.innerText = curWord.definition;
  scoreTxt.innerText = scoreTexts[curWord.score];
}

function showDefinition()
{
  definitionTxt.style.visibility = "visible";
}

function increaseScore()
{
  curWord.score++;
  if(curWord.score > scoreTexts.length - 1)
    curWord.score = scoreTexts.length - 1;
  scoreTxt.innerText = scoreTexts[curWord.score];
  localStorage.setItem("wordsData", JSON.stringify(wordsData));
  shouldRefresh = true;
}

function decreaseScore()
{
  curWord.score--;
  if(curWord.score < 0)
    curWord.score = 0;
  scoreTxt.innerText = scoreTexts[curWord.score];
  localStorage.setItem("wordsData", JSON.stringify(wordsData));
  shouldRefresh = true;
}
