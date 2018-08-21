set -e

convert $1 tmp.ppm
potrace -s tmp.ppm -o temp.svg --color=#cccccc --flat -u 1 --longcoding --turdsize=100 --opttolerance 0.4 --turnpolicy major
svgo -i temp.svg -o - #output.svg
