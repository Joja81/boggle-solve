from avl import Avl
from board import Board
from dice import Dice
from solve_avl import solve_avl
from brute_force import brute_force

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
    
    return solve_avl(avl.return_avl(), board.array_output())

def load_words_dict(words):
    words_dict = {}

    for word in words:
        words_dict[word] = True

    return words_dict

def solve_using_brute_force(load_words_dict, board, words):
    words_dict = load_words_dict(words)

    return brute_force(board.array_output(), words_dict)

def dict_to_list(dict):
    words = []
    
    for word in dict:
        words.append(word)
    
    return words

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
    
    solutions_brute = dict_to_list(solve_using_brute_force(load_words_dict, board, words))
    solutions_brute.sort()

    solutions_avl = dict_to_list(solve_using_avl(board, words))
    solutions_avl.sort()
    
    if solutions_brute == solutions_avl:
        print("--------Solutions--------")
        for word in solutions_avl:
            print(word)
    else:
        print("don't match")
