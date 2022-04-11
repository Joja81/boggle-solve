var foundWords = new Set()

export const solveAvl = (avl, board) => {
    console.log(avl);
    for(let x = 0; x < board.length; x++){
        for(let y = 0; y < board.length; y++){
            let used = [[x,y]];
            console.log(board[x][y])
            exploreAvl(used, avl[board[x][y]], board);
        }
    }

    
    let solutions = computeSolutions()

    solutions.sort()

    return solutions
}

function exploreAvl(used, avl, board){

    console.log(avl)

    if ("word" in avl){
        calculateWord(used, board);
    }

    let x = used[used.length - 1][0]
    let y = used[used.length - 1][1]


    for(let xChange = -1; xChange < 2; xChange++){
        for(let yChange = -1; yChange < 2; yChange++){
            let newPlace = [x+xChange, y+yChange];

            if (validLocation(newPlace, board.length)){
                console.log("original x:" + x + "original y:" + y);
                console.log("new x:" + newPlace[0] + "new y:" + newPlace[1]);
                if (visitedLocation(used, newPlace) && (board[newPlace[0]][newPlace[1]] in avl)){
                    let newUsed = used.slice();
                    newUsed.push(newPlace);
                    exploreAvl(newUsed, avl[board[newPlace[0]][newPlace[1]]], board)
                }
            }

        }
    }

}

function validLocation(location, size){
    if(location[0] >= size || location[0] < 0){
        return false;
    }

    if(location[1] >= size || location[1] < 0){
        return false
    }
    return true
}

function visitedLocation(used, newPlace){
    let valid = true;

    used.forEach(element => {

        if(element[0] == newPlace[0] && element[1] == newPlace[1]){
            valid = false;
        }
    });
    return valid;
}

function calculateWord(used, board){
    let word = ""
    
    used.forEach(element => {
        word += board[element[0]][element[1]]
    });

    if(word.length >= 3){

        word = capataliseWord(word)

        foundWords.add(word)
    }

}

function capataliseWord(word){

    let arr = word.split("") 

    arr[0] = arr[0].charAt(0).toUpperCase();

    for(let i = 1; i < arr.length; i++){
        arr[i] = arr[i].charAt(0).toLowerCase();
    }

    return arr.join("");
}

function computeSolutions(){

    let arr = []

    for (var it = foundWords.values(), val =null; val=it.next().value; ){
        arr.push(val)
    }

    return arr
}