install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint .

gendiff:
	node bin/gendiff.js

gd:
	node bin/gendiff.js '../test_lvl2/config_test/before.json' '../test_lvl2/config_test/after.json'

test:
	npm test

test-watch:
	npx -n --experimental-vm-modules jest --watch

test-coverage:
	npm test -- --coverage
