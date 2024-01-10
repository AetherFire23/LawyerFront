import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: 'http://localhost:5099/swagger/v1/swagger.json',
  apiFile: './userApi2.ts',
  apiImport: 'userApi2',
  outputFile: './userApi2Gen.ts',
  exportName: 'userApiGen2',
  hooks: true,
}

export default config