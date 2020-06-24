import React from 'react';
import './App.css';
import Field from "./components/Field/Field";
import TouchBackend from 'react-dnd-touch-backend'
import { DndProvider } from "react-dnd";

function App() {
  return (
    <div>
      <DndProvider backend={TouchBackend} options={{
        enableMouseEvents: true
      }}>
        <Field />
      </DndProvider>
    </div>
  );
}

export default App;
