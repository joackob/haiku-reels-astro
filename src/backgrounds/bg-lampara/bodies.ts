import { crearUnRectangulo } from "@utils/matterjs/bodies";

import { atomicTangerineColor, brightPinkCrayolaColor } from "@utils/matterjs/colors";
import Matter, { Body, Common } from "matter-js";

interface ILamp {
	x: number;
	y: number;
	width: number;
}

const crearLampara = ({ x, y, width }: ILamp): Matter.Body =>
	Body.create({
		parts: [
			crearUnRectangulo({
				x,
				y,
				ancho: width,
				alto: width * 2,
				colorDeRelleno: brightPinkCrayolaColor,
			}),
			crearUnRectangulo({
				x,
				y,
				alto: width * 0.5,
				ancho: width * 0.5,
				colorDeRelleno: atomicTangerineColor,
				anguloDeInclinacion: 0.25 * Math.PI,
			}),
		],
	});

export const crearLamparas = (lienzo: HTMLCanvasElement): Matter.Body[] => {
	const limitesDelLienzo = lienzo.getBoundingClientRect();
	const cantidadDeLamparas = 16;
	const lamparas = [];

	for (let i = 0; i < cantidadDeLamparas; i++) {
		const lamp = crearLampara({
			x: Common.random(-limitesDelLienzo.width, 0),
			y: Common.random(0, limitesDelLienzo.height),
			width: 0.05 * Math.min(limitesDelLienzo.width, limitesDelLienzo.height),
		});
		lamparas.push(lamp);
	}

	return lamparas;
};
