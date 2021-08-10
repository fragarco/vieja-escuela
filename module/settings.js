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
    },
    onChange: _ => window.location.reload()
  });

  game.settings.register("vieja-escuela", "flavor", {
    name: game.i18n.localize("VEJDR.Setting.Flavor"),
    hint: game.i18n.localize("VEJDR.Setting.FlavorHint"),
    default: "fantasy",
    scope: "world",
    type: String,
    config: true,
    choices: {
      fantasy: "Vieja Escuela (Fantasy)",
      pulp: "VE Pulp!",
      cyber: "VE Cyberpunk",
      stars: "Vieja Estrella",
      peplum: "VE Peplum",
      piratas: "VE Piratas"
    },
    onChange: _ => window.location.reload()
  });
};
