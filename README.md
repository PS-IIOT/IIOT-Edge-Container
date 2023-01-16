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

### MachineSIM Docker

Folgende Befehle müssen ausgeführt werden um einen MaschinenSIM als Container zu starten:

1. Bauen der Images für Funktionalen und Error Simulator:

**Funktional-SIM:**

```bash
docker build -t machinesim machine-sim/
```

**Error-SIM:**

```bash
docker build -t machinesimerror machine-sim/withError/
```

2. Starten eines Containers für die LOKALE Umgebung:

**Funktional-SIM:**

```bash
docker run -td --net="host" machinesim --serial <MY-MACHINE-NAME>
```

**Error-SIM:**

```bash
docker run -td --net="host" machinesimerror --serial <MY-MACHINE-NAME>
```

3. Starten eines Containers gegen die IRF-1000, vorraussetzung ist auf einem der LAN Ports der Firewall verbunden zu sein.:

**Funktional-SIM:**

```bash
docker run -td machinesim --ip 192.168.0.254 --serial <MY-MACHINE-NAME>
```

**Error-SIM:**

```bash
docker run -td machinesimerror --ip 192.168.0.254 --serial <MY-MACHINE-NAME>
```
