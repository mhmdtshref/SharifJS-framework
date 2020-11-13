# Framework structure:
## Framework files skeleton
The files tree inside `src` directory:
```tree
.
├── constants
│   ├── index.ts
│   └── user.constant.ts
├── controllers
│   ├── index.ts
│   └── user.controller.ts
├── data
│   ├── index.ts
│   └── user.data.ts
├── enums
│   ├── index.ts
│   └── user.enum.ts
├── interfaces
│   ├── index.ts
│   └── user.interface.ts
├── models
│   ├── index.ts
│   └── user.model.ts
├── routes
│   ├── index.ts
│   └── user.route.ts
└── validators
    ├── index.ts
    └── user.validator.ts
```
## Framework files structure
functionial files structure should be like:
```typescript
export class ClassName {
// Create functions and variables (private, public or protected)
}
```
Also, `index.ts` functions should be like:
```typescript
import { ClassName } from '[FILE_PATH]';

export class FolderName {
    protected className = new ClassName();
}
```
## Framework method of import/export
Export using `export default [SOMETHING]` is not in our style of code, we always use `export class` to export, unless it's not an `enum`, `type` or `interface`. Regarding import, we use `import { ClassName } from './filename';`, that's because we never use `export default`.
## Framework method of define functions
## Framework method of documenting
