from avl import Avl
from board import Board
from dice import Dice
from solve_avl import solve_avl

def generate_game():
    
    dice = []
    
    with open("dice.txt", "r") as file:
        for line in file:
            line = line.rstrip('\n')
            letters = line.split(',')
            dice.append(Dice(letters))
        
    board = Board(dice)
    
    return board

def load_words():
    
    words = []
    with open("english2.txt", "r") as file:
        for line in file:
            line = line.rstrip('\n')
            words.append(line)
    return words

if __name__ == "__main__":
    board = generate_game()
    
    words = load_words()
    avl = Avl(words)
    
    solve_avl(avl.return_avl, board.array_output)