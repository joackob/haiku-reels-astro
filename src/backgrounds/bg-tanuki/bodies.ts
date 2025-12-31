import { Bodies, Common } from "matter-js";
import { crearUnRectangulo } from "@utils/matterjs/bodies";
import { SITE_URL } from "@config/consts";

const dimesionBaseDeLaImagen = 256;

const crearTanuki = ({ x, y, tamanio }: { x: number; y: number; tamanio: number }): Matter.Body => {
	return Bodies.circle(x, y, tamanio / 2, {
		render: {
			sprite: {
				texture: `${SITE_URL}/imgs/tanuki.png`,
				xScale: tamanio / dimesionBaseDeLaImagen,
				yScale: tamanio / dimesionBaseDeLaImagen,
			},
		},
	});
};

export const crearTanukisDentroDeLosLimitesDelLienzo = (
	lienzo: HTMLCanvasElement,
): Matter.Body[] => {
	const limitesDelLienzo = lienzo.getBoundingClientRect();
	const grozorDeLosLimitesDelLienzo = 10;
	const piso = crearUnRectangulo({
		x: limitesDelLienzo.width / 2,
		y: limitesDelLienzo.height,
		ancho: limitesDelLienzo.width,
		alto: grozorDeLosLimitesDelLienzo,
		colorDeRelleno: "transparent",
		estaQuieto: true,
	});
	const paredIzquierda = crearUnRectangulo({
		x: 0,
		y: limitesDelLienzo.height / 2,
		ancho: grozorDeLosLimitesDelLienzo,
		alto: limitesDelLienzo.height,
		colorDeRelleno: "transparent",
		estaQuieto: true,
	});
	const paredDerecha = crearUnRectangulo({
		x: limitesDelLienzo.width,
		y: limitesDelLienzo.height / 2,
		ancho: grozorDeLosLimitesDelLienzo,
		alto: limitesDelLienzo.height,
		colorDeRelleno: "transparent",
		estaQuieto: true,
	});
	const cantidadDeTanukisACrear = 30;
	const tanukis = [];

	for (let i = 0; i < cantidadDeTanukisACrear; i++) {
		tanukis.push(
			crearTanuki({
				x: Common.random(0, limitesDelLienzo.width),
				y: Common.random(-limitesDelLienzo.height, 0),
				tamanio: Math.min(limitesDelLienzo.width, limitesDelLienzo.height) * 0.18,
			}),
		);
	}
	return [paredDerecha, paredIzquierda, piso, ...tanukis];
};
