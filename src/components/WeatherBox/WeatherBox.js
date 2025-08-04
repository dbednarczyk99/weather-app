import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';

const WeatherBox = props => {

  const [weatherData, getWeatherData] = useState();
  const [pending, checkPending] = useState(false);
  const [error, checkError] = useState(false);

  const handleCityChange = useCallback(city => {
    checkPending(true)
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7f7994d39dee4abfeaaea08ce91ddeb9&units=metric`)
    .then(res => {
      if(res.status === 200){
        return res.json()
        .then(data => {
          getWeatherData({
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main
          });
          checkPending(false);
          checkError(false);
        })
      }
      else {
        //alert('ERROR!');
        checkPending(false);
        checkError(true);
        getWeatherData();
      }
    })

    console.log(city);
  }, []);

  console.log(weatherData);
  return (
    <section>
      <PickCity action={handleCityChange}/>
      {(weatherData && !pending) && <WeatherSummary {...weatherData} />}
      {(pending) && <Loader />}
      {error && <ErrorBox>There is no such city!</ErrorBox>}
    </section>
  )
};

export default WeatherBox;