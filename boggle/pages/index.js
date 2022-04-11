import Head from "next/head";
import { loadAvl } from "../functions/loadAvl";
import { solveAvl } from "../functions/solveAvl";
import { useRouter } from "next/router";

/*
TODO
- Create solutions page
- Screen and alter entries
*/


export default function Home() {

  const BOARD_SIZE = 4

  const router = useRouter()

  const onSubmit = async (e) => {
    event.preventDefault();

    let availableWords = new Set();

    const values = document.getElementById("form");

    let board = []
    for(let i = 0; i < BOARD_SIZE; i++ ){
      let curr_row = []
      for(let j = 0; j < BOARD_SIZE; j++ ){
        let curr_id = i*BOARD_SIZE+j

        let curr_value = lowerCase(values.elements["tileForm"+curr_id].value)

        curr_row.push(curr_value);


        for(let k = 0; k < curr_value.length; k++){
          availableWords.add(curr_value.charAt(k))
        }

      }

      board.push(curr_row);
    }

    let avl = await loadAvl(availableWords)

    let solutions = solveAvl(avl, board)
    
    console.log("Push")
    router.push({ pathname: "/solutions", query: {solutions: solutions} });


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
      <input id={"tileForm" + id} name={id} placeholder={"letter"} required />
      
  </div>
}

function lowerCase(word){
  let arr = []

  for(let i = 0; i < word.length; i++){
    arr.push(word.charAt(i).toLowerCase())
  }

  return arr.join("")
}