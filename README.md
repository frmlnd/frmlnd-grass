# frmlnd-grass
**frmlnd-grass** is an angular directive that "grows" virtual grass out of the bottom of a container, most likely your webpage.

## Dependencies
bower install angular#1.3.15 --save-dev, or 
[AngularJS 1.3.15](https://angularjs.org/)

## Usage
Include CSS and JS files:
<header>
```
<link rel="stylesheet" type="text/css" href="css/frmlnd-grass.min.css">
```
<body>
```
<script type="text/javascript" src="js/angular.min.js"></script>
<script type="text/javascript" src="js/frmlnd-grass.min.js"></script>
```
Include frmlnd-grass directive, with duration as a parameter in milliseconds.
```
<frmlnd-grass duration="5000"></frmlnd-grass>
```

### Attributes

* duration: The duration of the animation, in milliseconds
* auto: Indicates whether grass should grow on load - true/false

### Methods

The directive exposes the following public methods:

* frmlndGrow() - Called from outside of directive scope to access directive grow fuction - ex: <button ng-click="frmlndGrow()" ng-bind-html="Grow"></button>