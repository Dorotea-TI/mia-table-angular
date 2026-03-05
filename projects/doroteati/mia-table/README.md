# @doroteati/mia-table

Libreria Angular 21 para tablas de datos con:

- `mia-table` (tabla paginada con columnas configurables)
- `mia-table-editable` (tabla editable por fila)
- `mia-edit-columns` (selector de columnas visibles)
- `mia-infinite-scroll-service` (carga incremental por scroll)

## Requisitos

- Angular `>=21`
- Angular Material `>=21`
- `@doroteati/mia-core`
- `@doroteati/mia-loading`
- `@ngx-pwa/local-storage`

## Instalacion

```bash
npm i @doroteati/mia-table @doroteati/mia-core @doroteati/mia-loading @ngx-pwa/local-storage @angular/material @angular/material-moment-adapter
```

## Importante sobre el modulo

Los componentes de esta libreria no son `standalone`; debes importar `MiaTableModule`.

## Uso en Angular 21 (app Standalone)

### Opcion A: importar `MiaTableModule` en tu componente standalone

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiaTableModule } from '@doroteati/mia-table';

@Component({
  selector: 'app-auctions',
  standalone: true,
  imports: [CommonModule, MiaTableModule],
  template: `
    <mia-table [config]="tableConfig"></mia-table>
  `,
})
export class AuctionsComponent {
  tableConfig = new MiaTableConfig();
}
```

### Opcion B: registrar el modulo globalmente en `bootstrapApplication`

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MiaTableModule } from '@doroteati/mia-table';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(BrowserAnimationsModule, MiaTableModule)],
});
```

## Uso con apps basadas en `NgModule`

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MiaTableModule } from '@doroteati/mia-table';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MiaTableModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Ejemplo minimo de `mia-table`

```ts
import { MiaTableConfig, MiaColumn } from '@doroteati/mia-table';
import { MiaQuery } from '@doroteati/mia-core';

tableConfig = new MiaTableConfig();

ngOnInit() {
  this.tableConfig.id = 'auctions-table';
  this.tableConfig.service = this.auctionService; // debe implementar list/listOb
  this.tableConfig.query = new MiaQuery();
  this.tableConfig.query.itemPerPage = 25;
  this.tableConfig.columns = [
    { key: 'id', type: 'string', title: 'ID', field_key: 'id' },
    { key: 'title', type: 'string', title: 'Titulo', field_key: 'title' },
    { key: 'address', type: 'text', title: 'Direccion', field_key: 'address' },
    { key: 'status', type: 'status', title: 'Estado', field_key: 'status', extra: {
      options: [
        { value: 1, title: 'Activo', color: 'success' },
        { value: 9, title: 'No Activo', color: 'error' },
      ],
    }},
  ];
}
```

Template:

```html
<mia-edit-columns [config]="tableConfig" [miaTable]="tableComp">
  <button>Editar columnas</button>
</mia-edit-columns>

<mia-table #tableComp [config]="tableConfig"></mia-table>
```

## Contrato del servicio para `mia-table`

`mia-table` consume paginacion tipo `MiaPagination`.
Tambien soporta respuesta envuelta como:

```json
{
  "success": true,
  "response": {
    "current_page": 1,
    "last_page": 10,
    "total": 250,
    "data": []
  }
}
```

## Publicacion a npm

1. Login:

```bash
npm login
npm whoami
```

2. Build:

```bash
npx ng build --project @doroteati/mia-table --configuration production
```

3. Publicar desde `dist`:

```bash
cd dist/doroteati/mia-table
npm publish --access=public
```

Si publicas desde la raiz del workspace te saldra `EPRIVATE`, porque el `package.json` raiz es privado.
