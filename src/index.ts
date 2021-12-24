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

function VitePluginPackageConfig(options: Options = {}): Plugin {
  const {
    packageJsonPath = join(process.cwd(), 'package.json'),
    field = 'vite',
  } = options

  return <Plugin>{
    name: 'vite-plugin-package-config',
    async config() {
      if (!existsSync(packageJsonPath)) {
        debug('package.json not found at %s', packageJsonPath)
        return
      }

      debug('loading package.json at %s', packageJsonPath)

      try {
        const packageJson: Record<string, any> = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'))
        const extend = packageJson[field]
        if (!extend) {
          debug('no %s field found in package.json, skip', field)
          return
        }

        debug('merging config with %o', extend)
        return extend
      }
      catch (e) {
        debug('parse error: %o', e)
        debug('error on loading package.json at %s, skip', packageJsonPath)
      }
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
