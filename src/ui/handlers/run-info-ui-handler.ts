name: Build APK
on: workflow_dispatch
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'
      - uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '21'
      - run: pnpm install
      - run: pnpm run build
      - run: pnpm add @capacitor/core @capacitor/cli @capacitor/android
      - run: npx cap add android
      - run: npx cap copy android
      - name: Build APK
        run: cd android && chmod +x gradlew && ./gradlew assembleDebug
      - uses: actions/upload-artifact@v4
        with:
          name: Pokerogue-APK
          path: android/app/build/outputs/apk/debug/app-debug.apk
