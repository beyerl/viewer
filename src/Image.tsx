import React from "react";

export default ({ src, altFormatSrc, date }: {
  src: string,
  altFormatSrc: string,
  date: string,
}) => (
  <div>
    <div>{date}</div>
    <img src={src} />
    <img src={altFormatSrc} />
  </div>
);
