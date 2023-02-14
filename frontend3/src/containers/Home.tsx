import "./Home.css";
import React from "react";
import { trpc } from "../trpc";
import { Table } from "semantic-ui-react";

export default function Home() {
  let listings = trpc.GetArticle.useQuery(undefined,{refetchInterval: 300});
  let listur = listings.data?.vals;
  const delet = trpc.DeleteArticle.useMutation({onSuccess: ()=>listings.refetch()});
  // const upD = trpc.UpdateArticle.useMutation({onSuccess: ()=>listings.refetch()});  
  function lis(value : any){
    listings.refetch();
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
          <td>
            <button onClick={() => {delet.mutate({id: value[0].stringValue});listings.refetch.apply} }>Complete</button>
          </td>
          </tr>
          )
  }

  return (
    <div className="Home">
      <div className="lander">
        <h1>Duties</h1>
        <p className="text-muted">A simple task management application</p>
      </div>
      <div hidden={listings.isFetched}>Loading</div>
      <Table hidden={listings.isLoading} className="text-muted">
          <thead>
            <tr>
            <th>Task</th>
            <th>Description</th>
            <th>Date made</th>
            <th>Completed?</th>
            </tr>
          </thead>
          <tbody>
        {listur?.map((article : any)=>(
          lis(article)
        ))}
        </tbody>
        </Table>
      </div>
  );
}