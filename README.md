# vite-plugin-package-config

[![NPM version](https://img.shields.io/npm/v/vite-plugin-package-config?color=a1b858&label=)](https://www.npmjs.com/package/vite-plugin-package-config)

Extend Vite config from your package.json `vite` field.

```jsonc
// package.json
{
  // ...
  "vite": {
    "resolve": {
      "alias": {
        "~/": "src/"
      }
    },
    "build": {
      "output": "dist/"
    }
  }
}
```

## Install

```bash
npm i -D vite-plugin-package-config
```

Add plugin to your `vite.config.ts`:

```ts
// vite.config.ts
import PkgConfig from 'vite-plugin-package-config'

export default {
  plugins: [
    PkgConfig()
  ]
}
```

## Why?

Well, I know you can always have those configurations in your `vite.config.ts` file. But, aware the file is in JavaScript / TypeScript, it is not that friendly to be statically analyzed. By putting some of the static configurations in your `package.json` file, you can have it shareable for other scripts and tools (or even manipulate it) by simply loading and parsing the JSON file.

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2021 [Anthony Fu](https://github.com/antfu)
