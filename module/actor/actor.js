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
    if (actorData.type === 'pc-fantasy') this._prepareCharacterData(actorData);
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
      if (item.type === 'weapon-fantasy' || item.type === 'armor-fantasy' || item.type === 'gear-fantasy') {
        if (!item.data.stored) {
          encumbrance = encumbrance + item.data.weight;
        }
      }
    }
    data.encumbrance.current = encumbrance;
  }

  /**
   * Prepare Character type specific data
   */
   _prepareAttributesData(actorData) {
    const data = actorData.data;

    // attribute mods
    for (let [key, attribute] of Object.entries(data.attributes)) {
      // VE mods -2, -1, 0, +1, +2
      if (attribute.value <= 3) attribute.mod = -2;
      else if (attribute.value <= 6) attribute.mod = -1;
      else if (attribute.value <= 14) attribute.mod = 0;
      else if (attribute.value <= 17) attribute.mod = 1;
      else attribute.mod = 2;
    }
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    this._prepareAttributesData(actorData);
    this._prepareEncumbranceData(actorData);
  }
}