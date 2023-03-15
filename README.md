Aufgaben (erstmal nur oberfläche):
Marco:  Footer, Eventseite(n), Eventanlegen
Eray:   APP-SCSS, Anmelden- und Registierenseite, Header KB, Linke Leiste KB
Elias:  Header NKB, Homepage, 

Anmelden- und Registierenseite:
- Anmeldemaske mit Anmelden und Registrieren

Nicht Konto Bereich:
Homepage:
- Begrüßung
- Container für Events
- Man kann nicht erstellen sondern nur gucken
- & mehr. Eigene Ideen

Eventsseite(n):
- Wenn man auf ein Event klickt öffnet sich eine Detail Seite
- Ort, Uhrzeit, Name etc.

Header NKB: 
- Suchleiste
- Event erstellen
- Mein Konto

Header KB:
- Events durchsuchen
- (Hilfe)
- 

Footer:
- Eventbride gucken

Konto Bereich:
Event anlegen:
- Ein Formular für Eventanlegung
  - Name von Event
  - Ort
  - Uhrzeit
  - Kapazität
  - Art des Events

Konto Seite:
- Links Leiste mit:
  - Kontaktinformation
  - E-Mail und Password ändern
  - Konto schließen
  - Persönliche Daten (auch ändern)



# Verteilte-Systeme

Dieses Projekt befasst sich im Rahmen der "Verteilte Systeme" Vorlesung, mit einer Eventmanagement Web-Applikation. Für die Entwicklung der Web-Applikation wurde das Angular Framework genutzt.

GitHub-Repository: https://github.com/ErayPala/Verteilte-Systeme

Autoren: Marco Kröker, Elias Hoh, Eray Pala

(Diese README Datei ist ein Muster und wird überarbeite.)

# Installierung:

1. Möglichkeit

- Den gesamten Ordner "docker-for-students-main" - der in Moodle eingereicht wurde - in Docker composen.

2. Möglichkeit

- Das Repository downloaden
- In den bereits bereitgestellten "docker-for-students-main" importieren
- In der php.ini die "post_max_size=64M" auf 64 MB setzen.
- In der php.ibi die "upload_max_filesize=64M" auf 64MB setzte.
- In der Datei "docker-compose.yml" im Ordner "docker-for-students-main" die UPLOAD_SIZE auf 64M erweitern
- Die Datenbank aus dem Repository einbinden

PS.: Die Schritte 3 und 4 müssen im Kernel durchgeführt werden. Dafür muss der Container php in der Konsole geöffnet werden. Daraufhin muss mit dem Befehl "cd /usr/etc/local/php/" zum php-Ordner navigiert werden. Anschließend wird die Datei "php.ini" mit dem Befehel "vi php.ini" bearbeitet.

# Allgemeines
Es gibt ein übergeordnetes Stylesheet und JS-Script, welche von den untergeordneten Seiten implementiert werden. Zudem gibt es eine übergeordnete PHP-Klasse (phpFunctions), die alle übergreifende Funktionen beinhaltet. Die Klasse db stellt eine Verbindung zur Autostar-Datenbank her. Stylesheet: »stylesheet.css« JS-Script: »index.js« PHP-Klasse: »phpFunctions.php«

# Index
Die Hauptseite (auch Homeseite) wird durch die index.php abgebildet. Dabei wird das Stylesheet »indexSheet.css« miteingebunden. Die index.php ist mit der »Anmeldung.php« die einzige Seite, die das übergeordnete Stylesheet (stylesheet.css) nicht einbindet.

# Account
Im Verzeichnis "Account" befinden sich alle Seite, die sich um die Thematik Konto drehen. Dazu gehören die Anmelden-, Registrieren-, AccountVerwaltung- und PasswortVergessen-seite. Diese implementieren sowohl das übergeordnete Stylesheet und JS-Script als auch deren einiges Stylesheet.

# Angebote
Die Kategorie Angebote mit den Seiten TopAngebote und LastMinute ähneln sich stark in ihrer Struktur. Dabei werden lediglich andere SQL-Statements verwendet, die die Angebote anders selektieren.

Zudem befindet sich in dieser Struktur die Produkt-Seite, die eine detaillierte Anzeige der Auktion ausgibt. Diese Seite ermöglicht das Abgeben eines Gebotes zu der Auktion: Ist man angemeldet -> So wird die E-Mail direkt aus der Datenbank gezogen. Ist man nicht angemeldet -> So wird die E-Mail manuell vom Nutzer angegeben.

# Inserieren
Die Kategorie Inserieren bietet die Möglichkeit, eine Auktion aufzugeben. Dabei ist die Inserierung mit einem Login-Mechanismus geschützt und kann nur von angemeldeten Kunden verwendet werden.

# Suchen
Die Suchen Kategorie wurde nach den Seiten Top-Angebote und Last-Minute entwickelt. Der bedeutende Unterschied ist jedoch die dynamische SQL-Abfrage. Diese wird entsprechend den gesetzten Filtern generiert.

# Image
Das Image Verzeichnis beinhaltet alle Bilder, die auf der Webseite verwendet wurden. Dazu zählen Hintergrundbilder, icons und vieles mehr.

# phpFunctions
phpFunctions.php ist eine php-Klasse, die viele ausgelagerte Funktionen besitzt. Dazu zählt bspw. der Header und Footer. Des Weiteren sind auch die dynamischen Angebot-Anzeigen ausgelagert.

#-----------------------------------------------------------------

# Eventastic

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
