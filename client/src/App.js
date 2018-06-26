import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var airportcode = '';
var terminal = '';
var terminal2 = '';
class App extends Component {

  state = {
    checked: false
  }

   componentDidMount(){

  }

    // shouldComponentUpdate(nextProps, nextState) {
    //   if (this.state.input === nextState.input){
    //     console.log('shouldComponentUpdate');
    //   }
    //   return this.state.input !== nextState.input;
    // }

  _renderMovies = () => {
;
    const movies = this.state.movies.map((movie, index) => {
       console.log('_renderMovies_length :'+this.state.movies.length);

        console.log(movie);

  //    if((this.state.movies.length > 1 && index > 0) || (this.state.movies.length === 1 && index === 0)) {
        terminal = '';
        terminal2 = '';
        terminal2 = String(movie.terminalid);
        switch(String(movie.terminalid)) {
           case 'P01' :
            terminal = '제1 터미널';
            break;
           case 'P02' :
            terminal = '제1 터미널-탑승동';
            break;
           case 'P03' :
            terminal = '제2 터미널';
            break;
           case 'C01', 'C03' :
             terminal = '화물터미널 남측';
            break;
           case 'C02' :
             terminal = '화물터미널 북측';
            break;
           default:
            terminal = '';
        }
        console.log('terminal: '+terminal);
          if(this.state.type === '0') { //출발일때
          return(
                <tr key={movie.flightId}>
                  <td>출국</td>
                  <td>인천 -> {movie.airport}</td>
                  <td>{movie.airline}({movie.flightId})</td>
                  <td>{movie.scheduleDateTime}</td>
                  <td>{movie.estimatedDateTime}</td>
                  <td>{terminal}</td>
                  <td>{movie.chkinrange}</td>
                  <td>{movie.gatenumber}</td>
                  <td>{movie.remark}</td>
                  <td><img src={movie.wimage}></img></td>
                </tr>
         )
      } else if(this.state.type === '1') { //도착일때
          return(

              <tr key={movie.flightId}>
                <td>입국</td>
                <td>{movie.airport} -> 인천</td>
                <td>{movie.airline}({movie.flightId})</td>
                <td>{movie.scheduleDateTime}</td>
                <td>{movie.estimatedDateTime}</td>
                <td>{terminal}</td>
                <td>{movie.gatenumber}</td>
                <td>{movie.carousel}</td>
                <td>{movie.exitnumber}</td>
                <td>{movie.remark}</td>
                <td><img src={movie.wimage}></img></td>
              </tr>

      )
      }
   })
    return movies
  }

  _renderMovies2 = () => {
    // if(this.state.movies2.length >= 1){
    //   console.log('_renderMovies2 : length 1이상');
    // }
    var currenttime = new Date().toLocaleTimeString('en-US', { hour12: false,
                                             hour: "numeric",
                                             minute: "numeric"});
    currenttime = currenttime.substr(0, 2);
   console.log('_renderMovies2');
    const movies2 = this.state.movies2.map((movie2, index) => {
      console.log(movie2);
        if (String(movie2.atime).substr(0, 2) === currenttime) {
          if(this.state.type === '0' && (terminal2 === 'P01' || terminal2 === 'P02')) { //출발이고, 1터미널 일때
             return (
               <div key={movie2.atime}>
                 <table class="table table-bordered">
                   <tr>
                     <th class="T1SUM5">T1 출국장1,2</th>
                     <th class="T1SUM6">T1 출국장3</th>
                     <th class="T1SUM7">T1 출국장4</th>
                     <th class="T1SUM8">T1 출국장5,6</th>
                   </tr>
                   <tr>
                     <td>{movie2.t1sum5}</td>
                     <td>{movie2.t1sum6}</td>
                     <td>{movie2.t1sum7}</td>
                     <td>{movie2.t1sum8}</td>
                   </tr>
                  </table>
               </div>
             )

          } else if(this.state.type === '1'&& (terminal2 === 'P01' || terminal2 === 'P02')){ //도착이고, 1터미널 일때
            return (
              <div key={movie2.atime}>
                <table class="table table-bordered">
                  <tr>
                    <th class="T1SUM1">T1 입국장 동편(A,B)</th>
                    <th class="T1SUM2">T1 입국장 서편(E,F)</th>
                    <th class="T1SUM3">T1 입국심사(C)</th>
                    <th class="T1SUM4">T1 입국심사(D)</th>
                  </tr>
                  <tr>
                    <td>{movie2.t1sum1}</td>
                    <td>{movie2.t1sum2}</td>
                    <td>{movie2.t1sum3}</td>
                    <td>{movie2.t1sum4}</td>
                  </tr>
                 </table>
              </div>

            )
          } else if(this.state.type === '0' && terminal2 === 'P03') { //출발이고, 2터미널일때
             return (
               <div key={movie2.atime}>
                 <table class="table table-bordered">
                   <tr>
                     <th class="T2sum3">T2 출국장1</th>
                     <th class="T2sum4">T2 출국장2</th>
                   </tr>
                   <tr>
                     <td>{movie2.t2sum3}</td>
                     <td>{movie2.t2sum4}</td>
                   </tr>
                  </table>
               </div>

             )

          } else if(this.state.type === '1' && terminal2 === 'P03') { //도착이고, 2터미널 일때
            return (
              <div key={movie2.atime}>
                <table class="table table-bordered">
                  <tr>
                    <th class="T2sum1">T2 출국장1</th>
                    <th class="T2sum2">T2 출국장2</th>
                  </tr>
                  <tr>
                    <td>{movie2.t2sum1}</td>
                    <td>{movie2.t2sum2}</td>
                  </tr>
                 </table>
              </div>

            )
          }
      }
    })
    return movies2
  }

