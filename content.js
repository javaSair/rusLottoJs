let arraySelectTable = [];
let max = 0;
let bilet_1 = {};
let stop = false;
let isActive = false;
let isAjax = false;
let numbers = {
    double:0
};
window.addEventListener('load',function () {




     $('.bingo_ticket').on('click',function (e) {
        logic(10,true);
        console.log('click---')
    });


    chrome.storage.onChanged.addListener(function (e) {

        try{

console.log('content.js');
            var k = Object.keys(e)[0];
            console.log(k);
            var flag = k.match('content');
            if(flag && flag.length){
                if(!isActive){
                    isActive = true;
                    stop = false;
                    max = e[k].newValue;
                    logic(e[k].newValue,false);
                }else{
                    isActive = false;
                    stop = true;
                }

            }else{
                var flag = k.match('save');
                    if(flag && flag.length){
                        arraySelectTable = [];
                        logic(10,true);
                    }else{
                        var flag = k.match('load');
                        if(flag && flag.length){
                            // chrome.storage.local.set(data);
                            if(arraySelectTable.length)
                                chrome.runtime.sendMessage({'pop':arraySelectTable,isActive:isActive,max:max});
                        }else{
                            arraySelectTable = [];
                            bilet_1 = {};
                            chrome.runtime.sendMessage({'pop':arraySelectTable,isActive:isActive,max:5});
                        }

                    }

            }

        }catch (e) {
            console.log(e);

        }


    })


});


function logic(max,isSelect) {

   var bilet_2 = null;


       // s[0].classList.remove('selected');
    if(!isSelect && isAjax){
        var s = document.querySelectorAll('.coupons .bingo_ticket');

        // let max = document.querySelector('.maxDouble').textContent;
        metka:  for(var i=0; i <s.length; i++) {

            var n = s[i].querySelectorAll('tbody tr td');
            var d = {double: 0, N: s[i].querySelector('.ticket_id').textContent};
            if(numbers[d['N']]){
                numbers.double++
                d.double = 10;
                continue;
            }else{
                numbers[d['N']] = true;
            }
            for (var j = 0; j < n.length; j++) {
                if (!!n[j].textContent)
                    d[n[j].textContent] = !!n[j].textContent;

                // if (bilet_1[n[j].textContent] && d.N != arraySelectTable[arraySelectTable.length - 1]) {
                if (bilet_1[n[j].textContent]) {
                    d.double++;
                }
            }


            console.log('Повторений: '+d.double);


            if (Number(d.double) <= Number(max)) {

                console.log('поиск завершен');
                console.log(d);
                s[i].classList.add('selected');
                bilet_2 = d;
                isActive = false;
                // запрос на удаление и базы
                chrome.runtime.sendMessage({'pop': arraySelectTable, isActive: isActive, max: max});
                $.ajax('http://localhost:3000?is=1', {
                    type: 'get',
                    success: function (d) {
                        console.log('success delete');
                        console.log(d);
                    }
                })
                return;
            }

        }
    }else{
        let dataGet = JSON.stringify({type:'search'});
        $.ajax('http://localhost:3000/',{
            type:'get',
            dataType:'json',
            data: dataGet,
            success:function (dL){
                isAjax = true;
                var data = {};
                var ob = {};
                if(dL.data){
                    // document.querySelector('.bingo_ticket.selected').classList.remove('selected');
                    var d = {double:0,N:dL.data.N};
                    arraySelectTable = [].concat(dL.data.array);

                    for(var j=0; j< arraySelectTable.length; j++){
                        ob[arraySelectTable[j]] = !!arraySelectTable[j];
                    }
                    bilet_1 = ob;


                    arraySelectTable.push(dL.data.N);
                    data["pop"] = arraySelectTable;

                    chrome.runtime.sendMessage(data);
                }else{
                    var s = document.querySelectorAll('.coupons .bingo_ticket');
                    // let isDouble = document.querySelector('#doubleLotto').getAttribute('data-double');
                    metka:  for(var i=0; i <s.length; i++){

                        var n = s[i].querySelectorAll('tbody tr td');
                        var d = {double:0,N:s[i].querySelector('.ticket_id').textContent};




                        if(isSelect){
                            var ob = {};


                            if(s[i].classList.contains('selected') && !arraySelectTable.length){
                                for(var j=0; j< n.length; j++){
                                    arraySelectTable.push(n[j].textContent);
                                    if(!!n[j].textContent)
                                        ob[n[j].textContent] = !!n[j].textContent;
                                }

                                let dJson = {};
                                // получить из добавленного элемента выбранное количество повторений и сохзранить в double
                                dJson['d'] = JSON.stringify({array:arraySelectTable,N:d.N});
                                // Запрос на добавление в базу
                                arraySelectTable.push(d.N);
                                bilet_1 = ob;

                                data["pop"] = arraySelectTable;


                                $.ajax('http://localhost:3000/',{
                                    type:'post',
                                    dataType:'json',
                                    data:dJson ,
                                    success:function (d){

                                        // chrome.storage.local.set(data);
                                        chrome.runtime.sendMessage(data);
                                    }
                                });

                            }
                        }else{
                            // for(var j=0; j< n.length; j++){
                            //     if(!!n[j].textContent)
                            //         d[n[j].textContent] = !!n[j].textContent;
                            //
                            //     if(bilet_1[n[j].textContent] && d.N != arraySelectTable[arraySelectTable.length-1]){
                            //         d.double++;
                            //     }
                            // }
                            //
                            // console.log('bilet_1')
                            // console.log(bilet_1)
                            // console.log('d')
                            // console.log(d);
                            //
                            // if(d.double <= max){
                            //
                            //     console.log('+d');
                            //     console.log(d);
                            //     s[i].classList.add('selected');
                            //     bilet_2 = d;
                            //     isActive = false;
                            //     // запрос на удаление и базы
                            //     chrome.runtime.sendMessage({'pop':arraySelectTable,isActive:isActive,max:max});
                            //     $.ajax('http://localhost:3000/',{
                            //         type:'delete',
                            //         dataType:'json',
                            //         data:{delete:1},
                            //         success:function (d){
                            //             console.log('success delete');
                            //             console.log(d);
                            //         }
                            //     })
                            //     return;
                            // }
                            //


                        }
                    }

                }
            }
        });


    }

    if(bilet_2 == null && !isSelect){
        if(!stop){
            console.log('дубликатов: '+numbers.double);
            document.querySelector('.refresh_btn').click();
            setTimeout(function () {
                logic(max,false);
            },2000);
        }
    }else{

    }
}