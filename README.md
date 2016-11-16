# environment-config-webpack-loader

## Usage
```javascript
    module: {
        loaders: [{
            test: /package\.json$/,
            loader: 'environment-config-webpack-loader?environment=' + environment
            }
        ]
    }
```
