#!/usr/bin/env bash

USERNAME=$(cat ~/.tkprofile)
PASSWORD=$(cat ~/.tkpassword)

export CYPRESS_username="$USERNAME"
export CYPRESS_password="$PASSWORD"

rm logs/output.log 2> /dev/null
node_modules/.bin/cypress run > /dev/null
cat logs/output.log 2> /dev/null

