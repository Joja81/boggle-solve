def test_avl():
    dict_words = {}

    with open("test.txt", "r") as file:
        for line in file:
            word = line.rstrip('\n')
            if len(word) >= 3:
                word = word.upper()
                dict_words = add_to_avl(dict_words, word)

                dict_words['word'] = False

    word_list = []

    get_word_list(dict_words, "", word_list)

    print(word_list)

def get_word_list(dict_words, word, word_list):
    print(dict_words)
    for letter in dict_words.keys():
        if letter == "word":
            if dict_words[letter] == True:
                word_list.append(word)
        else:
            get_word_list(dict_words[letter], word + letter, word_list)


def add_to_avl(dict_words, new_word):

    # print(f"dict: {dict_words}")
    # print(f"word: {new_word}")
    
    if new_word == None:
        dict_words["word"] = True
    
    else:
        letter = new_word[0]

        if letter == 'q':
            if len(new_word) >= 2:
                if new_word[1] == 'u':
                    letter = 'qu'
                else:
                    return dict_words
            else:
                return dict_words
        
        if len(new_word) == 1:
            new_word = None
        elif letter == 'qu':
            if len(new_word) < 3:
                new_word = None
            else:
                new_word = new_word[2:]
        else:
            new_word = new_word[1:]

        if letter in dict_words:
            dict_words[letter] = add_to_avl(dict_words[letter], new_word)

        else:
            dict_words[letter] = {'word' : False}
            dict_words[letter] = add_to_avl(dict_words[letter], new_word)
    
    return dict_words

if __name__ == "__main__":
    test_avl()