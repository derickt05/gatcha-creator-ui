import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GatchaTemplateService {
  constructor() { }

  // Mocked until templates are stored in database or file.
  returnTemplates() {
    return {
      heroes: {
        title: 'Heroes',
        template_url: './assets/images/feh_template.png',
        background_url: './assets/images/feh_background.png',
        aspect_ratio: "9 / 16",
        width: "540",
        height: "960",
        schema: {
          "properties": {
            "name": {
              "type": "string",
              "description": "Name",
              "default": "Veiled Figure"
            },
            "title": {
              "type": "string",
              "description": "Title",
              "default": "The Chosen Hero",
            },
            "rarity": {
              "type": "string",
              "description": "Rarity",
              "widget": "select",
              "oneOf": [
                {
                  "description": "4-Star",
                  "enum": [
                    "four_star"
                  ]
                },
                {
                  "description": "5-Star",
                  "enum": [
                    "five_star"
                  ]
                }
              ],
              "default": "four_star"
            }
          }
        },
        model: {}
      },
      /*
      live: {
        title: 'Live!',
        template_url: './assets/images/ur_blue_template.png',
        background_url: './assets/images/gatcha_background.jpg',
        aspect_ratio: ".71 / 1",
        width: "540",
        height: "758"
      },
      */
      the_end: {
        title: 'The End',
        template_url: './assets/images/gradius_template.png',
        background_url: './assets/images/apoc_background.jpg',
        aspect_ratio: "9 / 16",
        width: "540",
        height: "960",
        schema: {
          "properties": {
            "name": {
              "type": "string",
              "description": "Name",
              "default": "Veiled Figure"
            },
            "title": {
              "type": "string",
              "description": "Title",
              "default": "The Chosen Hero",
            },
            "rarity": {
              "type": "string",
              "description": "Rarity",
              "widget": "select",
              "oneOf": [
                {
                  "description": "4-Star",
                  "enum": [
                    "four_star"
                  ]
                },
                {
                  "description": "5-Star",
                  "enum": [
                    "five_star"
                  ]
                }
              ],
              "default": "four_star"
            }
          }
        },
        model: {}
      }
    }
  }
}
