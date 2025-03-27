// component tokens for bos

export default {
  button: {
    colour: {
      primary: {
        background: {
          default: '#005ba2',
          hover: '#05286a',
          pressed: '#05286a',
          focus: '#05286a',
          disabled: '#f1f1f1'
        },
        text: {
          default: '#ffffff',
          disabled: '#767676'
        },
        border: {
          focus: '#00084d'
        }
      },
      secondary: {
        background: {
          default: '#ffffff',
          hover: '#f1f1f1',
          pressed: '#005ba2',
          focus: '#ffffff',
          disabled: '#adadad'
        },
        text: {
          default: '#005ba2',
          hover: '#00084d',
          disabled: '#767676',
          pressed: '#ffffff'
        },
        icon: {
          default: '#05286a'
        },
        border: {
          default: '#05286a',
          hover: '#05286a',
          focus: '#005ba2',
          focusInner: '#005ba2'
        }
      },
      tertiary: {
        background: {
          default: '#ffffff',
          active: '#05286a',
          inverse: '#ffffff'
        },
        border: {
          default: '#005ba2',
          active: '#05286a'
        }
      }
    },
    radius: {
      default: '0',
      focus: '0'
    },
    space: {
      focus: '0.313rem'
    },
    size: {
      smMinHeight: '3.000rem'
    },
    type: {
      medium: {
        fontSize: '1.125rem',
        lineHeight: '1.438rem'
      },
      small: {
        fontSize: '1.000rem',
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
        activeDisabled: '#f1f1f1'
      },
      border: {
        default: '#505050',
        hover: '#05286a',
        focusInner: '#05286a',
        focusOuter: '#05286a',
        disabled: '#767676',
        disabled2: '#adadad'
      },
      icon: {
        default: '#005ba2',
        disabled: '#adadad'
      }
    },
    border: {
      default: '0.063rem',
      selected: '0.125rem',
      focusInner: '0.063rem',
      focusOuter: '0.125rem'
    },
    radius: {
      default: '0',
      focus: '0'
    }
  },
  chip: {
    colour: {
      background: {
        default: '#05286a'
      },
      text: {
        default: '#ffffff'
      }
    }
  },
  input: {
    colour: {
      background: {
        default: '#ffffff',
        dim: '#f1f1f1',
        hover: '#767676',
        error: '#fef6f8',
        disabled: '#f1f1f1',
        disabled2: '#f1f1f1'
      },
      text: {
        inverse: '#ffffff'
      },
      border: {
        default: '#505050',
        subdued: '#adadad',
        active: '#505050',
        disabled: '#f1f1f1'
      }
    },
    border: {
      default: '0.063rem',
      active: '0.063rem'
    }
  },
  label: {
    colour: {
      background: {
        default: '#157eb3'
      },
      text: {
        default: '#ffffff'
      }
    }
  },
  masthead: {
    colour: {
      surface: {
        brand: '#05286a',
        brand2: '#f2f6fa',
        brand3: '#05286a'
      },
      size: {
        helphubNavHeight: '4.500rem'
      }
    }
  },
  menu: {
    colour: {
      background: {
        default: '#f2f6fa'
      },
      text: {
        default: '#05286a'
      },
      icon: {
        default: '#05286a'
      }
    }
  },
  notification: {
    border: {
      default: '0'
    },
    radius: {
      default: '0'
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
        default2: '#adadad',
        default3: '#ffffff',
        active: '#047457',
        dashedLine: '#767676'
      },
      text: {
        complete: '#000000',
        current: '#05286a',
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
        hover: '#005ba2',
        disabled: '#adadad'
      },
      radio: {
        default: '#505050',
        hover: '#00084d',
        focusInner: '#333333',
        focusOuter: '#00084d',
        disabled: '#505050',
        activeDisabled: '#767676'
      }
    },
    border: {
      default: '0.063rem',
      selected: '0.063rem',
      focusInner: '0.063rem',
      focusOuter: '0.125rem'
    }
  },
  selector: {
    colour: {
      background: {
        default: '#ffffff',
        hover: '#f1f1f1',
        active: '#ffffff',
        activeDisabled: '#f2f6fa',
        disabled: '#f1f1f1'
      },
      text: {
        default: '#005ba2',
        active: '#05286a',
        disabled: '#767676'
      },
      border: {
        default: '#505050',
        default2: '#505050',
        brand: '#05286a',
        current: '#adadad',
        disabled: '#505050',
        active: '#05286a',
        activeDisabled: '#005ba2'
      }
    },
    border: {
      default: '0.125rem',
      defaultInverse: '0',
      unselected: '0.063rem'
    },
    type: {
      selectortext: 'Demi'
    }
  },
  switch: {
    colour: {
      background: {
        inverse: '#ffffff',
        brand: '#005ba2',
        switchOff: '#ffffff',
        backgroundOff: '#767676',
        disabled: '#f1f1f1',
        activeDisabled: '#f2f6fa'
      }
    }
  },
  table: {
    colour: {
      background: {
        fixed: '#ffffff',
        fixedSubtle: '#ffffff',
        header: '#f2f6fa',
        active: '#005ba2',
        activeSubdued: '#f2f6fa',
        activeSubtle: '#f2f6fa'
      },
      text: {
        default: '#000000',
        header: '#00084d',
        inverse: '#ffffff',
        active: '#000000'
      },
      border: {
        default1: '#005ba2',
        default2: '#333333',
        brand: '#005ba2',
        active: '#005ba2'
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
        active: '#05286a'
      },
      text: {
        default: '#005ba2',
        active: '#ffffff'
      },
      border: {
        default: '#767676'
      }
    },
    border: {
      outer: '0.063rem',
      outerNone: '0',
      inner: '0'
    },
    radius: {
      inner: '0',
      outer: '0'
    },
    space: {
      default: '0'
    },
    type: {
      toggle: 'Demi'
    }
  }
}