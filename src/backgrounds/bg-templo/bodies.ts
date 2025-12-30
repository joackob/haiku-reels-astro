import { createCircle, createRectangle, createTrapezoid } from "@utils/matterjs/bodies";
import type { ICanvasBounds } from "@utils/matterjs/canvas";

import { quinacridoneMagentaColor, brightPinkCrayolaColor } from "@utils/matterjs/colors";
import Matter, { Body } from "matter-js";

interface ITemple {
	x: number;
	y: number;
	bounds: ICanvasBounds;
}

const createTemple = ({ x, y, bounds }: ITemple): Matter.Body => {
	const HEIGHT_FLOOR = 0.2 * Math.min(bounds.width, bounds.height);

	return Body.create({
		parts: [
			createRectangle({
				x,
				y,
				width: bounds.width,
				height: HEIGHT_FLOOR,
				fillColor: quinacridoneMagentaColor,
			}),
			createTrapezoid({
				x,
				y: y - HEIGHT_FLOOR,
				width: 1.5 * bounds.width,
				height: 0.25 * bounds.width,
				slope: 0.5,
				fillColor: brightPinkCrayolaColor,
			}),
			createRectangle({
				x,
				y: y - 2 * HEIGHT_FLOOR,
				width: 0.5 * bounds.width,
				height: HEIGHT_FLOOR,
				fillColor: quinacridoneMagentaColor,
			}),
			createTrapezoid({
				x,
				y: y - 3 * HEIGHT_FLOOR,
				width: 1 * bounds.width,
				height: 0.25 * bounds.width,
				slope: 0.5,
				fillColor: brightPinkCrayolaColor,
			}),
			createRectangle({
				x,
				y: y - 4 * HEIGHT_FLOOR,
				width: 0.25 * bounds.width,
				height: HEIGHT_FLOOR,
				fillColor: quinacridoneMagentaColor,
			}),
			createTrapezoid({
				x,
				y: y - 4.9 * HEIGHT_FLOOR,
				width: 0.5 * bounds.width,
				height: 0.25 * bounds.width,
				slope: 1,
				fillColor: brightPinkCrayolaColor,
			}),
		],
	});
};

export const createBodies = (canvas: HTMLCanvasElement): Matter.Body[] => {
	const caja = canvas.getBoundingClientRect();
	const bounds = {
		width: Math.floor(caja.width),
		height: Math.floor(caja.height),
	};
	console.log(bounds);
	const IN_MOBILE_FORMAT = bounds.width <= 430;
	const DELTA_X = IN_MOBILE_FORMAT ? bounds.width * 1.75 : bounds.width * 1.3;

	const temple = createTemple({
		x: DELTA_X,
		y: bounds.height * 0.75,
		bounds: {
			height: bounds.height,
			width: IN_MOBILE_FORMAT ? bounds.width : bounds.width * 0.33,
		},
	});

	const sun = createCircle({
		x: IN_MOBILE_FORMAT ? DELTA_X + bounds.width : DELTA_X + bounds.width * 0.3,
		y: IN_MOBILE_FORMAT ? 0 : -0.5 * bounds.height,
		radio: 0.2 * Math.min(bounds.width, bounds.height),
		fillColor: brightPinkCrayolaColor,
	});

	return [sun, temple];
};
