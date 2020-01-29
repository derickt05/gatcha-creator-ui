import { Injectable } from '@angular/core';

// Read these from local JSON for now, but this should be store as part
// of an eventual template object with this json stored and fetched remote.
// "resolveJsonModule": true in tsconfig.json due to this method.
import the_end_schema from '../assets/template-schema/the-end-schema-form.json';

@Injectable({
  providedIn: 'root'
})
export class GatchaTemplateService {
  constructor() { }

  // Mocked until templates are stored in database or file.
  returnTemplates() {
    console.log(the_end_schema);
    return {
      /* 
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
              "description": "Name"
            },
            "title": {
              "type": "string",
              "description": "Title"
            },
            "rarity": {
              "type": "string",
              "description": "Rarity",
              "widget": "select",
              "oneOf": [
                { "enum": ["three_star"], "description": "3-Star",},
                { "enum": ["four_star"],  "description": "4-Star",},
                { "enum": ["five_star"],  "description": "5-Star"}
              ]
            }
          }
        },
        model: {
          "name": "Veiled Figure",
          "title": "The Chosen Hero",
          "rarity": "four_star"
        }
      },
      */
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
        /* Fetch the schema from .json for now. */
        schema: the_end_schema,
        /* Need fetch model method that resolves to a default */
        model: {
          "name": "Veiled Figure",
          "title": "The Chosen Hero",
          "rarity": "three_star"
        },
        /* Match the key of the schema */
        resources: {
          name: {
            type: "text",
            asset: {
              font: "30px Helvetica",
              fill_style: "#FFFFFF"
              /* And more... apply to ctx */
            },
            render_coordinates: [15, 800]
          },
          title: {
            type: "text",
            asset: {
              font: "italic bold 20px arial,serif",
              fill_style: "#FFFFFF"
            /* And more... apply to ctx */
            },
            render_coordinates: [50, 830]
          },
          rarity: {
            type: "image",
            asset: {
              uri: './assets/images/bronze_star.png',
              packer: [0, 0, 50, 50]
            },
            render_coordinates: [50, 830, 50, 50]
          }
        }
      }
    }
  }
}
