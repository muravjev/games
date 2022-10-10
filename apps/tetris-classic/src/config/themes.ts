import type { Theme } from 'features/theme/theme';

type ThemeConfig = Readonly<Theme>;

export const themes: readonly ThemeConfig[] = [
    {
        id: 'classic',
        name: 'Classic',
        mode: 'light',
        palette: {
            primary: {
                main: '#24292f',
                light: '#6573c3',
                dark: '#2c387e'
            },
            secondary: {
                main: '#f50057',
                light: '#f73378',
                dark: '#ab003c'
            },
            background: {
                default: '#ffffff',
                paper: '#ffffff'
            },
            text: {
                primary: '#24292f',
                secondary: '#0f0',
                disabled: '#00f'
            }
        },
        logo: {
            color: '#000'
        },
        layout: {
            option: {
                background: '#f6f8fa', // paper
                border: '#d5d7da', // divider
                hover: {
                    background: '#f3f4f6',
                    border: '#d3d4d6'
                }
            }
        },
        game: {
            info: {
                caption: {
                    background: '#000',
                    color: '#fff'
                },
                digit: {
                    color: '#000'
                }
            }
        }
    },
    {
        id: 'light',
        name: 'Light',
        mode: 'light',
        palette: {
            primary: {
                main: '#3f51b5',
                light: '#6573C3',
                dark: '#2C387E'
            },
            secondary: {
                main: '#f50057',
                light: '#F73378',
                dark: '#AB003C'
            },
            background: {
                default: '#fafafa',
                paper: '#fff'
            },
            text: {
                primary: '#212121',
                secondary: 'rgba(0, 0, 0, 0.54)',
                disabled: '#a3a3a3'
            }
        },
        logo: {
            color: '#000'
        },
        layout: {
            option: {
                background: '#fafafa',
                border: '#9ba4d7',
                hover: {
                    background: '#f2f3f7',
                    border: '#3f51b5'
                }
            }
        },
        game: {
            info: {
                caption: {
                    background: '#000',
                    color: '#fff'
                },
                digit: {
                    color: '#000'
                }
            }
        }
    },
    {
        id: 'yellow',
        name: 'Yellow',
        mode: 'light',
        palette: {
            primary: {
                main: '#bf360c',
                light: '#cb5e3c',
                dark: '#852508'
            },
            secondary: {
                main: '#f50057',
                light: '#F73378',
                dark: '#AB003C'
            },
            background: {
                default: '#ffe082',
                paper: '#fff59d'
            },
            text: {
                primary: 'rgba(0, 0, 0, 0.87)',
                secondary: 'rgba(0, 0, 0, 0.54)',
                disabled: 'rgba(0, 0, 0, 0.38)'
            }
        },
        logo: {
            color: '#000'
        },
        layout: {
            option: {
                background: '#f7cb73',
                border: '#c9521f',
                hover: {
                    background: '#f1bc67',
                    border: '#bf360c'
                }
            }
        },
        game: {
            info: {
                caption: {
                    background: '#000',
                    color: '#fff'
                },
                digit: {
                    color: '#000'
                }
            }
        }
    },
    {
        id: 'dark',
        name: 'Dark',
        mode: 'dark',
        palette: {
            primary: {
                main: '#3f51b5',
                light: '#6573C3',
                dark: '#2C387E'
            },
            secondary: {
                main: '#f50057',
                light: '#F73378',
                dark: '#AB003C'
            },
            background: {
                default: '#303030',
                paper: '#424242'
            },
            text: {
                primary: '#fff',
                secondary: 'rgba(255, 255, 255, 0.7)',
                disabled: 'rgba(255, 255, 255, 0.5)'
            }
        },
        logo: {
            color: '#fff'
        },
        layout: {
            option: {
                background: '#21262d',
                border: '#373b42',
                hover: {
                    background: '#30363d',
                    border: '#8b949e'
                }
            }
        },
        game: {
            info: {
                caption: {
                    background: 'inherit',
                    color: 'inherit'
                },
                digit: {
                    color: '#fff'
                }
            }
        }
    },
    {
        id: 'github',
        name: 'Github',
        mode: 'dark',
        palette: {
            primary: {
                main: '#21262d',
                light: 'rgb(77, 81, 87)',
                dark: '#30363d',
                contrastText: '#f0f6fc'
            },
            secondary: {
                main: '#238636',
                light: 'rgb(79, 158, 94)',
                dark: '#2ea043'
            },
            background: {
                default: '#010409',
                paper: '#0d1117'
            },
            text: {
                primary: '#c9cfd2'
            }
        },
        logo: {
            color: '#fff'
        },
        layout: {
            option: {
                background: '#21262d',
                border: '#373b42',
                hover: {
                    background: '#30363d',
                    border: '#8b949e'
                }
            }
        },
        game: {
            info: {
                caption: {
                    background: 'inherit',
                    color: 'inherit'
                },
                digit: {
                    color: '#fff'
                }
            }
        }
    }
];
