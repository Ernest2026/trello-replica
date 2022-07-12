import React, { useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaEllipsisH, FaTimes } from "react-icons/fa";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 13);

const List = ({ style, dndData, dndRef, data, children, returnList }) => {
  const [addingCard, setAddingCard] = useState(false);

  const inputRef = useRef();

  const addNewCard = (e) => {
    e.preventDefault();
    returnList({
      parentId: data.id,
      data: {
        id: nanoid(),
        message: inputRef.current.value,
      },
    });
    setAddingCard(false);
    inputRef.current.value = "";
  };

  return (
    <div style={style} {...dndData} ref={dndRef} className="list">
      <div className="list-title">
        <h2>{data && data.title}</h2>
        <FaEllipsisH className="text-8" />
      </div>
      <div className="list-tasks">
        {data.tasks.map((card, index) => {
          return (
            <Draggable key={card.id} draggableId={card.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="list-task"
                >
                  {card.label && card.label.color && (
                    <div
                      className="label"
                      style={{ backgroundColor: `${card.label.color}` }}
                    ></div>
                  )}
                  <h3>{card.message}</h3>
                </div>
              )}
            </Draggable>
          );
        })}
      </div>
      {children}
      <div>
        <form className={`input-container ${!addingCard && "none"}`}>
          <input
            type="text"
            focus="true"
            ref={inputRef}
            placeholder="Enter a title for this card"
          />
          <div className="flex align-items ">
            <button type="submit" onClick={addNewCard}>
              Add Card
            </button>
            <span
              className="times-icon flex items-center justify-center text-8"
              onClick={() => setAddingCard(false)}
            >
              <FaTimes />
            </span>
          </div>
        </form>
        <div
          className={`add-card items-center none ${
            addingCard ? "none" : "flex"
          }`}
          onClick={() => setAddingCard(true)}
        >
          <FaTimes className="text-8 rotate-45" />
          <span>Add a card</span>
        </div>
      </div>
    </div>
  );
};

export default List;
