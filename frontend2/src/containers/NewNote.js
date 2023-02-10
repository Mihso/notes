import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import "./NewNote.css";

export default function NewNote() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleTitleChange(event) {
    setTitle(event.title);
    console.log(title);
  }

  function handleUrlChange(event){
    setUrl(event.url);
    console.log(url)
  }

  async function handleSubmit(event) {
    event.preventDefault();
    handleTitleChange(event)
    handleUrlChange(event)
  
    setIsLoading(true);
    try {
      await fetch("https://5pfs82ij3i.execute-api.us-east-1.amazonaws.com", {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      mode: "cors",
      method: "POST",
      body: {
        "title" : title,
        "url" : url,
      }
      });
      nav("/");
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  
  function createNote(note) {
  }
  return (
    <div className="NewNote">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            as="textarea"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="url">
            <Form.Label>Url</Form.Label>
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