import Head from "next/head";
import { loadAvl } from "../functions/loadAvl";
import { solveAvl } from "../functions/solveAvl";
import { useRouter } from "next/router";
import { useState } from "react";

/*
TODO
- Create solutions page
- Screen and alter entries
*/

export default function Home() {
  const BOARD_SIZE = 4;

  const router = useRouter();

  const [valid, setValid] = useState(false);

  const onChange = (e) => {
    setValid(false);

    let noProblems = true;

    const values = document.getElementById("form");

    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        let curr_id = i * BOARD_SIZE + j;
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
    for (let i = 0; i < BOARD_SIZE; i++) {
      let curr_row = [];
      for (let j = 0; j < BOARD_SIZE; j++) {
        let curr_id = i * BOARD_SIZE + j;

        let curr_value = lowerCase(values.elements["tileForm" + curr_id].value);

        curr_row.push(curr_value);

        for (let k = 0; k < curr_value.length; k++) {
          availableWords.add(curr_value.charAt(k));
        }
      }

      board.push(curr_row);
    }

    let avl = await loadAvl(availableWords);

    let solutions = solveAvl(avl, board);

    console.log("Push");
    router.push({ pathname: "/solutions", query: { solutions: solutions } });
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
        <form onSubmit={() => onSubmit()} onChange={() => onChange()} id="form">
          <Table height={BOARD_SIZE} width={BOARD_SIZE} />
          {!valid ? <h3 className="warning">You must only enter valid boggle </h3> : <></>}
          <button type="submit" disabled={!valid}>
            Enter
          </button>
        </form>
      </main>
    </div>
  );
}

function Table({ height, width }) {
  let itemList = [];
  for (let y = 0; y < height; y++) {
    itemList.push(<Row number={width} start={width * y} key={"row" + y} />);
  }

  return (
    <div className="board" id="board">
      {itemList}
    </div>
  );
}

function Row({ number, start }) {
  let itemList = [];

  for (let i = start; i < number + start; i++) {
    itemList.push(<Tile id={i} key={"tile" + i} />);
  }

  return (
    <div className="row" key={"row" + start} id={"row" + start}>
      {itemList}
    </div>
  );
}

function Tile({ id }) {
  const [valid, setValid] = useState(true);

  const onChange = (e) => {
    let val = lowerCase(e.target.value);

    setValid(validEntry(val));
  };

  return (

    <div className={valid ? "boggle" : "boggle red"}  id={"tile" + id}>
      <input
          id={"tileForm" + id}
          className={"input"}
          name={id}
          placeholder={"letter"}
          required
          maxLength={2}
          type={"text"}
          onChange={onChange}
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
