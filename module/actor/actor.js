/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class VEActor extends Actor {

  /**
   * Calculate all derived actor data.
   * @inheritdoc
   */
  prepareDerivedData(options) {
    super.prepareDerivedData(options);
    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.

    const actorData = this;
    switch (actorData.type) {
      case 'player':
        this._prepareCharacterData(actorData);
        break;
      case 'non-player':
        this._prepareNonCharacterData(actorData);
        break;
    }
    this._applySelectedHack(actorData);
  }

  _applyDefaultHackSkills(data) {
    data.skills.alertness.label = "VEJDR.Alertness";
    data.skills.communication.label = "VEJDR.Communication";
    data.skills.lore.label = "VEJDR.Lore";
    data.skills.manipulation.label = "VEJDR.Manipulation";
    data.skills.stealth.label = "VEJDR.Stealth";
    data.skills.survival.label = "VEJDR.Survival";
  }

  _applyCyberHackSkills(data) {
    data.skills.alertness.label = "VEJDR.Corporate";
    data.skills.communication.label = "VEJDR.Cyber";
    data.skills.lore.label = "VEJDR.Hardware";
    data.skills.manipulation.label = "VEJDR.Punk";
    data.skills.stealth.label = "VEJDR.Savage";
    data.skills.survival.label = "VEJDR.Urban";
  }

  _applyStarsHackSkills(data) {
    data.skills.alertness.label = "VEJDR.Alertness";
    data.skills.communication.label = "VEJDR.Communication";
    data.skills.lore.label = "VEJDR.Lore";
    data.skills.manipulation.label = "VEJDR.Tech";
    data.skills.stealth.label = "VEJDR.Stealth";
    data.skills.survival.label = "VEJDR.Survival";
  }

  _applyDefaultHackCoins(data) {
    data.money.gplabel = "VEJDR.CostMO";
    data.money.splabel = "VEJDR.CostMP";
    data.money.cplabel = "VEJDR.CostMC";
  }

  /**
   * 
   * Apply configured hack differences
   */
  _applySelectedHack(actorData) {
    const hack = game.settings.get("vieja-escuela", "flavor");
    const data = actorData.system;
    switch (hack) {
      case 'fantasy':
        data.traits.mp.label = "VEJDR.MP";
        this._applyDefaultHackCoins(data);
        this._applyDefaultHackSkills(data);
        break;
      case 'pulp':
        data.traits.mp.label = "VEJDR.PULP";
        data.money.gplabel = "VEJDR.CostDOLAR";
        data.money.splabel = "";
        data.money.cplabel = "";
        this._applyDefaultHackSkills(data);
        break;
      case 'cyber':
        data.traits.mp.label = "VEJDR.POWERUPS";
        data.money.gplabel = "VEJDR.CostBIT";
        data.money.splabel = "";
        data.money.cplabel = "";
        this._applyCyberHackSkills(data);
        break;
      case 'stars':
        data.traits.mp.label = "VEJDR.MP";
        data.money.gplabel = "VEJDR.CostCR";
        data.money.splabel = "";
        data.money.cplabel = "";
        this._applyStarsHackSkills(data);
        break;
      case 'peplum':
        data.traits.mp.label = "VEJDR.PEPLUM";
        this._applyDefaultHackCoins(data);
        this._applyDefaultHackSkills(data);
        break;
      case 'piratas':
        data.traits.mp.label = "VEJDR.MP";
        this._applyDefaultHackCoins(data);
        this._applyDefaultHackSkills(data);
        break;
    }
  }

  /**
   * 
   * calculate encumbrance data 
   */
  _prepareEncumbranceData(actorData) {
    const data = actorData.system;

    data.encumbrance.max = data.attributes.str.value;
    // encumbrance due to coins
    const coins = data.money.gp + data.money.sp + data.money.cp;
    let encumbrance = Math.floor(coins/100);

    // encumbrance due to carried items
    for (let item of actorData.items) {
      if (item.type === 'weapon' || item.type === 'armor' || item.type === 'gear') {
        if (!item.system.stored) {
          encumbrance = encumbrance + item.system.weight;
        }
      }
    }
    data.encumbrance.current = encumbrance;
  }

  /**
   * Calculate character attribute modificators
   */
   _prepareAttributesData(actorData) {
    const data = actorData.system;
    const modscale = game.settings.get("vieja-escuela", "attribute-mods");
    // attribute mods
    for (let [key, attribute] of Object.entries(data.attributes)) {
      if (modscale === "basic") {
        // VE mods -2, -1, 0, +1, +2
        if (attribute.value <= 3) attribute.mod = -2;
        else if (attribute.value <= 6) attribute.mod = -1;
        else if (attribute.value <= 14) attribute.mod = 0;
        else if (attribute.value <= 17) attribute.mod = 1;
        else attribute.mod = 2;
      } else {
        // VE mods -3, -2, -1, 0, +1, +2. +3
        if (attribute.value <= 3) attribute.mod = -3;
        else if (attribute.value <= 5) attribute.mod = -2;
        else if (attribute.value <= 8) attribute.mod = -1;
        else if (attribute.value <= 12) attribute.mod = 0;
        else if (attribute.value <= 15) attribute.mod = 1;
        else if (attribute.value <= 17) attribute.mod = 2;
        else attribute.mod = 3;
      }
    }
  }

  /**
   * 
   * Calculate Defense value. It adds base value to armor equiped. 
   * Dex modificator should be added by hand by the user to the base value. 
   */
  _prepareDefenseData(actorData) {
    const data = actorData.system;
    let def = data.traits.def.base;
    for (let item of actorData.items) {
      if (item.type === 'armor' && !item.system.stored) {
          def = def + item.system.defmod;
      }
    }
    data.traits.def.current = def;
  }

  /**
   * 
   * Calculate attack values for all equiped weapons.
   */
   _prepareAttackData(actorData) {
    const data = actorData.system;
    for (let item of actorData.items) {
      const base = item.system.addmod + data.traits.atk.value;
      if (item.type === 'weapon') {
        switch(item.system.weapontype) {
          case "strtype":
            item.system.attackmod = base + data.attributes.str.mod;
            break;
          case "dextype":
            item.system.attackmod = base + data.attributes.dex.mod;
            break;
          case "othtype":
            item.system.attackmod = base;
            break;
        }
      }
    }
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    this._prepareAttributesData(actorData);
    this._prepareEncumbranceData(actorData);
    this._prepareDefenseData(actorData);
    this._prepareAttackData(actorData);
  }

    /**
   * Prepare Non Character type specific data
   */
    _prepareNonCharacterData(actorData) {
      this._prepareAttributesData(actorData);
      this._prepareDefenseData(actorData);
      this._prepareAttackData(actorData);
    }
}