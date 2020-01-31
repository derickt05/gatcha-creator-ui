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
  // Ratio of canvas render size to
  canvasScale: number;

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
      this.triggerRender();
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
    this.sources = {};
    for (let [resource_key, resource] of Object.entries(this.currentTemplate['resources'])) {
      this.sources[resource_key] = resource;
    }
    if (this.croppedImage !== '' && this.sources['render']) {
      this.sources['render']['asset']['uri'] = this.croppedImage;
    }
  }

  loadImages(callback: Function) {
    this.images = {};
    var loadedSources = 0;
    var numSources = Object.keys(this.sources).length;
    for (let [resource_key, resource] of Object.entries(this.sources)) {
      if (resource['type'] == 'image' && resource['asset']['uri']) {
        this.images[resource_key] = new Image();
        this.images[resource_key].onload = () => {
          if(++loadedSources >= numSources) {
            callback();
          }
        }
        this.images[resource_key].src = resource['asset']['uri'];
      } else {
        if (++loadedSources >= numSources) {
          callback();
        }
      }
    };
  }

  drawCanvas () {
    var orderedSources = Object.entries(this.sources).sort((a, b) => a[1]['order'] - b[1]['order']);
    for (let [resource_key, resource] of orderedSources) {
      if (resource['type'] == 'image' && resource['asset']['uri']) {
        // TODO: Pass this the model's resource_key looked up.
        this.drawImageResource(this.images[resource_key], resource, resource_key);
      } else {
        this.ctx.font = resource['asset']['font'];
        this.ctx.fillStyle = resource['asset']['fill_style'];
        this.ctx.fillText(this.currentTemplate['model'][resource_key], resource['render_coordinates'][0], resource['render_coordinates'][1]);
      }
    }
  }

  drawImageResource(image, resource, resource_key, scale = 1) {
    var dx = resource['render_coordinates'][0];
    var dy = resource['render_coordinates'][1];
    var sx, sy, sWidth, sHeight, dWidth, dHeight;
    if (resource['asset']['asset_coordinates']) {
      // TODO: Refactor coords into the if and the rest out.
      var coords = resource['asset']['asset_coordinates'];
      sx = coords['sx'];
      sy = coords['sy'];
      sWidth = coords['sWidth'];
      sHeight = coords['sHeight'];
    } else if (resource['asset']['asset_pack']) {
      var coords = resource['asset']['asset_pack']['coordinate_json'];
      // TODO: Uuuuh what if the model doesn't have a default? Need to enforce this or fail gracefully.
      var entity_name = this.currentTemplate['model'][resource_key];
      sx = coords['frames'][entity_name]['frame']['x'];
      sy = coords['frames'][entity_name]['frame']['y'];
      sWidth = coords['frames'][entity_name]['frame']['w'];
      sHeight = coords['frames'][entity_name]['frame']['h'];
    }
    dWidth = sWidth * this.canvasScale;
    dHeight = sHeight * this.canvasScale;
    this.ctx.drawImage(image, sx, sy, sWidth, sHeight, dy, dx, dWidth, dHeight);
  }

  triggerRender() {
    console.log('triggered');
    this.loadSources();
    this.loadImages(() => this.drawCanvas());
  }

  downloadImage() {
    alert('I removed html2canvas');
  }

  changeTemplate(key) {
    this.currentTemplate = this.availableTemplates[key];
    this.triggerRender();
  }

  // Constructors/Initializers
  constructor(private _gatchaTemplateService: GatchaTemplateService) { }

  ngOnInit() {
    this.availableTemplates = this._gatchaTemplateService.returnTemplates();
    this.currentTemplate = this.availableTemplates['the_end'];
    // TODO: Hard coded for The End template for now.
    // Create a method to compute difference of background to canvas size.
    this.canvasScale = .75;
  }

  ngAfterViewInit() {
    this.ctx = this.heroCanvas.nativeElement.getContext('2d');
    // Load the canvas with the foreground and background even without an uploaded image.
    this.triggerRender();
  }
}
