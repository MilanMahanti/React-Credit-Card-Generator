import { useState } from "react";
import Form from "./components/Forms/Form";
import Card from "./components/cards/Card";

export default function App() {
  const [items, setItems] = useState({});
  function handelChange(items) {
    setItems({ ...items });
  }
  return (
    <div className="app">
      <div className="sidebar">
        <Card items={items} />
      </div>
      <div className="card-details-form">
        <Form onChange={handelChange} />
      </div>
    </div>
  );
}
