import React, { useRef, useState } from "react";

interface Props {
  values: Array<string>;
  onEdit?: () => void;
  onDelete?: () => void;
  onSave?: (values: Array<string>) => void;
  editable?: boolean;
  isEditingDefault?: boolean;
}

export default function TableItem({
  values,
  onDelete,
  editable,
  onSave,
  isEditingDefault = false,
}: Props) {
  const refs = values.map(() => useRef<HTMLInputElement>(null));
  const [isEditing, setIsEditing] = useState(isEditingDefault);

  return (
    <tr>
      {values.map((value, index) => {
        return (
          <td>
            {isEditing ? (
              <input defaultValue={value} ref={refs[index]} />
            ) : (
              value
            )}
          </td>
        );
      })}
      <td>
        {editable && !isEditing ? (
          <button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        ) : null}
        {isEditing && onSave ? (
          <button
            onClick={() => {
              setIsEditing(false);
              onSave(refs.map((ref) => ref.current.value));
            }}
          >
            Save
          </button>
        ) : null}
        {onDelete ? <button onClick={onDelete}>Delete</button> : null}
      </td>
    </tr>
  );
}
