#!/bin/bash
cd /vercel/share/v0-project
git fetch origin master
git merge origin/master
echo "Master branch pulled successfully"
