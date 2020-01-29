import { Injectable } from '@angular/core';

// Read these from local JSON for now, but this should be store as part
// of an eventual template object with this json stored and fetched remote.
// "resolveJsonModule": true in tsconfig.json due to this method.
import the_end_schema from '../assets/template-schema/the-end-schema-form.json';
import the_end_front_ui from '../assets/images/the-end/the-end-front-ui.json';

@Injectable({
  providedIn: 'root'
})
export class GatchaTemplateService {
  constructor() { }

  // Mocked until templates are stored in database or file.
  returnTemplates() {
    return {
      the_end: {
        title: 'The End',
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
          background: {
            type: "image",
            asset: {
              uri: './assets/images/the-end/apoc_background.jpg',
              asset_coordinates: [0, 0, 540, 960]
            },
            render_coordinates: [0, 0],
            order: 0
          },
          template: {
            type: "image",
            asset: {
              uri: './assets/images/the-end/gradius_template.png',
              asset_coordinates: [0, 0, 540, 960]
            },
            render_coordinates: [0, 0],
            order: 2
          },
          render: {
            type: "image",
            asset: {
              asset_coordinates: [0, 0, 540, 960]
            },
            render_coordinates: [0, 0],
            order: 1
          },
          name: {
            type: "text",
            asset: {
              font: "30px Helvetica",
              fill_style: "#FFFFFF"
              /* And more... apply to ctx */
            },
            render_coordinates: [15, 800],
            order: 3
          },
          title: {
            type: "text",
            asset: {
              font: "italic bold 20px arial,serif",
              fill_style: "#FFFFFF"
            },
            render_coordinates: [50, 830],
            order: 4
          },
          rarity: {
            type: "image",
            asset: {
              uri: './assets/images/the-end/gold_star.png',
              /* Resize all templates for now, then implement scaling */
              asset_coordinates: [0, 0, (200 * (3/4)) , (49 * (3/4))]
            },
            render_coordinates: [390, 785],
            order: 5
          }
        }
      }
    }
  }
}
