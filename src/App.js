import React from 'react';
import './App.css';
import Field from './components/Field/Field';
import TouchBackend from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd';

function App() {
  return (
    <>
      <DndProvider backend={TouchBackend} context={window} options={{
        enableMouseEvents: true
      }}>
        <Field />
      </DndProvider>
    </>
  );
}

export default App;
