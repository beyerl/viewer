import React, { Component } from "react";
import { render } from "react-dom";
import Image from "./Image";
import "./style.css";

// tslint:disable-next-line:no-empty-interface
interface IImageListProps {}
interface IImageListState {
  items: Array<{
    src: string;
    date: string;
  }>;
}

export default class ImageList extends Component<
  IImageListProps,
  IImageListState
> {
  constructor(props: IImageListProps) {
    super(props);
    this.state = {
      items: this.getItems(),
    };
  }

  public render() {
    const imageList = this.state.items.map((item) => (
      <Image src={item.src} date={item.date} />
    ));

    return <div className="w-100 d-flex flex-column">{imageList}</div>;
  }

  private addDays(currentDate: Date, days: number) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + days);
    return date;
  }

  private getItems(): Array<{
    src: string;
    date: string;
  }> {
    // const startDate = new Date(2020, 10, 29);
    const startDate = new Date(2021, 10, 1);
    const endDate = new Date(Date.now());

    const srcs = [];

    for (
      let currentDate = startDate;
      currentDate <= endDate;
      currentDate = this.addDays(currentDate, 1)
    ) {
      if (currentDate.getDay() === 0) {
        continue;
      } else if (currentDate.getDay() === 6) {
        srcs.push({
          date: currentDate.toLocaleDateString("de-DE"),
          src: `https://img.zeit.de/administratives/kaenguru-comics/${currentDate.getFullYear()}-${
            currentDate.getMonth() + 1
          }/${currentDate.getDate()}/original__1320x1000`,
        });
      } else {
        srcs.push({
          date: currentDate.toLocaleDateString("de-DE"),
          src: `https://img.zeit.de/administratives/kaenguru-comics/${currentDate.getFullYear()}-${
            currentDate.getMonth() + 1
          }/${currentDate.getDate()}/original__1104x400`,
        });
      }
    }

    srcs.reverse();

    return srcs;
  }
}
