import { Bodies, Composites } from "matter-js";

export const crearUnCirculo = ({
	x,
	y,
	radio,
	colorDeRelleno,
}: {
	x: number;
	y: number;
	radio: number;
	colorDeRelleno: string;
}): Matter.Body => Bodies.circle(x, y, radio, { render: { fillStyle: colorDeRelleno } });

export const crearUnRectangulo = ({
	x,
	y,
	ancho,
	alto,
	colorDeRelleno,
	estaQuieto = false,
	anguloDeInclinacion = 0,
}: {
	x: number;
	y: number;
	ancho: number;
	alto: number;
	colorDeRelleno: string;
	estaQuieto?: boolean;
	anguloDeInclinacion?: number;
}): Matter.Body =>
	Bodies.rectangle(x, y, ancho, alto, {
		isStatic: estaQuieto,
		render: { fillStyle: colorDeRelleno },
		angle: anguloDeInclinacion,
	});

export const createTrapezoid = ({
	x,
	y,
	ancho,
	alto,
	inclinacion,
	colorDeRelleno,
	estaQuieto,
}: {
	x: number;
	y: number;
	ancho: number;
	alto: number;
	inclinacion: number;
	colorDeRelleno: string;
	estaQuieto?: boolean;
}): Matter.Body =>
	Bodies.trapezoid(x, y, ancho, alto, inclinacion, {
		isStatic: estaQuieto,
		render: { fillStyle: colorDeRelleno },
	});

export const crearFigurasApiladas = ({
	x,
	y,
	filas = 1,
	columnas = 1,
	separacionEntreColumnas = 0,
	separacionEntreFilas = 0,
	fabricaDeFiguraParaApilar,
}: {
	x: number;
	y: number;
	filas?: number;
	columnas?: number;
	separacionEntreColumnas?: number;
	separacionEntreFilas?: number;
	fabricaDeFiguraParaApilar: (x: number, y: number) => Matter.Body;
}): Composites =>
	Composites.stack(
		x,
		y,
		columnas,
		filas,
		separacionEntreColumnas,
		separacionEntreFilas,
		fabricaDeFiguraParaApilar,
	);
