


window.addEventListener('load',function () {

    chrome.storage.local.set({'load':Math.random()});

    chrome.storage.local.get('el',function (e) {
        console.log(e);
        try{
            if(e.el)
                document.querySelector('.bingo_ticket').appendChild(e.el);
        }catch (e) {
            console.log(e);
        }

    });

    chrome.runtime.onMessage.addListener(function (d) {
        console.log(d);
                       var clone = document.querySelector('.pattern_table').cloneNode(true);
                       clone.classList.remove('pattern_table');
                       clone.classList.add('table_active');
        document.querySelector('.ticket_id').textContent = '';

                       var active = document.querySelector('.table_active');
                       if(active)
                           active.parentNode.removeChild(active);
                       var lineChild = 0;
                       var count = -1;
                       var flagNext = false;
                       console.log(d.pop.length);
                       if(d.pop.length){
                           document.querySelector('.ticket_id').textContent = d.pop[d.pop.length-1];
                           document.querySelector('.maxDouble').textContent = d.max;
                           document.querySelector('input[type="range"]').value = d.max;
                           if(d.isActive){
                               document.querySelector('.button3').setAttribute('src','pause.png');
                               document.querySelector('.button3').setAttribute('data-isActive','1');

                           }else{
                               document.querySelector('.button3').setAttribute('src','start.png');
                               document.querySelector('.button3').setAttribute('data-isActive','0');
                           }

                           for(var i=0; i< d.pop.length; i++){

                               if(i === 27)
                                   continue;
                               count++;
                               if(count === 9){
                                   lineChild++;
                                   count = 0;
                               }


                               console.log(lineChild);


                               var td = document.createElement('td');
                               td.textContent = d.pop[i];
                               if(lineChild < 6)
                                   $('tbody tr.numbers',clone)[lineChild].appendChild(td);
                               // if(flagNext){
                               //     $('tbody tr.numbers',clone)[lineChild-2].appendChild(td);
                               // }else{
                               //     $('tbody tr.numbers',clone)[lineChild-1].appendChild(td);
                               // }


                               // clone.querySelector('tbody tr.numbers:nth-child('+lineChild+')').appendChild(td);

                           }
                           chrome.storage.local.set({'el':clone});
                           document.querySelector('.bingo_ticket').appendChild(clone);

                       }





    });

    document.querySelector('.button3').addEventListener('click',function (e) {

        if(e.target.getAttribute('data-isActive') == '0'){
            e.target.setAttribute('src','pause.png');
            e.target.setAttribute('data-isActive','1');
        }else{
            e.target.setAttribute('src','start.png');
            e.target.setAttribute('data-isActive','0');
        }

        console.log('click');
        var data = {};
        data['content_'+Math.random()] = Number(document.querySelector('input[type="range"]').value);
        chrome.storage.local.set(data);
    });

    document.querySelector('.button').addEventListener('click',function (e) {
        chrome.storage.local.set({'save':Math.random()});
    });

    document.querySelector('.button2').addEventListener('click',function (e) {
        chrome.storage.local.set({'dell':Math.random()});
    });

    document.querySelector('input[type="range"]').addEventListener('change',function (e) {

        document.querySelector('.maxDouble').textContent = e.target.value;
        // chrome.storage.local.set({'dell':Math.random()});
    });

});