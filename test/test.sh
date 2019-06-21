#!/bin/bash -x

welcome() {
clear
echo ' _____  _____  _____  _____  _____  _   _  _____  '
echo '|_   _||  ___|/  ___||_   _||_   _|| \ | ||  __ \ '
echo '  | |  | |__  \ `--.   | |    | |  |  \| || |  \/ '
echo '  | |  |  __|  `--. \  | |    | |  | . ` || | __  '
echo '  | |  | |___ /\__/ /  | |   _| |_ | |\  || |_\ \ '
echo '  \_/  \____/ \____/   \_/   \___/ \_| \_/ \____/ '
echo
}

run() {
  node_modules/mocha/bin/_mocha \
  --ui bdd\
  --timeout 120000 \
  "$@"
}

## Main
welcome && run \
test/test.js
