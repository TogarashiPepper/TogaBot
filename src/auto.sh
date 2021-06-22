#!/bin/bash
read input 
git add .
git commit -m "\"$input\"" 
git status
git push
