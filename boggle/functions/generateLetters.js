import {useState} from 'react'

export function generateLetters(board_size, old_letters){
    let letters = [];
    for (let i = 0; i < board_size; i++){
      let curr = [];
      for (let j = 0; j < board_size; j++){

        let tile = "";


        curr.push(tile);
      }
      letters.push(curr);
    }

    // console.log(old_letters);

    if(old_letters != null){
      for(let i = 0; i < board_size && i < old_letters.length; i++){
        for (let j = 0; j < board_size && j < old_letters.length; j++){
          letters[i][j]=old_letters[i][j]
        }
      }
    }

    return letters;
}