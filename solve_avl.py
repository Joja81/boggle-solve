def solve_avl(avl, board):
    for x in range(len(board)):
        for y in range(len(board)):
            used = [[x, y]]
            explore_avl(used, avl[board[x][y]], board)

def explore_avl(used, avl, board):
    print(avl)
    if "word" in avl:
        calculate_word(used, board)
    for letter in avl:
        if letter != "word":
            x = used[-1][0] - 1
            y = used[-1][1] - 1
            for x_change in range(3):
                for y_change in range(3):
                    if (x + x_change) in range(len(board)) and (y + y_change) in range(len(board)):
                        new_place = [x + x_change, y + y_change]
                        if new_place not in used:
                            new_used = used.copy()
                            new_used.append(new_place)
                            explore_avl(new_used, avl[board[new_place[0]][new_place[1]]])

    


def calculate_word(used, board):
    word = ""
    for space in used:
        word += board[space[0]][space[1]]
    print(word)