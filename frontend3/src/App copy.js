import React, { useState } from 'react';
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from "./Routes";
import NewNote from './containers/NewNote';
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
function App() {
  return (
    // <trpc.Provider client={trpcClient} queryClient={queryClient}>
    //   <QueryClientProvider client={queryClient}>
    //     {
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            Scratch
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            <LinkContainer to="/New">
              <Nav.Link>Create a New Note</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
//}
// </QueryClientProvider>
// </trpc.Provider>
  );
}
export default App;