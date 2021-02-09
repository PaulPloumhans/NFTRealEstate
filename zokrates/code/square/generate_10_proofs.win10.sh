#!/bin/bash
for (( counter=10; counter>0; counter-- ))
do
echo -n "$counter "
((counter_square=counter*counter))
zokrates compute-witness -a $counter $counter_square
zokrates generate-proof
printf -v new_name "proof_%03d.json" $counter
cp proof.json $new_name
done
printf "\n"
