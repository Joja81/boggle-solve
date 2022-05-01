import Head from "next/head";
import { loadAvl } from "../functions/loadAvl";
import { solveAvl } from "../functions/solveAvl";
import { useRouter } from "next/router";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { generateLetters } from "../functions/generateLetters";

export default function Home() {
  const { letters, setLetters, setSolutions } = useContext(UserContext);

  const router = useRouter();

  const [valid, setValid] = useState(letters != null);

  const boardSizeChange = (e) => {
    let val = e.target.value;

    let currLetters = loadBoard(letters.length)

    console.log(currLetters);

    let newLetters = generateLetters(val, currLetters);

    setLetters(newLetters);
  };

  const onChange = (e) => {
    setValid(false);

    let noProblems = true;

    const values = document.getElementById("form");

    for (let i = 0; i < letters.length; i++) {
      for (let j = 0; j < letters.length; j++) {
        let curr_id = i * letters.length + j;
        let curr_value = lowerCase(values.elements["tileForm" + curr_id].value);

        if (!validEntry(curr_value)) {
          noProblems = false;
        }
      }
    }

    setValid(noProblems);
  };

  const onSubmit = async (e) => {
    event.preventDefault();

    let availableWords = new Set();

    const values = document.getElementById("form");

    let board = [];
    for (let i = 0; i < letters.length; i++) {
      let curr_row = [];
      for (let j = 0; j < letters.length; j++) {
        let curr_id = i * letters.length + j;

        let curr_value = lowerCase(values.elements["tileForm" + curr_id].value);

        curr_row.push(curr_value);

        for (let k = 0; k < curr_value.length; k++) {
          availableWords.add(curr_value.charAt(k));
        }
      }

      board.push(curr_row);
    }

    let avl = await loadAvl(availableWords);

    setLetters(board);

    let solutions = solveAvl(avl, board);

    setSolutions(solutions);

    router.push({ pathname: "/solutions" });
  };

  return (
    <div>
      <Head>
        <title>Solve boggle</title>
        <meta name="description" content="Solve boggle quickly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={"title"}>Solve a boggle board</h1>

        <form>
          <h2>Board size</h2>
          <input
            value={letters.length}
            type={"number"}
            min={2}
            max={10}
            onChange={boardSizeChange}
          />
        </form>

        <form onSubmit={() => onSubmit()} onChange={() => onChange()} id="form">
          <Table letters={letters} />
          {!valid ? (
            <h3 className="warning">You must only enter valid boggle </h3>
          ) : (
            <></>
          )}
          <button type="submit" disabled={!valid}>
            Enter
          </button>
        </form>
      </main>
    </div>
  );
}

function Table({ letters }) {
  let itemList = [];
  for (let y = 0; y < letters.length; y++) {
    itemList.push(
      <Row
        start={letters.length * y}
        letters={letters}
        column={y}
        key={"row" + y}
      />
    );
  }

  return (
    <div className="board" id="board">
      {itemList}
    </div>
  );
}

function Row({ start, column, letters }) {
  let itemList = [];

  for (let i = 0; i < letters.length; i++) {
    itemList.push(
      <Tile
        id={i + start}
        letters={letters}
        column={column}
        row={i}
        key={"tile" + (i + start)}
      />
    );
  }

  return (
    <div className="row" key={"row" + start} id={"row" + start}>
      {itemList}
    </div>
  );
}

function Tile({ id, letters, column, row }) {
  const [valid, setValid] = useState(true);

  const [currLetter, setCurrLetter] = useState(letters[column][row]);

  const onChange = (e) => {
    let val = lowerCase(e.target.value);

    setValid(validEntry(val));

    setCurrLetter(e.target.value);
  };

  return (
    <div className={valid ? "boggle" : "boggle red"} id={"tile" + id}>
      <input
        id={"tileForm" + id}
        className={"input"}
        name={id}
        placeholder={"Letter"}
        required
        maxLength={2}
        onChange={onChange}
        value={currLetter}
      />
    </div>
  );
}

function lowerCase(word) {
  let arr = [];

  for (let i = 0; i < word.length; i++) {
    arr.push(word.charAt(i).toLowerCase());
  }

  return arr.join("");
}

function validEntry(entry) {
  const valid_entries = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "j",
    "m",
    "n",
    "o",
    "p",
    "qu",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  if (entry.length == 0) return true;

  for (let i = 0; i < valid_entries.length; i++) {
    if (valid_entries[i] == entry) {
      return true;
    }
  }

  return false;
}

function loadBoard(board_size) {
  const values = document.getElementById("form");

  let board = [];

  for (let i = 0; i < board_size; i++) {
    let curr_row = [];
    for (let j = 0; j < board_size; j++) {
      let curr_id = i * board_size + j;

      let curr_value = lowerCase(values.elements["tileForm" + curr_id].value);

      curr_row.push(curr_value);
    }

    board.push(curr_row)
  }

  return board;
}
