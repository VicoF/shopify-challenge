import { Item } from "@prisma/client";
import { useEffect, useState } from "react";
import TableItem from "../components/TableItem";

export default function Home() {
  const [items, setItems] = useState<Array<Item>>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [seeDeleted, setSeeDeleted] = useState(false);

  async function fetchItems() {
    let res: Response;
    if (seeDeleted) {
      res = await fetch("/api/item/deleted");
    } else {
      res = await fetch("/api/item");
    }
    setItems(await res.json());
  }

  useEffect(() => {
    fetchItems();
  }, [seeDeleted]);

  async function addItem(values: Array<String>) {
    await fetch("/api/item", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values[0],
        description: values[1],
        quantity: Number(values[2]),
      }),
    });
    fetchItems();
    setIsAdding(false);
  }

  async function onDelete(item) {
    if (confirm(`Are you sure that you want to delete ${item.name}?`)) {
      fetch(`/api/item/${item.id}`, {
        method: "DELETE",
      }).then(() => fetchItems());
    }
  }

  return (
    <div>
      <input
        type="checkbox"
        id="see_deleted"
        onClick={() => {
          setSeeDeleted(!seeDeleted);
        }}
      />
      <label htmlFor="see_deleted">See deleted items</label>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <TableItem
              key={"TableItem" + index}
              editable
              values={[
                item.name,
                item.description || "This item doesn't have a description",
                String(item.quantity),
              ]}
              onDelete={() => onDelete({ ...item })}
              onSave={(values) => {
                fetch(`/api/item/${item.id}`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    id: item.id,
                    name: values[0],
                    description: values[1],
                    quantity: Number(values[2]),
                  }),
                }).then(() => fetchItems());
              }}
            />
          ))}
          {isAdding ? (
            <TableItem
              editable
              values={["", "", ""]}
              onSave={addItem}
              isEditingDefault
            ></TableItem>
          ) : null}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <button
                onClick={() => {
                  setIsAdding(true);
                }}
              >
                Add Item
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
