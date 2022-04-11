from logging.handlers import BaseRotatingHandler
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

def load_words_special(board):
    #Only load words which are correct length and only contain the right letters
    
    
    available_letters = set()
    for x in range(len(board)):
        for y in range(len(board)):
            if board[x][y] == "Qu":
                available_letters.add("Q")
                available_letters.add("U")
            else:
                available_letters.add(board[x][y])
    
    words = []
    with open("english2.txt", "r") as file:
        for line in file:
            word = line.rstrip('\n').upper()
            
            if len(word) >= 3 and set(word) <= available_letters:
                words.append(word)
                
    return words
    
    

    

def solve_using_avl(board, words):
    avl = Avl(words)
    
    return solve_avl(avl.return_avl(), board.array_output())

def load_words_dict(words):
    words_dict = {}

    for word in words:
        words_dict[word] = True

    return words_dict

def solve_using_brute_force(board, words):
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
    
    
    # words = load_words()
    words = load_words_special(board.array_output())
    

    # solutions = dict_to_list(solve_using_brute_force( board, words))

    solutions = dict_to_list(solve_using_avl(board, words))
    solutions.sort()
    
    print(board.array_output())
    
    print(f"-------- {len(solutions)} solutions--------")
    for word in solutions:
        print(word)
