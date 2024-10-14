# Basic Web template creator (node)

This is a small but very useful environment created with NODE to create simple templates for different website using React as framework.
This system helps you to save space on your computer so you can use the same libraries in different website without the necessity of download each time the same libraries. You can customize and choose which libraries to use in each webpage but they are not going to affect other webs (unless you import them).
This environment comes with a command line prompts which will ask you how to create your web, the parts and where to save it ("lp" is the default folder).

Hopefully this small script can help others to create and organize in a simple way all the SPA or web apps.

## Installation

Use the package manager npm or yarn to install.

```bash
npm i
```

## Usage

There are 3 main scripts to run: create, start and build.

### Create a new project:

To create a new project you can simple use the command

```bash
npm run create
```

This script will run all the process that you have on the file: scripts/customCreate.js
Basically for each question you will need to create and action.
My default code has the question to "Add projectCode" , which is how you are going to identify your web/app and its the most important key for that particular project.
"Add projectName", this is the normal name that you may use to name this project (usually used on the SEO component)
"Add the urlName", this is the string used for release your project. Try to use a SEO friendly string since it will be used when creating the path on the build process.
At the end you need to choose between what kind of page (template) you want to use for your project. For this I have 4 kind , landing page (normal) , hint , share or special. The hint, share or special are just special cases so basically the template to use is the landing page.

** you can edit or add more scripts according to your needs**

The default scripts will create the following files:

```bash
import foobar

# Edit the src/config/eventsList.js
This file will contain all the data that you enter in the create script as a json format.
 Each time that you enter any of the run commands it will search for this information.

# Edit the package.json
In order to change the homepage of the web/app.
This will let the system knows where and which are the files that you are going to use.

# Create a container folder and main file
The App.js will get from the containers folder the container with the projectCode.
it will be a file with the projectCode.js and a folder with the same name.
Inside of the folder you will get a Home.js with the basic template.

# Create a component folder and files.
Inside of the src/components it will create a folder with the projectCode name and insert
a Seo.js component, index.scss


```

After you get all the basic files you will need to run the start or build script

```bash
## For develop
npm run start

or

## For release
npm run build
```

## Release

The build script will create an optimize your files for release. It also will change the paths automatically and compress/create css files.
We do not use the assets inside of the projects but you can use them using the Assets.js.
THe problem is that you will need to handle the images/videos/etc which are saved in the asset folder to dont be added during the build process as a path.
I did this complex script but since it was difficult to keep the code running and it always add the images on develop environment I decided to use remote hosted assets or svg code.

# Portafolio

The only data that you may see now is the portfolio which is the main reason for this repository. Using a single json it will creates all the UI for check your data.

## License

[MIT](https://choosealicense.com/licenses/mit/)
