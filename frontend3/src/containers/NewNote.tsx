import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import "./NewNote.css";
import { trpc } from "../trpc";


export default function NewNote() {
  const mutater = trpc.createArticles.useMutation();
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleTitleChange(event : any) {
    setTitle(event.title);
  }

  function handleUrlChange(event : any){
    setUrl(event.url);
  }
  async function add() {
    try{
    mutater.mutate({title: title, url: url}, {onError: newdata => console.log(newdata)});
    setTitle("");
    setUrl("");
    mutater.reset();
    }
    catch(e){
      console.log(e);
    }
  }
  async function handleSubmit(event : any) {
    event.preventDefault();
    handleTitleChange(event)
    handleUrlChange(event)
  
    setIsLoading(true);
    try {
      add();
      nav("/");
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="NewNote">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="task">
          <Form.Label>Task</Form.Label>
          <Form.Control
            value={title}
            as="textarea"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control 
            value={url}
            as="textarea"
            onChange={(e) => setUrl(e.target.value)}
            />
        </Form.Group>
        <LoaderButton
          block = "true"
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
        >
          Create
        </LoaderButton>
      </Form>
    </div>
  );
}