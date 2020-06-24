import React from 'react';
import './App.css';
import Field from './components/Field/Field';
import TouchBackend from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <DndProvider backend={TouchBackend} context={window} options={{
        enableMouseEvents: true
      }}>
        <Field />
      </DndProvider>
      <Footer />
    </>
  );
}

export default App;
