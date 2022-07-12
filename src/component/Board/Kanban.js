import React, { useEffect, useRef, useState } from "react";
import { FaGlobeAmericas, FaRegStar, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
// import List from "../Card/List";
import { customAlphabet } from "nanoid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Demo from "../Card/List";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 13);

const Kanban = () => {
  const [addingList, setAddingList] = useState(false);
  const [data, setData] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    localStorage.getItem("data")
      ? setData(JSON.parse(localStorage.getItem("data")))
      : fetch("/defaultTask.json")
          .then((resp) => resp.json())
          .then((data) => {
            setData(data);
            localStorage.setItem("data", JSON.stringify(data));
          })
          .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  const addNewList = (e) => {
    e.preventDefault();
    const newData = [
      ...data,
      { id: nanoid(), title: inputRef.current.value, tasks: [] },
    ];
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
    setAddingList(false);
  };

  const addCard = (newList) => {
    const updatedTask = [];
    data.map((list) =>
      list.id === newList.parentId
        ? updatedTask.push({
            id: list.id,
            title: list.title,
            tasks: [...list.tasks, newList.data],
          })
        : updatedTask.push(list)
    );
    setData(updatedTask);
    localStorage.setItem("data", JSON.stringify(updatedTask));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const updatedTask = [];
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = data.find((list) => list.id === source.droppableId);
      const destColumn = data.find(
        (list) => list.id === destination.droppableId
      );
      const sourceItems = [...sourceColumn.tasks];
      const destItems = [...destColumn.tasks];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      // eslint-disable-next-line
      data.map((list) => {
        if (list.id === destination.droppableId) {
          updatedTask.push({
            id: list.id,
            title: list.title,
            tasks: destItems,
          });
        } else if (list.id === source.droppableId) {
          updatedTask.push({
            id: list.id,
            title: list.title,
            tasks: sourceItems,
          });
        } else {
          updatedTask.push(list);
        }
      });
    } else {
      const column = data.find((list) => list.id === source.droppableId);
      const copiedItems = [...column.tasks];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      data.map((list) =>
        list.id === source.droppableId
          ? updatedTask.push({
              id: list.id,
              title: list.title,
              tasks: copiedItems,
            })
          : updatedTask.push(list)
      );
    }
    setData(updatedTask);
    localStorage.setItem("data", JSON.stringify(updatedTask));
  };

  return (
    <main>
      <div className="notification flex items-center justify-center">
        <div className="message font-bold">
          <FaGlobeAmericas className="text-green mr-4" />
          <span>
            This board is set to public. Board admins can change its visibility
            setting at any time.{"  "}
            <Link to="#" className="font-normal mr-2">
              Learn more here
            </Link>
          </span>
        </div>
        <div className="cancel-icon">
          <FaTimes />
        </div>
      </div>
      <div className="main">
        <div className="header flex items-center">
          <h1 className="text-7 font-bold px-4 text-white m-0">Kanban Board</h1>
          <div className="box w-12 text-8 text-white flex items-center justify-center">
            <FaRegStar />
          </div>
          <div className="vl"></div>
          <div className="flex justify-center items-center text-white box w-unset px-2">
            <FaGlobeAmericas />
            <span className="ml-3">Public</span>
          </div>

          <div className="vl"></div>
          <div className="name-placeholder mx-2">
            <span>qk</span>
          </div>
        </div>
        <div className="boards">
          <DragDropContext onDragEnd={onDragEnd}>
            {data.length >= 1 &&
              data.map((list) => {
                return (
                  <Droppable key={list.id} droppableId={list.id}>
                    {(provided, snapshot) => (
                      <Demo
                        key={list.id}
                        dndData={provided.droppableProps}
                        dndRef={provided.innerRef}
                        returnList={addCard}
                        data={list}
                      >
                        {provided.placeholder}
                      </Demo>
                    )}
                  </Droppable>
                );
              })}
          </DragDropContext>

          <div className={`add-list ${addingList && "bg-light-grey"}`}>
            {addingList ? (
              <form className={`input-container`} onSubmit={addNewList}>
                <input
                  type="text"
                  ref={inputRef}
                  placeholder="Enter list title..."
                />
                <div className="flex align-items ">
                  <button type="submit">Add Card</button>
                  <span
                    className="times-icon flex items-center justify-center text-8"
                    onClick={() => setAddingList(false)}
                  >
                    <FaTimes />
                  </span>
                </div>
              </form>
            ) : (
              <div
                className="flex align-items text-white"
                onClick={() => setAddingList(true)}
              >
                <FaTimes className="rotate-45 mr-2" />
                <span>Add another list</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Kanban;
