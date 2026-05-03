#!/bin/bash

# Ensure at least one commit hash was provided
if [ $# -eq 0 ]; then
  echo " ERROR: You must provide at least one commit hash!"
  echo "Usage: ./emergency-hotfix.sh <hash1> [hash2] ..."
  exit 1
fi

FIRST_HASH=$1
if [ $# -gt 1 ]; then
  BRANCH_NAME="emergency-hotfix-${FIRST_HASH}-multi"
else
  BRANCH_NAME="emergency-hotfix-${FIRST_HASH}"
fi

echo "====================================================="
echo "      STARTING EMERGENCY HOTFIX EXTRACTION "
echo "====================================================="
echo "Commits to extract: $@"
echo "Target branch name: $BRANCH_NAME"

echo ""
echo " [1/4] Fetching the latest production code..."
git checkout dev
git pull origin dev

echo ""
echo " [2/4] Creating temporary delivery branch..."
git checkout -b $BRANCH_NAME

echo ""
echo " [3/4] Cherry-picking the hotfixes..."
git cherry-pick "$@"

if [ $? -ne 0 ]; then
  echo ""
  echo "================= ALERT: MERGE CONFLICT ================="
  echo ""
  echo "A merge conflict has occurred while Git was trying to"
  echo "blend your hotfix with the code currently on the 'dev' branch."
  echo ""
  echo "  HOW TO FIX THIS RIGHT NOW:"
  echo "  1. Open your code editor (like VS Code)."
  echo "  2. Look for the files highlighted with conflicts (often in red/purple)."
  echo "  3. Open those files and look for the conflict markers:"
  echo "       <<<<<<< HEAD"
  echo "       (This is the code currently living on production/main branch)"
  echo "       ======="
  echo "       (This is the code your hotfix is trying to bring in)"
  echo "       >>>>>>> [commit hash]"
  echo "  4. Resolve those conflicts and edit the code"
  echo "     so the file looks exactly how you want it to look."
  echo "  5. Save the files."
  echo ""
  echo " HOW TO RESUME THE SCRIPT'S JOB:"
  echo "  Once the files are fixed and saved, run these EXACT commands:"
  echo "  👉  git add ."
  echo "  👉  git cherry-pick --continue"
  echo "  👉  git push -u origin $BRANCH_NAME"
  echo "  Then, go to GitHub and open your Pull Request!"
  echo ""
  echo " HOW TO CANCEL EVERYTHING:"
  echo "  If you made a mistake and just want to abort the hotfix entirely,"
  echo "  run this command to go back to normal:  git cherry-pick --abort"
  echo ""
  echo "================================================================="
  exit 1
fi

echo ""
echo " [4/4] Success! No conflicts found. Pushing to GitHub..."
git push -u origin $BRANCH_NAME

echo ""
echo "EXTRACTION COMPLETE!"
echo "Go to GitHub to open your Pull Request and merge your hotfix."