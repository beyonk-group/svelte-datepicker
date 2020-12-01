'use strict'

class CalendarStyle {
  constructor (overrides = {}) {
    this.style = ''
    this.buttonBackgroundColor = '#fff'
    this.buttonBorderColor = '#eee'
    this.buttonTextColor = '#333'
    this.highlightColor = '#f7901e'
    this.passiveHighlightColor = '#FCD9B1'

    this.dayBackgroundColor = 'none'
    this.dayTextColor = '#4a4a4a'
    this.dayHighlightedBackgroundColor = '#efefef'
    this.dayHighlightedTextColor = '#4a4a4a'

    this.nightModeTextColor = 'white'
    this.nightModeBackgroundColor = '#808080'

    this.timeConfirmButtonColor = '#2196F3'
    this.timeConfirmButtonTextColor = '#fff'

    this.toolbarBorderColor = '#888'

    Object.entries(overrides).forEach(([ prop, value ]) => {
      this[prop] = value
    })
  }

  toWrapperStyle () {
    return `
      --button-background-color: ${this.buttonBackgroundColor};
      --button-border-color: ${this.buttonBorderColor};
      --button-text-color: ${this.buttonTextColor};
      --highlight-color: ${this.highlightColor};
      --passive-highlight-color: ${this.passiveHighlightColor};

      --day-background-color: ${this.dayBackgroundColor};
      --day-text-color: ${this.dayTextColor};
      --day-highlighted-background-color: ${this.dayHighlightedBackgroundColor};
      --day-highlighted-text-color: ${this.dayHighlightedTextColor};

      --night-mode-text-color: ${this.nightModeTextColor};
      --night-mode-background-color: ${this.nightModeBackgroundColor};

      --time-confirm-button-text-color: ${this.timeConfirmButtonTextColor};
      --time-confirm-button-color: ${this.timeConfirmButtonColor};

      --toolbar-border-color: ${this.toolbarBorderColor};
      ${this.style}
    `
  }
}

export {
  CalendarStyle
}
