import Matter from "matter-js";

interface PropiedadesDelMotorFisico {
	canvas: HTMLCanvasElement;
	cuerpos: Matter.Body[];
	render: Matter.Render;
	motor: Matter.Engine;
	ejecutor: Matter.Runner;
}

interface ParametrosDelConstructorDelMotorFisico {
	canvas: HTMLCanvasElement;
	cuerpos: Matter.Body[];
	motor?: Matter.Engine;
	ejecutor?: Matter.Runner;
}

export class MotorFisico {
	private props: PropiedadesDelMotorFisico;

	constructor({
		canvas,
		cuerpos,
		motor: engine = Matter.Engine.create(),
		ejecutor: runner = Matter.Runner.create(),
	}: ParametrosDelConstructorDelMotorFisico) {
		const limitesDelCanvas = canvas.getBoundingClientRect();
		const render = Matter.Render.create({
			canvas,
			engine,
			options: {
				width: limitesDelCanvas.width,
				height: limitesDelCanvas.height,
				background: "transparent",
				wireframes: false,
			},
		});
		Matter.World.add(engine.world, cuerpos);
		this.props = {
			canvas,
			cuerpos,
			motor: engine,
			ejecutor: runner,
			render,
		};
	}

	private ejecutar(): MotorFisico {
		Matter.Render.run(this.props.render);
		Matter.Runner.run(this.props.ejecutor, this.props.motor);
		return this;
	}

	private detener(): MotorFisico {
		Matter.Render.stop(this.props.render);
		Matter.Runner.stop(this.props.ejecutor);
		return this;
	}

	comenzar(): MotorFisico {
		const configuracionParaDetectarIntersecciones: IntersectionObserverInit = {
			root: document.getElementById("haikus-container"),
			rootMargin: "0px",
			threshold: 1.0,
		};
		const ejecutarMotorSiEsVisibleParaElUsuario: IntersectionObserverCallback = (entries): void => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					this.ejecutar();
				} else {
					this.detener();
				}
			});
		};
		const observador = new IntersectionObserver(
			ejecutarMotorSiEsVisibleParaElUsuario,
			configuracionParaDetectarIntersecciones,
		);
		observador.observe(this.props.canvas);
		return this;
	}

	antesDeActualizar(callback: () => void): MotorFisico {
		Matter.Events.on(this.props.motor, "beforeUpdate", callback);
		return this;
	}

	despuesDeActualizar(callback: () => void): MotorFisico {
		Matter.Events.on(this.props.motor, "afterUpdate", callback);
		return this;
	}
}
