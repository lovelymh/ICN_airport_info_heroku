var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var xml2js = require('xml2js');
var app = express();
//waterfall을 사용하기 위함
var async =  require('async');
//promise를 사용하기 위함
var rq = require('request-promise');

// parse application/x-www-form-urlencoded
//client한테 json으로 받으려고 사용
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//react + booststrap 경로 잡기
app.use('/js', express.static(__dirname + '/client/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
//app.use('/js', express.static(__dirname + '/client/public/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/client/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/image', express.static(__dirname + '/client/src')); // redirect CSS bootstrap


var url='http://openapi.airport.kr/openapi/service/StatusOfPassengerWeahter/getPassengerDeparturesW?';
var url2='http://openapi.airport.kr/openapi/service/StatusOfPassengerWeahter/getPassengerArrivalsW?';
var url3='http://openapi.airport.kr/openapi/service/PassengerNoticeKR/getfPassengerNoticeIKR?';
var url4='http://openapi.airport.kr/openapi/service/StatusOfParking/getTrackingParking?';
var url_add ='/openapi/service/StatusOfPassengerWeahter/getPassengerDeparturesW?'
var ServiceKey='ServiceKey=vO6meNAKoskv2FfBIM3DYwD3rNolNJa80t87Alyf%2FKPC8xypeXMAL07hFwcWYrOlerLkaunEPYcKp4FwhtHgxQ%3D%3D';
var page = '&numOfRows=50';
var selectdate = '&selectdate=0'; //오늘일자 공항 혼잡도
//var time = '&from_time=1240&flight_id=';
var parser = new xml2js.Parser();
var data = '';
var data2 = ''; //혼잡도 데이터
var data3 = ''; //주차장 데이터
var ff = '&flight_id=';
var flight_id = '';
var type = ''; //출발:0, 도착:1
var parkchk = false;

const port = process.env.PORT || 5000;
console.log('GGA');

function AA2(){
    if(flight_id === ''){ //안넣은 경우는 동작하지 않는다.
        console.log('flight_id 없음!')
    } else {
      data = '';
      type = '';
      rq({
            url: url + ServiceKey + page+ ff + flight_id,
            method: 'GET'
          }, function (error, response, body) {
               parser.parseString(body, function(err, result){
                console.log('내부함수1');
                data = result.response.body[0].items[0];
                if (data){
                    console.log('출발 데이터 조회 결과 있음!');
                    type = '0';
                } else {
                    console.log('출발 데이터 조회 결과 없음!');
                     type = '';
                }
              })
          }).then(function (repos) {
              //console.log('User has %d repos', repos.length);
           if(type === ''){
             data = '';
              rq({
                    url: url2 + ServiceKey + page+ ff + flight_id,
                    method: 'GET'
                  }, function (error, response, body) {
                       parser.parseString(body, function(err, result){
                        console.log('내부함수2');
                        data = result.response.body[0].items[0];
                        if (data){
                            console.log('도착 데이터 조회 결과 있음!');
                            type = '1';
                        } else {
                            console.log('도착 데이터 조회 결과 없음!');
                             type = '';
                        }
                      })
                })
            }
          }).then(function (repos) {
            data2 = '';
            rq({
                  url: url3 + ServiceKey + page+ ff + flight_id,
                  method: 'GET'
                }, function (error, response, body) {
                     parser.parseString(body, function(err, result){
                      console.log('내부함수3');
                      //console.log(JSON.stringify(data3));
                      data2= result.response.body[0].items[0];
                      if (data2){
                          console.log('공항 혼잡도 데이터 조회 결과 있음!');

                      } else {
                          console.log('공항 혼잡도 데이터 조회 결과 없음!');

                      }
                    })
              })
            })
          // }).then(function (repos) {
          //   if(parkchk === true){
          //     data3 = '';
          //         rq({
          //            url: url4 + ServiceKey + page+ ff + flight_id,
          //            method: 'GET'
          //          }, function (error, response, body) {
          //               parser.parseString(body, function(err, result){
          //                console.log('내부함수4');
          //                data3 = result.response.body[0].items[0];
          //               // console.log(JSON.stringify(data3));
          //                if (data3){
          //                    console.log('주차장 데이터 조회 결과 있음!');
          //                   // type = '1';
          //                } else {
          //                    console.log('주차장 데이터 조회 결과 없음!');
          //                   //type = '';
          //                }
          //              })
          //        })
          //    }
          // })
    }
}

function AA3(){
    if(parkchk === true){
      data3 = '';
      rq({
         url: url4 + ServiceKey + page+ ff + flight_id,
         method: 'GET'
       }, function (error, response, body) {
            parser.parseString(body, function(err, result){
             console.log('내부함수4');
             data3 = result.response.body[0].items[0];
            // console.log(JSON.stringify(data3));
             if (data3){
                 console.log('주차장 데이터 조회 결과 있음!');
             } else {
                 console.log('주차장 데이터 조회 결과 없음!');
             }
           })
     })
  }
}

 async function test(){
  console.log(url+ServiceKey+page+ff+flight_id);
  data = '';
  type = '';
  if(flight_id === ''){ //안넣은 경우는 동작하지 않는다.
      console.log('flight_id 없음!')
  } else { //넣은 경우에 한해서 출발에서 먼저 가져오고 결과가 없으면 도착에서 다시 가져온다.
    await request({
     url: url + ServiceKey + page+ ff + flight_id,
      method: 'get',
      agent: false,
      pool: false,
      //pool: {maxSockets: 100},
      timeout: 500
   },  function (error, response, body) {
        parser.parseString(body, function(err, result){
         //data = result.response.body[0].items[0].item[0];
         console.log('내부함수');
         data = result.response.body[0].items[0];
         if (data){
             console.log('출발 데이터 조회 결과 있음!');
              type = '0';
         } else {
             console.log('출발 데이터 조회 결과 없음!');
               type = '';
         }
         //console.log(JSON.stringify(data));
         //console.log(String(data.airline));
       })

          response.on('data', (body) => {
              console.log(body);
          });
          response.on('end', () => {
              console.log('No more data in response.');
          });

          if(error) {
             response.end();
          }
     }
   )
 }

}



app.get('/api/hello', (req, res) => {

  var timer = setTimeout(function(){
   res.send({data: data, type: type, data2: data2, data3: data3});
     clearTimeout(timer);
  }, 800)

   //console.log('hello!');

  var timer2 = setTimeout(function(){
    res.end();
    clearTimeout(timer2);
 }, 2000)
});


app.post('/api/hello', (req, res) => {
  console.log(req.body.input);
  flight_id = req.body.input;

  console.log('flight_id :' +flight_id);

   AA2();

  var timer2 = setTimeout(function(){
    res.end();
    clearTimeout(timer2);
  }, 2000)

})

app.post('/api/hello2', (req, res) => {
  parkchk = req.body.input2;

  console.log('parkchk :' +parkchk);

   AA3();

   var timer2 = setTimeout(function(){
     res.end();
     clearTimeout(timer2);
   }, 2000)
})

app.listen(port, () => console.log(`Listening on port ${port}`));
