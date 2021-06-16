# FEC
Front End Capstone for Hack Reactor

## Getting a Copy of the Repo
If you haven't already, fork the repository on GitHub and clone your newly created repo down to your computer.

## Set Repo as Remote Upstream
After you fork, set this repo as an upstream with `git remote add upstream https://github.com/teamDidMount/FEC.git`

## Pull From Upstream Master Daily
Before you begin coding for the day, pull from the upstream master branch with `git pull upstream master`.

## How to Run
Navigate to the root directory of FEC, then install the required packages by running `npm install` in your terminal. To begin, first compile the by running `npm run react:dev`, then start the server by running `npm start:dev`. Lastly, navigate to `http://localhost:1128` in your browser.

## Opening a PR
When you're ready to merge your fork with FEC:Master, open a PR and merge.

## To Resolve a Conflict

### Manual Option
Pull from your upstream or master, depending on where the conflict is happening. Next, checkout your working branch and run `git merge upstream master` to merge the master branch with your master branch. Then, resolve the merge conflicts on your local machine. Finally, push your changes and open a new PR.

### Rebasing Option
Fetch all branches of remote upstream with `git fetch upstream`. Next, rewrite your master with upstream’s master using `git rebase upstream/master`. Then, push your updates to master. You may need to force the push with “--force”. `git push origin master --force`. Lastly, open up a new PR.
