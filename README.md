## Project setup

### (FRONTEND)

1. Download latest Node version from https://nodejs.org/en

2. Test if Node is installed correctly using node -v

3. Download nvm from https://github.com/coreybutler/nvm-windows/releases

4. Test if nvm is installed correctly using nvm --version

5. Download vs code from https://code.visualstudio.com/

6. Test if vscode is installed correctly using code -v

7. Download git from https://git-scm.com/downloads

8. Test if git is installed correctly using git --version

9. (optional) Download Android Studio and setup your virtual emulator using these steps https://docs.expo.dev/workflow/android-studio-emulator/

10. Clone the repository from bitbucket (ask Vimit for account credentials)

11. Run npm install

12. Run npx expo install

13. Run npm start

14. Press S to start the Expo Go build

15. (optional) Press A to start on Android

16. Download the Expo Go App from play store or App store

17. Scan the QR code on your phone

### (BACKEND)

1. Clone the backend repository using from bitbucket (ask Vimit for account credentials)

2. Run npm install

3. Run npm start

4. Install Postman and go enter this url: <your_ngrok_url>/dev/hello to test the api

### (NGROK)

1. Setup ngrok from https://dashboard.ngrok.com/get-started/setup/windows

2. Test if ngrok is installed correctly using ngrok version

3. Open CMD in administrator mode and run ngrok http https://localhost:4000

(If ngrok is not working correctly, then follow these steps)

1. Open the backend repo in VS Code.

2. Open terminal and select Ports tab

3. Enter 4000 as your port and press enter

4. After successful porting, go to visibility tab and select public

5. Now copy the URL and paste it in Postman as your base url

---

### Steps to follow for adding dark mode when you make a new screen

Next, you’ll add a new file to this repository.

1. Import this `const theme = useSelector((state: RootState) => state.global.theme);` or `const theme = useSelector((state: RootState) => state.global.theme) as ThemeType;`

2. You will get the light or dark theme by using the `theme` variable.

3. This is how you use it.

// Example of usage

    	<View style={[{backgroundColor: BACKGOUND_THEME[theme].backgound},
    					style,]} />

</View>

Before you move on, go ahead and explore the repository. You've already seen the **Source** page, but check out the **Commits**, **Branches**, and **Settings** pages.

---
