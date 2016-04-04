#!/bin/bash 

#pngnq -vf -s1 *.png 
#optipng -o7 *-nq8.png 
#
#

for dir in hdpi mdpi ldpi 
do


    for file in res/drawable/*.png
    do

	FILENAME=`echo $file| cut -d"/" -f3`

	if [ $dir = "xhdpi" ]
	then
	  fator="70%"
	elif [ $dir = "hdpi" ]
	then
	  fator="50%"
	elif [ $dir = "mdpi" ]
	then
	  fator="40%"
	elif [ $dir = "ldpi" ]
	then
	  fator="30%"
	fi
	convert res/drawable/${FILENAME} -resize ${fator} res/drawable-${dir}/${FILENAME}

    done


done