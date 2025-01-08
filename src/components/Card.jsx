import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Button from "./Button";
import { useState } from "react";

const Card = () => {
  const inputRef = useRef(null);
  const [list, setList] = useState([]);
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
    const localList = localStorage.getItem("list");
    if (localList) {
      setList(JSON.parse(localList));
    }
    setIsInit(true);
  }, []);

  useEffect(() => {
    console.log(list);
    if (isInit) {
      localStorage.setItem("list", JSON.stringify(list));
    }
    inputRef.current.value = "";
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim() !== "") {
      setList((prevlist) => [...prevlist, inputRef.current.value]);
    }
  };

  const handleRemoveList = (index) => {
    setList((l) => l.filter((_, i) => i !== index));
  };

  return (
    <div className="border border-black p-5 min-w-2 scale-75 md:scale-100">
      <div className="title text-xl border-b border-b-black">To do List</div>
      <div className="body">
        <form className="mt-2" onSubmit={handleSubmit}>
          <input
            type="text"
            className="border border-black py-2 px-2 mr-2 w-56  focus:outline-none"
            placeholder="Enter Item"
            ref={inputRef}
          />
          <Button>Add To List</Button>
        </form>
      </div>
      <div className="footer">
        <ul className="mt-2">
          {list.map((item, i) => (
            <li
              key={i}
              onClick={() => handleRemoveList(i)}
              className="my-2 cursor-pointer"
            >
              {i + 1}. {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
