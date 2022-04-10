import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Solve boggle</title>
        <meta name="description" content="Solve boggle quickly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={"title centered"}>Solve a boggle board</h1>
        <form>
          <Table height={5} width={5}/>
        </form>
      </main>
    </div>
  );
}

function Table({height, width}){
  let itemList = [];
  for(let y = 0; y < height; y++){
    itemList.push(<Row number={width} start={width*y} />)
  }

  return <div className="board">
    {itemList}
  </div>
}

function Row({number, start}){
  let itemList = [];

  for(let i = start; i < number + start; i++){
    itemList.push(<Tile id={i} />)
  }
  
  
  return <div className="row">
    {itemList}
  </div>
}

function Tile({id}){
  return <div className="boggle">
      <input type="number" id={id} name={id} placeholder={id} required/>
  </div>
}