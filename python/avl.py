from operator import truediv
from tokenize import Expfloat

class Avl:
    def __init__(self, words):
        self.avl = {}
        
        for word in words:
            self.add_word(word)
            
    def add_word(self, word):
        curr_avl = self.avl
        
        valid_word = True
        
        # Check for qords with Q without a U
        for i in range(len(word)):
            if word[i] == "Q":
                if i >= len(word) - 1 or word[i+1] != "U":
                    valid_word = False
        
        
        
        if valid_word:
            for i in range(len(word)):
                
                char = word[i]
                
                if char == "Q":
                    i += 1
                    char = "Qu"
                
                valid = True
                
                if char == "U" and i > 0:
                    if word[i-1] == "Q":
                        valid = False
                
                if valid:
                    if char in curr_avl:
                        curr_avl = curr_avl[char]
                    else:
                        curr_avl[char] = {}
                        curr_avl = curr_avl[char]
        
            curr_avl['word'] = True
    
    def print_words(self):
        for letter in self.avl:
            self._explore_avl(self.avl[letter], letter)
    
    
    def _explore_avl(self, avl, word):
        
        for letter in avl:
            if letter == 'word':
                print(word)
            else:
                self._explore_avl(avl[letter], word + letter)
    
    def return_avl(self):
        return self.avl