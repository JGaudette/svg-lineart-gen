
curl -s $1 \
  | convert - ppm:- \
  | potrace --color=#cccccc --flat -u 1 --svg --longcoding --turdsize=100 --opttolerance 0.4 --turnpolicy major \
  | svgo -i - -o -
