import { crearUnCirculo, crearUnRectangulo } from "@utils/matterjs/bodies";
import type { ICanvasBounds } from "@utils/matterjs/canvas";

import {
	quinacridoneMagentaColor,
	brightPinkCrayolaColor,
	atomicTangerineColor,
} from "@utils/matterjs/colors";

export const createBodies = (bounds: ICanvasBounds): Matter.Body[] => {
	const wight = 15;
	const floor = crearUnRectangulo({
		x: bounds.width / 2,
		y: bounds.height,
		ancho: bounds.width,
		alto: wight,
		colorDeRelleno: "transparent",
		isStatic: true,
	});
	const leftWall = crearUnRectangulo({
		x: 0,
		y: bounds.height / 2,
		ancho: wight,
		alto: bounds.height,
		colorDeRelleno: "transparent",
		isStatic: true,
	});
	const rightWall = crearUnRectangulo({
		x: bounds.width,
		y: bounds.height / 2,
		ancho: wight,
		alto: bounds.height,
		colorDeRelleno: "transparent",
		isStatic: true,
	});

	const DELTA = 750;
	const bar = crearUnRectangulo({
		x: bounds.width / 2,
		y: 0 - DELTA,
		ancho: bounds.width - wight,
		alto: bounds.height * 0.1,
		colorDeRelleno: atomicTangerineColor,
	});
	const column1 = crearUnRectangulo({
		x: bounds.width * 0.41,
		y: bounds.height / 2 - DELTA,
		ancho: bounds.width / 6 - 2 * wight,
		alto: bounds.height - bounds.height / 2,
		colorDeRelleno: atomicTangerineColor,
	});
	const column = crearUnRectangulo({
		x: bounds.width * 0.75,
		y: bounds.height / 2 - DELTA,
		ancho: bounds.width / 4 - 2 * wight,
		alto: bounds.height - bounds.height / 3,
		colorDeRelleno: atomicTangerineColor,
	});

	const bar2 = crearUnRectangulo({
		x: bounds.width / 2,
		y: 0 - DELTA,
		ancho: bounds.width - 220,
		alto: bounds.height * 0.05,
		colorDeRelleno: atomicTangerineColor,
	});
	const column2 = crearUnRectangulo({
		x: bounds.width * 0.25,
		y: bounds.height / 2 - DELTA,
		ancho: bounds.width / 4 - 2 * wight,
		alto: bounds.height - bounds.height / 3,
		colorDeRelleno: atomicTangerineColor,
	});
	const column3 = crearUnRectangulo({
		x: bounds.width * 0.6,
		y: bounds.height / 2 - DELTA,
		ancho: bounds.width / 6 - 2 * wight,
		alto: bounds.height - bounds.height / 2,
		colorDeRelleno: atomicTangerineColor,
	});
	return [column1, column, bar, rightWall, leftWall, floor, bar2, column2, column3];
};

