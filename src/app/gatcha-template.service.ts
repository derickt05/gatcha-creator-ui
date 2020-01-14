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
        background_url: 'url("./assets/images/gatcha_background_2.jpg")',
        aspect_ratio: ".71 / 1",
        width: "512"
      },
      heroes: {
        title: 'Heroes',
        template_url: './assets/images/ur_blue_template.png',
        background_url: 'url("./assets/images/gatcha_background_2.jpg")',
        aspect_ratio: ".71 / 1",
        width: "512"
      }
    }
  }
}
