# oni-version-manager

[![Build Status](https://travis-ci.org/onivim/oni-version-manager.svg?branch=master)](https://travis-ci.org/onivim/oni-version-manager) [![npm version](https://img.shields.io/npm/v/oni-version-manager.svg)](https://www.npmjs.com/package/oni-version-manager)

## Command-line utility for managing Oni versions

### Description

This tool is designed to assist in getting specific Oni versions for automation. The use case is for plugins that would like to validate against a running instance of Oni.

### Usage

```
# For development, set the folder directly
ovm develop /path/to/root/development/folder

ovm uninstall [VERSION]
ovm install [VERSION]

ovm path [VERSION / develop]
```

The `VERSION` can be:

-   `latest` - this will get the latest GitHub release binaries.

And later, it'd be nice to have:

-   The ability to specify a tag, like `ovm v0.3.4`
-   The ability to specify a branch, like `ovm master`

The `install` command will grab the Oni binaries in a local cache.

The `path` command will return the path to the Oni binaries, or an error if it has not been installed.
