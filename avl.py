from tokenize import Expfloat

class Avl:
    def __init__(self, words):
        self.avl = {}
        
        for word in words:
            self.add_word(word)
            
    def add_word(self, word):
        curr_avl = self.avl
        
        for char in word:
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