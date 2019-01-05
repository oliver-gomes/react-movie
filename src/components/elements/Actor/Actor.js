import React from "react";
import { IMAGE_BASE_URL } from "../../../config";
import "./Actor.css";

const Actor = props => {
  const POSTER_SIZE = "w154";
  return (
    <div className="rmdb-actor">
      <img
        src={
          props.actor.profile_path
            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${props.actor.profile_path}`
            : "./images/no_image.jpg"
        }
        alt="actorthumb"
      />
      <span className="rmdb-actor-name">{props.actor.name}</span>
      <span className="rmdb-actor-character">{props.actor.character}</span>
    </div>
  );
};

export default Actor;
