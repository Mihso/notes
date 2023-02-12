import "./Home.css";
import React, { useEffect,useState } from "react";
import { trpc } from "../trpc";
import { Table } from "semantic-ui-react";
export default function Home() {
  const [lister, setLister] = useState([]);
  const listings = trpc.GetArticle.useQuery();
  let listur = listings.data?.vals;
  // let final = fetch('https://5pfs82ij3i.execute-api.us-east-1.amazonaws.com/notes',{
  // headers: {
  //   'Access-Control-Allow-Origin' : '*',
  //   'Content-Type':'application/json'},
  // method: 'GET',
  // mode: "cors",
  // credentials: 'include',
  // })
    
  // })
  function lis(value : any){
    console.log(value)
          return(
          <tr key={value[0].stringValue}>
          <td>
            {value[1].stringValue}
            </td>
            <td>
            {value[2].stringValue}
            </td>
            <td>
            {value[3].stringValue}
          </td>
          </tr>
          )
  }

  return (
    <div className="Home">
      <div className="lander">
        <h1>Scratch</h1>
        <p className="text-muted">A simple note taking app</p>
      </div>
      <button hidden={listings.isLoading} onClick={() => console.log(listur)}>click here</button>
      <div>
      <Table className="text-muted">
          <thead>
            <tr>
            <th>Task</th>
            <th>Comments</th>
            <th>Date made</th>
            </tr>
          </thead>
          <tbody>
        {listur?.map((article : any)=>(
          lis(article)
        ))}
        </tbody>
        </Table>
      </div>
    </div>
  );
}