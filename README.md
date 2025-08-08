# Task-Api
## Über das Projekt
Dieses Projekt wurde als Prüfungsleistung des Moduls "Development Operations" erbracht. 
Es handelt sich in diesem Projekt um eine NodeJS Rest API, welche Aufgaben verwalten kann. 
Diese Aufgaben werden in einer SQLite Datenbank gespeichert.

Ein großer Teil des Projektes ist die CI/CD Pipeline, welche mit GitHub Actions umgesetzt wurde.

## Verwendete Technologien
| Art               | Software       |
|-------------------|----------------|
| IDE               | VS Code        |
| Laufzeit Umgebung | NodeJS         |
| Version Control   | GitHub         |
| CI/CD Tool        | GitHub Actions |

## Installation
1. Das Repository klonen oder herunterladen
```bash
git clone https://github.com/TchoKnut/task-api.git
```

2. Abhängigkeiten herunterladen
```bash
npm ci
```

3. Tests ausführen
```bash
# Normal ausführen
npm run test 

# Mit Vitest UI ausführen
npm run test:ui

# Mit Coverage ausführen
npm run test:coverage
```

4. Leere Datenbank initialisieren
```bash
cp template.data.sqlite data.sqlite
```

5. Applikation starten
```bash
npm run dev
```

## CI/CD Pipeline

Die Pipeline besteht aus 2 Teilen, welche sich in seperaten Dateien wiederfinden.

### ``ci.yml``-Datei

**Wann wird sie ausgeführt?**
- Push auf Main Branch
- Pull Request auf Main Branch 

**Was tut sie?**
- NodeJS aufsetzen
- Abhängigkeiten herunterladen
- Linting und Formatierung testen
- Unit Tests mit Coverage ausführen
- SonarQube Analyse

### ``release.yml``-Datei

**Wann wird sie ausgeführt?**
- Push auf Main Branch

**Was tut sie?**
- NodeJS aufsetzen
- Abhängigkeiten herunterladen
- Version in ``package.json`` um Minor Version anheben und committen
- Neues Docker Image bauen
- Docker Image mit aktueller Version aus ``package.json`` hochladen
- Docker Image mit latest Tag hochladen
- Kleiner Deployment Test
    - Docker Image mit Version herunterladen
    - Docker Container Starten
    - Get Request an "/api/tasks"
    - Docker Container stoppen und entfernen
