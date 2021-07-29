import { join } from 'path'
import { existsSync } from 'fs'
import _debug from 'debug'
import { mergeConfig } from 'vite'
import type { Plugin } from 'vite'

const debug = _debug('vite-plugin-package-config')

export interface Options {
  /**
   * @default 'package.json'
   */
  packageJsonPath?: string
  /**
   * Field name in package.json to merge with Vite's config
   *
   * @default 'vite'
   */
  field?: string
}

function VitePluginPackageConfig(options: Options = {}): Plugin {
  const {
    packageJsonPath = join(process.cwd(), 'package.json'),
    field = 'vite',
  } = options

  return <Plugin>{
    name: 'vite-plugin-package-config',
    async config(_config) {
      if (!existsSync(packageJsonPath)) {
        debug('package.json not found')
        return
      }

      debug(`loading package.json at ${packageJsonPath}`)
      const packageJson = await import(packageJsonPath)
      const extend = packageJson.default?.[field]
      if (!extend) {
        debug(`no "${field}" field found in package.json, skip`)
        return
      }

      debug('merging config with')
      debug(extend)
      return mergeConfig(_config, extend)
    },
    api: {
      options: {
        packageJsonPath,
        field,
      },
    },
  }
}

export default VitePluginPackageConfig
