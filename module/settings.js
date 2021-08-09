export const registerSettings = function () {

  game.settings.register("vieja-escuela", "system-version", {
    name: game.i18n.localize("VEJDR.Setting.Version"),
    hint: game.i18n.localize("VEJDR.Setting.VersionHint"),
    scope: "world",
    config: true,
    default: 0,
    type: Number,
  });

  game.settings.register("vieja-escuela", "attribute-mods", {
    name: game.i18n.localize("VEJDR.Setting.AttribMods"),
    hint: game.i18n.localize("VEJDR.Setting.AttribModsHint"),
    default: "basic",
    scope: "world",
    type: String,
    config: true,
    choices: {
      basic: "VEJDR.Setting.BasicMods",
      hero: "VEJDR.Setting.HeroMods",
    }
  });
};
