# angular-elevator

angular-elevator is an AngularJs directive that enables us to interact with Elevator.js easily.

# Get Started

**Bower:**

```bash
$ bower install angular-elevator --save
```

Include `angular-elevator.js` from the src directory in your `index.html` after including Angular.

Add `ngElevator` to your main module's list of dependencies.

When you're done, your setup should look similar to the following:

```html
<!doctype html>
<html lang="en" ng-app="demoapp">
<head>
  <title>Angular Elevator Js Test</title>

  <script src="bower_components/angular/angular.min.js"></script>
  <script src="bower_components/angular-elevator/src/angular-elevator.js"></script>
</head>
<body>
</body>
</html>
```


```javascript
var app = angular.module("demoapp", ["ngElevator"]);
```

Finally, you must include the markup directive on your HTML page as an Element, like this:

```html
<elevator></elevator>
```

Or as an attribute:

```html
<div elevator>
```
