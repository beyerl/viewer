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

interface IImageListItemUrlFormat {
  srcFormat: string;
  altFormatSrcFormat: string;
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

  private static getAbsoluteStartDate(): Date{
    return new Date(2020, 10, 28)
  }

  private static getNamedUrls(): string[]{
    return [
      "https://img.zeit.de/administratives/kaenguru-comics/pilot-kaenguru/original__1124x400",
      "https://img.zeit.de/administratives/kaenguru-comics/pow-kaenguru/original__1124x400",
      "https://img.zeit.de/administratives/kaenguru-comics/der-baum-kaenguru/original__1124x400",
      "https://img.zeit.de/administratives/kaenguru-comics/warnung-kaenguru/original__1124x400"
    ]
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
    const absoluteStartDate = ImageList.getAbsoluteStartDate();
    const numberFormatStartDate = new Date(2020, 11, 3)
    const dateFormatStartDate = new Date(2021, 0, 19)
    const absoluteEndDate = new Date(Date.now());

    return [
      ...this.getItemsByUrlFormat(absoluteStartDate, numberFormatStartDate, ImageList.getNamedFormatUrlFormat, ImageList.getNamedFormatUrlFormat),
      ...this.getItemsByUrlFormat(numberFormatStartDate, dateFormatStartDate, ImageList.getNumberFormatWeekdayUrlFormat, ImageList.getNumberFormatSaturdayUrlFormat),
      ...this.getItemsByUrlFormat(dateFormatStartDate, absoluteEndDate, ImageList.getDateFormatWeekdayUrlFormat, ImageList.getDateFormatSaturdayUrlFormat)
    ]
  }
 
  private getItemsByUrlFormat(startDate: Date, endDate: Date, getWeekdayUrlFormat: (...args: any) => IImageListItemUrlFormat, getSaturdayUrlFormat: (...args: any) => IImageListItemUrlFormat): IImageListItem[] {
    const items = [];

    for (
      let currentDate = startDate;
      currentDate <= endDate;
      currentDate = this.addDays(currentDate, 1)
    ) {
      if (currentDate.getDay() === 0) {
        continue;
      } else if (currentDate.getDay() === 6) {
        items.push({
          date: currentDate.toLocaleDateString("de-DE"),
          src: getSaturdayUrlFormat(currentDate).srcFormat,
          // tslint:disable-next-line:object-literal-sort-keys
          altFormatSrc: getSaturdayUrlFormat(currentDate).altFormatSrcFormat
        });
      } else {
        items.push({
          date: currentDate.toLocaleDateString("de-DE"),
          src: getWeekdayUrlFormat(currentDate).srcFormat,
          // tslint:disable-next-line:object-literal-sort-keys
          altFormatSrc: getWeekdayUrlFormat(currentDate).altFormatSrcFormat,
        });
      }
    }

    return items;
  }

  private static getDateFormatWeekdayUrlFormat(currentDate: Date): IImageListItemUrlFormat {
    return {
      srcFormat: `https://img.zeit.de/administratives/kaenguru-comics/${currentDate.getFullYear()}-${currentDate.getMonth() + 1 <10 ? "0": ""}${currentDate.getMonth() + 1}/${currentDate.getDate()}/original__1104x400`, // 1104x400
      altFormatSrcFormat: `https://img.zeit.de/administratives/kaenguru-comics/${currentDate.getFullYear()}-${currentDate.getMonth() + 1 <10 ? "0": ""}${currentDate.getMonth() + 1}/0${currentDate.getDate()}/original__1104x400` // 1104x400
    }
  }

  private static getDateFormatSaturdayUrlFormat(currentDate: Date): IImageListItemUrlFormat {
    return {
      srcFormat: `https://img.zeit.de/administratives/kaenguru-comics/${currentDate.getFullYear()}-${currentDate.getMonth() + 1 <10 ? "0": ""}${currentDate.getMonth() + 1}/${currentDate.getDate()}/original__mobile`, // 1320x1000
      // tslint:disable-next-line:object-literal-sort-keys
      altFormatSrcFormat: `https://img.zeit.de/administratives/kaenguru-comics/${currentDate.getFullYear()}-${currentDate.getMonth() + 1 <10 ? "0": ""}${currentDate.getMonth() + 1}/0${currentDate.getDate()}/original__mobile`    }// 1320x1000 
  }

  private static getNumberFormatWeekdayUrlFormat(currentDate: Date): IImageListItemUrlFormat {
    const absoluteStartDate = ImageList.getAbsoluteStartDate();
    let issueNumber = Math.floor((currentDate.getTime() - absoluteStartDate.getTime()) / (1000*60*60*24))

    if(currentDate.getTime() > new Date(2020, 10, 11, 0, 0,0).getTime()){
      issueNumber -= 1
    }

    return {
      srcFormat: `https://img.zeit.de/administratives/kaenguru-comics/kaenguru-${ImageList.formatIssueNumber(issueNumber)}/original__mobile`, // 1120x400
      altFormatSrcFormat: ""
    }
  }

  private static getNumberFormatSaturdayUrlFormat(currentDate: Date): IImageListItemUrlFormat {
    const absoluteStartDate = ImageList.getAbsoluteStartDate();
    let issueNumber = Math.floor((currentDate.getTime() - absoluteStartDate.getTime()) / (1000*60*60*24))

    if(currentDate.getTime() > new Date(2020, 10, 11, 0, 0,0).getTime()){
      issueNumber -= 1
    }

    return {
      srcFormat: `https://img.zeit.de/administratives/kaenguru-comics/kaenguru-${ImageList.formatIssueNumber(issueNumber)}/original__1320x1000`, // mobile
      altFormatSrcFormat: ""
    }
  }

  private static formatIssueNumber(issueNumber: number): string{
    const issueString = issueNumber.toString()
    switch (issueString.length){
      case 1: {
        return `00${issueString}`
      }
      case 2: {
        return `0${issueString}`
      }
      case 3: {
        return issueString
      }
      default: {
        return ""
      }
    }
  }

  private static getNamedFormatUrlFormat(currentDate: Date): IImageListItemUrlFormat {
    const absoluteStartDate = ImageList.getAbsoluteStartDate();
    const issueNumber = Math.floor((currentDate.getTime() - absoluteStartDate.getTime()) / (1000*60*60*24))

    return {
      srcFormat: ImageList.getNamedUrls()[issueNumber],
      altFormatSrcFormat: ""
    }
  }
}
