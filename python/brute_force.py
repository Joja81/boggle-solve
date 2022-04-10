found_words = {}

def brute_force(board, words):
    for x in range(len(board)):
        for y in range(len(board)):
            used = [[x, y]]
            explore_board(used,  words, board, board[x][y])

    return found_words

def explore_board(used, dict_words, board, word):
    if word in dict_words and len(word) >= 3:
        found_words[word.capitalize()] = True
    
    x = used[-1][0] - 1
    y = used[-1][1] - 1
    for x_change in range(3):
        for y_change in range(3):
            if (x + x_change) in range(len(board)) and (y + y_change) in range(len(board)):
                new_place = [x + x_change, y + y_change]
                if new_place not in used:
                    new_used = used.copy()
                    new_used.append(new_place)
                    explore_board(new_used, dict_words, board, word + board[new_place[0]][new_place[1]])