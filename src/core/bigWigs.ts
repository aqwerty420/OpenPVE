enum BigWigsBars {
  Pull = 'Pull',
}

class BigWigsTimeLine {
  private bars: { [key: string]: BigWigsAnchorBar } = {};

  constructor() {
    awful.addUpdateCallback(() => {
      this.run();
    });
  }

  public run() {
    this.updateBars();
  }

  private updateBars() {
    if (BigWigsEmphasizeAnchor === undefined) return;

    for (const bar of BigWigsEmphasizeAnchor.bars) {
      if (
        bar.remaining > 0.1 &&
        (this.bars[bar.candyBarLabel.text] === undefined ||
          this.bars[bar.candyBarLabel.text].start != bar.start)
      )
        this.bars[bar.candyBarLabel.text] = bar;
    }

    // Remove old bars
    for (const barName in this.bars) {
      if (this.bars[barName].remaining < 0.1) delete this.bars[barName];
    }
  }

  public pullTimer(): number {
    return this.bars[BigWigsBars.Pull]
      ? this.bars[BigWigsBars.Pull].remaining
      : 0;
  }
}

export const bigWigsTimeLine = new BigWigsTimeLine();
