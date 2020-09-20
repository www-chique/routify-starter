import { createRollupConfigs } from './scripts/base.config.js'
import autoPreprocess from 'svelte-preprocess'
import postcssImport from 'postcss-import'
import smelte from 'smelte/rollup-plugin-smelte';

const production = !process.env.ROLLUP_WATCH;

export const config = {
  staticDir: 'static',
  distDir: 'dist',
  buildDir: `dist/build`,
  serve: !production,
  production,
  rollupWrapper: rollup => {
    rollup.plugins.push(
      smelte({
        purge: !production,
        output: "dist/global.css", // it defaults to static/global.css which is probably what you expect in Sapper 
        postcss: [], // Your PostCSS plugins
        whitelist: [], // Array of classnames whitelisted from purging
        whitelistPatterns: [], // Same as above, but list of regexes
        tailwind: {
          future: {
            removeDeprecatedGapUtilities: true,
            purgeLayersByDefault: true,
          },
          theme: {
            colors: {
              "dark-blue": "#2A2F39",
              "light-blue": "#303642",
              "deep-blue": "#20242b",
              "highlight": "#ec6e00"
            },
            transitionProperty: {
              'height': 'height',
              'spacing': 'margin, padding',
            }
          },
          colors: {
            primary: "#ec6e00",
            secondary: "#009688",
            error: "#f44336",
            success: "#4caf50",
            alert: "#ff9800",
            blue: "#2196f3",
            dark: "#2A2F39",
            background: "#303642"
          }, // Object of colors to generate a palette from, and then all the utility classes
          variants: {
            textColor: ['hover',],
            textDecoration: ['hover'],
            transitionProperty: ['responsive'],
            borderColor: ['focus-within'],
          }
        },
      })
    )
  },
  svelteWrapper: svelte => {
    svelte.preprocess = [
      autoPreprocess({
        postcss: { plugins: [postcssImport()] },
        defaults: { style: 'postcss' }
      })]
  },
  swWrapper: worker => worker,
}

const configs = createRollupConfigs(config)

export default configs

/**
  Wrappers can either mutate or return a config

  wrapper example 1
  svelteWrapper: (cfg, ctx) => {
    cfg.preprocess: mdsvex({ extension: '.md' }),
  }

  wrapper example 2
  rollupWrapper: cfg => {
    cfg.plugins = [...cfg.plugins, myPlugin()]
    return cfg
  }
*/


