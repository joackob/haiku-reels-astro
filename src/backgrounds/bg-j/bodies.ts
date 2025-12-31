import { crearUnCirculo, crearUnRectangulo } from "@utils/matterjs/bodies";
import type { ICanvasBounds } from "@utils/matterjs/canvas";

import {
	quinacridoneMagentaColor,
	brightPinkCrayolaColor,
	atomicTangerineColor,
} from "@utils/matterjs/colors";

export const createBodies = (bounds: ICanvasBounds): Matter.Body[] => {
	const WIGHT = 10;
	const floor = crearUnRectangulo({
		x: bounds.width / 2,
		y: bounds.height,
		ancho: bounds.width,
		alto: WIGHT,
		colorDeRelleno: "transparent",
		isStatic: true,
	});
	const leftWall = crearUnRectangulo({
		x: 0,
		y: bounds.height / 2,
		ancho: WIGHT,
		alto: bounds.height,
		colorDeRelleno: "transparent",
		isStatic: true,
	});
	const rightWall = crearUnRectangulo({
		x: bounds.width,
		y: bounds.height / 2,
		ancho: WIGHT,
		alto: bounds.height,
		colorDeRelleno: "transparent",
		isStatic: true,
	});

	const DELTA = 750;
	const bar = crearUnRectangulo({
		x: bounds.width / 2,
		y: 0 - DELTA,
		ancho: bounds.width - WIGHT,
		alto: bounds.height * 0.1,
		colorDeRelleno: quinacridoneMagentaColor,
	});
	const disco = crearUnCirculo({
		x: bounds.width / 4,
		y: bounds.height / 2 - DELTA,
		radio: bounds.width / 4 - WIGHT,
		colorDeRelleno: brightPinkCrayolaColor,
	});
	const column = crearUnRectangulo({
		x: bounds.width * 0.75,
		y: bounds.height / 2 - DELTA,
		ancho: bounds.width / 2 - 2 * WIGHT,
		alto: bounds.height - bounds.height / 4,
		colorDeRelleno: atomicTangerineColor,
	});
	return [disco, column, bar, rightWall, leftWall, floor];
};
