/**
 * Created by Jörg on 17.02.2016.
 */
"use strict";
class Spielfeld{
    constructor (element){
        this.element = element;
        this.height = 20;
        this.width = 20;
        this.zellen = [];
        this.initGamefield();
    }

    initGamefield(){
        for (let i = 0; i < this.height; i++){
            if (this.zellen[i] === undefined){
                this.zellen[i] = [];
            }
            for (let j = 0; j < this.width; j++){
                if (this.zellen[i][j] === undefined){
                    this.zellen[i][j] = new Zelle(this.getRandomBoolean());
                }
            }
        }
    }

    getNeighboursAlive(i, j){
        let debug = '('+i+','+j+') -> ';
        var result = 0;

        let row_limit = this.height - 1;
        if(row_limit > 0){
            let column_limit = this.width - 1;
            for(let x = Math.max(0, i-1); x <= Math.min(i+1, row_limit); x++){
                for(let y = Math.max(0, j-1); y <= Math.min(j+1, column_limit); y++){
                    if(x != i || y != j){
                        let state = this.zellen[x][y].state
                        debug += '(' + x + ',' + y + ' ' + state + ') ';
                        if (state) {
                            result++;
                        }

                    }
                }
            }
        }
        console.log(debug);
        return result;
    }

    paint(){
        var html = '';
        for (let i = 0; i < this.height; i++){

            let top = 20 * i;

            for (let j = 0; j < this.width; j++){

                let left = 20 * j;
                let zelle = this.zellen[i][j];
                zelle.neighboursAlive = this.getNeighboursAlive(i,j);

                html += '<div class="zelle '+
                    (zelle.state ? 'alive': 'nothing') +
                    '" style="top: '+top+'px; left: '+left+'px" >'+zelle.neighboursAlive+'</div>';


            }
        }

        this.element.html(html);

    }

    getRandomBoolean(){
        if (Math.random() < 0.3){
            return true;
        }
        return false;
    }

}