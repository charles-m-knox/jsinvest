build-site:
	npm run-script build
	rm -rf docs
	mv build docs
	touch ./docs/.nojekyll
