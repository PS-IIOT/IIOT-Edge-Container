# iiot-edge-container

## Getting started
### Activate global git hooks in .githooks directory
Folgender Code muss local ausgefuehrt werden, um die hooks aus dem .githooks directory zu aktivieren.

```bash
git config core.hooksPath .githooks/
```
Dadurch wird der Hookpfad der lokalen Gitinstallation umkonfiguriert. 

Anschliessend wird der `commit-msg` hook bei jedem commit ausgefuehrt.
Dieser kontrolliert die Einhaltung der commit-message Regeln.

### Docker Dev-Environment
folgender Code muss local im Rootverzeichis gestartet werden. In der Folge starten 2 Docker-Container.
Zum einen ein MongoDB Container mit unserer Datenbank, sowie ein Fronendcontainer, der den aktuellen
Stand des Reactclients anzeigt.

```bash
docker compose up -d
```