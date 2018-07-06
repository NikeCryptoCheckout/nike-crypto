# How to Test on the Full Stack

Because we are using PHP and a Truffle JS app, we have some interesting stack requirements. The default doesn't quite work for us, so here is a write up on how to test our whole app - PHP through js to the chain.

## What's Up With PHP and Web3JS

The original way to test the app is by migrating the contracts, then running `npm run dev` in the directory. This works great without php, and has some cool features like a live reloading webpage. This makes iteration fast for say frontend design stuff. What it's not great for is PHP. Since PHP is a precompiler for HTML, a live reloading environment breaks it pretty bad. Because of this, and because webpack doesn't even have PHP in it, a different stack is needed.

### MAMP, XAMPP, etc

Your first step is to find something that can run a xAMP stack on your machine. xAMP stands for 
* X = (some operating system)
* A = Apache (the web server that npm webpack is using)
* M = MySQL or some other DB
* P = PHP (that's what we need!)

MAC - 

If you are on mac, you can download MAMP, then install the npm CLI for MAMP.

For example, if you use MAMP and the mamp cli, you simply go into the folder you want and run

`mamp . -p 8080`

Windows -

If you are on windows, you can use XAMPP. You will need to configure the default port and directory to match above. To do this, using the XAMPP control panel, navigate to : config (global config)-> Service and Port Settings ->  and set the Main port for Apache to 8080 (from 80). Then back on the main interface, enter Apache's config to change the port and directory. Edit the first file 'httpd.conf'. There should only be four lines you need to edit.

Listen 80 -> Listen 8080

ServerName localhost:80 -> ServerName localhost:8080

DocumentRoot "C:\xampp\..." -> DocumentRoot "C:\WhereverYourBuildFolderIsStored"

<Directory "C:\xampp\..."> -> <Directory "C:\WhereverYourBuildFolderIsStored">

Then, to start a Xampp server you can just click start on the Apache service using the Xampp control panel to start.

## Okay Let's Run It

### Not So Fast

You might think that all you need to do now is run your xAMP at the `/app` subdirectory. Sadly, Truffle has set up a bunch of pre-compilers for their javascript, so running your third party web server to that results in a whole bunch of "I don't know where this file is". The reason editing things in `/app` used to work is because when you ran `npm run dev` webpack would set up an interpreter to live compile the `/app` directory into a usable thing. The point here is that `app.js` is far more readable in this state than it is after it's compiled. 

So basically, when you run your xAMP to this directory, it's trying to run code that is half compiled, (more like linked, but who cares). What you need to do is compile the truffle app before pointing your normal webserver to it.

### Building Truffle Web App to a Usable Website

So - what we are going to do is run `npm run build` . You will notice the `/app` directory no longer has HTML or PHP in it. That's because it's all been moved to the `/build` folder. When you run this command, truffle and webpack move all the js and css to the build directory and compile it. after this, run your xAMP folder at `/build` and eveything will work together finally.

##  Where to Put What Types of Files

* If you are writing PHP, or CSS, or anything frontend, you make and edit your files in the `/build` directory. 
* If you are working on the contract js - you are working in `/app`

# Quickstart

## Every time you pull

* Run `npm run build`

## Edit/Build Web3JS

* Edit anything you want in `/app`
* Run `npm run build`

## Edit/Build Frontend

* Edit anything you want in `/build`

Nothing else to do here, no building needed

## Edit/Build Solidity Contract

* Edit anything you want in `/contracts`
* Run `truffle compile`

## Run the Stack

* Open Ganache
* run `truffle migrate`
* Start a xAMP server pointed to `/build` and port `8080`
* Open Chrome, connect Metamask to your RPC
* Go to `localhost:8080`
