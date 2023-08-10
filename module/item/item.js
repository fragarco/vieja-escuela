/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class VEItem extends Item {
  /**
   * Calculate all derived item data.
   * @inheritdoc
   */
  prepareData(options) {
    super.prepareData(options);

    /* How can we access item data
    const itemData = this.system;
    const actorData = this.actor ? this.actor.system : {};
    const system = itemData.system;
    */
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async roll() {
    const item = this;
    if (item.type === "weapon") {
      this.handleAttackDualRoll({
        roll: "1d20 + " + item.system.attackmod,
        damage: item.system.damage,
        damagemod: item.system.damagetype,
        label: item.name
      });
    } else {
      const trail = item.system.notes !== undefined? "<hr/>" + item.system.notes : "";
      ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: "<h2>" + item.name + "</h2>",
        content: item.system.description + trail
      });
    }
  }

  /**
   * Handle simple dual rolls.
   * @param {DOMSTringMap} dataset originating click event
   * @private
   */
  async handleAttackDualRoll(dataset) {
    const rollingstr = game.i18n.localize("VEJDR.AttackWith");
    let damageroll = dataset.damage;
    if (dataset.damagemod && dataset.damagemod !== "othtype") {
      if (dataset.damagemod === "strtype") damageroll += " + @attributes.str.mod";
      if (dataset.damagemod === "dextype") damageroll += " + @attributes.dex.mod";
    }
    if (dataset.roll) {
      let roll1 = new Roll(dataset.roll, this.actor.getRollData());
      let roll2 = new Roll(dataset.roll, this.actor.getRollData());
      let damage = new Roll(damageroll, this.actor.getRollData());
      let label = dataset.label ? `${rollingstr} ${dataset.label}` : '';

      await roll1.evaluate({async: true});
      await roll2.evaluate({async: true});
      await damage.evaluate({async: true});
      // Prepare rolls in case Dice So Nice! is being used
      const rolls = [roll1,roll2]; //array of Roll
      const pool = PoolTerm.fromRolls(rolls);
      const dsnroll = Roll.fromTerms([pool]);
      renderTemplate("systems/vieja-escuela/templates/dice/attackdualroll.html",{roll1, roll2, damage})
      .then(
        (msg) => {
          ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            type: CONST.CHAT_MESSAGE_TYPES.ROLL,
            roll: dsnroll,
            flavor: label,
            content: msg,
          });
        }
      );
    }
  }
}
