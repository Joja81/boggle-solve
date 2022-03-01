from board import Board
from dice import Dice
from solve_boggle import solve_boggle

def generate_game():
    
    dice = []
    
    with open("dice.txt", "r") as file:
        for line in file:
            line = line.rstrip('\n')
            letters = line.split(',')
            dice.append(Dice(letters))
        
    board = Board(dice)
    
    return board

if __name__ == "__main__":
    board = generate_game()
    solve_boggle(board)