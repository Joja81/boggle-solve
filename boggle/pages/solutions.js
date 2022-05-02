import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "../lib/context";

export default function Solutions() {
  const router = useRouter();

  const {solutions, letters} = useContext(UserContext)

  return (
    <body>
      {solutions?  (
        <DisplaySolutions solutions={solutions} board={letters} />
      ) : (
        <h1>Please enter a boggle board first</h1>
      )}
    </body>
  );
}

function DisplaySolutions({ solutions, board }) {

  

  let itemList = [];

  const [used, setUsed] = useState([])


  for (let i = 0; i < solutions.length; i++) {
    itemList.push(<Solution solution={solutions[i]} key={"solution" + i} setUsed={setUsed}/>);
  }

  return <>
      <h1 className="title">Solutions</h1>
      <div className="split">
        {itemList}
      </div>
      <Board board={board} used={used}/>
      <Link href={"/"} passHref>
      <button>
        Back
      </button>
      </Link>
    </>
}

function Solution({ solution, setUsed }) {

  const onClick = () => {
    console.log("selecting");
    setUsed(solution['used'])
  }
  

  return <div><h3 className="letter" onMouseEnter={onClick}>{solution['word']}</h3></div>;
}

function Board({board, used}){

  let rowList = []
  
  for (let row = 0; row < board.length; row++){
    rowList.push(<Row row={board[row]} rowNum = {row} used={used}/>)
  }

  return <div >
    {rowList}
  </div>
}

function Row({row, rowNum, used}){

  let letterList = []
  for (let letter = 0; letter < row.length; letter++){
    letterList.push(<Letter letter={row[letter]} rowNum={rowNum} letterNum = {letter} used={used}/>)
  }

  return <div>
    {letterList}
  </div>
}

function Letter({letter, rowNum, letterNum, used}){

  let selected = isSelected(rowNum, letterNum, used);

  let className = "column square";

  if (selected == 1){
    className += " selected"
  } else if (selected == 2){
    className += " first"
  }


  return <div className={className}>
    {letter}
  </div>
}


function isSelected(rowNum, letterNum, used){

  if (used.length < 1){
    return 0
  }

  let curr = used[0]

  if (curr[0] == rowNum && curr[1] == letterNum){
    return 2;
  }

  for (let i = 1; i < used.length; i++){
    curr = used[i]
    if (curr[0] == rowNum && curr[1] == letterNum ){
      return 1;
    }
  }

  return 0
}