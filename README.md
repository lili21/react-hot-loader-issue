react-hot-loader with class properties
======================================

Get Start
---------

```
$ yarn
$ npm start
```

Steps
-----

1. visite `http://localhost:8283` with devtool opened.

2. the `onClick` event handler doesn't work as expected. `this.setState({ clicked: true })` not working. You can verify it by clicking the **click me** button. ( sourecode -> **src/components/home.jsx** )



I figured two way to fix this.

1. remove the `react-hot-loader/babel` plugin from `.babelrc`.

2. define the `onClick` handle in normal way, like what **src/components/about.jsx** does.

