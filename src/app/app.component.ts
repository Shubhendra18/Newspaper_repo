import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'newspaper';
  newsdate: any = "";
  myThumbnail = "";
  pageNumber = 1;
  latest_date: any = "";

  // Unblur / sharpening level
  unblurLevel: 'off' | 'sharp' | 'ultra' = 'off';

  constructor(public datepipe: DatePipe, private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    // Default to yesterday's date to ensure it is published
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yyyy = yesterday.getFullYear();
    const mm = String(yesterday.getMonth() + 1).padStart(2, '0');
    const dd = String(yesterday.getDate()).padStart(2, '0');
    this.newsdate = `${yyyy}-${mm}-${dd}`;
    this.postData(this.newsdate);
  }

  postData(newsdate: any) {
    this.latest_date = this.datepipe.transform(newsdate, 'ddMMyyyy');
    this.myThumbnail = "https://image.mepaper.navbharattimes.com/epaperimages//" + this.latest_date + "/" + this.latest_date + "-md-de-" + this.pageNumber + ".jpg";
  }

  Next() {
    this.pageNumber++;
    this.myThumbnail = "https://image.mepaper.navbharattimes.com/epaperimages//" + this.latest_date + "/" + this.latest_date + "-md-de-" + this.pageNumber + ".jpg";
  }

  Prev() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.myThumbnail = "https://image.mepaper.navbharattimes.com/epaperimages//" + this.latest_date + "/" + this.latest_date + "-md-de-" + this.pageNumber + ".jpg";
    }
  }

  cycleUnblur() {
    if (this.unblurLevel === 'off') {
      this.unblurLevel = 'sharp';
    } else if (this.unblurLevel === 'sharp') {
      this.unblurLevel = 'ultra';
    } else {
      this.unblurLevel = 'off';
    }
  }

  // Tap left half for Prev page, right half for Next page
  onImageClick(event: MouseEvent) {
    const imageElement = event.target as HTMLImageElement;
    const clickX = event.offsetX;
    const width = imageElement.offsetWidth;
    if (clickX < width / 2) {
      this.Prev();
    } else {
      this.Next();
    }
  }
}