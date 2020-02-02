import { Injectable } from '@angular/core';

// Read these from local JSON for now, but this should be store as part
// of an eventual template object with this json stored and fetched remote.
// "resolveJsonModule": true in tsconfig.json due to this method.
// TODO: HttpClient to read these (or comes from backend service)
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
        /* 
        TODO: It should be an HttpClient service.
        Fetch the schema from .json for now.
        */
        schema: the_end_schema,
        /* 
        TODO: Need fetchModel method that resolves to a default with certainty.
        Could do this by inspecting the resource's loaded JSON and selecting 'first'.
        */
        model: {
          "name": "Veiled Figure",
          "title": "The Chosen Hero",
          "rarity": "silver_star.png",
          "faction": "malheureux.png"
        },
        /* Match the key of the schema */
        resources: {
          background: {
            type: "image",
            asset: {
              uri: './assets/images/the-end/apoc_background.jpg',
              asset_coordinates: {
                x: 0,
                y: 0,
                w: 720,
                h: 1280
              }
            },
            render_coordinates: {
              x: 0,
              y: 0
            },
            order: 0
          },
          template: {
            type: "image",
            asset: {
              uri: './assets/images/the-end/gradius_template.png',
              asset_coordinates: {
                x: 0,
                y: 0,
                w: 720,
                h: 1280
              }
            },
            render_coordinates: {
              x: 0,
              y: 0
            },
            order: 2
          },
          render: {
            type: "image",
            asset: {
              asset_coordinates: {
                x: 0,
                y: 0,
                w: 720,
                h: 1280
              }
            },
            render_coordinates: {
              x: 0,
              y: 0
            },
            order: 1
          },
          name: {
            type: "text",
            asset: {
              font: "30px Helvetica",
              fill_style: "#FFFFFF"
              /* And more... apply to ctx */
            },
            render_coordinates: {
              x: 15,
              y: 800
            },
            order: 3
          },
          title: {
            type: "text",
            asset: {
              font: "italic bold 20px arial,serif",
              fill_style: "#FFFFFF"
            },
            render_coordinates: {
              x: 50,
              y: 830
            },
            order: 4
          },
          rarity: {
            type: "image",
            asset: {
              uri: './assets/images/the-end/the-end-front-ui.png',
              asset_pack: {
                coordinate_json: the_end_front_ui,
              }
            },
            render_coordinates: {
              x: 390,
              y: 785
            },
            order: 5
          },
          faction: {
            type: "image",
            asset: {
              uri: './assets/images/the-end/the-end-front-ui.png',
              asset_pack: {
                coordinate_json: the_end_front_ui,
              }
            },
            render_coordinates: {
              x: 20,
              y: 20
            },
            order: 6
          }
        }
      }
    }
  }
}
