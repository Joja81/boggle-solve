var avl = {};

export const loadAvl = async (availableWords) => {

  console.log("Started loading avl");

  const splitLines = (str) => str.split(/\r?\n/);

  let response = await fetch("/english2.txt");

  if (response.status != 200) {
    throw new Error("Server Error");
  }

  let text_data = await response.text();

  let words = splitLines(text_data);

  words.forEach((element) => {
    let valid = checkWord(element, availableWords);

    if (valid) {
      addWord(element);
    }
  });

  console.log("Loaded avl");

  return avl;
};

function checkWord(word, availableWords) {
  let valid = true;
  for (let i = 0; i < word.length; i++) {
    //Check that word only uses available letters
    if (!availableWords.has(word.charAt(i))) {
      valid = false;
    }

    //Checks that if Q occurs there is always a U after it
    if (word.charAt(i) == "q") {
      if (i >= word.length || word.charAt(i + 1) != "u") {
        valid = false;
      }
    }
  }
  return valid;
}

function addWord(word) {
  let curr_avl = avl;

  for (let i = 0; i < word.length; i++) {
    let char = word.charAt(i);

    let valid = true;

    if (char == "q") {
      char = "qu";
    }

    if (char == "u" && i > 0) {
      if (word.charAt(i - 1) == "q") {
        valid = false;
      }
    }

    if (valid) {
      if (char in curr_avl) {
        curr_avl = curr_avl[char];
      } else {
        curr_avl[char] = {};
        curr_avl = curr_avl[char];
      }
    }
  }

  curr_avl["word"] = true;
}
