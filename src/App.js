import React from 'react';
import './App.css';
import Field from "./components/Field/Field";
import Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend'
import {DndProvider} from "react-dnd";

class App extends React.Component {

  render() {
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
}

export default App;
