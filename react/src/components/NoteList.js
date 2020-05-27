import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const grid = 8
var active = null

function handleActive(clicked, cb){
  if(active === clicked) active = null
  else active = clicked
  cb()
}

const getItemStyle = (isDragging, draggableStyle, id) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "#91989c",
  borderStyle: id === active ? "solid" : "none",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  // background: isDraggingOver ? "lightblue" : "",
  padding: grid,
  width: "auto"
});

function NoteList(props) {
  const [n, setN] = useState(0);
  function updateActive(){
    props.handleActive(active)
    setN(n + 1);
  }
  return (
    <DragDropContext onDragEnd={props.handleDrag}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {props.items.map((item, index) => (
              <Draggable id={item.id} key={item.id} draggableId={item.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <div
                    onClick={() => handleActive(item.id, updateActive)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style,
                      item.id
                    )}
                  >
                    {item.title}

                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default NoteList;