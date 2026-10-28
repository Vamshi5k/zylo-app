# ZYLO

**Less, but better.** A minimal fashion store for iOS and Android, built with Expo and React Native.

ZYLO covers the whole shopping journey: onboarding, sign-in, browsing curated collections, a wishlist, a cart, three-step checkout and order tracking. Prices are in Indian rupees, and checkout offers UPI, card and cash on delivery.

> **Status:** the app is front-end only. There is no backend yet: sign-in checks the form but doesn't verify an account, the catalogue is sample data, and orders exist only for the current session.

<!-- Add screenshots here, e.g.
<p align="center">
  <img src="docs/screenshots/home.png" width="240" />
  <img src="docs/screenshots/product.png" width="240" />
  <img src="docs/screenshots/checkout.png" width="240" />
</p>
-->

## Features

- **Onboarding**: a swipeable intro, shown only on first launch.
- **Sign in and sign up**: forms with validation, built with React Hook Form.
- **Home**: hero carousel with parallax images, category shortcuts and featured products.
- **Explore**: browse by category or collection; sort products and switch between grid and list views.
- **Search**: find products as you type, with quick filters by category.
- **Product page**: image gallery, size picker, quantity and wishlist.
- **Cart**: change quantities, with a progress bar toward free delivery over ₹1,999 (₹99 fee otherwise).
- **Checkout**: delivery address, then payment method, then order review.
- **Orders**: order history, status timeline and order details.
- **Polish**: a custom animated splash, floating glass tab bar, staggered reveal animations, and keyboard-aware forms on both platforms.

## Tech stack

| Area | Library |
| --- | --- |
| Framework | [Expo SDK 57](https://docs.expo.dev/) · React Native 0.86 · React 19 |
| Language | TypeScript |
| Navigation | [Expo Router](https://docs.expo.dev/router/introduction/) (file-based, typed routes) |
| Animation | React Native Reanimated 4 · Gesture Handler |
| Forms | React Hook Form |
| Images | expo-image |
| UI | expo-linear-gradient · expo-glass-effect · @expo/vector-icons · Manrope font |
| Storage | AsyncStorage (remembers that onboarding is done) |

## Getting started

### Prerequisites

- Node.js 20 or newer
- For Android builds: Android Studio with the Android SDK, and JDK 17
- For iOS builds: a Mac with Xcode

### Install and run

```bash
git clone https://github.com/Vamshi5k/zylo-app.git
cd zylo-app
npm install
npx expo start
```

From the Expo dev server, press `a` for an Android emulator, `i` for the iOS simulator, or scan the QR code with a development build.

To build and run the native app locally:

```bash
npm run android   # npx expo run:android
npm run ios       # npx expo run:ios
```

### Trying the app without an account

In development builds, the login screen has a **Continue as guest (dev only)** button that goes straight to Home. It doesn't appear in release builds.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Start the Expo dev server |
| `npm run android` | Build and run on Android |
| `npm run ios` | Build and run on iOS |
| `npm run web` | Run in the browser |
| `npm run lint` | Lint with ESLint (`expo lint`) |
| `npx tsc --noEmit` | Type-check the project |

## Building an APK

**Locally** (needs the Android SDK):

```bash
npx expo prebuild --platform android
cd android && ./gradlew assembleRelease
```

The APK is written to `android/app/build/outputs/apk/release/app-release.apk`.

This build is signed with the default debug key, which is fine for testing and sharing directly. For the Play Store, set up your own release keystore or use EAS.

**In the cloud** with [EAS Build](https://docs.expo.dev/build/introduction/):

```bash
npx eas-cli@latest build --platform android
```

## Project structure

```
app/                     Screens (Expo Router: every file is a route)
├── (auth)/              Login and register
├── (tabs)/              Home, Explore, Wishlist, Cart, Profile
├── checkout/            Address → Payment → Review
├── orders/              Order list and order details
├── product/[id].tsx     Product details
├── search.tsx
└── onboarding.tsx
src/
├── components/
│   ├── layout/          Screen shell, floating header and tab bar, keyboard handling
│   └── ui/              Shared building blocks (buttons, inputs, cards, rows, …)
├── features/            Code for each feature: data, context, components
│   ├── auth/  cart/  catalog/  checkout/  home/
│   ├── onboarding/  orders/  splash/  wishlist/
│   └── forms/
├── constants/           Copy, navigation, images, commerce rules
├── providers/           App-wide providers (cart, wishlist, checkout, orders)
└── utils/               Formatting helpers (₹ prices, dates)
theme/                   Design tokens: colours, type, spacing, radii, shadows, motion
assets/
├── images/photos/       Product and campaign photography
└── art-src/icon/        Source files for the app icon
```

`android/` and `ios/` are generated from `app.json` ([Continuous Native Generation](https://docs.expo.dev/workflow/continuous-native-generation/)). They're git-ignored and shouldn't be edited by hand.

## Design system

All styling comes from the tokens in [`theme/`](theme/), so colours, typography, spacing and motion stay consistent across screens. Screens are composed from the shared components in [`src/components/ui`](src/components/ui), and most text lives in `src/constants` and each feature's `*-content.ts` file.

## Roadmap

- [ ] Real authentication and user accounts
- [ ] Product catalogue from an API
- [ ] Keep the cart, wishlist and orders after the app restarts
- [ ] Payment gateway integration
- [ ] Release signing and Play Store / App Store builds

## Credits

Photography is from [Unsplash](https://unsplash.com) under the [Unsplash License](https://unsplash.com/license). The source of each photo is listed in [`assets/images/photos/CREDITS.md`](assets/images/photos/CREDITS.md).

## License

See [LICENSE](LICENSE).
