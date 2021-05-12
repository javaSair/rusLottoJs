let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let model = mongoose.model('lottoModel');


function sendData(res, data) {
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://www.stoloto.ru'
    });
    res.send(data);
}

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('req.query.is');
    console.log(req.query.is);

    model.findOne({},function (err,resT){
        if(!err && resT){
            if(req.query.is){
                resT.remove();
                sendData(res,{status:true});
            }else{
                console.log('res')
                console.log(resT)
                sendData(res,{status:true,data:resT.table});
            }

        }else{
            sendData(res,{status:null});
        }
    })

  // res.render('index', { title: 'Express' });
});

router.post('/',function (req,res) {
    let d = JSON.parse(req.body.d);
    let m = new model({
        table:d
    });
    m.markModified('table');
    m.save(function (err){
        sendData(res,{status:!err});
    });

})


module.exports = router;
