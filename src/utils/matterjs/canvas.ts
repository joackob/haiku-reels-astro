export interface ICanvasBounds {
	width: number;
	height: number;
}

export const crearCanvasYAgregarloAlElemento = (elemento: Element): HTMLCanvasElement => {
	const size = elemento.getBoundingClientRect();
	const canvas = document.createElement("canvas");
	canvas.width = size.width;
	canvas.height = size.height;
	elemento.appendChild(canvas);
	return canvas;
};
