#!/usr/bin/env bash

set -Eeuo pipefail

START_TIME=$(date +%s)

echo "====================================================="
echo "      Playwright UI Automation Execution"
echo "====================================================="

echo "Environment : ${ENV:-qa}"
echo "Browser     : ${BROWSER:-chromium}"
echo "Suite       : ${SUITE:-all}"
echo "Shard       : ${SHARD:-none}"
echo "Runner      : $(uname -a)"
echo "Node        : $(node --version)"
echo "NPM         : $(npm --version)"
echo "Playwright  : $(npx playwright --version)"
echo "====================================================="

#########################################################
# Validate Browser
#########################################################

case "${BROWSER:-chromium}" in
  chromium|firefox|webkit|ui)
    ;;
  *)
    echo "Invalid browser: ${BROWSER}"
    exit 1
    ;;
esac

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
)

#########################################################
# Browser / Project
#########################################################

if [[ -n "${BROWSER:-}" ]]; then
  COMMAND+=("--project=${BROWSER}")
fi

#########################################################
# Suite
#########################################################

if [[ "${SUITE:-all}" != "all" ]]; then
  COMMAND+=("--grep=@${SUITE}")
fi

#########################################################
# Shard
#########################################################

if [[ -n "${SHARD:-}" ]]; then
  COMMAND+=("--shard=${SHARD}")
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
echo "UI Automation Execution Completed Successfully"
echo "Execution Time : ${DURATION} seconds"
echo "====================================================="
