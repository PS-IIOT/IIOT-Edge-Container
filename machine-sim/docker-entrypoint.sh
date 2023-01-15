#!/bin/sh
tmux new-session -t host -s sim python3 /app/machine-sim.py  && tmux ls
exec "$@"
# #!/bin/sh
# echo $HOSTNAME
# tmux new-session -d -s sim python3 /app/machine-sim.py --ip backend --serial $HOSTNAME
# # tmux new-session -d -s sim python3 /app/machine-sim.py --ip $MYVAR
# tail -f /dev/null

