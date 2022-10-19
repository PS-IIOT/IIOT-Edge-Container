#!/bin/sh
tmux new-session -d -s tcp-server python3 /app/tcp-server.py
/bin/sh