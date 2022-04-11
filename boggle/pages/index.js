import Head from "next/head";
import Image from "next/image";
import { loadAvl } from "../functions/loadAvl";
import { solveAvl } from "../functions/solveAvl";

export default function Home() {

  const BOARD_SIZE = 4

  const onSubmit = async (e) => {

    let availableWords = new Set();

    const values = document.getElementById("form");

    let board = []
    for(let i = 0; i < BOARD_SIZE; i++ ){
      let curr_row = []
      for(let j = 0; j < BOARD_SIZE; j++ ){
        let curr_id = i*BOARD_SIZE+j
        curr_row.push(values.elements["tileForm"+curr_id].value);

        availableWords.add(values.elements["tileForm"+curr_id].value)

      }
      board.push(curr_row);
    }

    let avl = await loadAvl(availableWords)
    let solutions = solveAvl(avl, board)
    console.log(solutions);

  }

  const test = async () => {

    let availableWords = new Set();

    availableWords.add("n")
    availableWords.add("h")
    availableWords.add("a")
    availableWords.add("y")
    availableWords.add("u")
    availableWords.add("v")
    availableWords.add("b")
    availableWords.add("h")
    availableWords.add("s")
    availableWords.add("w")
    availableWords.add("n")
    availableWords.add("g")
    availableWords.add("f")
    availableWords.add("a")
    availableWords.add("w")
    availableWords.add("p")


    let avl = await loadAvl(availableWords)


    let board = [['n', 'h', 'a', 'y'], ['u', 'v', 'b', 'h'], ['s', 'w', 'n', 'g'], ['f', 'a', 'w', 'p']]

    let solutions = solveAvl(avl, board)

    console.log(solutions);
  }

  return (
    <div>
      <Head>
        <title>Solve boggle</title>
        <meta name="description" content="Solve boggle quickly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={"title centered"}>Solve a boggle board</h1>
        <button onClick={() => test()}>
          Test
        </button>
        <form onSubmit={() => onSubmit()} id="form">
          <Table height={BOARD_SIZE} width={BOARD_SIZE}/>
          <button type="submit">Enter</button>
        </form>
      </main>
    </div>
  );
}

function Table({height, width}){
  let itemList = [];
  for(let y = 0; y < height; y++){
    itemList.push(<Row number={width} start={width*y} key={"row"+y}/>)
  }

  return <div className="board" id = "board">
    {itemList}
  </div>
}

function Row({number, start}){
  let itemList = [];

  for(let i = start; i < number + start; i++){
    itemList.push(<Tile id={i} key={"tile"+i}/>)
  }
  
  
  return <div className="row" key={"row"+start} id={"row"+start}>
    {itemList}
  </div>
}

function Tile({id}){
  return <div className="boggle" id={"tile"+id}>
      <input id={"tileForm" + id} name={id} placeholder={id} required/>
  </div>
}