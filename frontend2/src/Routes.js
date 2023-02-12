import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home.tsx";
import NotFound from "./containers/NotFound";
import { MyComponent } from "./containers/test";
import NewNote from "./containers/NewNote";
export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewNote />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/test" element={<MyComponent />}/>
    </Routes>
  );
}

