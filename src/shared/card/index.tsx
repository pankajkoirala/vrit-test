import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../constant/itemType";
import { CardType, ColumnType } from "../../types";
import { cn } from "../cn";

/**
 * Your Component
 */
export default function Card({
  index,
  item,
  columnData,
  moveItemOnSameColumn,
}: {
  isDragging: boolean;
  item: CardType;
  columnData: ColumnType;
  index: number;
  moveItemOnSameColumn: (
    item: {item:CardType,dragColumn:ColumnType},
    dragIndex: number,
    dropIndex: number
  ) => void;
}) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.card,
      item: { dragColumn: columnData, item, dragIndex: index },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.card],
    drop: (item: {
      dragColumn: ColumnType;
      item: CardType;
      dragIndex: number;
    }) => {
      moveItemOnSameColumn(item, item?.dragIndex, index);

      // onMoveItem(item?.item,item?.dragColumn,columnData)
    },
    canDrop: () => {
      // if (item?.dragColumn?.key === columnData.key) {
      //   return false;
      // }

      return true;
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = isOver && canDrop;

  console.log({ isActive });

  return (

      <div ref={drop}>
        <div
          ref={dragRef}
          style={{ opacity }}
          className={cn(
            "bg-gray-100 rounded px-4 py-2 w-full hover:cursor-grab",
          )}
        >
          {item?.text}
          {item?.key}
        </div>
      </div>
  );
}
