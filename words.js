var wordsData = [];

var wordTxt = document.getElementById("wordTxt");
var showBtn = document.getElementById("showBtn");
var definitionTxt = document.getElementById("definitionTxt");

var curCategoryWords;
var curWord;

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

  curCategoryWords = wordsData.filter(isFromCategory(1));
  nextWord();
}


function isFromCategory(category)
{
  return function (item) { return item.category == category; };
}

function nextWord()
{
  curWord = curCategoryWords[Math.floor(Math.random() * curCategoryWords.length)];
  wordTxt.innerText = curWord.word;
  definitionTxt.style.visibility = "hidden";
  definitionTxt.innerText = curWord.definition;
}

function showDefinition()
{
  definitionTxt.style.visibility = "visible";
}
