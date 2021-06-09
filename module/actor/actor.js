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
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    const data = actorData.data;

    for (let [key, attribute] of Object.entries(data.attributes)) {
      // VE mods -2, -1, 0, +1, +2
      if (attribute.value <= 3) attribute.mod = -2;
      else if (attribute.value <= 6) attribute.mod = -1;
      else if (attribute.value <= 14) attribute.mod = 0;
      else if (attribute.value <= 17) attribure.mod = 1;
      else attribute.mod = 2;
    }
  }
}