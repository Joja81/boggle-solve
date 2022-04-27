import Link from "next/link";
import { useRouter } from "next/router";

export default function Solutions() {
  const router = useRouter();
  const query = router.query;

  return (
    <body>
      {"solutions" in query ? (
        <DisplaySolutions solutions={query["solutions"]} />
      ) : (
        <h1>Please enter a boggle board first</h1>
      )}
    </body>
  );
}

function DisplaySolutions({ solutions }) {
  let itemList = [];

  for (let i = 0; i < solutions.length; i++) {
    itemList.push(<Solution solution={solutions[i]} key={"solution" + i} />);
  }

  return <>
      <h1 className="title">Solutions</h1>
      <div className="split">
        {itemList}
      </div>
      <Link href={"/"} passHref>
      <button>
        Back
      </button>
      </Link>
    </>
}

function Solution({ solution }) {
  return <div>{solution}</div>;
}
