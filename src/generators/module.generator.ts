import * as fs from "fs";
import * as path from "path";
import { addToArray, capitalize, createFile, kebabToCamel, startsInBasePath } from "../utils/file";
import { moduleElement } from "../elements/module.element";
import { repositoryInterfaceElement } from "../elements/repository-interface.element";
import { repositoryElement } from "../elements/repository.element";
import { IGenerator } from "./generate.generator";
import { createModulePath } from "../utils/create-module-path";
import { updateModuleFile } from "../utils/update-module-file";

export class ModuleGenerator extends IGenerator {
	static override async generate(moduleNameKebab: string, resourcePath: string = "") {
		const resourceNameCamel = kebabToCamel(moduleNameKebab);
		const moduleName = capitalize(resourceNameCamel);
		const modulePath = createModulePath(resourcePath, moduleNameKebab);
		const basePath = path.join(process.cwd(), "./src/modules/");
		const resourceDir = path.join(basePath, modulePath);
		startsInBasePath(basePath, resourceDir);

		const moduleContent = moduleElement(moduleName, moduleNameKebab);
		const repositoryInterfaceContent = repositoryInterfaceElement(moduleName);
		const repositoryContent = repositoryElement(moduleName, moduleNameKebab);

		await createFile(path.join(resourceDir, `${moduleNameKebab}.module.ts`), moduleContent);
		await createFile(path.join(resourceDir, "repositories", `${moduleNameKebab}.repository.ts`), repositoryContent);
		await createFile(path.join(resourceDir, "models/interfaces", `${moduleNameKebab}-repository.interface.ts`), repositoryInterfaceContent);

		const modelDirs = ["dtos", "entities", "enums", "interfaces"];
		modelDirs.forEach(dir => {
			fs.mkdirSync(path.join(resourceDir, "models", dir), { recursive: true });
		});

		fs.mkdirSync(path.join(resourceDir, "use-cases"), { recursive: true });

		const appModuleFilePath = path.posix.join(process.cwd(), "src", "app.module.ts");
		const moduleClassName = `${moduleName}Module`;
		const moduleClassPath = "./" + path.posix.join("modules", modulePath, `${moduleNameKebab}.module`);
		updateModuleFile(appModuleFilePath, {
			arrayName: ["imports"],
			content: moduleClassName,
			imports: [{ name: moduleClassName, path: moduleClassPath }],
		});
	}
}
