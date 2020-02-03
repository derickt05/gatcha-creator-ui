import {Deserializable} from './deserializable.model';
const the_end_front_ui_data = {
	"frames": {
		"bronze_star.png": {
			"frame": {
				"x": 1,
				"y": 1,
				"w": 200,
				"h": 49
			},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {
				"x": 0,
				"y": 0,
				"w": 200,
				"h": 49
			},
			"sourceSize": {
				"w": 200,
				"h": 49
			}
		},
		"global_purity.png": {
			"frame": {
				"x": 1,
				"y": 52,
				"w": 122,
				"h": 122
			},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {
				"x": 0,
				"y": 0,
				"w": 122,
				"h": 122
			},
			"sourceSize": {
				"w": 122,
				"h": 122
			}
		},
		"gold_star.png": {
			"frame": {
				"x": 1,
				"y": 176,
				"w": 200,
				"h": 49
			},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {
				"x": 0,
				"y": 0,
				"w": 200,
				"h": 49
			},
			"sourceSize": {
				"w": 200,
				"h": 49
			}
		},
		"gradius.png": {
			"frame": {
				"x": 125,
				"y": 52,
				"w": 122,
				"h": 122
			},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {
				"x": 0,
				"y": 0,
				"w": 122,
				"h": 122
			},
			"sourceSize": {
				"w": 122,
				"h": 122
			}
		},
		"malheureux.png": {
			"frame": {
				"x": 249,
				"y": 1,
				"w": 122,
				"h": 122
			},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {
				"x": 0,
				"y": 0,
				"w": 122,
				"h": 122
			},
			"sourceSize": {
				"w": 122,
				"h": 122
			}
		},
		"silver_star.png": {
			"frame": {
				"x": 1,
				"y": 227,
				"w": 200,
				"h": 49
			},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {
				"x": 0,
				"y": 0,
				"w": 200,
				"h": 49
			},
			"sourceSize": {
				"w": 200,
				"h": 49
			}
		}
	},
	"meta": {
		"app": "http://www.codeandweb.com/texturepacker",
		"version": "1.0",
		"image": "spritesheet.png",
		"format": "RGBA8888",
		"size": {
			"w": 372,
			"h": 277
		},
		"scale": "1"
	}
} 

export class CanvasAsset implements Deserializable {
    public name: string;
    public type: 'image' | 'text';
    public render_layer: number;
    public url?: string;
    public dx: number;
    public dy: number;
    public sx?: number;
    public sy?: number;
    public sw?: number;
    public sh?: number;
    public packed?: boolean;
    public font?: string;
    public fill_style?: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    getFrame(name: string = ''): Object {
        let frame: Object;
        if (this.packed) {
            frame = the_end_front_ui_data['frames'][name]['frame'];
        } else {
            frame = {
                x: this.sx,
                y: this.sy,
                w: this.sw,
                h: this.sh
            }
        }
        return frame;
    }
}
