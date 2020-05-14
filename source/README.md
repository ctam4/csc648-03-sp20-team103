# Style Guide
See: [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript).

# GitHub Conventions
1. The `master` branch encapsulates a stable snapshot of the project.
    - This branch may only be mutated through a merge with `develop` or `master-patch-{name}`.
    - This branch may not be deleted.
2. The `develop` branch encapsulates an unstable snapshot of the project.
    - This branch may only be mutated through a fast-forward merge with `master`, a rebase merge with `develop-patch-{name}`, or a merge with a feature branch.
    - This branch may not be deleted.
3. The `{api|application}-feature-{name}` branches encapsulates the implementation of a feature for the back-end or front-end.
    - This branch will be deleted after a merge to `develop`.
    - This branch must diverge from the `develop` branch.
    - Pull requests from this branch undergo mandatory code review.
    - Sub-feature branches are branches that diverge from a feature or another sub-feature branch.
