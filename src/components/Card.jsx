import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Button from "./Button";
import { useState } from "react";

const Card = () => {
  const inputRef = useRef(null);
  const [list, setList] = useState([]);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    console.log(list);
    inputRef.current.value = "";
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim() !== "") {
      setList((prevlist) => [...prevlist, inputRef.current.value]);
    }
  };

  return (
    <div className="border border-black p-5 min-w-64">
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
            <li key={i} className="my-2">
              {i + 1}. {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
