// component tokens for moja

export default {
  button: {
    colour: {
      primary: {
        background: {
          default: '#27dcae',
          hover: '#5de5c2',
          pressed: '#27dcae',
          focus: '#27dcae',
          disabled: '#e6e6e6'
        },
        text: {
          default: '#000000',
          disabled: '#767676'
        },
        border: {
          focus: '#000000'
        }
      },
      secondary: {
        background: {
          default: '#ffffff',
          hover: '#f2f2f2',
          pressed: '#000000',
          focus: '#ffffff',
          disabled: '#e6e6e6'
        },
        text: {
          default: '#000000',
          hover: '#000000',
          disabled: '#767676',
          pressed: '#ffffff'
        },
        icon: {
          default: '#000000'
        },
        border: {
          default: '#000000',
          hover: '#404040',
          focus: '#000000',
          focusInner: '#000000'
        }
      },
      tertiary: {
        background: {
          default: '#ffffff',
          active: '#068482',
          inverse: '#000000'
        },
        border: {
          default: '#000000',
          active: '#068482'
        }
      }
    },
    radius: {
      default: '4.000rem',
      focus: '4.000rem'
    },
    space: {
      focus: '0'
    },
    size: {
      smMinHeight: '1.875rem'
    },
    type: {
      medium: {
        fontSize: '1.000rem',
        lineHeight: '1.500rem'
      },
      small: {
        fontSize: '0.875rem',
        lineHeight: '1.000rem'
      },
      tiny: {
        fontSize: '0.750rem',
        lineHeight: '1.000rem'
      },
      tag: {
        fontSize: '0.750rem',
        lineHeight: '1.000rem'
      }
    }
  },
  card: {
    border: {
      default: '0.063rem',
      inverse: '0'
    },
    space: {
      default: '0',
      smNegative: '1.000rem',
      smPositive: '0'
    }
  },
  checkbox: {
    colour: {
      background: {
        default: '#ffffff',
        hover: '#068482',
        disabled: '#ffffff',
        activeDisabled: '#82c1c0'
      },
      border: {
        default: '#767676',
        hover: '#068482',
        focusInner: '#068482',
        focusOuter: '#000000',
        disabled: '#bfbfbf',
        disabled2: '#82c1c0'
      },
      icon: {
        default: '#ffffff',
        disabled: '#ffffff'
      }
    },
    border: {
      default: '0.125rem',
      selected: '0.125rem',
      focusInner: '0.125rem',
      focusOuter: '0.125rem'
    },
    radius: {
      default: '0.250rem',
      focus: '0.375rem'
    }
  },
  chip: {
    colour: {
      background: {
        default: '#3de0b7'
      },
      text: {
        default: '#000000'
      }
    }
  },
  input: {
    colour: {
      background: {
        default: '#ffffff',
        dim: '#e6e6e6',
        hover: '#068482',
        error: '#fdeae9',
        disabled: '#f2f2f2',
        disabled2: '#f2f2f2'
      },
      text: {
        inverse: '#ffffff'
      },
      border: {
        default: '#767676',
        subdued: '#bfbfbf',
        active: '#068482',
        disabled: '#f2f2f2'
      }
    },
    border: {
      default: '0.063rem',
      active: '0.125rem'
    }
  },
  label: {
    colour: {
      background: {
        default: '#27dcae'
      },
      text: {
        default: '#000000'
      }
    }
  },
  masthead: {
    colour: {
      surface: {
        brand: '#27dcae',
        brand2: '#c9f6ea',
        brand3: '#000000'
      },
      size: {
        helphubNavHeight: '4.500rem'
      }
    }
  },
  menu: {
    colour: {
      background: {
        default: '#000000'
      },
      text: {
        default: '#ffffff'
      },
      icon: {
        default: '#ffffff'
      }
    }
  },
  notification: {
    border: {
      default: '0'
    },
    radius: {
      default: '0.750rem'
    }
  },
  panel: {
    radius: {
      default: '0'
    }
  },
  progressStep: {
    colour: {
      background: {
        default: '#f2f2f2',
        default2: '#e6e6e6',
        default3: '#000000',
        active: '#27dcae',
        dashedLine: '#27dcae'
      },
      text: {
        complete: '#767676',
        current: '#000000',
        remaining: '#767676'
      }
    },
    border: {
      mojaLbg: '0',
      inner: '0'
    }
  },
  radio: {
    colour: {
      background: {
        default: '#ffffff',
        hover: '#068482',
        disabled: '#82c1c0'
      },
      radio: {
        default: '#767676',
        hover: '#068482',
        focusInner: '#068482',
        focusOuter: '#27dcae',
        disabled: '#bfbfbf',
        activeDisabled: '#82c1c0'
      }
    },
    border: {
      default: '0.125rem',
      selected: '0.125rem',
      focusInner: '0.125rem',
      focusOuter: '0.125rem'
    }
  },
  selector: {
    colour: {
      background: {
        default: '#ffffff',
        hover: '#f2f2f2',
        active: '#eafcf7',
        activeDisabled: '#f4fdfb',
        disabled: '#f2f2f2'
      },
      text: {
        default: '#000000',
        active: '#000000',
        disabled: '#bfbfbf'
      },
      border: {
        default: '#ffffff',
        default2: '#ffffff',
        brand: '#27dcae',
        current: '#bfbfbf',
        disabled: '#f2f2f2',
        active: '#068482',
        activeDisabled: '#82c1c0'
      }
    },
    border: {
      default: '0.125rem',
      defaultInverse: '0.125rem',
      unselected: '0'
    },
    type: {
      selectortext: 'Regular'
    }
  },
  switch: {
    colour: {
      background: {
        inverse: '#ffffff',
        brand: '#068482',
        switchOff: '#ffffff',
        backgroundOff: '#767676',
        disabled: '#e6e6e6',
        activeDisabled: '#82c1c0'
      }
    }
  },
  table: {
    colour: {
      background: {
        fixed: '#ffffff',
        fixedSubtle: '#e6e6e6',
        header: '#1a1a1a',
        active: '#068482',
        activeSubdued: '#eafcf7',
        activeSubtle: '#eafcf7'
      },
      text: {
        default: '#000000',
        header: '#ffffff',
        inverse: '#ffffff',
        active: '#000000'
      },
      border: {
        default1: '#767676',
        default2: '#767676',
        brand: '#27dcae',
        active: '#068482'
      }
    }
  },
  tile: {
    size: {
      minHeight: '11.375rem'
    }
  },
  toggle: {
    colour: {
      background: {
        default: '#f2f2f2',
        active: '#068482'
      },
      text: {
        default: '#767676',
        active: '#ffffff'
      },
      border: {
        default: '#ffffff'
      }
    },
    border: {
      outer: '0',
      outerNone: '0',
      inner: '0'
    },
    radius: {
      inner: '4.000rem',
      outer: '4.000rem'
    },
    space: {
      default: '0'
    },
    type: {
      toggle: 'Bold'
    }
  }
}