import { LegacyRef } from "react";
import { useDrop } from "react-dnd";
import { cn } from "../cn";
import Card from "../card";
import { ItemTypes } from "../../constant/itemType";
import { CardType, ColumnType } from "../../types";
import { FiTrash2 } from "react-icons/fi";


const Column = ({
  columnData,
  deleteColumn,
  addCard,
  children,
  onMoveItem,
  moveItemOnSameColumn,
}: {
  columnData: ColumnType;
  deleteColumn: (key: string) => void;
  addCard: (key: string) => void;
  columnAccept: Array<string>;
  children: CardType[];
  onMoveItem: (
    item: CardType,
    dragColumn: ColumnType,
    dropColumn: ColumnType
  ) => void;
  moveItemOnSameColumn: (
    item: {item:CardType,dragColumn:ColumnType},
    dragIndex: number,
    dropIndex: number
  ) => void;
}) => {

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.card],
    drop: (item: { dragColumn: ColumnType; item: CardType }) => {
      onMoveItem(item?.item, item?.dragColumn, columnData);
    },
    canDrop: (item) => {
      if (item?.dragColumn?.key === columnData.key) {
        return false;
      }

      return true;
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;
  return (
    <div
      className={cn(
        [
          "relative w-full transition-all duration-300 ease-in-out p-2 border  border-blue-200 text-center rounded-none flex flex-col gap-4 items-center",
        ],
        {
          "bg-gray-200": isActive,
        }
      )}
      ref={drop as unknown as LegacyRef<HTMLDivElement>}
    >
      <div className="text-base text-center font-semibold ">
        <div>

        {columnData?.name}
        </div>
      </div>
        <button className=" absolute top-2 right-2 bg-gray-200 rounded  w-fit p-1 hover:bg-gray-100" onClick={() => deleteColumn(columnData?.key)}>
        <FiTrash2/>
          </button>
  
      <div className="flex flex-col gap-4 w-full">
        {children.map((cd, i) => (
          <Card
            key={`${cd?.key}-${i}`}
            columnData={columnData}
            isDragging={isActive}
            item={cd}
            index={i}
            moveItemOnSameColumn={moveItemOnSameColumn}
          />
        ))}
      </div>
      <button
        className="min-w-[150px] bg-gray-200 rounded h-10 hover:bg-gray-100 text-base w-fit"
        onClick={() => {
          addCard(columnData?.key);
        }}
      >
        Add card
      </button>
    </div>
  );
};
export default Column;
