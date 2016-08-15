/**
 * Process CSS/Script stats according to environment.
 */
const css = [];
const scripts = [];

if (process.env.NODE_ENV === 'production') {
    // on production, include scripts and css from the webpack stats
    const config = require('./prod.config');
    const stats = require('../static/dist/stats.json');
    scripts.push(`${config.output.publicPath}${stats.main}`);
    css.push(`${config.output.publicPath}${stats.css}`);
}
else {
    // on development, use the webpack dev server config
    // css are not needed since they are injected inline with webpack
    const {config} = require('./dev.config');
    scripts.push(`${config.output.publicPath}${config.output.filename}`);
}

/**
 * Export.
 */
export default {
    css: css,
    scripts: scripts
};
