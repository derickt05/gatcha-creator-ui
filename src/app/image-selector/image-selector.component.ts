import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { GatchaTemplateService } from '../gatcha-template.service';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss']
})
export class ImageSelectorComponent implements OnInit {

  // Custom Properties
  availableTemplates: any;
  currentTemplate: Object;
  sources: any;
  images: any;
  ctx: CanvasRenderingContext2D;

  // Custom ViewChildren
  @ViewChild('heroCanvas', {static: false}) heroCanvas: ElementRef;

  // ngx-image-cropper properties
  imageChangedEvent: any = '';
  croppedImage: any = '';
  
  // ngx-image-cropper hooks
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;

      this.loadSources();
      this.loadImages(() => this.drawCanvas());
  }

  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  loadSources() {
    this.sources = [];
    this.sources.push(this.currentTemplate['background_url']);
    if (this.croppedImage !== '') {
      this.sources.push(this.croppedImage);
    }
    this.sources.push(this.currentTemplate['template_url']);
  }

  loadImages(callback: Function) {
    this.images = [];
    var loadedImages = 0;
    var numImages = this.sources.length;
    var currentImage = 0;
    this.sources.forEach(source => {
      this.images[currentImage] = new Image();
      this.images[currentImage].onload = () => {
        if(++loadedImages >= numImages) {
          callback();
        }
      }
      this.images[currentImage].src = source;
      currentImage++;
    });
  }

  drawCanvas () {
    this.images.forEach(image => {
      this.ctx.drawImage(image, 0, 0, this.currentTemplate['width'], this.currentTemplate['height'])
    });
  }

  downloadImage() {
    alert('I removed html2canvas');
  }

  changeTemplate(key) {
    this.currentTemplate = this.availableTemplates[key];
    this.loadSources();
    this.loadImages(() => this.drawCanvas());
  }

  // Constructors/Initializers
  constructor(private _gatchaTemplateService: GatchaTemplateService) { }

  ngOnInit() {
    this.availableTemplates = this._gatchaTemplateService.returnTemplates();
    this.currentTemplate = this.availableTemplates['the_end'];
  }

  ngAfterViewInit() {
    this.ctx = this.heroCanvas.nativeElement.getContext('2d');
    // Load the canvas with the foreground and background even without an uploaded image.
    this.loadSources();
    this.loadImages(() => this.drawCanvas());
  }

  getRatio() {
    return "9/16";
  }

  getWidth() {
    return "720";
  }

}
