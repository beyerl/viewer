import React from "react";

export default ({ src, date }: {
  src: string,
  date: string,
}) => (
  <div>
    <div>{date}</div>
    <img src={src} />
  </div>
);
