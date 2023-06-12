class Trinket {
  private slot: number;
  private trinket: AwfulItem | null;

  constructor(slot: number) {
    this.slot = slot;
    this.trinket = null;
  }

  private canUse(): boolean {
    const [start, , enable] = GetInventoryItemCooldown('player', this.slot);
    return enable === 1 && start === 0;
  }

  public use(ignoreGriefTorche = false): boolean {
    const player = awful.player;

    if (!this.canUse()) return false;

    const itemId = GetInventoryItemID('player', this.slot);
    if (this.trinket === null || this.trinket.id != itemId)
      this.trinket = awful.NewItem(itemId);

    if (this.trinket.casttime > 0 && player.moving) return false;

    if (ignoreGriefTorche === true && itemId === 194308) return false;

    if (this.trinket.Use(awful.target)) return true;

    return this.trinket.Use();
  }
}

export const trinket1 = new Trinket(13);
export const trinket2 = new Trinket(14);

const newItem = awful.NewItem;

export const healthStone = newItem(5512);

export const refreshingHealingPotionOne = newItem(191378);
export const refreshingHealingPotionTwo = newItem(191379);
export const refreshingHealingPotionThree = newItem(191380);

refreshingHealingPotionOne.Use();
