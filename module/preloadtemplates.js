export const preloadHandlebarsTemplates = async function () {
    const templatePaths = [
        //Character Sheets
        'systems/vieja-escuela/templates/actor/actor-sheet.html',
        //Actor partials
        'systems/vieja-escuela/templates/actor/sections/basic-header.html',
        //Sheet tabs
    ];
    
    return loadTemplates(templatePaths);
};
