import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModuloModule } from "./app/app.module";

platformBrowserDynamic()
  .bootstrapModule(AppModuloModule)
  .catch((err) => console.error(err));
