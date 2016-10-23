require.config({
    paths: {
        // Paths to dependencies.
        angular: 'lib/angular',
        jquery: 'lib/jquery',
        less: 'lib/less',
        domReady: 'lib/domReady',
        resources: '../resources',
    },
    shim: {
        // Modules and their dependent modules.
        'angular': {
            exports: 'angular'
        }
    },
    baseUrl: 'js',
});

require(['app', 'require', 'jquery'], function(app, require, $) {
    $('head').append($('<link rel="stylesheet/less" type="text/css"/>').attr('href','styles.less'));
    less = { env: 'development', poll: 3000, logLevel: 1 }; // TODO: should it be 'development'?

    require(['less'],function(less){
       less.watch();
    });

    app.init();
});
