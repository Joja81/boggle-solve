from board import Board
from dice import Dice

def generate_game():
    
    dice = []
    
    with open("dice.txt", "r") as file:
        for line in file:
            line = line.rstrip('\n')
            letters = line.split(',')
            dice.append(Dice(letters))
        
    board = Board(dice)
    
    print(board.array_output())

if __name__ == "__main__":
    generate_game()