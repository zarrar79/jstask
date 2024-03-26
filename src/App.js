import logo from "./logo.svg";
import "./App.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";

function App() {
  const [queue, setQueue] = useState([]);
  const [variable, setVar] = useState(1);
  function handleClick() {
    var change = variable;
    const userInput = document.querySelector(".userInput").value.trim();
    if (userInput === "") {
      document.querySelector(".userInput").value = "";
      return;
    }

    const data = [];
    const temp = queue;
    temp.push({ id: "" + variable, value: userInput });
    setQueue(temp);
    const progress = [];
    const complete = [];
    if (userInput) {
      setVar(++change);
      document.querySelector(".userInput").value = "";
    }
  }
  const handleDrag = (results) => {
    const { source, destination, type } = results;
    if (!destination) return;
    if (
      destination.draggableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    if (type === "queue") {
      const reorderedStore = [...queue];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      const [removedTask] = reorderedStore.splice(sourceIndex, 1);
      reorderedStore.splice(destinationIndex, 0, removedTask);
      setQueue(reorderedStore);
    }
  };
  return (
    <>
      {/* parent */}
      <div className="w-[50%] mx-auto mt-2">
        {/* inp+btn */}
        <div className="flex">
          <input
            className="userInput p-2 w-[100%] border border-[solid] border-blue-500 rounded-sm"
            placeholder="Enter task"
          ></input>
          <button
            className="bg-blue-600 p-3 rounded-sm text-white font-[500]"
            onClick={handleClick}
          >
            Add
          </button>
        </div>
        <DragDropContext onDragEnd={handleDrag}>
          {/* grid */}
          <div className="grid grid-cols-3 mt-2">
            {/* left */}
            <Droppable droppableId="queue" type="queue">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div className="flex justify-center mb-1">Queue</div>
                  {queue.map((str, index) => (
                    <Draggable draggableId={str.id} key={str.id} index={index}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <div className="m-[5px] bg-[#38d172] p-[10px] text-white">
                            {str.id}. {str.value}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {/* mid */}
            <div>
              <div className="flex justify-center mb-1">In Progress</div>
            </div>
            {/* right */}
            <div>
              <div className="flex justify-center mb-1">Completed</div>
            </div>
          </div>
        </DragDropContext>
      </div>
    </>
  );
}
export default App;
