import { CardTemplate } from './card-template.model';
const the_end_schema = {
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
        { "enum": ["bronze_star.png"], "description": "3-Star"},
        { "enum": ["silver_star.png"],  "description": "4-Star"},
        { "enum": ["gold_star.png"],  "description": "5-Star"}
      ]
    },
    "faction": {
      "type": "string",
      "description": "Faction",
      "widget": "select",
      "oneOf": [
        { "enum": ["gradius.png"], "description": "Gradius"},
        { "enum": ["malheureux.png"],  "description": "Malheureux"},
        { "enum": ["global_purity.png"],  "description": "Global Purity"}
      ]
    }
  }
}

import { CanvasAsset } from './canvas-asset.model';

export const TEMPLATES: CardTemplate[] = [{
      title: 'The End',
      aspect_ratio: 9/16,
      width: 540,
      height: 960,
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
      card_assets: [
        {
          name: 'background',
          type: "image",
          render_layer: 0,
          url: './assets/images/the-end/apoc_background.jpg',
          dx: 0,
          dy: 0,
          sx: 0,
          sy: 0,
          sw: 720,
          sh: 1280
        },
        {
          name: 'template',
          type: "image",
          render_layer: 2,
          url: './assets/images/the-end/gradius_template.png',
          dx: 0,
          dy: 0,
          sx: 0,
          sy: 0,
          sw: 720,
          sh: 1280
        },
        {
          name: 'render',
          type: "image",
          render_layer: 1,
          dx: 0,
          dy: 0,
          sx: 0,
          sy: 0,
          sw: 720,
          sh: 1280
        },
        {
          name: 'name',
          type: "text",
          font: "30px Helvetica",
          fill_style: "#FFFFFF",
          render_layer: 3,
          dx: 15,
          dy: 800
        },
        {
          name: 'title',
          type: "text",
          font: "italic bold 20px arial,serif",
          fill_style: "#FFFFFF",
          render_layer: 4,
          dx: 50,
          dy: 830
        },
        {
          name: 'rarity',
          type: "image",
          url: './assets/images/the-end/the-end-front-ui.png',
          dx: 390,
          dy: 785,
          packed: true,
          render_layer: 5
        },
        {
          name: 'faction',
          type: "image",
          url: './assets/images/the-end/the-end-front-ui.png',
          dx: 20,
          dy: 20,
          packed: true,
          render_layer: 6
        }
      ].map(raw_data => new CanvasAsset().deserialize(raw_data))
    }
]