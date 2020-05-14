# Style Guide
See: [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript).

# GitHub Conventions
1. The `master` branch encapsulates a stable snapshot of the project.
    1. This branch may only be mutated through a merge with `develop` or `master-patch-{name}`.
    2. This branch may not be deleted.
2. The `develop` branch encapsulates an unstable snapshot of the project.
    1. This branch may only be mutated through a fast-forward merge with `master`, a rebase merge with `develop-patch-{name}`, or a merge with a feature branch.
    2. This branch may not be deleted.
3. The `{api|application}-feature-{name}` branch encapsulates the implementation of a feature for the back-end or front-end.
    1. These branches will be deleted after a merge to `develop`.
    2. These branches must branch from the `develop` branch.
    3. Pull requests from this branch undergo mandatory code review.
