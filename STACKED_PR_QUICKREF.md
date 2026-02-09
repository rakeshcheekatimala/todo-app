# Stacked PR Quick Reference

## 🎯 TL;DR

All 20 features are organized into 6 stacked PRs and pushed to GitHub. Ready for review!

## 📦 The Stack

```
1. redesign/01-foundation  → feat/todo         [Theme + Dark Mode + Typography]
2. redesign/02-layout       → 01-foundation    [Layout + Header]
3. redesign/03-components   → 02-layout        [TodoCard + Form + List]
4. redesign/04-polish       → 03-components    [Loading + Toasts]
5. redesign/05-ai-chat      → 04-polish        [AI Assistant]
6. redesign/06-docs         → 05-ai-chat       [Documentation]
```

## ⚡ Quick Start

### Option 1: Graphite (Auto-create PRs)
```bash
./submit-prs.sh
```

### Option 2: Manual
1. Go to: https://github.com/rakeshcheekatimala/todo-app/pulls
2. Create 6 PRs using branches above
3. Use descriptions from `STACKED_PR_GUIDE.md`

## 🔗 Useful Links

- **PR Guide**: `STACKED_PR_GUIDE.md` - Full instructions
- **Summary**: `GRAPHITE_STACK_SUMMARY.md` - What was done
- **Design Docs**: `REDESIGN.md` - Design philosophy
- **User Guide**: `QUICKSTART.md` - How to use the app

## 📊 Graphite Commands

```bash
# View stack
gt log short

# Submit all PRs
gt submit --stack --draft

# Navigate
gt up     # Parent branch
gt down   # Child branch

# Sync
gt repo sync
```

## ✅ All Done!

- [x] 6 branches created
- [x] All branches pushed to GitHub
- [x] Commit messages written
- [x] PR templates ready
- [x] Documentation complete
- [x] Helper scripts created

## 🚀 Next: Create the PRs!

Run `./submit-prs.sh` or create them manually on GitHub.

---

**Quick Links**:
- Repo: https://github.com/rakeshcheekatimala/todo-app
- Auth: https://app.graphite.com/activate
- Docs: Graphite - https://graphite.dev/docs
