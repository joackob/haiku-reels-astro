import { crearUnCirculo, crearUnRectangulo, createTrapezoid } from "@utils/matterjs/bodies";

import { quinacridoneMagentaColor, brightPinkCrayolaColor } from "@utils/matterjs/colors";
import Matter, { Body } from "matter-js";

interface ParametrosParaCrearLaFiguraDeUnTemplo {
	x: number;
	y: number;
	limites: {
		ancho: number;
		alto: number;
	};
}

const crearLaFiguraDeUnTemplo = ({
	x,
	y,
	limites,
}: ParametrosParaCrearLaFiguraDeUnTemplo): Matter.Body => {
	const alturaDeReferencia = 0.2 * Math.min(limites.ancho, limites.alto);

	return Body.create({
		parts: [
			crearUnRectangulo({
				x,
				y,
				ancho: limites.ancho,
				alto: alturaDeReferencia,
				colorDeRelleno: quinacridoneMagentaColor,
			}),
			createTrapezoid({
				x,
				y: y - alturaDeReferencia,
				ancho: 1.5 * limites.ancho,
				alto: 0.25 * limites.ancho,
				inclinacion: 0.5,
				colorDeRelleno: brightPinkCrayolaColor,
			}),
			crearUnRectangulo({
				x,
				y: y - 2 * alturaDeReferencia,
				ancho: 0.5 * limites.ancho,
				alto: alturaDeReferencia,
				colorDeRelleno: quinacridoneMagentaColor,
			}),
			createTrapezoid({
				x,
				y: y - 3 * alturaDeReferencia,
				ancho: 1 * limites.ancho,
				alto: 0.25 * limites.ancho,
				inclinacion: 0.5,
				colorDeRelleno: brightPinkCrayolaColor,
			}),
			crearUnRectangulo({
				x,
				y: y - 4 * alturaDeReferencia,
				ancho: 0.25 * limites.ancho,
				alto: alturaDeReferencia,
				colorDeRelleno: quinacridoneMagentaColor,
			}),
			createTrapezoid({
				x,
				y: y - 4.9 * alturaDeReferencia,
				ancho: 0.5 * limites.ancho,
				alto: 0.25 * limites.ancho,
				inclinacion: 1,
				colorDeRelleno: brightPinkCrayolaColor,
			}),
		],
	});
};

export const crearFigurasAcordeALosLimitesDelLienzo = (
	lienzo: HTMLCanvasElement,
): Matter.Body[] => {
	const limitesDelLienzo = lienzo.getBoundingClientRect();
	const formatoAcotadoPresente = limitesDelLienzo.width <= 430;
	const posicionRespectoAlEjeX = formatoAcotadoPresente
		? limitesDelLienzo.width * 1.75
		: limitesDelLienzo.width * 1.3;

	const templo = crearLaFiguraDeUnTemplo({
		x: posicionRespectoAlEjeX,
		y: limitesDelLienzo.height * 0.75,
		limites: {
			alto: limitesDelLienzo.height,
			ancho: formatoAcotadoPresente ? limitesDelLienzo.width : limitesDelLienzo.width * 0.33,
		},
	});

	const sol = crearUnCirculo({
		x: formatoAcotadoPresente
			? posicionRespectoAlEjeX + limitesDelLienzo.width
			: posicionRespectoAlEjeX + limitesDelLienzo.width * 0.3,
		y: formatoAcotadoPresente ? 0 : -0.5 * limitesDelLienzo.height,
		radio: 0.2 * Math.min(limitesDelLienzo.width, limitesDelLienzo.height),
		colorDeRelleno: brightPinkCrayolaColor,
	});

	return [sol, templo];
};
