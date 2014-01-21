/*jslint node: true, nomen: true, white: true, unparam: true*/
/*!
 * Sitegear3 Ignition
 * Copyright(c) 2014 Ben New, Sitegear.org
 * MIT Licensed
 */

(function (_, prompt, optimist, schema) {
	"use strict";

	var introduction = function () {
			console.log('');
			console.log('Sitegear3 Ignition Module');
			console.log('=========================');
			console.log('');
			console.log('You will be presented with a series of questions relating to the desired ');
			console.log('configuration of your website.  Each question has a corresponding command-');
			console.log('line argument, which can be used to preselect an answer, which enables ');
			console.log('non-interactive operation.  The command-line arguments are given in the ');
			console.log('questions.  You can also specify "--defaults" and all defaults will be used ');
			console.log('(except as overridden by question-specific command-line arguments)');
			console.log('');
		},
		generateModel = function (result, parentSchema, model) {
			_.each(result, function (resultValue, resultKey) {
				var childSchema = parentSchema.properties[resultKey];
				if (_.isPlainObject(resultValue)) {
					generateModel(resultValue, childSchema, model);
				} else {
					if (_.isFunction(childSchema.callback)) {
						childSchema.callback.apply(model, [ resultValue ]);
					}
				}
			});
			return model;
		},
		generateSite = function (model) {
			console.log(model);
		};

	introduction();
	prompt.override = optimist.argv;
	prompt.start();
	prompt.get(schema, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			generateSite(generateModel(result, schema, { settings: {}, middleware: [], sets: [] }));
		}
	});
}(require('lodash'), require('prompt'), require('optimist'), require('./schema.js')));
