import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState } from 'react';

import axios from 'axios';

function Dashboard() {
    const [currentCity, setCurrentCity] = useState('');
    const [currentCityWeather, setCurrentCityWeather] = useState('');
    const [citiesWeather,setCitiesWeather] = useState({
        "Bangalore":"", 
        "Mumbai":"",
        "Hyderabad":"",
        "Delhi":"",
        "Trivandrum":"",
    });
    const cities = ["Bangalore", "Mumbai", "Hyderabad","Delhi","Trivandrum"];
    const search = () => {
        let input = document.getElementById("input").value;
        var card,min, max,txtValue,txtValue2;
        card = document.getElementsByClassName("card");
        for (let i = 0; i < card.length; i++) {
          min = card[i].getElementsByClassName("card-text")[0];
          max = card[i].getElementsByClassName("card-text")[1];
          console.log(min.textContent.split(":"));
          if (card) {
            txtValue = (min.textContent.split(":"))[1];
            txtValue2 = (max.textContent.split(":"))[1];
           
            if(input.trim().length == 0)
                card[i].style.display = "";
            else
            { 
                console.log(Number(input));
                if (Number(input) >= Math.floor(Number(txtValue))  && Number(input) <= Math.floor(Number(txtValue2)) ) {
                    
                    card[i].style.display = "block";
                } else {
                    card[i].style.display = "none";
                }
            }
          }       
        }
      }
    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(getCityName);
        } else {
          console.log('Geolocation is not supported by this browser.');
        }
        
        {cities.map((city1) =>{
             axios.get('https://api.openweathermap.org/data/2.5/weather?q='+city1+'&appid=f35bca19cdc7223b5b91ae6437e42d27')
            .then((response)=>{
                setCitiesWeather(citiesWeather => ({...citiesWeather, [city1]: response.data.main}))
            })
        })
        }
      }, []);

      const getCityName = async (position) => {
        const { latitude, longitude } = position.coords;
        await axios.get('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=f35bca19cdc7223b5b91ae6437e42d27')
            .then((response)=>{
                setCurrentCityWeather(response.data.main);
                setCurrentCity(response.data.name);
            })
        };
    return (
        <div>
            <p className='weather'> 
                <span>Weather api
                    <input
                    type="search"
                    onKeyUp={()=>search()}
                    id = "input"
                    class="form-control"
                    placeholder="Max - Min"
                    />
                </span>
            </p>
            <div className="row">
                {console.log("77",citiesWeather)}
            <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">City:{currentCity}</h5>
                        <p className="card-text">Min:{currentCityWeather.temp_min}</p>
                        <p className="card-text">Max:{currentCityWeather.temp_max}</p>
                    </div>
                </div>
                </div>
                {cities.map((city1,index)=>(
                    <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="card" key={index}>
                        <div className="card-body">
                            <h5 className="card-title">City:{city1}</h5>
                            <p className="card-text">Min:
                                {/* {currentCityWeather.temp_min} */}
                                {citiesWeather[city1].temp_min}
                            </p>
                            <p className="card-text">Max:
                                {/* {currentCityWeather.temp_max} */}
                                {citiesWeather[city1].temp_max}
                            </p>
                        </div>
                    </div> 
                    </div> 
                
                    
                )

                )}  
                </div> 
                </div> 
        
            
        
    );
}


export default Dashboard;