  _renderMovies3 = () => {
    const movies3 = this.state.movies3.map((movie3, index) => {
      var possible = movie3.parkingarea-movie3.parking;
      if(possible < 0) {
        possible = 0;
      }

      if((terminal2 === 'P01' || terminal2 === 'P02') && String(movie3.floor).includes('T1')) { //1터미널 일때
          return(
                <tr key={movie3.floor}>
                  <td>{movie3.floor}</td>
                  <td> {possible} / {movie3.parkingarea}</td>
                </tr>
         )
      } else if(terminal2 === 'P03' && String(movie3.floor).includes('T2')) { //2터미널 일때
            return(
                  <tr key={movie3.floor}>
                    <td>{movie3.floor}</td>
                    <td> {possible} / {movie3.parkingarea}</td>
                  </tr>
           )
     }
   })
    return movies3
  }

    _renderMovies4 = () => {
      return(
      <table class="table table-bordered">
        <tr>
          <th class="T2sum1">주차장 구분</th>
          <th class="T2sum2">주차 가능 면수/총 주차장 면수</th>
        </tr>
          {this.state.movies3 ? this._renderMovies3(): ''}
      </table>
      )
    }

    _renderMovies5 = () => {
      if(this.state.type === '0'){
        return(
        <table class="table table-bordered">
          <tr>
            <th class="type">출/입국</th>
            <th class="airport">경로</th>
            <th class="airline">항공사/운항편명</th>
            <th class="scheduleDateTime">출발예정시간</th>
            <th class="estimatedDateTime">출발변경시간</th>
            <th class="terminalid">터미널</th>
            <th class="chkinrange">체크인 카운터</th>
            <th class="gatenumber">탑승구번호</th>
            <th class="remark">현황</th>
            <th class="wimage">도착지 날씨</th>
          </tr>
            {this.state.movies ? this._renderMovies(): ''}
        </table>
       )
     }else if(this.state.type === '1'){
      return(
        <table class="table table-bordered">
          <tr>
            <th class="type">출/입국</th>
            <th class="airport">경로</th>
            <th class="airline">항공사/운항편명</th>
            <th class="scheduleDateTime">도착예정시간</th>
            <th class="estimatedDateTime">도착변경시간</th>
            <th class="terminalid">터미널</th>
            <th class="gatenumber">도착게이트 번호</th>
            <th class="carousel">수하물수취대 번호</th>
            <th class="exitnumber">출구</th>
            <th class="remark">현황</th>
            <th class="wimage">출발지 날씨</th>
          </tr>
          {this.state.movies ? this._renderMovies(): ''}
      </table>
      )
    }
}


