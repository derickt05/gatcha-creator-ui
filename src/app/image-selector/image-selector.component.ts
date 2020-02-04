import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { GatchaTemplateService } from '../gatcha-template.service';
import { CardTemplate } from '../models/card-template.model';
import { CanvasAsset } from '../models/canvas-asset.model';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss']
})
export class ImageSelectorComponent implements OnInit {

  // Custom Properties
  availableTemplates: CardTemplate[];
  currentTemplate: CardTemplate;
  currentModel: object;
  sources: Map<string, CanvasAsset>;
  images: Map<string, HTMLImageElement>;
  ctx: CanvasRenderingContext2D;
  // What to scale assets to.
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
    this.currentTemplate.card_assets.forEach(canvas_asset =>
      this.sources[canvas_asset.name] = canvas_asset);
    if (this.croppedImage !== '' && this.sources['render']) {
      this.sources['render'].url = this.croppedImage;
    }
  }

  loadImages(callback: Function) {
    var loadedSources = 0;
    var numSources = Object.keys(this.sources).length;
    for (let [resource_key, resource] of Object.entries(this.sources)) {
      if (resource['type'] == 'image' && resource['url']) {
        this.images[resource_key] = new Image();
        this.images[resource_key].onload = () => {
          if(++loadedSources >= numSources) {
            callback();
          }
        }
        this.images[resource_key].src = resource['url'];
      } else {
        if (++loadedSources >= numSources) {
          callback();
        }
      }
    };
  }

  drawCanvas () {
    var orderedSources = Object.entries(this.sources).sort((a, b) => a[1]['render_layer'] - b[1]['render_layer']);
    for (let [resource_key, resource] of orderedSources) {
      if (resource['type'] == 'image' && resource['url']) {
        // TODO: Pass this the model's resource_key looked up.
        this.drawImageResource(this.images[resource_key], resource, resource_key);
      } else {
        this.ctx.font = resource['font'];
        this.ctx.fillStyle = resource['fill_style'];
        this.ctx.fillText(this.currentModel[resource_key], resource['dx'], resource['dy']);
      }
    }
  }

  drawImageResource(image: HTMLImageElement, resource: CanvasAsset, resource_key: string) {
    let source_coords: Object;
    if (!resource.packed) {
      source_coords = resource.getFrame();
    } else if (resource.packed) {
      // TODO: Uuuuh what if the model doesn't have a default? Need to enforce this or fail gracefully.
      let entity_name = this.currentModel[resource_key];
      source_coords = resource.getFrame(entity_name);
    }
    this.ctx.drawImage(image, source_coords['x'], source_coords['y'], source_coords['w'], source_coords['h'],
      resource.dx, resource.dy,
      source_coords['w'] * this.canvasScale, source_coords['h'] * this.canvasScale);
  }

  triggerRender() {
    this.loadSources();
    this.loadImages(() => this.drawCanvas());
  }

  changeTemplate(key: string) {
    this.currentTemplate = this.availableTemplates[key];
    this.triggerRender();
  }

  // Constructors/Initializers
  constructor(private _gatchaTemplateService: GatchaTemplateService) { }

  ngOnInit() {
    this.availableTemplates = this._gatchaTemplateService.returnTemplates();
    this.currentTemplate = this.availableTemplates[0];
    this.sources = new Map<string, CanvasAsset>();
    this.images = new Map<string, HTMLImageElement>();
    this.currentModel = {};
    // TODO: Formulate a 'loadModel' --> Lookup --> loadDefaults()
    let defaults =
      Object.entries(this.currentTemplate.schema.properties)
        .reduce((def, pair) => {
          def[pair[0]] = pair[1];
          return def;
        }, {});
    Object.assign(this.currentModel, defaults);
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
