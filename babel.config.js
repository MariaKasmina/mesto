const presets = [
    ['@babel/preset-env', { // какой пресет использовать
        targets: { // какие версии браузеров поддерживать
            edge: '17',
            ie: '11',
            firefox: '50',
            chrome: '96',
            safari: '11.1'
        },
        useBuiltIns: "entry"
    }]
];

module.exports = { presets };