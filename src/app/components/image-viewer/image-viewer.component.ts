import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
  standalone: false
})
export class ImageViewerComponent implements OnInit {
  @ViewChild('imageContainer') imageContainer !: ElementRef;

  @Input() set images(image: string[]) {
    this.imageList = image
  }

  // TRANSFORM POINTS
  scale = 1
  rotate = 0
  rotateLeft = 360
  pointX = 0
  pointY = 0
  start = {x: 0, y: 0}
  panning = false

  currentIndex = 0;
  imageList: string[] = []

  constructor() {
  }

  ngOnInit(): void {
  }

  public next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.imageList.length;
    this.reset()
  }

  public prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.imageList.length) % this.imageList.length;
    this.reset()
  }

  // RESET STYLED AFTER NEXT OR PREV ACTION
  private reset(): void {
    this.scale = 1
    this.rotate = 1
    this.rotateLeft = 360
    this.pointX = 0
    this.pointY = 0
    this.start = {x: 0, y: 0}
  }

  // SET FULL SCREEN IMAGE
  public full(): void {
    if (!document.fullscreenElement) {
      const image = this.imageContainer.nativeElement.querySelector('.slider-image.active');
      image.requestFullscreen()
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  // ZOOM BASED ON MOUSE
  public zoom(event: WheelEvent) {
    event.preventDefault();
    const xs = (event.clientX - this.pointX) / this.scale;
    const ys = (event.clientY - this.pointY) / this.scale;
    const delta = (event.deltaY ? event.deltaY : -event.deltaY);
    (delta > 0) ? (this.scale *= 1.2) : (this.scale /= 1.2);

    this.setTransform();
  }

  // ZOOM IN BASED ON BUTTON
  public zoomIn(): void {
    this.scale += 0.2;
    this.setTransform();
  }

  // ZOOM OUT BASED ON BUTTON
  public zoomOut(): void {
    this.scale -= 0.2;
    this.setTransform();
  }

  // ROTATE RIGHT TO LEFT
  public rotateRTL(): void {
    this.rotate = this.rotate + 10;
    this.setTransform();
  }

  // ROTATE LEFT TO RIGHT
  public rotateLTR(): void {
    console.log(this.rotate)
    this.rotate = this.rotate - 10;
    this.setTransform();
  }

  // ROTATE RIGHT TO LEFT WITH 90 DEG
  public rotate90RTL(): void {
    if (this.rotate % 90 !== 0) {
      this.rotate = Math.ceil(this.rotate / 90) * 90;

    } else {
      this.rotate = this.rotate + 90;
    }
    this.setTransform();
  }

  // ROTATE LEFT TO RIGHT WITH 90 DEG
  public rotate90LTR(): void {
    if (this.rotate % 90 !== 0) {
      this.rotate = Math.ceil(this.rotate / -90) * -90;
    } else {
      this.rotate = this.rotate - 90;
    }
    this.setTransform();
  }

  // FOR MOVING IMAGE
  public mouseDown(event: MouseEvent): void {
    const test = document.getElementsByClassName('slider-image')
    event.preventDefault();
    this.start = {x: event.clientX - this.pointX, y: event.clientY - this.pointY};
    this.panning = true;
  }

  public mouseMove(event: MouseEvent): void {

    event.preventDefault();
    if (!this.panning) {
      return;
    }
    this.pointX = (event.clientX - this.start.x);
    this.pointY = (event.clientY - this.start.y);
    this.setTransform();
  }

  public setTransform(): void {
    const image = this.imageContainer.nativeElement.querySelector('.slider-image.active');
    image.style.transform = 'translate(' + this.pointX + 'px, ' + this.pointY + 'px) scale(' + this.scale + ')  rotate(' + this.rotate + 'deg)';
  }

  setCurrentIndex(index: number): void {
    this.currentIndex = index;
  }
}
