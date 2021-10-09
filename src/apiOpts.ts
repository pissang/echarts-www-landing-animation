interface APIOpts {
  initialPieLayout?: {
    left: number | string;
    top: number | string;
    width: number | string;
    height: number | string;
  };
  initialPieAnimation?: boolean;
  updateURLHash?: boolean;
}

export type { APIOpts };

export const defaultApiOpts = {
  initialPieAnimation: true,
  updateURLHash: true,
  initialPieLayout: {
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
} as const;
