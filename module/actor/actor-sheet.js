/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class VEActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["vieja-escuela", "sheet", "actor"],
      template: "systems/vieja-escuela/templates/actor/actor-sheet.html",
      width: 600,
      height: 600,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "bio" }]
    });
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    let isOwner = this.actor.isOwner;
    const data = super.getData();

    // Redefine the template data references to the actor.
    const actorData = this.actor.data.toObject(false);
    data.actor = actorData;
    data.data = actorData.data;
    data.rollData = this.actor.getRollData.bind(this.actor);

    // Owned items.
    data.items = actorData.items;
    data.items.sort((a, b) => (a.sort || 0) - (b.sort || 0));

    // Prepare items.
    if (this.actor.data.type == 'pc-fantasy') {
      this._prepareCharacterItems(data);
    }

    return data;
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareCharacterItems(sheetData) {
    const actorData = sheetData.actor;

    // Initialize containers.
    const gear = [];
    const weapons = [];
    const armor = [];
    const talents = [];
    const spells = [];

    // Iterate through items, allocating to containers
    for (let i of sheetData.items) {
      let item = i.data;
      i.img = i.img || DEFAULT_TOKEN;
      // Append to gear.
      switch (i.type) {
        case 'weapon':
          item.cacmod = item.addmod + actorData.data.attributes.str.mod;
          item.prjmod = item.addmod + actorData.data.attributes.dex.mod;
          gear.push(i);
          weapons.push(i);
          break;
        case 'armor':  gear.push(i); armor.push(i); break;
        case 'gear':   gear.push(i); break;
        case 'talent': talents.push(i); break;
        case 'spell':  spells.push(i); break;
      }
    }

    // Assign and return
    sheetData.gear = gear;
    sheetData.weapons = weapons;
    sheetData.armor = armor;
    sheetData.talents = talents;
    sheetData.spells = spells;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // Add Inventory Item
    html.find('.item-create').click(this._onItemCreate.bind(this));

    // Update Inventory Item
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.sheet.render(true);
    });

    // Delete Inventory Item
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.delete();
      li.slideUp(200, () => this.render(false));
    });

    // Rollable abilities.
    html.find('.rollable').click(this._onSimpleDualRoll.bind(this));
    html.find('.insroll').click(this._onInsRoll.bind(this));

    // Drag events for macros.
    if (this.actor.isOwner) {
      let handler = ev => this._onDragStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains("inventory-header")) return;
        li.setAttribute("draggable", true);
        li.addEventListener("dragstart", handler, false);
      });
    }
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      data: data
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.data["type"];

    // Finally, create the item!
    return await Item.create(itemData, {parent: this.actor});
  }

  /**
   * callback for clickable simple dual rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async _onSimpleDualRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    await this.__handleSimpleDualRoll(dataset);
  }

  /**
   * callback for INS rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async _onInsRoll(event) {
    const element = event.currentTarget;
    const dataset = element.dataset;
    const rolldata = this.actor.getRollData()
    renderTemplate("systems/vieja-escuela/templates/dialog/insroll.html")
    .then( (dlg) => {
      const callroll = (attribute, name) => {
        const newroll = dataset.roll + " + " + attribute;
        const newlabel = dataset.label + "/" + game.i18n.localize(name);
        this.__handleSimpleDualRoll({roll: newroll, label: newlabel});
      }
      new Dialog({
        title: game.i18n.localize('VEJDR.INSDialog'),
        content: dlg,
        buttons: {
          a: {
            label: game.i18n.localize('VEJDR.str'),
            callback: () => (callroll(rolldata.attributes.str.mod, "VEJDR.str")),
          },
          b: {
            label: game.i18n.localize('VEJDR.dex'),
            callback: () => (callroll(rolldata.attributes.dex.mod, "VEJDR.dex")),
          },
          c: {
            label: game.i18n.localize('VEJDR.con'),
            callback: () => (callroll(rolldata.attributes.con.mod, "VEJDR.con")),
          },
          d: {
            label: game.i18n.localize('VEJDR.int'),
            callback: () => (callroll(rolldata.attributes.int.mod, "VEJDR.int")),
          },
          e: {
            label: game.i18n.localize('VEJDR.wis'),
            callback: () => (callroll(rolldata.attributes.win.mod, "VEJDR.wis")),
          },
          f: {
            label: game.i18n.localize('VEJDR.cha'),
            callback: () => (callroll(rolldata.attributes.cha.mod, "VEJDR.cha")),
          },
        },
        default: 'str'
      }).render(true);
    });
  }

    /**
   * Handle simple dual rolls.
   * @param {DOMSTringMap} dataset originating click event
   * @private
   */
  async __handleSimpleDualRoll(dataset) {
    const rollingstr = game.i18n.localize("VEJDR.Rolling") 
    if (dataset.roll) {
      let roll1 = new Roll(dataset.roll, this.actor.getRollData());
      let roll2 = new Roll(dataset.roll, this.actor.getRollData());
      let label = dataset.label ? `${rollingstr} ${dataset.label}` : '';

      await roll1.evaluate({async: true});
      await roll2.evaluate({async: true});
      renderTemplate("systems/vieja-escuela/templates/dice/simpledualroll.html",{roll1, roll2})
      .then(
        (msg) => {
          ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: label,
            content: msg,
          });
        }
      );
    }
  }

}
