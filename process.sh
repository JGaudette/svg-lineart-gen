set -e

convert $1 $1.ppm
potrace -s $1.ppm -o $1.svg --color=#cccccc --flat -u 1 --longcoding --turdsize=100 --opttolerance 0.4 --turnpolicy major
svgo -i $1.svg -o -
