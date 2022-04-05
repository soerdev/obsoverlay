#!/usr/bin/bash

ssh -t -p $SSH_PORT -l $SSH_USER $SSH_HOST 'sudo ./utils/overlay.docker.sh'