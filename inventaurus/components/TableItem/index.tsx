import React from "react";

interface Props {
  values: any[];
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TableItem({ values, onEdit, onDelete }: Props) {
  return (
    <tr>
      {values.map((value) => (
        <td>{value}</td>
      ))}
      <td>
        {onEdit ? <button>Edit</button> : null}
        {onDelete ? <button onClick={onDelete}>Delete</button> : null}
      </td>
    </tr>
  );
}
