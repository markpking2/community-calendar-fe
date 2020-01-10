import {useState, useEffect} from 'react'

/* 
 This function is used to read the user's geolocation coordinates. When a component utilizing this function 
 is mounted the user is prompted if the app can use their current location. 
  */

export default function getGeoPosition(options) {
  const [userPosition, setUserPosition] = useState({})

  // config settings. Args overide defaults
  options = {
    enableHighAccuracy: !options.enableHighAccuracy
      ? options.enableHighAccuracy
      : true,
    // execute error function if getCurrentPosition does not resolve within 5 seconds
    timeout: options.timeout || 5000,
    //maximum time to cache results
    maximumAge: options.maximumAge || 0,
  }

  // function called if user's position has been obtained
  const onSuccess = pos => {
    console.log('User coordinates', pos.coords)
    // set the userPosition
    setUserPosition(pos.coords)
  }

  // function called if user does not allow access or an error occurs
  const onError = err => {
    console.warn(`getGeoPosition ERROR ${err.code}: ${err.message}`)
  }

  //get location
  const getUserPosition = () => {
    if (typeof window !== undefined) {
      window.navigator.geolocation.getCurrentPosition(
        onSuccess,
        onError,
        options,
      )
    }
  }
  // get user's location when the component is mounted
  useEffect(() => {
    getUserPosition()
  }, [])

  return [userPosition, getUserPosition]
}
