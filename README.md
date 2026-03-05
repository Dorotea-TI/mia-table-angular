# Mia Table Angular

Librería `@doroteati/mia-table` + app `example` en workspace multi-proyecto (Angular 21).

## Proyectos

- `@doroteati/mia-table` (library)
- `example` (app con soporte SSR)

## Nota importante de build

Este workspace tiene más de un proyecto, por eso `ng build` o `npm run build` sin proyecto puede fallar con:
`Cannot determine project for command`.

Usa siempre el build por proyecto:

```bash
# Build librería
npx ng build @doroteati/mia-table --configuration production

# Build app example (browser + server SSR)
npx ng build example --configuration production
```

## Desarrollo local

```bash
# SPA (desarrollo)
npx ng serve example

# SSR (requiere build previo)
npm run serve:ssr:example
```

## API local para example (sin CORS en SSR)

El server SSR del `example` incluye proxy para `/auction/*` hacia `http://localhost` por defecto.

Puedes cambiar el backend local así:

```bash
# PowerShell
$env:LOCAL_API_BASE="http://localhost:8080"; npm run serve:ssr:example
```

## Publicar `@doroteati/mia-table` en npm

Importante: no publiques desde la raíz del workspace (`mia-table-angular`), porque ese `package.json` está marcado como `private: true`.

### 1) Login en npm

```bash
npm login
npm whoami
```

### 2) Build de la librería

```bash
npx ng build --project @doroteati/mia-table --configuration production
```

### 3) Publicar desde la carpeta correcta

```bash
cd dist/doroteati/mia-table
npm publish --access=public
```

### 4) Si falla por versión existente

```bash
cd ../../../projects/doroteati/mia-table
npm version patch --no-git-tag-version
cd ../../../dist/doroteati/mia-table
npm publish --access=public
```

### Errores comunes

- `EPRIVATE This package has been marked as private`
  - Estás publicando desde la raíz del repo. Ve a `dist/doroteati/mia-table`.
- `Access token expired or revoked`
  - Ejecuta `npm login` de nuevo.
