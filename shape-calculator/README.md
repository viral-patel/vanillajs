Simple Shape Calculator in Plain Javascript using Modules

* *index.html* includes *main.js* and *app.js*
* *shape.js* is designed as a module that contains Shape class and other class that inherits from it ( Circle, Ellipse, Rectangle, Square)
* A new shape can be added to the *shape.js* & *app.js* and it will be displayed automatically on the interface on *index.html*
* *app.js* imports all classes from *shape.js* using "import *"
* *app.js* exports a list of Shapes and it's inherited classes to *main.js*
* Use of let for block level variable scope
* Use of var in *main.js* to have 2 variables with global scope 
* *main.js* dynamically loads all shapes and inputs to calculate area based on selected shape using Reflection

