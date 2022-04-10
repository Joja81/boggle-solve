import math
import random

class Board:
    
    def __init__(self, dice):
        
        self._check_num_dice(dice)
        
        random.shuffle(dice)
        
        self.dice = dice
    
    def _check_num_dice(self, dice):
        sr = int(math.sqrt(len(dice)))
        
        if len(dice) != sr*sr:
            raise Exception(f"An incorrect number of dice was entered: Dice given = {len(dice)}")
        
    def boggle_board(self):
        self.dice = random.shuffle(self.dice)
        
        for i in range(len(self.dice)):
            self.dice[i].roll_dice()
    
    def array_output(self):
        
        side_length = int(math.sqrt(len(self.dice)))
        
        output_array = []
        for i in range(side_length):
            curr_array = []
            for j in range(side_length):
                curr_array.append(self.dice[i * side_length + j].top)
            output_array.append(curr_array)
            
        return output_array        
        
                