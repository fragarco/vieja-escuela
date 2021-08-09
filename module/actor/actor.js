/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class VEActor extends Actor {

  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    const actorData = this.data;
    const data = actorData.data;
    const flags = actorData.flags;

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    if (actorData.type === 'pc-base') this._prepareCharacterData(actorData);
    if (actorData.type === 'npc-base') this._prepareNonCharacterData(actorData);
  }

  /**
   * 
   * calculate encumbrance data 
   */
  _prepareEncumbranceData(actorData) {
    const data = actorData.data;

    data.encumbrance.max = data.attributes.str.value;
    // encumbrance due to coins
    const coins = data.money.gp + data.money.sp + data.money.cp;
    let encumbrance = Math.floor(coins/100);

    // encumbrance due to carried items
    for (let i of actorData.items) {
      const item = i.data;
      if (item.type === 'weapon' || item.type === 'armor' || item.type === 'gear') {
        if (!item.data.stored) {
          encumbrance = encumbrance + item.data.weight;
        }
      }
    }
    data.encumbrance.current = encumbrance;
  }

  /**
   * Calculate character attribute modificators
   */
   _prepareAttributesData(actorData) {
    const data = actorData.data;
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
    const data = actorData.data;
    let def = data.traits.def.base;
    for (let i of actorData.items) {
      const item = i.data;
      if (item.type === 'armor' && !item.data.stored) {
          def = def + item.data.defmod;
      }
    }
    data.traits.def.current = def;
  }

  /**
   * 
   * Calculate attack values for all equiped weapons.
   */
   _prepareAttackData(actorData) {
    const data = actorData.data;
    for (let i of actorData.items) {
      const item = i.data;
      const base = item.data.addmod + data.traits.atk.value;
      if (item.type === 'weapon') {
        switch(item.data.weapontype) {
          case "strtype":
            item.data.attackmod = base + data.attributes.str.mod;
            break;
          case "dextype":
            item.data.attackmod = base + data.attributes.dex.mod;
            break;
          case "othtype":
            item.data.attackmod = base;
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