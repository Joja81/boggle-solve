from board import Board

def solve_boggle(board: Board):

    dict_words = {}

    with open("words_alpha.txt", "r") as file:
        for line in file:
            word = line.rstrip('\n')
            if len(word) >= 3:
                word = word.upper()
                dict_words = add_to_avl(dict_words, word)

                dict_words['word'] = False
    
    board_output = board.array_output()

    found_words = []
    
    print(dict_words.keys())

    for y in range(len(board_output)):
        for x in range(len(board_output)):
            used = []

            location = {
                'y':y,
                'x':x,
            }

            found_words = search_board(board_output, used, location, dict_words, found_words, word)

    # print(found_words)

def search_board(board, used, location, dict_words, found_words, word):
    
    word += board[location['y']][location['x']]

    used.append(location)

    if dict_words['word'] == True:
        found_words.append(word)

    for vertical in range(len(board)):
        vertical -= 1
        for horizontal in range(len(board)):
            horizontal -= 1

            new_location = {'y' :location['y'] + vertical, 'x' : location['x'] + horizontal}
            
            if check_location_idx(board, new_location) and  board[new_location['y']][new_location['x']] in dict_words:
                # print(new_location)
                found_words = search_board(board, used, new_location, dict_words[board[new_location['y']][new_location['x']]], found_words, word)
                
            # Check that the location is in the idx of the array

    return found_words

def check_location_idx(board, location):

    if location['y'] < 0 or len(board) <= location['y']:
        return False
    if location['x'] < 0 or len(board) <= location['x']:
        return False

    return True


