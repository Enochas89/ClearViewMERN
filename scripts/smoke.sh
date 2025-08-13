#!/usr/bin/env bash
BASE=${1:-http://localhost:5000}
echo "health:";        curl -s "$BASE/api/health" | jq .
echo "login:";         curl -s -X POST "$BASE/api/auth/login" -H "Content-Type: application/json" -d '{"email":"demo@clearview.local"}' | jq .
echo "projects:";      curl -s "$BASE/api/projects" | jq .
echo "project p1:";    curl -s "$BASE/api/projects/p1" | jq .
echo "tasks p1:";      curl -s "$BASE/api/tasks?projectId=p1" | jq .
echo "posts:";         curl -s "$BASE/api/posts" | jq .
echo "like post1:";    curl -s -X POST "$BASE/api/posts/post1/like" | jq .
echo "chat p1:";       curl -s "$BASE/api/chats/p1/messages" | jq .
echo "invites:";       curl -s "$BASE/api/invites" | jq .
