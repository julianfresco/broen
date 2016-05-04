# Broen Admin Dashboard Theme

A starter theme for admin consoles and dashboards, intended for use with component-based front-end frameworks such as AngularJS and React.

*[Broen](https://no.wikipedia.org/wiki/Bro_(skip))* is the Norwegian word for a
bridge on a ship, the room or platform where a ship is controlled.

![Broen](https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Bridge_of_the_RV_Sikuliaq.jpg/320px-Bridge_of_the_RV_Sikuliaq.jpg)


### How to use Broen in a new project

To start a new project with *Broen*, first clone the repo then in your terminal:

First, make sure you have nodejs and npm installed, along with `gulp` and the
`sass` ruby gem. Gulp and Sass are installed with these commands (added sudo
because normally required):

``` bash
# Install gulp then sass
sudo npm install gulp -g
sudo gem install sass
```

Finally, in your terminal, cd to the project and:

``` bash
# Remove the broen repo (you'll want your own project + repo)
rm -rf .git
# Download packages
npm install
# Start livereload
gulp
```

Sass source files are found under `./src` while the compiled css files are found
under `./dist`. If you desire to change the folder structure and still use the
livereload, just update the configurations in `config.project.json`.


**Sources**

Uses my own [livereload-starter](https://github.com/julianfresco/livereload-starter)

Influenced by:

* Metronic theme (Keen Themes)
* Atom One Dark Theme (Atom.io)
* Dashboard theme (Bootstrap)
* Dashboard starter example (Bootstrap)
* Dashboard (Nicolas Kayser on Dribble)
