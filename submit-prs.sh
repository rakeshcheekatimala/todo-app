#!/bin/bash

# Stacked PR Submission Script for Todo App Redesign
# This script helps you authenticate with Graphite and submit stacked PRs

echo "🚀 Todo App Redesign - Stacked PR Submission"
echo "============================================="
echo ""

# Check if Graphite is installed
if ! command -v gt &> /dev/null; then
    echo "❌ Graphite CLI is not installed."
    echo "Install it with: npm install -g @withgraphite/graphite-cli"
    exit 1
fi

echo "✅ Graphite CLI is installed"
echo ""

# Check authentication
echo "🔐 Checking Graphite authentication..."
if gt auth --check &> /dev/null; then
    echo "✅ Already authenticated with Graphite"
else
    echo "⚠️  Not authenticated. Opening authentication page..."
    echo ""
    echo "Please authenticate at: https://app.graphite.com/activate"
    echo ""
    read -p "Press Enter after you've completed authentication..."
    
    # Verify authentication
    if ! gt auth --check &> /dev/null; then
        echo "❌ Authentication failed. Please try again."
        exit 1
    fi
    echo "✅ Successfully authenticated!"
fi

echo ""
echo "📊 Current Stack Structure:"
echo "=========================="
gt log short
echo ""

# Confirm submission
read -p "Do you want to submit all PRs as drafts? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "📤 Submitting stacked PRs as drafts..."
    gt submit --stack --draft
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Successfully submitted all PRs!"
        echo ""
        echo "📋 Next Steps:"
        echo "1. Visit https://github.com/rakeshcheekatimala/todo-app/pulls"
        echo "2. Add PR descriptions using templates from STACKED_PR_GUIDE.md"
        echo "3. Add reviewers to each PR"
        echo "4. Mark PRs as ready for review when done"
        echo "5. Merge PRs in order: #1 → #2 → #3 → #4 → #5 → #6"
        echo ""
        echo "🎉 Happy reviewing!"
    else
        echo ""
        echo "❌ Failed to submit PRs. Please check the error above."
        echo ""
        echo "You can also create PRs manually. See STACKED_PR_GUIDE.md for instructions."
    fi
else
    echo ""
    echo "📝 Submission cancelled. You can:"
    echo "1. Run this script again later"
    echo "2. Use: gt submit --stack (for ready PRs)"
    echo "3. Create PRs manually on GitHub"
    echo ""
    echo "See STACKED_PR_GUIDE.md for detailed instructions."
fi

echo ""
echo "💡 Useful Commands:"
echo "  gt log short          - View stack structure"
echo "  gt submit --stack     - Submit all PRs (ready)"
echo "  gt submit --stack --draft - Submit all PRs (drafts)"
echo "  gt repo sync          - Sync with remote changes"
echo "  gt up / gt down       - Navigate stack"
echo ""
