import React, { useRef, useState } from "react";

interface Props {
  value: string;
  isEditing?: boolean;
}

const TableItem = React.forwardRef<HTMLInputElement, Props>(
  ({ value, isEditing = false }, ref) => {
    return (
      <td>{isEditing ? <input defaultValue={value} ref={ref} /> : value}</td>
    );
  }
);

export default TableItem;
