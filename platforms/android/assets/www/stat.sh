#!/bin/bash 

#pngnq -vf -s1 *.png 
#optipng -o7 *-nq8.png 
#
#

for dir in  mdpi ldpi 
do


    for file in img/hdpi/*.png
    do

	FILENAME=`echo $file| cut -d"/" -f3`
	if [ ! -d img/${dir} ] 
    then
        mkdir img/${dir}
    fi
    
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
	convert img/${FILENAME} -resize ${fator} img/${dir}/${FILENAME}

    done


done
