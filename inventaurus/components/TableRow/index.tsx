import { Item } from "@prisma/client";
import React, { createRef, useRef, useState } from "react";
import TableItem from "../TableItem";

interface Props {
  item?: Item;
  isDeleting?: boolean;
  isEditing?: boolean;
  onDelete?: (item: Item) => void;
  onSave?: (item: Item) => void;
  onUndelete?: (item: Item) => void;
}

export default function TableRow({
  item,
  isEditing: isEditingProp,
  onDelete,
  onSave,
  onUndelete,
}: Props) {
  const nameRef = createRef<HTMLInputElement>();
  const descriptionRef = createRef<HTMLInputElement>();
  const quantityRef = createRef<HTMLInputElement>();
  const deleteCommentRef = createRef<HTMLInputElement>();
  const [isEditing, setIsEditing] = useState(isEditingProp);

  function switchIsEditing() {
    setIsEditing(!isEditing);
  }

  function getUpdatedItem(): Item {
    return {
      ...item,
      name: nameRef.current?.value || item?.name || "",
      description: descriptionRef.current?.value || item?.description || "",
      quantity: Number(quantityRef.current?.value || item?.quantity) || 0,
    };
  }

  return (
    <tr>
      <TableItem value={item?.name || ""} ref={nameRef} isEditing={isEditing} />
      <TableItem
        value={item?.description}
        ref={descriptionRef}
        isEditing={isEditing}
      />
      <TableItem
        value={String(item?.quantity || 0)}
        ref={quantityRef}
        isEditing={isEditing}
      />
      {item?.deletedAt && (
        <TableItem
          value={item.deleteComment || "No comment"}
          ref={deleteCommentRef}
          isEditing={isEditing}
        />
      )}
      {isEditing ? (
        <td>
          <button
            onClick={() => {
              onSave(getUpdatedItem());
              setIsEditing(false);
            }}
          >
            Save
          </button>
        </td>
      ) : (
        <td>
          <button onClick={switchIsEditing}>Edit</button>
        </td>
      )}
      {item && item.deletedAt ? (
        <td>
          <button
            onClick={() => {
              onUndelete(item);
            }}
          >
            Undelete
          </button>
        </td>
      ) : (
        <td>
          <button
            onClick={() => {
              onDelete(item);
            }}
          >
            Delete
          </button>
        </td>
      )}
    </tr>
  );
}
