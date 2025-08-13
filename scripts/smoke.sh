#!/usr/bin/env bash
B=${1:-http://localhost:5000}
for path in /api/meta /api/users /api/projects /api/tasks?projectId=p1; do
  echo -e "\n==> GET $path"
  curl -s "$B$path" | jq 'del(.ts) | .'
done
