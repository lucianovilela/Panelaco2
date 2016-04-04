window.onload = function() {
   

    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    
    var objParams = [{dir:"hdpi", hLapis:200, wLapis:10},
                    {dir:"mdpi", hLapis:140, wLapis:7},
                    {dir:"ldpi", hLapis:98, wLapis:5}];
    
    
    
    var obj = objParams[0];
    if(w <= 768){
        obj = objParams[1];
    }else if(w <= 992){
        obj = objParams[2];   
    }
    
    
    

    Crafty.init(w, h-($("#botoes").height()+50), 'game');
//    Crafty.canvas();
//    
    var status = 'FIM';
    function iniciar() {
        status = 'INICIAL';
        return false;
    }


    var posicaoFinal;
    var variacao;
    var v = 0;
    var x =0;
    var dif = 0;
    
    
    Crafty.e("2D, Canvas, Image")
        .attr({
        x: (w - obj.hLapis)/ 2 ,
        y: (h-$("#botoes").height() - obj.wLapis)/ 2 ,
        w: obj.hLapis,
        h: obj.wLapis
    })
        .image("img/"+obj.dir+"/lapis2.png");
    
    var player = Crafty.e("2D, Canvas, Image")
        .attr({
        x: (w - obj.wLapis)/ 2 ,
        y: (h-$("#botoes").height() - obj.hLapis)/ 2 ,
        w: obj.wLapis,
        h: obj.hLapis    
    })
        .origin("center")
        .image("img/"+obj.dir+"/lapis.png");


    player.rotation = 0;
    $("#q2").css("background-color", "red");
    

    player.bind('EnterFrame', function () {

        switch (status) {
            case 'INICIAL':
                posicaoFinal = respostaPergunta();
                variacao = Crafty.math.randomInt(5, 10);
                //variacao = 10;
                

                v = Crafty.math.randomInt(1,5);
                status = 'MOV';
//                console.log("posicaoFinal:" + posicaoFinal);
//                console.log("rotation:"+this.rotation);
                break;
            case 'MOV':
//                console.log("dif:" + dif);
                if(Crafty.math.abs(posicaoFinal - this.rotation)>4){
                    this.rotation = posicaoFinal> this.rotation ?this.rotation+4:this.rotation-4;
                    dif = dif -4;
                }
                else{
                    status = 'EXEC';
                }
                break;

            case 'EXEC':
//                console.log("variacao:" + variacao);
//                console.log("v:" + v);
//                console.log("rotation:"+this.rotation);
                if (variacao === 0) {
                    status = 'FINALIZAR';
                } else {
                    this.rotation = this.rotation + v;
                    x = x+1;
                    if (x === variacao   ) {
                        
                        v = v*-1;
                        
                        variacao = variacao -1;
                        x=0;
                    }
                    
                }
                break;
            case 'FINALIZAR':
                $("#q1").css("background-color", "white");
                $("#q2").css("background-color", "white");
                $("#q3").css("background-color", "white");
                $("#q4").css("background-color", "white");

                var q = parseInt(this.rotation/90)+1;
                if(q==1){q=2;}
                else if(q==2){q=4;}
                else if(q==4){q=1;}
                console.log("q:" + q);
                $("#q"+q).css("background-color", "red");
                status='FIM';
                break;
            case 'FIM':
                break;

        }



    });


    function respostaPergunta(){
        
       return  Crafty.math.randomInt(0, 360);
    }

    $("#btn").click(function () {

        console.log("status inicial");
        status = 'INICIAL';
    });


}