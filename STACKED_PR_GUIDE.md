# Stacked PR Guide - Todo App Redesign

## Overview

Your modern UI redesign has been organized into **6 stacked pull requests**, each building on the previous one. All branches have been pushed to GitHub.

## Branch Structure

```
feat/todo (base)
  ↓
redesign/01-foundation (Theme + Dark Mode + Typography)
  ↓
redesign/02-layout (Layout + Header)
  ↓
redesign/03-components (TodoCard + Form + List + Input)
  ↓
redesign/04-polish (Loading States + Toasts)
  ↓
redesign/05-ai-chat (AI Assistant Redesign)
  ↓
redesign/06-docs (Documentation)
```

## Option 1: Using Graphite (Recommended)

### Step 1: Authenticate with Graphite

```bash
gt auth
```

Visit https://app.graphite.com/activate and follow the authentication flow.

### Step 2: Submit Stacked PRs

```bash
# Submit all PRs at once as drafts
gt submit --stack --draft

# Or submit as ready for review
gt submit --stack
```

### Step 3: Managing the Stack

```bash
# View your stack
gt log short

# Sync with remote changes
gt repo sync

# Navigate between branches
gt up      # Move to parent branch
gt down    # Move to child branch

# Restack after a PR merges
gt repo sync  # Automatically restacks
```

## Option 2: Manual PR Creation

If you prefer to create PRs manually on GitHub:

### PR #1: Foundation
- **Branch**: `redesign/01-foundation`
- **Base**: `feat/todo`
- **Title**: `feat(foundation): Add theme system, dark mode, and typography`
- **Description**: See below

### PR #2: Layout
- **Branch**: `redesign/02-layout`
- **Base**: `redesign/01-foundation`
- **Title**: `feat(layout): Add modern layout structure with enhanced header`
- **Depends on**: PR #1

### PR #3: Components
- **Branch**: `redesign/03-components`
- **Base**: `redesign/02-layout`
- **Title**: `feat(components): Add redesigned todo components with interactions`
- **Depends on**: PR #2

### PR #4: Polish
- **Branch**: `redesign/04-polish`
- **Base**: `redesign/03-components`
- **Title**: `feat(polish): Add loading states and toast notifications`
- **Depends on**: PR #3

### PR #5: AI Chat
- **Branch**: `redesign/05-ai-chat`
- **Base**: `redesign/04-polish`
- **Title**: `feat(ai-chat): Redesign AI assistant interface`
- **Depends on**: PR #4

### PR #6: Documentation
- **Branch**: `redesign/06-docs`
- **Base**: `redesign/05-ai-chat`
- **Title**: `docs: Add comprehensive redesign documentation`
- **Depends on**: PR #5

## PR Descriptions Templates

### PR #1: Foundation

```markdown
## Overview
This PR introduces the foundation of the modern UI redesign, establishing the design system, theming, and typography.

## Changes

### Theme System
- ✅ Design tokens for colors, spacing, typography, shadows
- ✅ CSS variables for dynamic theming
- ✅ Light and dark color palettes (Mainline-inspired)
- ✅ Custom ThemeProvider with React Context

### Dark Mode
- ✅ Smooth toggle between light/dark themes
- ✅ LocalStorage persistence
- ✅ Animated sun/moon toggle button
- ✅ System-wide theme transitions

### Typography
- ✅ Modern font stack (Inter)
- ✅ Reusable components: Heading, Text, Caption
- ✅ Responsive font scaling
- ✅ Clear visual hierarchy

### Dependencies Added
- `framer-motion` for animations
- `react-icons` for icon system
- `date-fns` for date formatting
- `uuid` for unique IDs

## Files Added/Modified
- `frontend/src/theme/colors.js`
- `frontend/src/theme/tokens.js`
- `frontend/src/theme/ThemeProvider.js`
- `frontend/src/theme/global.css`
- `frontend/src/components/ThemeToggle.js`
- `frontend/src/components/Typography/`
- `frontend/src/index.js`
- `frontend/package.json`

## Testing
1. Start the app: `npm start`
2. Toggle dark/light mode - should persist on refresh
3. Typography should scale properly
4. All theme variables should apply correctly

## Screenshots
[Add screenshots of light/dark mode]

## Related Issues
Closes #1
```

### PR #2: Layout

```markdown
## Overview
Builds on the foundation to create the app structure with a modern, sticky header.

## Changes

### Layout Component
- ✅ App shell with header and main content
- ✅ Responsive max-width container
- ✅ Consistent padding and spacing
- ✅ Smooth theme transitions

### Enhanced Header
- ✅ Sticky positioning with blur effect
- ✅ Dynamic background based on scroll
- ✅ Navigation with hover animations
- ✅ Integrated theme toggle
- ✅ Glass morphism effect

## Dependencies
- Depends on: PR #1 (foundation)

## Files Added/Modified
- `frontend/src/components/Layout/Layout.js`
- `frontend/src/components/Layout/Header.js`
- `frontend/src/components/Layout/index.js`

## Testing
1. Scroll the page - header should blur
2. Click navigation links
3. Theme toggle should work

## Screenshots
[Add screenshots]

## Related Issues
Closes #2
```

### PR #3: Components

