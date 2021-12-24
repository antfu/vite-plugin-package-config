import { join } from 'path'
import { existsSync, promises as fs } from 'fs'
import _debug from 'debug'
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

export interface VitePluginPackageConfigPlugin extends Plugin {
  api: {
    options: {
      packageJsonPath: string
      field: string
    }
  }
}

function VitePluginPackageConfig(options: Options = {}): VitePluginPackageConfigPlugin {
  const {
    packageJsonPath = join(process.cwd(), 'package.json'),
    field = 'vite',
  } = options

  return {
    name: 'vite-plugin-package-config',
    async config() {
      if (!existsSync(packageJsonPath)) {
        debug('package.json not found')
        return
      }

      debug(`loading package.json at ${packageJsonPath}`)
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'))
      const extend = packageJson[field]
      if (!extend) {
        debug(`no "${field}" field found in package.json, skip`)
        return
      }

      debug('merging config with')
      debug(extend)
      return extend
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
