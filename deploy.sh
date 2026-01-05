#!/usr/bin/env sh

# abort on errors
set -e

# build demo
cd demo
npm run build
cd ..

# copy demo files to vuepress public dir
mkdir -p docs/.vuepress/public/demo/dist
cp demo/index.html docs/.vuepress/public/demo/index.html
cp -r demo/dist docs/.vuepress/public/demo/

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'Deploying docs'

git push -f git@github.com:febe95/vue-js-modal.git master:gh-pages

cd -
