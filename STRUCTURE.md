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
    protected fileName = new FileName();
}
```
## Framework method of import/export
## Framework method of define functions
## Framework method of documenting
