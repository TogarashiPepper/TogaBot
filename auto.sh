#!/bin/bash
read input 
git add .
git status
git commit -m '$input'
git status
git push
