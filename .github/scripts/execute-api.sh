#!/usr/bin/env bash

set -Eeuo pipefail

START_TIME=$(date +%s)

echo "====================================================="
echo "      Playwright API Automation Execution"
echo "====================================================="

echo "Environment : ${ENV:-qa}"
echo "Project     : api"
echo "Suite       : ${SUITE:-all}"
echo "Runner      : $(uname -a)"
echo "Node        : $(node --version)"
echo "NPM         : $(npm --version)"
echo "Playwright  : $(npx playwright --version)"
echo "====================================================="

#########################################################
# Validate Suite
#########################################################

case "${SUITE:-all}" in
  smoke|sanity|regression|all)
    ;;
  *)
    echo "Invalid suite: ${SUITE}"
    exit 1
    ;;
esac

#########################################################
# Build Playwright Command
#########################################################

COMMAND=(
  npx
  playwright
  test
  --project=api
)

#########################################################
# Suite
#########################################################

if [[ "${SUITE:-all}" != "all" ]]; then
  COMMAND+=("--grep=@${SUITE}")
fi

#########################################################
# Display Command
#########################################################

echo
echo "Executing Command"
echo "-----------------------------------------------------"
printf '%q ' "${COMMAND[@]}"
echo
echo "-----------------------------------------------------"
echo

#########################################################
# Execute
#########################################################

"${COMMAND[@]}"

#########################################################
# Finish
#########################################################

END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

echo
echo "====================================================="
echo "API Automation Execution Completed Successfully"
echo "Execution Time : ${DURATION} seconds"
echo "====================================================="
