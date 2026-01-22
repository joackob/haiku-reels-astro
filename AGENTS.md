# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this repository.

## Project Overview

Haiku Reels is an Astro-based website for sharing and preserving student haikus. The project uses:

- **Framework**: Astro 6.0.0-alpha with React integration
- **Styling**: Tailwind CSS with custom color palette
- **Content**: Markdown/MDX files with Zod validation
- **Physics**: Matter.js for interactive backgrounds
- **State**: Nanostores for client-side state
- **Testing**: Playwright for E2E tests
- **Package Manager**: Bun

## Build Commands

### Development

```bash
bun run dev              # Start dev server at localhost:3000
```

### Building

```bash
bun run build            # Production build to ./dist/
bun run build:dev        # Dev build with pagefind to ./public/
```

### Code Quality

```bash
bun run format           # Format code with Prettier
bun run lint             # Run ESLint
```

### Testing

```bash
bun run tests            # Run unit tests
bun run tests:e2e        # Run E2E tests with build
bun run tests:e2e:without-build  # Run E2E tests without building
bun run tests:e2e:create  # Generate Playwright tests
```

### Running Single Tests

```bash
# E2E tests (Playwright)
bunx playwright test tests/busqueda-de-haikus.spec.ts

# Unit tests (if using bun test)
bun test path/to/test.spec.ts
```

## Code Style Guidelines

### Import Organization

- Use path aliases defined in `tsconfig.json`:

  - `@layouts/*` → `src/layouts/*`
  - `@components/*` → `src/components/*`
  - `@backgrounds/*` → `src/backgrounds/*`
  - `@config/*` → `src/config/*`
  - `@content/*` → `src/content/*`
  - `@utils/*` → `src/utils/*`
  - `@styles/*` → `src/styles/*`

- Import order: External libraries → Internal modules → Type imports

```typescript
import React from "react";
import { getCollection } from "astro:content";
import SeccionEstiloTarjeta from "@layouts/seccion-para-cada-tarjeta-reel.astro";
import type { Props } from "./types";
```

### Formatting Rules

- **Indentation**: Tabs (2 spaces width)
- **Semicolons**: Required
- **Quotes**: Double quotes for strings
- **Print width**: 100 characters
- **File extensions**: Use `.astro` for Astro components, `.ts` for TypeScript, `.tsx` for React

### TypeScript Configuration

- **Strict mode**: Enabled with `strictNullChecks`
- **Return types**: Explicit function return types encouraged (ESLint warning)
- **Unused variables**: Warning level, ignore `Props` pattern

### Naming Conventions

- **Components**: PascalCase (e.g., `GaleriaDeHaikus`, `ArticuloParaCadaHaiku`)
- **Files**: kebab-case for most files, PascalCase for component directories
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE for global constants
- **CSS Classes**: kebab-case with BEM-like patterns

### Astro Component Patterns

- Use frontmatter for data fetching and imports
- Define Props interface for component props
- Use slot for content injection in backgrounds
- Example structure:

```astro
---
import Layout from "@layouts/base.astro";
import type { Props } from "./types";

export interface Props {
	titulo?: string;
	descripcion?: string;
}

const { titulo = "Default", descripcion }: Props = Astro.props;
---

<Layout>
	<slot />
</Layout>
```

### Content Management

- **Haikus**: Stored in `src/content/haikus/` as `.md` files
- **Frontmatter validation**: Zod schema in `src/content.config.ts`
- **Required fields**: `autoria`, `pubDate`
- **Optional fields**: `anio`, `escuela`, `curso`, `tags`
- **Line breaks**: Use two spaces at end of lines (recommended) or backslashes

### Background Components

- Must include a `<slot />` element for haiku content
- Use Matter.js for physics interactions
- Follow pattern: `src/backgrounds/bg-name/index.astro`
- Include corresponding `bodies.ts` for physics objects

### State Management

- Use Nanostores for client-side state
- Store atoms in `src/store.ts`
- Example pattern:

```typescript
import { atom } from "nanostores";

export const searchTerm = atom("");

export const setSearchTerm = (term: string) => {
	searchTerm.set(term);
};
```

### Error Handling

- Use try-catch blocks for async operations
- Validate content with Zod schemas
- Handle missing props with default values

### CSS Guidelines

- **Tailwind CSS**: Primary styling method
- **Custom colors**: Use defined palette (atomic_tangerine, delft_blue, etc.)
- **Responsive breakpoints**: tablet (768px), laptop (1024px), desktop (1280px)
- **Typography**: Use @tailwind/typography plugin for prose content
- **Dark mode**: Class-based dark mode support

### Testing Patterns

- **E2E tests**: Playwright with `.spec.ts` extension
- **Test structure**: Describe blocks with user stories
- **Selectors**: Use accessible selectors (role, text)
- **Base URL**: `http://localhost:4321/haiku-reels-astro`

### Performance Considerations

- Optimize for 100/100 Lighthouse score
- Use Astro's static generation
- Implement lazy loading for heavy components
- Minimize bundle size with code splitting

### Accessibility

- Use semantic HTML elements
- Implement ARIA labels where needed
- Ensure keyboard navigation
- Test with ESLint jsx-a11y plugin

## Development Workflow

1. **Before coding**: Run `bun run dev` to start development server
2. **While coding**: Use `bun run format` and `bun run lint` regularly
3. **Before committing**: Ensure all linting passes
4. **Testing**: Run `bun run tests:e2e` for full test suite
5. **Build verification**: Use `bun run build:dev` to test build process

## File Structure Notes

- **Backgrounds**: Interactive components with Matter.js physics
- **Components**: Reusable UI components
- **Layouts**: Page structure components
- **Content**: Haiku markdown files with frontmatter
- **Config**: Site constants and TypeScript configurations
- **Utils**: Helper functions and utilities

## Common Patterns

### Component Import Pattern

```astro
---
import Component from "@components/component/index.astro";
import Background from "@backgrounds/bg-name/index.astro";
---
```

### Content Collection Pattern

```typescript
const haikus = await getCollection("haikus");
const rendered = await Promise.all(haikus.map(async (haiku) => await render(haiku)));
```

### Background Slot Pattern

```astro
<div class="relative h-full">
	<canvas class="absolute h-full w-full" container-bg-name></canvas>
	<div class="flex flex-col h-full">
		<div class="grow"></div>
		<div class="relative z-10">
			<slot />
		</div>
		<div class="grow-[2]"></div>
	</div>
</div>
```

Remember to follow these guidelines and run lint/format commands before committing changes.
