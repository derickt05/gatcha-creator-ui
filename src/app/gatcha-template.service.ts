import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GatchaTemplateService {
  constructor() { }

  // Mocked until templates are stored in database or file.
  returnTemplates() {
    return {
      live: {
        title: 'Live!',
        template_url: './assets/images/ur_blue_template.png',
        background_url: './assets/images/gatcha_background.jpg',
        aspect_ratio: ".71 / 1",
        width: "512",
        height: "720"
      },
      heroes: {
        title: 'Heroes',
        template_url: './assets/images/feh_template.png',
        background_url: './assets/images/feh_background.png',
        aspect_ratio: "9 / 16",
        width: "540",
        height: "960"
      },
      the_end: {
        title: 'The End',
        template_url: './assets/images/gradius_template.png',
        background_url: './assets/images/apoc_background.jpg',
        aspect_ratio: "9 / 16",
        width: "720",
        height: "1280"
      }
    }
  }
}
