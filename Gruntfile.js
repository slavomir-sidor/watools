module.exports = function(grunt)
{
	grunt.initConfig(
	{
		serve :
		{
			options :
			{
				port : 3005
			}
		},
		express :
		{
			dev :
			{
				options :
				{
					script : 'bin/server.js'
				}
			},
			prod :
			{
				options :
				{
					script : 'bin/server.js',
					node_env : 'production'
				}
			},
			test :
			{
				options :
				{
					script : 'bin/server.js'
				}
			}
		},

		pkg : grunt.file.readJSON('package.json'),

		uglify :
		{
			options :
			{
				banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build :
			{
				src : 'src/<%= pkg.name %>.js',
				dest : 'build/<%= pkg.name %>.min.js'
			}
		},

		watch :
		{
			express :
			{
				files :
				[
					'**/*.js'
				],

				tasks :
				[
					'express:dev'
				],

				options :
				{
					spawn : false
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-serve');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default',
	[
		'uglify'
	]);

	grunt.registerTask('rebuild', ['clean']);
	grunt.registerTask('dev', ['rebuild', 'express', 'watch']);
	
	grunt.registerTask('server',
	[
			'express:dev', 'watch'
	])
};