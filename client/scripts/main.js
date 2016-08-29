requirejs.config({
	baseUrl: './scripts',
	paths : {
      'jquery': '../bower_components/jquery/dist/jquery',
      'select2': '../bower_components/select2/dist/js/select2',
      'model': './model',
      'view': './view',
      'controller': './controller'
	},
	deps: ['model', 'view', 'controller']
});