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
            words.append(line.upper())
    return words

def solve_using_avl(board, words):
    avl = Avl(words)
    
    solve_avl(avl.return_avl(), board.array_output())

if __name__ == "__main__":
    
    #Generate and display board
    board = generate_game()
    
    for line in board.array_output():
        for letter in line:
            if letter == "Qu":
                print(f"{letter}|", end = " ")
            else:
                print(f"{letter} |", end = " ")
        print()
    
    
    words = load_words()
    
    solve_using_avl(board, words)
