install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint .

gendiff:
	node bin/gendiff.js

gds:
	node bin/gendiff.js -f stylish './__fixtures__/before.json' './__fixtures__/after.json'

gdp:
	node bin/gendiff.js -f plain './__fixtures__/before.json' './__fixtures__/after.json'

test:
	npm test

test-watch:
	npx -n --experimental-vm-modules jest --watch

test-coverage:
	npm test -- --coverage
