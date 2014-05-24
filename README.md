# Hex map tool to create data for Hex based wargame

## Getting Started

#### Pre-requisites
This assumes you are trying to run the app on OS X 10.6 or higher.

To run the app you will need

* Homebrew (optional)
* Node

#### Homebrew

It's an OS X package manager that installs packages into their own self contained area of the filesystem.

To Install homebrew it's important to go the the following website and cut and past the one liner.
I could put it here BUT they encourage people to NOT do that to prevent trojan horse attacks.
So go there and to that now.

[http://brew.sh/](http://brew.sh/)


If you already have homebrew installed make sure you have the latest recipes

```
brew update
```

#### Install Node.js
Install node.js, if you haven't already. You can do this if you have brew installed by typing:

```
brew install node
```

or you can go to http://nodejs.org, download the installer, and install it.

#### Install Ember CLI
Install Ember-CLI npm module using the "global" option so that you have access to the binary from the command line:

```
npm install -g ember-cli
```

You can find the Ember CLI documentation at https://github.com/stefanpenner/ember-cli.
Note that the Ember CLI is based upon the Ember App Kit (but with awesome cool CLI tools).

#### Clone this repository

```
git clone https://github.com/daverodal/HexTool.git
```


```
npm install
```

```
bower install
```

```
ember build
```

you can set --output-path to your final directory.

you  will probably need to edit config/environment to adjust baseURL

if you do dev work you can tweek
./node_modules/ember-cli/lib/utilities/load-brocfile.js

and make destDir of liveOutputTrees point where ever you want.

and run

```
ember server
```

(cross fingers a lot)
