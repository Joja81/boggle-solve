import {useState} from 'react'

export function generateLetters(board_size){
    let letters = [];
    for (let i = 0; i < board_size; i++){
      let curr = [];
      for (let j = 0; j < board_size; j++){

        let tile = "";


        curr.push(tile);
      }
      letters.push(curr);
    }

    return letters;
}