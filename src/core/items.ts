export interface TrinketOptions {
  ignoreGriefTorche?: boolean;
}

const trinketsCache: Record<number, AwfulItem> = {};

class Trinket {
  private readonly slot: number;
  private readonly options: TrinketOptions;
  private trinket?: AwfulItem;

  constructor(slot: number, options?: TrinketOptions) {
    this.slot = slot;
    this.options = options ?? {};
    this.updateAwfulItem();
  }

  private getAwfulItem(): AwfulItem | undefined {
    const itemId = GetInventoryItemID('player', this.slot);

    if (itemId === 0) return undefined;

    if (trinketsCache[itemId] !== undefined) return trinketsCache[itemId];

    const item = awful.NewItem(itemId);
    trinketsCache[itemId] = item;

    return awful.NewItem(itemId);
  }

  private updateAwfulItem(): void {
    this.trinket = this.getAwfulItem();
  }

  private canUse(): boolean {
    const [start, , enable] = GetInventoryItemCooldown('player', this.slot);
    return enable === 1 && start === 0;
  }

  private ignoreGriefTorche(options?: TrinketOptions): boolean {
    const ignoreGriefTorche =
      options?.ignoreGriefTorche ?? this.options.ignoreGriefTorche;
    return ignoreGriefTorche === true && this.trinket?.id === 194308;
  }

  public use(options?: TrinketOptions): boolean {
    const player = awful.player;

    if (!this.canUse()) return false;

    this.updateAwfulItem();

    if (this.trinket === undefined) return false;

    if (this.trinket.casttime > 0 && player.moving) return false;

    if (this.ignoreGriefTorche(options)) return false;

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
