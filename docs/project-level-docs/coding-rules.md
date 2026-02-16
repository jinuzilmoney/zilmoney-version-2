# Coding Rules

Rules that every team member must follow before pushing code.

## Before Committing

1. **Remove all `console.log` statements** used for debugging. Do not leave any debug logs in the committed code.
2. **Fix all linting errors** in every file you modified or created. Run the linter and resolve all warnings/errors before committing.
3. **Format your code using Prettier**. Use a common file formatter (Prettier) to ensure consistent formatting across the codebase. Format all modified/created files before committing.

## Before Pushing

4. **Sync your branch with the `dev` branch**. Pull the latest changes from `dev` and merge/rebase into your branch before pushing. Resolve any merge conflicts locally to keep the remote branch clean.

## Code Quality

5. **Keep files small (max 500–700 lines)**. If a component or file exceeds this limit, break it into smaller sub-components or utility files. Large files are harder to read, review, and maintain.
