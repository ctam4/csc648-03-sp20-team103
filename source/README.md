# Style Guide
See: [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript).

# GitHub Conventions

## Primary Branches
**Primary branches** must not be deleted and all merges must be made through a GitHub pull request.
Additionally, merges to any primary branch require mandatory code review and any applicable tests must pass (e.g. unit tests).

1. The `master` branch encapsulates a stable snapshot of the project.
	1. Must only be mutated through a merge with the `develop` branch.
2. The `develop` branch encapsulates an unstable shapshot of the project.
	1. Must only be mutated through a merge with the `api`, `application` or a `develop-patch-{name}` branch.
	2. Patches made to the branch must describe a global change (e.g. universal `.gitignore` mutation, GitHub Workflows, etc.) and should be rare. 
3. The `application` branch encapsulates a testing snapshot of all front end development.
	1. Must only be mutated through a merge with an `application-feature-{name}` or `application-patch-{name}` branch.
4. The `api` branch encapsulates a testing snapshot of all back end development.
	1. Must only be mutated through a merge with an `api-feature-{name}` or `api-patch-{name}` branch.

## Feature Branches
A **feature branch** defines a unit of implementation for a specific feature and are identified as `{branch}-feature-{name}`.
They may be created for any existing branch excluding the `master` and `develop` branches.
The history of primary feature branches (prefixed by `application-feature-` or `api-feature-`) must be preserved through a merge regardless of the ability to fast forward and merge commits from and sub-feature branches must be squashed.
Additionally, the squashing of commits in general in order to preserve a clear and concise Git log is highly recommended.

## Patch Branches
A **patch branch** defines a unit of mutation for anything unfit to be classified as a feature branch (e.g. refactoring to adhere to the style guide) and are identified as `{branch}-patch-{name}`.
They may be created for any existing branch excluding the `master` branch.
The history of all patch branches must be destroyed and thus require squashing if a fast forward is not possible.
Additionally, the squashing of commits in general in order to preserve a clear and concise Git log is highly recommended.

## Examples
1. Initialize and implement an application feature.
    ```sh
    # Example: initialization for front-end developer
    git clone -b application https://github.com/CSC-648-SFSU/csc648-03-sp20-team103.git # clone the application branch
    cd csc648-03-sp20-team103                        # enter project directory
    git checkout -b application-feature-hello-world  # create and checkout a new feature branch
    echo Hello, world! > application/index.html      # create index.html
    git add index.html                               # stage the change (invoke git status to confirm)
    git commit -m "created index.html"               # commit changes with a meaningful message
    git push origin +application-feature-hello-world # push changes to a new remote branch

    # create the pull request: application <- application-feature-hello-world

    git checkout application                         # leave the feature branch
    git branch -d application-feature-hello-world    # delete the feature branch
    git push origin :application-feature-hello-world # delete the remote branch (assuming merge was accepted)
    ```
2. Update local application branch.
    ```sh
    # cwd: csc648-03-sp20-team103
    git fetch origin application:application # syncronize branch
    ```

3. Update README.md through a develop patch.
    ```sh
    # cwd: csc648-03-sp20-team103
    git fetch origin develop:develop      # syncronize the develop branch
    git checkout develop                  # checkout develop
	git checkout -b develop-patch-readme  # create and checkout new patch branch
    echo Hello, world! >> README.md       # add text to end of README.md
    git add README.md                     # stage the change
    git commit -m "updated README.md"     # commit the changes
    git push origin +develop-patch-readme # push the changes to a new remote branch

    # create the pull request: develop <- develop-patch-readme

    git checkout master                   # leave the patch branch
    git branch -d develop-patch-readme    # delete the patch branch
    git push origin :develop-patch-readme # delete the remote branch (if merge was successful)
    ```

