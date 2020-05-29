import React, { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

const grid = 8
var active = null

function handleActive(clicked, cb) {
  if (active === clicked) active = null
  else active = clicked
  cb()
}

const getItemStyle = (isDragging, draggableStyle, id) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "#91989c",
  borderStyle: id === active ? "solid" : "none",
  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  padding: grid,
  width: "auto"
});

/**
 * Component that renders notes into a dragganble list
 * 
 * @param {props} props  handleActive handleDrag items
 * @param {callback} props.handleActive callback to App.js for item click
 * @param {callback} props.handleDrag callback to App.js for drags
 * @param {array} props.items Array of the items in wanted order
 */
function NoteList(props) {
  const [n, setN] = useState(0);
  function updateActive() {
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