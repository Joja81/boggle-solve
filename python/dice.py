import random

class Dice:
    def __init__(self, letters):
        self.letters = letters
        self.top = random.choice(self.letters)
    
    def roll_dice(self):
        self.top = random.choice(self.letters)