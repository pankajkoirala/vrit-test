import { useState } from "react";
import "./App.css";
import Column from "./shared/column";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CardType, ColumnType, Data } from "./types";

function App() {
  const [data, setData] = useState<Array<Data>>([
    {
      column: { name: "first", key: "column-0" },
      children: [
        {
          key: "0",
          text: "Card-0",
        },
      ],
    },
  ]);


  const addColumn = () => {
    setData((pev) => [
      ...pev,
      {
        column: {
          name: `column-${data.length}`,
          key: `column-${data.length}`,
        },
        children: [],
      },
    ]);
  };
  const deleteColumn = (key: string) => {
    setData((pev) => pev.filter((e) => e.column.key !== key));
  };

  const addCard = (key: string) => {
    setData((pev) => {
      return pev.map((e) => {
        if (key === e.column.key) {
          return {
            ...e,
            children: [
              ...e.children,
              {
                key: Math.random().toFixed(2).toString(),
                text: `Card-${e.children?.length}`,
              },
            ],
          };
        }
        return e;
      });
    });
  };
  const onMoveItem = (
    item: CardType,
    dragColumn: ColumnType,
    dropColumn: ColumnType
  ) => {
    if (dragColumn?.key === dropColumn?.key) {
      setData(data);
    } else {
      const updatedData = data.map((dt) => {
        if (dt.column.key === dragColumn.key) {
          return {
            ...dt,
            children: dt.children.filter((e) => e.key !== item.key),
          };
        }
        if (dt.column.key === dropColumn.key) {
          return {
            ...dt,
            children: [...dt.children, item],
          };
        }
        return dt;
      });
      setData(updatedData);
    }
  };
  const moveItemOnSameColumn = (
    item: {item:CardType,dragColumn:ColumnType},
    dragIndex: number,
    dropIndex: number
  ) => {

    const updatedData = data.map((dt) => {
      if (item?.dragColumn?.key === dt.column?.key) {
        const arr = dt.children??[];


        if (dragIndex < 0 || dragIndex >= arr.length || dropIndex < 0 || dropIndex >= arr.length) {
          console.error("Invalid indices");
          return arr; // Return the original array if indices are out of bounds
        }
      
        const x = arr[dragIndex];
        arr.splice(dragIndex, 1);  // Remove the item from its original position
        arr.splice(dropIndex, 0, x);  // Insert the item at the new position
        
        return { ...dt, children: arr };
      }
        return dt;
      
    });
    setData(updatedData as never);

    // const arr=data
    // arr.splice(dropIndex, 0, item)
    // arr.splice(dragIndex, 1)

  };
  return (
    <div className="w-full flex flex-col gap-4 ">
      <button
        className="min-w-[150px] bg-gray-200 rounded h-10 hover:bg-gray-100 text-base w-fit"
        onClick={addColumn}
      >
        Add column
      </button>
      <DndProvider backend={HTML5Backend}>
        <div className="flex gap-3 w-full">
          {data.map((d) => (
            <Column
              addCard={addCard}
              columnAccept={data.map((e) => e.column.key)}
              columnData={d.column}
              children={d?.children}
              deleteColumn={deleteColumn}
              key={d?.column?.key}
              onMoveItem={onMoveItem}
              moveItemOnSameColumn={moveItemOnSameColumn}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
