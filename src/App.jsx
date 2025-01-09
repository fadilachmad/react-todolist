import Button from "./components/Button";
import { useState, useRef, useEffect } from "react";
import { LuPencil, LuTrash } from "react-icons/lu";

function App() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [itemIndex, setItemIndex] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    const savedItems = JSON.parse(localStorage.getItem("ITEMS"));
    if (savedItems.length > 0) setList(savedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") return;

    if (itemIndex !== null) {
      updateItem(value, itemIndex);
      setItemIndex(null);
    } else {
      setList((prevList) => [...prevList, value]);
    }

    setValue("");
  };

  const updateItem = (updatedValue, index) => {
    setList((prevList) =>
      prevList.map((item, i) => (i === index ? updatedValue : item))
    );
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleRemove = (i) => {
    const filteredRemove = list.filter((_, index) => index !== i);
    setList(filteredRemove);
  };

  const handleEdit = (value, i) => {
    setValue(value);
    setItemIndex(i);
    inputRef.current.focus();
  };

  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <main className="border border-black p-5 md:min-w-96">
        <h1 className="border-b border-black mb-5">To Do List</h1>
        <form
          action=""
          className="flex justify-between"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="border border-black p-2 focus:outline-none mr-2 w-full"
            placeholder="List here..."
            value={value}
            onChange={handleChange}
            ref={inputRef}
          />
          <Button>Submit</Button>
        </form>
        <ul className="my-5">
          {list.map((element, i) => (
            <li key={i} className="flex justify-between">
              <h1>
                {i + 1}. {element}
              </h1>

              <div className="icon-container flex justify-between cursor-pointer w-10">
                <LuPencil
                  className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  onClick={() => handleEdit(element, i)}
                />
                <LuTrash
                  className="text-red-400 hover:text-red-600 transition-colors duration-200"
                  onClick={() => handleRemove(i)}
                />
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
