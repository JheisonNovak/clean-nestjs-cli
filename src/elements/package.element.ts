export const packageElement = (projectName: string, linters: boolean) => `{
	"name": "${projectName}",
	"version": "0.0.1",
	"description": "",
	"author": "",
	"private": true,
	"license": "UNLICENSED",
	"scripts": {
		"build": "nest build",${linters ? `\n		"format": "prettier --write \\"src/**/*.ts\\" \\"test/**/*.ts\\"",` : ""}
		"start": "nest start",
		"start:dev": "nest start --watch",
		"start:debug": "nest start --debug --watch",
		"start:prod": "node dist/main",${linters ? `\n		"lint": "eslint \\"{src,apps,libs,test}/**/*.ts\\" --fix",` : ""}
		"test": "jest",
		"test:watch": "jest --watch",
		"test:cov": "jest --coverage",
		"test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
		"test:e2e": "jest --config ./test/jest-e2e.json"
	},
	"dependencies": {
		"@nestjs/common": "^10.0.0",
		"@nestjs/core": "^10.0.0",
		"@nestjs/platform-express": "^10.0.0",
		"reflect-metadata": "^0.2.0",
		"rxjs": "^7.8.1"
	},
	"devDependencies": {
		"@nestjs/cli": "^10.0.0",
		"@nestjs/schematics": "^10.0.0",
		"@nestjs/testing": "^10.0.0",
		"@types/express": "^4.17.17",
		"@types/jest": "^29.5.2",
		"@types/node": "^22.8.7",
		"@types/supertest": "^6.0.0",${linters ? `\n		"@typescript-eslint/eslint-plugin": "^8.0.0",` : ""}${
			linters ? `\n		"@typescript-eslint/parser": "^8.0.0",` : ""
		}${linters ? `\n		"eslint": "^8.42.0",` : ""}${linters ? `\n		"eslint-config-prettier": "^9.0.0",` : ""}${
			linters ? `\n		"eslint-plugin-prettier": "^5.0.0",` : ""
		}
		"jest": "^29.5.0",${linters ? `\n		"prettier": "^3.0.0",` : ""}
		"source-map-support": "^0.5.21",
		"supertest": "^7.0.0",
		"ts-jest": "^29.1.0",
		"ts-loader": "^9.4.3",
		"ts-node": "^10.9.1",
		"tsconfig-paths": "^4.2.0",
		"typescript": "^5.1.3"
	},
	"jest": {
		"moduleFileExtensions": [
			"js",
			"json",
			"ts"
		],
		"rootDir": "src",
		"testRegex": ".*\\\\.spec\\\\.ts$",
		"transform": {
			"^.+\\\\.(t|j)s$": "ts-jest"
		},
		"collectCoverageFrom": [
			"**/*.(t|j)s"
		],
		"coverageDirectory": "../coverage",
		"testEnvironment": "node"
	}
}
`;
