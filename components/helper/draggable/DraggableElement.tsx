import { Draggable } from "react-beautiful-dnd";

import IndexTopChartItem from "@/components/index/top-chart/IndexTopChartItem";

const DraggableElement = ({
  lists,
  onMusicClick,
}: {
  lists: any[];
  onMusicClick: (type: "play" | "remove", music: Music) => void;
}) => {
  return lists.map((list, index) => (
    <Draggable
      key={`item-${list.id}`}
      draggableId={`item-${list.id}`}
      index={index}
    >
      {(provided, snapShot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <IndexTopChartItem
            index={index}
            musicData={list}
            onMusicClick={onMusicClick}
            isDragging={snapShot.isDragging}
            inPlaylist
          />
        </div>
      )}
    </Draggable>
  ));
};

export default DraggableElement;
