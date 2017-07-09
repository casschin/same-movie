import "../../stylesheets/components/person.css";

import React from "react";
import FontAwesome from "react-fontawesome";
import classNames from "classnames";

const action = type => {
  switch (type) {
    case "add":
      return (
        <span className="Person-action Person-add">
          <FontAwesome name="plus" />
        </span>
      );
    case "remove":
      return (
        <span className="Person-action Person-remove">
          <FontAwesome name="times" />
        </span>
      );
    default:
      return null;
  }
};

const Person = ({ name, image, handleClick }) => {
  return (
    <div
      className={classNames("Person", {
        "Person--inactive": handleClick.type === "add"
      })}
      onClick={handleClick.action}
    >
      {image
        ? <img src={image} alt="" className="Person-image" />
        : <FontAwesome name="user" className="Person-image" />}
      <h4 className="Person-name">
        {name}
      </h4>
      {handleClick && action(handleClick.type)}
    </div>
  );
};

export default Person;
