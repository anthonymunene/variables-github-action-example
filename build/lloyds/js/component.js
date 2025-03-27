// component tokens for lloyds

export default {
  button: {
    colour: {
      primary: {
        background: {
          default: '#000000',
          hover: '#323232',
          pressed: '#000000',
          focus: '#000000',
          disabled: '#c9c9c9'
        },
        text: {
          default: '#ffffff',
          disabled: '#767676'
        },
        border: {
          focus: '#000000'
        }
      },
      secondary: {
        background: {
          default: '#ffffff',
          hover: '#f1f1f1',
          pressed: '#000000',
          focus: '#ffffff',
          disabled: '#c9c9c9'
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
          hover: '#323232',
          focus: '#000000',
          focusInner: '#000000'
        }
      },
      tertiary: {
        background: {
          default: '#ffffff',
          active: '#000000',
          inverse: '#ffffff'
        },
        border: {
          default: '#000000',
          active: '#000000'
        }
      }
    },
    radius: {
      default: '0.750rem',
      focus: '1.000rem'
    },
    space: {
      focus: '0.313rem'
    },
    size: {
      smMinHeight: '3.000rem'
    },
    type: {
      medium: {
        fontSize: '1.063rem',
        lineHeight: '1.375rem'
      },
      small: {
        fontSize: '0.938rem',
        lineHeight: '1.250rem'
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
      default: '0',
      inverse: '0.063rem'
    },
    space: {
      default: '1.500rem',
      smNegative: '0',
      smPositive: '1.000rem'
    }
  },
  checkbox: {
    colour: {
      background: {
        default: '#ffffff',
        hover: '#ffffff',
        disabled: '#ffffff',
        activeDisabled: '#a8a8a8'
      },
      border: {
        default: '#000000',
        hover: '#000000',
        focusInner: '#000000',
        focusOuter: '#000000',
        disabled: '#a8a8a8',
        disabled2: '#a8a8a8'
      },
      icon: {
        default: '#000000',
        disabled: '#ffffff'
      }
    },
    border: {
      default: '0.063rem',
      selected: '0.063rem',
      focusInner: '0.125rem',
      focusOuter: '0.125rem'
    },
    radius: {
      default: '0.375rem',
      focus: '0.500rem'
    }
  },
  chip: {
    colour: {
      background: {
        default: '#11b67a'
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
        dim: '#f1f1f1',
        hover: '#000000',
        error: '#fff6f5',
        disabled: '#f5f5f5',
        disabled2: '#f1f1f1'
      },
      text: {
        inverse: '#ffffff'
      },
      border: {
        default: '#000000',
        subdued: '#c9c9c9',
        active: '#000000',
        disabled: '#f1f1f1'
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
        default: '#6cf479'
      },
      text: {
        default: '#000000'
      }
    }
  },
  masthead: {
    colour: {
      surface: {
        brand: '#11b67a',
        brand2: '#ffffff',
        brand3: '#ffffff'
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
      default: '0.063rem'
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
        default: '#f1f1f1',
        default2: '#767676',
        default3: '#ffffff',
        active: '#10a870',
        dashedLine: '#767676'
      },
      text: {
        complete: '#000000',
        current: '#000000',
        remaining: '#767676'
      }
    },
    border: {
      mojaLbg: '0.063rem',
      inner: '0.375rem'
    }
  },
  radio: {
    colour: {
      background: {
        default: '#ffffff',
        hover: '#000000',
        disabled: '#a8a8a8'
      },
      radio: {
        default: '#000000',
        hover: '#000000',
        focusInner: '#000000',
        focusOuter: '#000000',
        disabled: '#c9c9c9',
        activeDisabled: '#a8a8a8'
      }
    },
    border: {
      default: '0.063rem',
      selected: '0.063rem',
      focusInner: '0.125rem',
      focusOuter: '0.125rem'
    }
  },
  selector: {
    colour: {
      background: {
        default: '#ffffff',
        hover: '#f1f1f1',
        active: '#ffffff',
        activeDisabled: '#f5f5f5',
        disabled: '#f5f5f5'
      },
      text: {
        default: '#000000',
        active: '#000000',
        disabled: '#a8a8a8'
      },
      border: {
        default: '#ffffff',
        default2: '#a8a8a8',
        brand: '#11b67a',
        current: '#c0c0c0',
        disabled: '#f5f5f5',
        active: '#000000',
        activeDisabled: '#a8a8a8'
      }
    },
    border: {
      default: '0.125rem',
      defaultInverse: '0',
      unselected: '0.063rem'
    },
    type: {
      selectortext: 'Regular'
    }
  },
  switch: {
    colour: {
      background: {
        inverse: '#ffffff',
        brand: '#000000',
        switchOff: '#000000',
        backgroundOff: '#ffffff',
        disabled: '#f5f5f5',
        activeDisabled: '#c0c0c0'
      }
    }
  },
  table: {
    colour: {
      background: {
        fixed: '#ffffff',
        fixedSubtle: '#f1f1f1',
        header: '#323232',
        active: '#000000',
        activeSubdued: '#c7ffc6',
        activeSubtle: '#ffffff'
      },
      text: {
        default: '#000000',
        header: '#ffffff',
        inverse: '#ffffff',
        active: '#000000'
      },
      border: {
        default1: '#000000',
        default2: '#767676',
        brand: '#11b67a',
        active: '#000000'
      }
    }
  },
  tile: {
    size: {
      minHeight: '12.625rem'
    }
  },
  toggle: {
    colour: {
      background: {
        default: '#ffffff',
        active: '#000000'
      },
      text: {
        default: '#000000',
        active: '#ffffff'
      },
      border: {
        default: '#000000'
      }
    },
    border: {
      outer: '0.063rem',
      outerNone: '0',
      inner: '0'
    },
    radius: {
      inner: '0',
      outer: '0.750rem'
    },
    space: {
      default: '0'
    },
    type: {
      toggle: 'Regular'
    }
  }
}