// Import Modules
import { VEActor } from "./actor/actor.js";
import { VEActorSheet } from "./actor/actor-sheet.js";
import { VEItem } from "./item/item.js";
import { VEItemSheet } from "./item/item-sheet.js";
import { preloadHandlebarsTemplates } from "./preloadtemplates.js";
import { registerSettings } from "./settings.js";
import { upgradeWorld } from "./upgrade.js";

Hooks.once('init', async function() {

  game.VE = {
    VEActor,
    VEItem,
    rollItemMacro
  };

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "@attributes.dex.value",
    decimals: 2
  };

  registerSettings();

  // Define custom Entity classes
  CONFIG.Actor.documentClass = VEActor;
  CONFIG.Item.documentClass = VEItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("vieja-escuela", VEActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("vieja-escuela", VEItemSheet, { makeDefault: true });

  // Handlebars helpers, we use prefix "ve_" to avoid problems with other modules
  Handlebars.registerHelper('ve_concat', function() {
    var outStr = '';
    for (var arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper('ve_toLowerCase', function(str) {
    return str.toLowerCase();
  });

  Handlebars.registerHelper('ve_max', function(num1, num2) {
    return Math.max(num1, num2);
  });

  await preloadHandlebarsTemplates();
});

Hooks.once("ready", async function() {
  upgradeWorld();
  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on("hotbarDrop", (bar, data, slot) => createVEMacro(data, slot));
});

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createVEMacro(data, slot) {
  if (data.type !== "Item") return;
  if (!("data" in data)) return ui.notifications.warn("You can only create macro buttons for owned Items");
  const item = data.data;

  // Create the macro command
  const command = `game.VE.rollItemMacro("${item.name}");`;
  let macro = game.macros.entities.find(m => (m.name === item.name) && (m.command === command));
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: "script",
      img: item.img,
      command: command,
      flags: { "VE.itemMacro": true }
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemName
 * @return {Promise}
 */
function rollItemMacro(itemName) {
  const speaker = ChatMessage.getSpeaker();
  let actor;
  if (speaker.token) actor = game.actors.tokens[speaker.token];
  if (!actor) actor = game.actors.get(speaker.actor);
  const item = actor ? actor.items.find(i => i.name === itemName) : null;
  if (!item) return ui.notifications.warn(`Your controlled Actor does not have an item named ${itemName}`);

  // Trigger the item roll
  return item.roll();
}