export const preloadHandlebarsTemplates = async function () {
    const templatePaths = [
        //Character Sheets
        'systems/vieja-escuela/templates/actor/actor-sheet.html',
        'systems/vieja-escuela/templates/actor/actor-npc-sheet.html',
        'systems/vieja-escuela/templates/actor/pulp-sheet.html',
        'systems/vieja-escuela/templates/actor/pulp-npc-sheet.html',
        'systems/vieja-escuela/templates/actor/cyber-sheet.html',
        'systems/vieja-escuela/templates/actor/stars-sheet.html',
        'systems/vieja-escuela/templates/actor/peplum-sheet.html',
        //Actor partials
        'systems/vieja-escuela/templates/actor/sections/basic-header.html',
        //Sheet tabs
        'systems/vieja-escuela/templates/actor/sections/basic-skills.html',
        'systems/vieja-escuela/templates/actor/sections/cyber-skills.html',
        'systems/vieja-escuela/templates/actor/sections/basic-combat.html',
        'systems/vieja-escuela/templates/actor/sections/basic-gear.html',
        'systems/vieja-escuela/templates/actor/sections/basic-spells.html',
        'systems/vieja-escuela/templates/actor/sections/cyber-implants.html',
        'systems/vieja-escuela/templates/actor/sections/basic-bio.html',
        'systems/vieja-escuela/templates/actor/sections/npc-skills.html',
        'systems/vieja-escuela/templates/actor/sections/npc-combat.html'
    ];
    
    return loadTemplates(templatePaths);
};
