import React from "react";
import classNames from "classnames";

import axios from "axios";

import { Badge } from "../dotAllImport";
import "./List.scss";

import removeSvg from "../../assets/img/remove.svg";

const List = ({
  items,
  isRemovable,
  onClick,
  onRemove,
  onClickItem,
  activeItem,
}) => {
  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      axios.delete(`http://localhost:3001/lists/${item.id}`).then(() => {
        onRemove(item.id);
      });
    }
  };
  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          onClick={onClickItem ? () => onClickItem(item) : null}
          key={index}
          className={classNames(item.className, {
            active: item.active
              ? item.active
              : activeItem && activeItem.id === item.id,
          })}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>
            {item.name}
            {item.tasks && ` (${item.tasks.length})`}
          </span>

          {isRemovable && (
            <img
              onClick={() => removeList(item)}
              className="list__remove-icon"
              src={removeSvg}
              alt="remove"
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