   _getMovies = async () => {
     console.log('_getMovies');
    const movies = await this._callApi()
     console.log(movies);
    this.setState({
      movies: movies.data.item,
      type: movies.type
    //  movies2: movies.data2.item
    })
  }

     _getMovies1 = async () => {
       console.log('_getMovies1');
      const movies = await this._callApi()
       console.log(movies);
      this.setState({
        movies: movies.data.item,
        type: movies.type,
        movies2: movies.data2.item
      })
    }


  _getMovies2 = async () => {
    console.log('_getMovies2');
   const movies = await this._callApi()
   console.log(movies);
   this.setState({
     movies3: movies.data3.item
   })
 }

  _callApi = () => {
     console.log('_callApi');
    return fetch('/api/hello')
    .then(response => response.json())
    .then((json) => {
      //console.log(json.data.item);
      //console.log(json.type);
     //return json.data.item})
     return json})
    // return json.type})
     .catch(err => console.log(err))
}

handleSubmit = (e) => {

  e.preventDefault();
  console.log('this.refs.chk.checked: '+this.refs.chk.checked);
  var input = this.refs.task.value.toUpperCase();
  var reqBody = {input: input};
  var reqBody2 = {input2: this.refs.chk.checked};
  console.log('handleSubmit');

  fetch('/api/hello',{
      method: 'POST',
      body: JSON.stringify(reqBody),
//      cache: 'default',
      headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'}
    })
    .then(res => {
    setTimeout(() => null, 0);
    return res.text();
    })
    .then((res) => {
        if (res.ok){
          return res.json();
        } else {
          //throw new Error ('Something went wrong with your fetch');
        }
      }).then((json) => {
        console.log(json);
      })


      fetch('/api/hello0',{
          method: 'POST',
          body: JSON.stringify(reqBody),
          cache: 'default',
          headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'}

        })
        .then(res => {
        setTimeout(() => null, 0);
        return res.text();
        })
        .then((res) => {
            if (res.ok){
              return res.json();
            } else {
            }
          }).then((json) => {
            console.log(json);
          })

       fetch('/api/hello2',{
           method: 'POST',
           body: JSON.stringify(reqBody2),
           cache: 'default',
           headers: {'Accept': 'application/json',
             'Content-Type': 'application/json'}

         })
         .then(res => {
         setTimeout(() => null, 0);
         return res.text();
         })
         .then((res) => {
             if (res.ok){
               return res.json();
             } else {
             }
           }).then((json) => {
             console.log(json);
           })


            this._getMovies();
             this._getMovies1();
            this._getMovies2();

}
handleChange = (e) => {
  // this.setState({
  //   input: e.target.value
  // });
}

handleChange2 = (e) => {
  this.setState({
    checked: e.target.checked
  });
}
  render() {

    console.log('airportcode : '+airportcode);
    return (
      <div className="App">
        <div className="Top">
          <a href="https://salty-woodland-13271.herokuapp.com/">
            <img src="/image/Incheon_airport.png" style={{width: '500px', height: '120px'}}></img>
         </a>
        </div>
        <div className="Query">
          <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="항공편" ref="task" onChange={this.handleChange}/>
                <input type="submit" value="검색"/>
                <input type="checkbox" ref="chk" id="chkbox" onChange={this.handleChange2} style={{width: '20px', height: '15px'}}/>
                <label for="opt-in">주차장 정보 함께 보기</label>
          </form>
        </div>
        <div className="List">
          <div className="basic_info">
            <p>{this.state.movies ? '항공편 기본정보' : '해당 항공편이 없습니다.'}</p>
            <div className="App-intro">{this.state.movies ? this._renderMovies5(): ''}</div>
          </div>
          <div className="Passenger_info">
            <p>{this.state.movies ? terminal +' 혼잡도 현황' : ''}</p>
            <div className="App-intro2">{this.state.movies ? this._renderMovies2(): ''}</div>
          </div>
          <div className={`Parking_info ${this.state.checked && 'checked'}`}>
            <p>{this.state.movies ? terminal + ' 주차장 현황' : ''}</p>
               {this.state.movies ? this._renderMovies4(): ''}
         </div>
      </div>
        <div className="Bottom">
           출처 : 인천공항
        </div>
      </div>
    );
  }
}
export default App;
