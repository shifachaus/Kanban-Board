import { useState } from "react";
import { Column, Id } from "../Types";
import TrashIcon from "../icons/TrashIcon";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
}

const ColumnContainer = (props: Props) => {
  const { column, deleteColumn, updateColumn } = props;

  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div className="bg-columnBackgroundColor opacity-40 border-2 border-rose-500 w-[350px] h-[500px] rounded-md flex flex-col"></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroundColor w-[350px] h-[500px] max[h-[500px] rounded-md flex flex-col"
    >
      {/* COLUMN TITLE */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="flex items-center justify-between bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-b"
      >
        <div className="flex gap-2">
          <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm">
            0
          </div>

          {editMode ? (
            <input
              className="bg-black focus:border-rose-500 border rounded outline-none px-2"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          ) : (
            column.title
          )}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor rounded px-1 py-1"
        >
          <TrashIcon />
        </button>
      </div>

      <div className="flex flex-grow">Content</div>
      <div className="">Footer</div>
    </div>
  );
};

export default ColumnContainer;
