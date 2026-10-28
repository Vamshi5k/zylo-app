/** Fixed dimensions shared across screens and components. */
export const layout = {
  controlHeight: {
    button: 48,
    input: 50,
    iconButton: 44,
  },
  iconSize: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 22,
    xl: 24,
  },
  tabBar: {
    height: 62,
    paddingTop: 8,
    paddingBottom: 6,
  },
  thumbnail: {
    size: 76,
  },
  stepper: {
    buttonSize: 32,
  },
  avatar: {
    size: 72,
  },
  badge: {
    size: 18,
  },
  productDetail: {
    galleryHeightRatio: 0.6,
    galleryMinHeight: 420,
    galleryMaxHeight: 640,
    /** Magnification of the close-up gallery views. */
    detailZoom: 1.9,
    sizeBox: 52,
    relatedCardWidth: 150,
  },
  explore: {
    bannerHeightRatio: 0.42,
    bannerMinHeight: 300,
    bannerMaxHeight: 400,
    bubbleSize: 68,
    listThumbWidth: 96,
    listThumbHeight: 120,
    toggleSize: 36,
  },
  checkoutStep: {
    segmentHeight: 4,
  },
  stackedThumb: {
    size: 44,
    overlap: 14,
    max: 3,
  },
  orderThumb: {
    width: 64,
    height: 80,
  },
  timeline: {
    dotSize: 14,
    lineWidth: 2,
  },
  success: {
    size: 88,
  },
  emptyState: {
    archWidth: 132,
    archHeight: 180,
  },
  deliveryBar: {
    height: 6,
  },
  home: {
    heroHeightRatio: 0.74,
    heroMaxHeight: 720,
    heroMinHeight: 480,
    marqueeHeight: 44,
    spotlightAspectRatio: 0.9,
    categoryRowHeight: 76,
    statementMarkSize: 120,
    archWidth: 172,
    archHeight: 252,
    /** Vertical offset of the second product column, for the staggered grid. */
    staggerOffset: 32,
  },
  floatingTabBar: {
    itemHeight: 52,
    maxWidth: 440,
    /** Extra space between the bar and the bottom safe-area edge. */
    bottomGap: 8,
    iconSize: 22,
  },
  dot: {
    size: 5,
    offset: 9,
  },
  hero: {
    minHeight: 340,
    textMaxWidth: 230,
  },
  statement: {
    textMaxWidth: 270,
  },
  productCard: {
    width: "48.2%",
    aspectRatio: 0.78,
  },
  pagination: {
    dotSize: 8,
    activeDotWidth: 24,
  },
  onboarding: {
    imageHeightRatio: 0.52,
    imageMaxHeight: 520,
  },
  opacity: {
    watermark: 0.8,
    disabled: 0.5,
  },
  borderWidth: 1,
} as const;
