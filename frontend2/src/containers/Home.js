import React from "react";
import "./Home.css";
import { useEffect,useState } from "react";
export default function Home() {
  const [lister, setLister] = useState([])

  // useEffect(() => {
  //   async function getList(){
  //   const articles = await fetch("https://5pfs82ij3i.execute-api.us-east-1.amazonaws.com", {
  //     mode: "no-cors",
  //     methods: "GET/ notes",
  //     }).then((response) => response.json());
  //     console.log(articles)
  //     setLister(articles);
  //   }
  //   getList()
  // },[])
  return (
    <div className="Home">
      <div className="lander">
        <h1>Scratch</h1>
        <p className="text-muted">A simple note taking app</p>
      </div>
      {/* <div>
        {lister.map((article)=>(

          <p key={article.articleid}>
            {article.title}
          </p>
        ))}
      </div> */}
    </div>
  );
}