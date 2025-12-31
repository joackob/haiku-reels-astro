import { crearUnCirculo, crearUnRectangulo } from "@utils/matterjs/bodies";

import {
	quinacridoneMagentaColor,
	brightPinkCrayolaColor,
	atomicTangerineColor,
} from "@utils/matterjs/colors";

export const crearFigurasQueFormanLaLetra = (lienzo: HTMLCanvasElement): Matter.Body[] => {
	const limitesDelLienzo = lienzo.getBoundingClientRect();
	const grosorDeLosLimites = 10;
	const piso = crearUnRectangulo({
		x: limitesDelLienzo.width / 2,
		y: limitesDelLienzo.height,
		ancho: limitesDelLienzo.width,
		alto: grosorDeLosLimites,
		colorDeRelleno: "transparent",
		estaQuieto: true,
	});
	const paredeIzquierda = crearUnRectangulo({
		x: 0,
		y: limitesDelLienzo.height / 2,
		ancho: grosorDeLosLimites,
		alto: limitesDelLienzo.height,
		colorDeRelleno: "transparent",
		estaQuieto: true,
	});
	const paredDerecha = crearUnRectangulo({
		x: limitesDelLienzo.width,
		y: limitesDelLienzo.height / 2,
		ancho: grosorDeLosLimites,
		alto: limitesDelLienzo.height,
		colorDeRelleno: "transparent",
		estaQuieto: true,
	});

	const DELTA = 750;
	const barraHorizontal = crearUnRectangulo({
		x: limitesDelLienzo.width / 2,
		y: 0 - DELTA,
		ancho: limitesDelLienzo.width - grosorDeLosLimites,
		alto: limitesDelLienzo.height * 0.1,
		colorDeRelleno: quinacridoneMagentaColor,
	});
	const disco = crearUnCirculo({
		x: limitesDelLienzo.width / 4,
		y: limitesDelLienzo.height / 2 - DELTA,
		radio: limitesDelLienzo.width / 4 - grosorDeLosLimites,
		colorDeRelleno: brightPinkCrayolaColor,
	});
	const columna = crearUnRectangulo({
		x: limitesDelLienzo.width * 0.75,
		y: limitesDelLienzo.height / 2 - DELTA,
		ancho: limitesDelLienzo.width / 2 - 2 * grosorDeLosLimites,
		alto: limitesDelLienzo.height - limitesDelLienzo.height / 4,
		colorDeRelleno: atomicTangerineColor,
	});
	return [disco, columna, barraHorizontal, paredDerecha, paredeIzquierda, piso];
};
