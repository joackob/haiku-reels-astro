export function generarSlugSemantico(post: {
	id: string;
	data: { autoria: string; pubDate: Date };
}): string {
	// Extraer nombre del autor
	const autorNombre = post.data.autoria.toLowerCase().replace(/\s+/g, "-");

	// Extraer año de publicación
	const anio = post.data.pubDate.getFullYear();

	// Generar un hash corto del ID para mantener unicidad
	const hash = post.id.replace(".md", "").split("-").pop() || "haiku";

	return `${autorNombre}-${anio}-${hash}`;
}

export function generarSlugDesdeTitulo(titulo: string, autor: string): string {
	// Normalizar título: convertir a minúsculas, reemplazar espacios y caracteres especiales
	const tituloNormalizado = titulo
		.toLowerCase()
		.replace(/[áàäâã]/g, "a")
		.replace(/[éèëê]/g, "e")
		.replace(/[íìïî]/g, "i")
		.replace(/[óòöôõ]/g, "o")
		.replace(/[úùüû]/g, "u")
		.replace(/[ñ]/g, "n")
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.trim();

	const autorNormalizado = autor.toLowerCase().replace(/\s+/g, "-");

	return `${autorNormalizado}-${tituloNormalizado}`;
}

export function generarSlugOptimizado(post: {
	id: string;
	data: { autoria: string; pubDate: Date; title?: string };
}): string {
	// Si hay título personalizado, usarlo
	if (post.data.title) {
		return generarSlugDesdeTitulo(post.data.title, post.data.autoria);
	}

	// Si no, usar el esquema autor-año-hash
	return generarSlugSemantico(post);
}

export function generarMetaDescripcion(post: {
	data: { autoria: string; anio?: string; escuela?: string; tags?: string[] };
}): string {
	const { autoria, anio, escuela, tags } = post.data;

	let descripcion = `Haiku escrito por ${autoria}`;

	if (anio) {
		descripcion += ` en ${anio}`;
	}

	if (escuela) {
		descripcion += ` - ${escuela}`;
	}

	if (tags && tags.length > 0) {
		descripcion += `. Temas: ${tags.slice(0, 3).join(", ")}`;
	}

	return descripcion;
}

export function generarKeywords(post: {
	data: { autoria: string; tags?: string[]; escuela?: string; anio?: string };
}): string {
	const { autoria, tags, escuela, anio } = post.data;

	let keywords = ["haiku", autoria, "poesía", "literatura", "escritura creativa"];

	if (tags) {
		keywords.push(...tags);
	}

	if (escuela) {
		keywords.push(escuela);
	}

	if (anio) {
		keywords.push(`haiku ${anio}`);
	}

	return keywords.join(", ");
}
