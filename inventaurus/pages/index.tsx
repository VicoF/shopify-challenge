import { useEffect, useState } from "react";
import TableItem from "../components/TableItem";

export default function Home() {
  const [items, setItems] = useState([]);
  async function fetchItems() {
    const res = await fetch("/api/item");
    setItems(await res.json());
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((item) =>
          item ? (
            <TableItem
              values={[
                item.name,
                item.description || "This item has no description",
                item.quantity,
              ]}
              }}
            />
          ) : null
        )}
      </tbody>
      <tfoot>
        <tr>
          <button>Add Item</button>
        </tr>
      </tfoot>
    </table>
  );
}
