import Matter from "matter-js";

interface PropiedadesDelMotorFisico {
	lienzo: HTMLCanvasElement;
	cuerpos: Matter.Body[];
	render: Matter.Render;
	motor: Matter.Engine;
	ejecutor: Matter.Runner;
}

interface ParametrosDelConstructorDelMotorFisico {
	lienzo: HTMLCanvasElement;
	cuerpos: Matter.Body[];
	motor?: Matter.Engine;
	ejecutor?: Matter.Runner;
}

export class MotorFisico {
	private props: PropiedadesDelMotorFisico;

	constructor({
		lienzo,
		cuerpos,
		motor = Matter.Engine.create(),
		ejecutor = Matter.Runner.create(),
	}: ParametrosDelConstructorDelMotorFisico) {
		const limitesDelLienzo = lienzo.getBoundingClientRect();
		const render = Matter.Render.create({
			canvas: lienzo,
			engine: motor,
			options: {
				width: limitesDelLienzo.width,
				height: limitesDelLienzo.height,
				background: "transparent",
				wireframes: false,
			},
		});
		Matter.World.add(motor.world, cuerpos);
		this.props = {
			lienzo,
			cuerpos,
			motor,
			ejecutor,
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
		observador.observe(this.props.lienzo);
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
