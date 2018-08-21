
curl -s $1 -o $2
sqip $2 -o $2.svg
cat $2.svg
rm -f $2*
