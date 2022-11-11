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