import React, { useState, useEffect } from 'react';
import './mainDivStyles.css';

export default function MainDiv() {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('Sukkur');

    const citiesOfSindh = [
        'Sukkur', 'Setharja', 'Karachi', 'Hyderabad', 'Larkana', 'Nawabshah', 'Mirpurkhas',
        'Khairpur', 'Shikarpur', 'Dadu', 'Thatta', 'Badin', 'Ghotki',
        'Umerkot', 'Jacobabad', 'Tando Allahyar', 'Tando Muhammad Khan',
        'Kashmore', 'Qambar Shahdadkot', 'Sanghar', 'Matiari', 'Jamshoro',
        'Naushahro Feroze', 'Tharparkar', 'Sujawal', 'Shahdadpur',
        'Sehwan', 'Ratodero', 'Pano Aqil', 'Rohri', 'Kotri', 'Hala',
        'Mehrabpur', 'Ranipur', 'Thull', 'Moro', 'Gambat', 'Sakrand',
        'Chuhar Jamali', 'Bulri Shah Karim', 'Khipro',
        'Mirpur Mathelo', 'Tangwani', 'Garhi Yasin', 'Naseerabad', 'Dokri'
    ];

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=274bbc9fbf884b938c394732252002&q=${city}`);
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeather();
    }, [city]);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    return (
        <div className='mainDiv'>
            <div className='form'>
                <div className='dropdown'>
                    <select className='inputBox' value={city} onChange={handleCityChange}>
                        {citiesOfSindh.map((cityName, index) => (
                            <option key={index} value={cityName}>{cityName}</option>
                        ))}
                    </select>
                    <h2>{weatherData?.location?.name}</h2>
                    <h6>{weatherData?.current?.last_updated}</h6>
                    <div className='weatherIcon'>
                        <img src={weatherData?.current?.condition?.icon} alt='' />
                        <h1>{weatherData?.current?.temp_c}°C</h1>
                        <h5>Feels like {weatherData?.current?.feelslike_c}°C</h5>
                    </div>
                    <div className='more'>
                        <h3>{weatherData?.current?.condition?.text}</h3>
                        <h4>Wind: {weatherData?.current?.wind_kph} km/h</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
