import React, { CSSProperties } from "react";
import {
  DropResult,
  DragDropContext,
  Droppable,
} from "react-beautiful-dnd";

const DraggableContext = ({
  onDragEnd,
  dropId,
  className,
  style,
  draggingOverClassName,
  children,
}: {
  onDragEnd: (result: DropResult) => void;
  dropId: string;
  className?: string;
  style?: CSSProperties;
  draggingOverClassName?: string;
  children: React.ReactNode;
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={dropId}>
        {(provided, snapshot) => (
          <div
            className={`${className ? className : ""} ${
              snapshot.isDraggingOver ? draggingOverClassName : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{...style}}
          >
           {children} 
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableContext;