```markdown
## Overview
Core todo components with modern design and rich interactions.

## Changes

### TodoCard
- ✅ Clean card with hover effects
- ✅ Custom animated checkbox
- ✅ Priority indicators
- ✅ Edit/delete actions
- ✅ Completion animations

### TodoForm
- ✅ Floating label inputs
- ✅ Real-time validation
- ✅ Priority selector
- ✅ Edit mode support

### TodoList
- ✅ Filter bar (All/Active/Completed)
- ✅ Progress tracker
- ✅ Empty states
- ✅ List animations

### Input Components
- ✅ Custom Input with floating labels
- ✅ Button variants
- ✅ Custom Checkbox

## Dependencies
- Depends on: PR #2 (layout)

## Files Added/Modified
- `frontend/src/components/TodoCard/`
- `frontend/src/components/TodoForm/`
- `frontend/src/components/TodoList/`
- `frontend/src/components/Input/`
- `frontend/src/components/Checkbox.js`
- `frontend/src/App.js`

## Testing
1. Create a todo - validation should work
2. Complete/uncomplete todos
3. Filter todos (All/Active/Completed)
4. Edit a todo
5. Delete a todo
6. Test empty states

## Screenshots
[Add screenshots]

## Related Issues
Closes #3
```

### PR #4: Polish

```markdown
## Overview
Essential UX polish and feedback mechanisms.

## Changes

### Loading States
- ✅ Skeleton screens for todo cards
- ✅ Shimmer animation
- ✅ Loading spinner
- ✅ Smooth transitions

### Toast Notifications
- ✅ Success/error/info/warning toasts
- ✅ Auto-dismiss
- ✅ Undo functionality
- ✅ Multiple toast stacking
- ✅ Animated enter/exit

### Context
- ✅ ToastContext for global state
- ✅ UUID for unique IDs

## Dependencies
- Depends on: PR #3 (components)

## Files Added/Modified
- `frontend/src/components/Skeleton/`
- `frontend/src/components/Toast/`
- `frontend/src/context/ToastContext.js`

## Testing
1. Load page - should show skeleton
2. Perform CRUD operations - toasts should appear
3. Delete a todo - undo should work
4. Multiple toasts should stack nicely

## Screenshots
[Add screenshots]

## Related Issues
Closes #4
```

### PR #5: AI Chat

```markdown
## Overview
Modern AI assistant interface with chat UI.

## Changes

### Chat Interface
- ✅ Modern chat bubble design
- ✅ User/assistant differentiation
- ✅ Animated messages
- ✅ Scrollable history
- ✅ Loading indicator

### Message Rendering
- ✅ Smart content rendering
- ✅ Todo item display
- ✅ Priority indicators
- ✅ Formatted timestamps

### Interaction
- ✅ Floating label input
- ✅ Send button
- ✅ Submit on Enter
- ✅ Example commands

## Dependencies
- Depends on: PR #4 (polish)

## Files Added/Modified
- `frontend/src/components/AIChat/NewAITodo.js`

## Testing
1. Navigate to /ai route
2. Send a message
3. Check loading state
4. View AI responses

## Screenshots
[Add screenshots]

## Related Issues
Closes #5
```

### PR #6: Documentation

```markdown
## Overview
Comprehensive documentation for the redesign.

## Changes

### Documentation
- ✅ REDESIGN.md - Design philosophy & architecture
- ✅ QUICKSTART.md - User guide
- ✅ Feature breakdown with IDs
- ✅ Technology stack docs

### Backend
- ✅ OpenAPI spec generation
- ✅ Package updates

## Dependencies
- Depends on: PR #5 (ai-chat)

## Files Added/Modified
- `REDESIGN.md`
- `QUICKSTART.md`
- `backend/scripts/generate-openapi.js`
- `openapi.json`
- Various doc updates

## Testing
1. Read documentation
2. Run OpenAPI generation

## Related Issues
Closes #6
```

## Review Strategy

1. **Review Order**: Start with PR #1, then #2, etc.
2. **Incremental Merging**: Merge PRs in order
3. **Auto-Restack**: Graphite will automatically update child PRs
4. **Testing**: Test each PR independently

## Benefits of Stacked PRs

✅ **Smaller, focused reviews** - Each PR has a clear purpose
✅ **Parallel development** - Work on dependent features
✅ **Clear dependencies** - Easy to understand relationships
✅ **Easier rollback** - Can revert individual features
✅ **Better git history** - Clean, logical commits

## Commands Cheat Sheet

```bash
# View stack
gt log short

# Create new branch on top
gt create feature-name

# Move between branches
gt up / gt down

# Submit stack
gt submit --stack

# Sync with remote
gt repo sync

# Reorder branches
gt branch move --onto new-parent

# Undo last operation
gt undo
```

## Troubleshooting

### If PRs are out of sync
```bash
gt repo sync
gt stack restack
```

### If you need to make changes
1. Check out the branch: `git checkout redesign/01-foundation`
2. Make your changes
3. Commit: `git commit -am "fix: ..."`
4. Push: `git push origin redesign/01-foundation`
5. Restack children: `gt upstack restack`

### If CI fails
Fix the issue in the specific branch, then use Graphite to restack dependents.

## Next Steps

1. ✅ All branches pushed to GitHub
2. 🔄 Authenticate with Graphite (or create PRs manually)
3. 🔄 Submit stacked PRs
4. 🔄 Add reviewers
5. 🔄 Merge in order (1 → 2 → 3 → 4 → 5 → 6)

Happy reviewing! 🚀
