# ---PL---<br>Brand-o-pedia 
to mały projekt stworzony podczas nauki na frontend developera dla mojego kolegi, który prowadzi swój sklep i będzie wykorzystywana lokalnie w sieci firmy.

Aplikacja posiada małą bazę danych w pliku JSON z danymi współpracujących dostawców i producentów.  Służy do szkolenia nowych pracowników i jest swego rodzaju kompendium pomocnym na początku dla każdego pracownika. 

*Jest to wersja wstępna. Jest wiele do zrobienia. Przede wszystkim  refaktoryzacja kodu javascript, poprawa plików CSS, uzupełnienie kodu Html o ARIA,zmiana podejścia na mobile first itd. Wszystko w miarę postępów w nauce.*

**Werjsa live:** https://frog01-20191.wykr.es/

**Użyte technologie:** Html, CSS(SASS),  Javascript, Express.js.

## Uruchomienie.

Aby uruchomić aplikację wymagane jest zainstalowanie node.js oraz dodatkowych zależności poprzez NPM.

1. Sklonuj to repozytorium
2. Zainstaluj node.js 18.16
3. Zainstaluj zależlości
4. Uruchom w terminalu „npm run build

**Wymagane zależności:**
- "cookie-parser": "^1.4.6",
- "cors": "^2.8.5",
- "dotenv": "^16.3.1",
- "ejs": "^3.1.9",
- "express": "^4.18.2",
- "express-ejs-layouts": "^2.5.1",
- "express-session": "^1.17.3",
- "fs": "^0.0.1-security",
- "http": "^0.0.1-security”

Aplikacja uruchomi się na twoim localhost na porcie 3020. Hasło do aplikacji to: admin Możesz zmienić te wartości w pliku .env

# ---EN---<br>Brand-o-pedia

Brand-o-pedia is a small project created during my frontend developer training for my friend, who owns a store. It will be used locally within the company's network.

The application has a small database in a JSON file with data about collaborating suppliers and manufacturers. It is designed for training new employees and serves as a kind of compendium helpful for every employee at the beginning.

*"This is a preliminary version. There is a lot to be done, primarily refactoring the JavaScript code, improving the CSS files, adding ARIA to the HTML code, changing the approach to "mobile first". etc. Everything is progressing as learning advances."*

**Live version:** https://frog01-20191.wykr.es/

**Technologies used:** HTML, CSS (SASS), Javascript, Express.js.

## How to Run

To run the application, you need to install Node.js and additional dependencies through NPM.

1. Clone this repository
2. Install Node.js 18.16
3. Install dependencies
4. Run in terminal: npm run build

**Required Dependencies:**
"cookie-parser": "^1.4.6",
"cors": "^2.8.5",
"dotenv": "^16.3.1",
"ejs": "^3.1.9",
"express": "^4.18.2",
"express-ejs-layouts": "^2.5.1",
"express-session": "^1.17.3",
"fs": "^0.0.1-security",
"http": "^0.0.1-security"

The application will run on your localhost on port 3020. The password for the application is: admin. You can modify these values in the .env file.