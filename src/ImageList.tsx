// tslint:disable
import React, { Component } from "react";
import { render } from "react-dom";
import Image from "./Image";
import "./style.css";

interface IImageListItem {
  src: string;
  altFormatSrc: string;
  date: string;
}

// tslint:disable-next-line:no-empty-interface
interface IImageListProps {}
interface IImageListState {
  items: IImageListItem[];
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
      <Image src={item.src} altFormatSrc={item.altFormatSrc} date={item.date} />
    ));

    return <div className="w-100 d-flex flex-column">{imageList}</div>;
  }

  private addDays(currentDate: Date, days: number) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + days);
    return date;
  }

  private getItems(): IImageListItem[] {
    const startDate = new Date(2020, 10, 29);
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
          src: `https://img.zeit.de/administratives/kaenguru-comics/${currentDate.getFullYear()}-${currentDate.getMonth() + 1 <10 ? "0": ""}${currentDate.getMonth() + 1}/${currentDate.getDate()}/original__1320x1000`,
          // tslint:disable-next-line:object-literal-sort-keys
          altFormatSrc: `https://img.zeit.de/administratives/kaenguru-comics/${currentDate.getFullYear()}-${currentDate.getMonth() + 1 <10 ? "0": ""}${currentDate.getMonth() + 1}/0${currentDate.getDate()}/original__1320x1000`
        });
      } else {
        srcs.push({
          date: currentDate.toLocaleDateString("de-DE"),
          src: `https://img.zeit.de/administratives/kaenguru-comics/${currentDate.getFullYear()}-${currentDate.getMonth() + 1 <10 ? "0": ""}${currentDate.getMonth() + 1}/${currentDate.getDate()}/original__1104x400`,
          // tslint:disable-next-line:object-literal-sort-keys
          altFormatSrc: `https://img.zeit.de/administratives/kaenguru-comics/${currentDate.getFullYear()}-${currentDate.getMonth() + 1 <10 ? "0": ""}${currentDate.getMonth() + 1}/0${currentDate.getDate()}/original__1104x400`,
        });
      }
    }

    return srcs;
  }
}
