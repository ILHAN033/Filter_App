import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [products, setProducts] = useState([]);
  const [productList, setProductList] = useState([]);
  function getData() {
    fetch("https://dummyjson.com/products").then((res) =>
      res.json().then((data) => {
        setProducts(data.products);
        setProductList(data.products);
      })
    );
  }

  function onSubmit(e) {
    e.preventDefault();
    if (input) {
      setProductList(
        products.filter(
          (item) =>
            item.title.toLowerCase().includes(input.toLowerCase()) &&
            start < item.price &&
            end >= item.price
        )
      );
      setInput("");
      setStart("");
      setEnd("");
    }
    console.log(productList);
  }

  function handleReset() {
    setProductList(products);
  }

  useEffect(() => getData(), []);

  return (
    <div className="bg-orange-500 h-screen overflow-auto">
      <Nav
        input={input}
        start={start}
        end={end}
        setInput={setInput}
        setStart={setStart}
        setEnd={setEnd}
        onSubmit={onSubmit}
        handleReset={handleReset}
      />
      <ItemList
        productList={productList}
        input={input}
        start={start}
        end={end}
      />
    </div>
  );
}

function Nav({
  input,
  start,
  end,
  setInput,
  setStart,
  setEnd,
  onSubmit,
  handleReset,
}) {
  return (
    <form
      className="flex flex-col bg-slate-700 h-20 gap-2 items-center"
      onSubmit={onSubmit}
    >
      <h2 className=" text-3xl font-extrabold">Filter App</h2>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search"
          className=" h-6 w-60 rounded-md outline-none px-3"
          value={input}
          onChange={(e) => {
            console.log(e.target.value);
            setInput(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Start"
          className=" h-6 rounded-md outline-none px-3"
          value={start}
          onChange={(e) => {
            console.log("Start", e.target.value);
            setStart(Number(e.target.value));
          }}
        />
        <input
          type="text"
          placeholder="End"
          className=" h-6 rounded-md outline-none px-3"
          value={end}
          onChange={(e) => {
            console.log("End", e.target.value);
            setEnd(Number(e.target.value));
          }}
        />
        <button className="rounded-xl bg-red-400 w-20">Search</button>
        <button className="rounded-xl bg-red-400 w-20" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
}

function ItemList({ productList }) {
  return (
    <div>
      <ul className=" flex flex-col gap-5">
        {productList.map((item) => (
          <Item item={item} id={item.id} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li className="flex gap-2 mt-5 ml-5 mb-3 ">
      <img src={item.thumbnail} alt={item.name} height={200} width={200} />
      {item.id} {item.title} ${item.price}
    </li>
  );
}

export default App;
