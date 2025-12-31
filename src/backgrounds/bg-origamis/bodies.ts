import { Bodies, Common } from "matter-js";
import { crearUnRectangulo } from "@utils/matterjs/bodies";
import type { ICanvasBounds } from "@utils/matterjs/canvas";
import { SITE_URL } from "@config/consts";

interface IOrigami {
	x: number;
	y: number;
	size: number;
}

const DIM_ORIGAMI_PNG = 256;
const createOrigami = ({ x, y, size }: IOrigami): Matter.Body => {
	return Bodies.circle(x, y, size / 2, {
		render: {
			sprite: {
				texture: `${SITE_URL}/imgs/origami.png`,
				xScale: size / DIM_ORIGAMI_PNG,
				yScale: size / DIM_ORIGAMI_PNG,
			},
		},
	});
};

export const createBodies = (bounds: ICanvasBounds): Matter.Body[] => {
	const wight = 10;
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
	const ORIGAMIS_NUMBER = 30;
	const origamis = [];
	for (let i = 0; i < ORIGAMIS_NUMBER; i++) {
		origamis.push(
			createOrigami({
				x: Common.random(0, bounds.width),
				y: Common.random(-bounds.height, 0),
				size: Math.min(bounds.width, bounds.height) * 0.18,
			}),
		);
	}
	return [rightWall, leftWall, floor, ...origamis];
};
