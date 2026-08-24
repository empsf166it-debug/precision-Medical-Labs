const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Shalani A\\Documents\\Shalan\\Own Websites(August)\\Precision Medical Labs';

let indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf-8');
let styleCss = fs.readFileSync(path.join(dir, 'style.css'), 'utf-8');
let appJs = fs.readFileSync(path.join(dir, 'app.js'), 'utf-8');

// 1. Replace tailwind config block in index.html
const oldConfigRegex = /colors:\s*{\s*gray:\s*{[^}]*},\s*medical:\s*{[^}]*}\s*},/s;
const newConfig = `colors: {
                        gray: {
                            50: '#FAF5FF',
                            100: '#F7F5F8',
                            200: '#EDE9FE',
                            300: '#DDD6E5',
                            400: '#B7AABD',
                            500: '#6B6472',
                            600: '#6B6472',
                            700: '#432550',
                            800: '#24132F',
                            900: '#292132',
                            950: '#160D1D',
                        },
                        medical: {
                            plum: '#4C1D5F',
                            purple: '#6D28A8',
                            violet: '#7C3AED',
                            lavender: '#F3E8FF',
                            accent: '#8B5CF6',
                            orchid: '#A855F7',
                            magenta: '#C084FC',
                            bgdark: '#160D1D',
                            carddark: '#24132F',
                            surfacedark: '#301A3D'
                        }
                    },`;

indexHtml = indexHtml.replace(oldConfigRegex, newConfig);

// 2. Replace classes in all files
const replacements = [
    // Replace medical specific colors
    { from: /medical-blue/g, to: 'medical-purple' },
    { from: /medical-teal/g, to: 'medical-violet' },
    { from: /medical-cyan/g, to: 'medical-lavender' },
    { from: /medical-navy/g, to: 'medical-plum' },
    { from: /medical-dark/g, to: 'medical-carddark' },
    { from: /dark:bg-medical-plum/g, to: 'dark:bg-medical-bgdark' }, // Fix dark mode bg
    { from: /dark:border-medical-plum/g, to: 'dark:border-gray-700' },
    
    // Replace default colors to remove blue, green, teal, yellow, orange
    { from: /-blue-/g, to: '-purple-' },
    { from: /-green-/g, to: '-fuchsia-' },
    { from: /-teal-/g, to: '-violet-' },
    { from: /-yellow-/g, to: '-purple-' },
    { from: /-orange-/g, to: '-fuchsia-' },
    { from: /-cyan-/g, to: '-lavender-' },
];

replacements.forEach(r => {
    indexHtml = indexHtml.replace(r.from, r.to);
    appJs = appJs.replace(r.from, r.to);
});

// Fix specific dark mode background overrides that got messed up by the global replacement
indexHtml = indexHtml.replace(/dark:bg-medical-purple/g, 'dark:bg-medical-accent');

// 3. Update style.css hardcoded values
styleCss = styleCss.replace(/#0B1F33/g, '#160D1D'); // Scrollbar track dark -> bgdark
styleCss = styleCss.replace(/#176B87/g, '#6D28A8'); // Nav link after -> royal purple
styleCss = styleCss.replace(/#DDF4F2/g, '#F3E8FF'); // Nav link after dark -> lavender
styleCss = styleCss.replace(/rgba\(17, 42, 70, 0.7\)/g, 'rgba(36, 19, 47, 0.7)'); // Glass card dark -> carddark hex to rgba

fs.writeFileSync(path.join(dir, 'index.html'), indexHtml);
fs.writeFileSync(path.join(dir, 'style.css'), styleCss);
fs.writeFileSync(path.join(dir, 'app.js'), appJs);

console.log('Colors replaced successfully!');
