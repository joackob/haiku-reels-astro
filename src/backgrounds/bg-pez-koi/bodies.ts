import { Bodies, Body } from "matter-js";
import { SITE_URL } from "@config/consts";

const dimensionBaseDeLaImagen = 256;
const crearPezKoi = ({ x, y, tamanio }: { x: number; y: number; tamanio: number }): Matter.Body => {
	return Bodies.circle(x, y, tamanio / 2, {
		frictionAir: 0,
		friction: 0,
		inertia: Infinity,
		render: {
			sprite: {
				texture: `${SITE_URL}/imgs/pez-koi.png`,
				xScale: tamanio / dimensionBaseDeLaImagen,
				yScale: tamanio / dimensionBaseDeLaImagen,
			},
		},
	});
};

export const crearKoiDentroDeLosLimitesDelLienzo = (lienzo: HTMLCanvasElement): Matter.Body[] => {
	const limitesDelLienzo = lienzo.getBoundingClientRect();
	const koi = crearPezKoi({
		x: -limitesDelLienzo.width / 4,
		y: limitesDelLienzo.height / 2,
		tamanio: limitesDelLienzo.width / 4,
	});
	Body.rotate(koi, (3 * Math.PI) / 4);
	Body.setAngularVelocity(koi, -0.002);
	return [koi];
};
