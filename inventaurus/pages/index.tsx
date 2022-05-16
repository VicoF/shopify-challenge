import { Item } from "@prisma/client";
import { useEffect, useState } from "react";
import TableItem from "../components/TableItem";
import TableRow from "../components/TableRow";

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

  async function addItem(item: Item) {
    setIsAdding(false);
    await fetch("/api/item", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    fetchItems();
  }

  async function onDelete(item: Item) {
    const deleteComment = prompt(
      `Please enter a comment for the deletion of ${item.name}`
    );
    if (deleteComment != null) {
      fetch(`/api/item/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deleteComment,
        }),
      }).then(() => fetchItems());
    }
  }

  async function onSave(item: Item) {
    fetch(`/api/item/${item.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    }).then(fetchItems);
  }

  async function onUndelete(item: Item) {
    fetch(`/api/item/${item.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...item,
        deletedAt: null,
        deleteComment: null,
      }),
    }).then(fetchItems);
  }

  function switchIsAdding() {
    setIsAdding(!isAdding);
  }

  function switchSeeDeleted() {
    setSeeDeleted(!seeDeleted);
  }

  return (
    <div>
      <input type="checkbox" id="see_deleted" onClick={switchSeeDeleted} />
      <label htmlFor="see_deleted">See deleted items</label>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            {seeDeleted && <th>Delete comment</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <TableRow
              key={"TableItem" + index}
              item={item}
              onDelete={onDelete}
              onSave={onSave}
              onUndelete={onUndelete}
            />
          ))}
          {isAdding && <TableRow isEditing onSave={addItem} />}
        </tbody>
      </table>
      <button onClick={switchIsAdding}>Add Item</button>
    </div>
  );
}
