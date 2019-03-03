# Contributing
First and foremost, we appreciate your interest in this project. This document contains essential information, should you want to contribute.

## Development discussion
For new features or improvements, open a [new issue](https://github.com/tiagojpdias/pepe-as-a-service/issues/new).

## Which Branch?
Merge requests containing bug fixes or new features should always be done against the `master` branch.

## Coding Style
This package follows the [Airbnb](https://github.com/airbnb/javascript) JavaScript style guide.

### Committing to git
Each commit **MUST** have a proper message describing the work that has been done.
This is called [Semantic Commit Messages](https://seesparkbox.com/foundry/semantic_commit_messages).

Here's what a commit message should look like:

```txt
chore(Messages): only throttle message when previous was successful
^_--^ ^------^   ^------------------------------------------------^
|     |          |
|     |          +-> Description of the work done.
|     |
|     +----------> Scope of the work.
|
+---------------> Type: chore, docs, feat, fix, hack, refactor, style, or test.
```
