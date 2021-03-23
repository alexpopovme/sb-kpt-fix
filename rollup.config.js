import pkg from './package.json'
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'iife',
  },
  plugins: [
    terser( {
      format: {
        preamble: `/*
  ${pkg.name} v${pkg.version}
  ${pkg.description}
  Copyright (c) 2021-present ${pkg.author}
*/`
      }
      }),
    copy({
      targets: [
        { src: 'src/index.html', dest: 'dist' }
      ]
    })
  ]
}
