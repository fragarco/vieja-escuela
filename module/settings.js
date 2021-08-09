export const registerSettings = function () {

  game.settings.register("vieja-escuela", "system-version", {
    name: game.i18n.localize("VEJDR.Setting.Version"),
    hint: game.i18n.localize("VEJDR.Setting.VersionHint"),
    scope: "world",
    config: true,
    default: 0,
    type: Number,
  });
};
