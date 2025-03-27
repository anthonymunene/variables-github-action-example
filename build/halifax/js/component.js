// component tokens for halifax

export default {
  button: {
    colour: {
      primary: {
        background: {
          default: '#005eb8',
          hover: '#071d49',
          pressed: '#005eb8',
          focus: '#005eb8',
          disabled: '#e1e4e9'
        },
        text: {
          default: '#ffffff',
          disabled: '#596682'
        },
        border: {
          focus: '#b67fca'
        }
      },
      secondary: {
        background: {
          default: '#ffffff',
          hover: '#e1e4e9',
          pressed: '#005eb8',
          focus: '#ffffff',
          disabled: '#b5bbc8'
        },
        text: {
          default: '#005eb8',
          hover: '#071d49',
          disabled: '#596682',
          pressed: '#ffffff'
        },
        icon: {
          default: '#071d49'
        },
        border: {
          default: '#071d49',
          hover: '#071d49',
          focus: '#b67fca',
          focusInner: '#005eb8'
        }
      },
      tertiary: {
        background: {
          default: '#ffffff',
          active: '#005eb8',
          inverse: '#ffffff'
        },
        border: {
          default: '#071d49',
          active: '#005eb8'
        }
      }
    },
    radius: {
      default: '4.000rem',
      focus: '4.000rem'
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
        lineHeight: '1.500rem'
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
        activeDisabled: '#e1e4e9'
      },
      border: {
        default: '#838ea4',
        hover: '#071d49',
        focusInner: '#071d49',
        focusOuter: '#b67fca',
        disabled: '#838ea4',
        disabled2: '#b5bbc8'
      },
      icon: {
        default: '#005eb8',
        disabled: '#b5bbc8'
      }
    },
    border: {
      default: '0.125rem',
      selected: '0.125rem',
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
        default: '#071d49'
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
        dim: '#e1e4e9',
        hover: '#4698e8',
        error: '#fae6ed',
        disabled: '#e1e4e9',
        disabled2: '#e1e4e9'
      },
      text: {
        inverse: '#ffffff'
      },
      border: {
        default: '#838ea4',
        subdued: '#b5bbc8',
        active: '#071d49',
        disabled: '#e1e4e9'
      }
    },
    border: {
      default: '0.125rem',
      active: '0.125rem'
    }
  },
  label: {
    colour: {
      background: {
        default: '#4698e8'
      },
      text: {
        default: '#ffffff'
      }
    }
  },
  masthead: {
    colour: {
      surface: {
        brand: '#005eb8',
        brand2: '#edf6ff',
        brand3: '#005eb8'
      },
      size: {
        helphubNavHeight: '4.500rem'
      }
    }
  },
  menu: {
    colour: {
      background: {
        default: '#071d49'
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
      default: '0.125rem'
    },
    radius: {
      default: '0.500rem'
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
        default: '#e1e4e9',
        default2: '#b5bbc8',
        default3: '#ffffff',
        active: '#24a973',
        dashedLine: '#838ea4'
      },
      text: {
        complete: '#071d49',
        current: '#005eb8',
        remaining: '#838ea4'
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
        hover: '#005eb8',
        disabled: '#b5bbc8'
      },
      radio: {
        default: '#596682',
        hover: '#071d49',
        focusInner: '#838ea4',
        focusOuter: '#b67fca',
        disabled: '#838ea4',
        activeDisabled: '#838ea4'
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
        hover: '#e1e4e9',
        active: '#ffffff',
        activeDisabled: '#edf6ff',
        disabled: '#e1e4e9'
      },
      text: {
        default: '#005eb8',
        active: '#071d49',
        disabled: '#838ea4'
      },
      border: {
        default: '#b5bbc8',
        default2: '#b5bbc8',
        brand: '#005eb8',
        current: '#b5bbc8',
        disabled: '#838ea4',
        active: '#005eb8',
        activeDisabled: '#071d49'
      }
    },
    border: {
      default: '0.125rem',
      defaultInverse: '0',
      unselected: '0.125rem'
    },
    type: {
      selectortext: 'Semibold'
    }
  },
  switch: {
    colour: {
      background: {
        inverse: '#ffffff',
        brand: '#005eb8',
        switchOff: '#ffffff',
        backgroundOff: '#838ea4',
        disabled: '#e1e4e9',
        activeDisabled: '#edf6ff'
      }
    }
  },
  table: {
    colour: {
      background: {
        fixed: '#ffffff',
        fixedSubtle: '#ffffff',
        header: '#edf6ff',
        active: '#005eb8',
        activeSubdued: '#edf6ff',
        activeSubtle: '#edf6ff'
      },
      text: {
        default: '#000000',
        header: '#071d49',
        inverse: '#ffffff',
        active: '#000000'
      },
      border: {
        default1: '#005eb8',
        default2: '#005eb8',
        brand: '#005eb8',
        active: '#005eb8'
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
        active: '#071d49'
      },
      text: {
        default: '#005eb8',
        active: '#ffffff'
      },
      border: {
        default: '#838ea4'
      }
    },
    border: {
      outer: '0.125rem',
      outerNone: '0',
      inner: '0.125rem'
    },
    radius: {
      inner: '4.000rem',
      outer: '4.000rem'
    },
    space: {
      default: '0.250rem'
    },
    type: {
      toggle: 'Semibold'
    }
  }
}