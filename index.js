const stylus = require('stylus')
const nib = require('nib')
const rupture = require('rupture')

const addPlaceholders = (css) => css.replace(/%%(styled-jsx-placeholder-\d+)%%/g, '_$1_')

const removePlaceholders = (css) => css.replace(/_(styled-jsx-placeholder-\d+)_/g, '%%$1%%')

module.exports = (css, settings) => {
    const cssWithPlaceholders = addPlaceholders(css)

    let renderer = stylus(cssWithPlaceholders.toString())
        .use(nib())
        .import('nib')
        .use(rupture())
        .import('rupture')

    if (typeof settings.paths === 'object') {
        let path = 0
        for (path of settings.paths) {
            renderer = renderer.include(path)
        }
    }

    if (typeof settings.imports === 'object') {
        let importString = 0
        for (importString of settings.imports) {
            renderer = renderer.import(importString)
        }
    }

    const preprocessed = renderer.render()

    return removePlaceholders(preprocessed)
}
