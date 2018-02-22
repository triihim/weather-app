import { 
        MIN_TEMP,
        MAX_TEMP,     
        MAX_KM_DIST,
        VALIDATE_LOCATION
} from '../config';

// Parses ISO formatted time string into "dd/mm/yyyy"
export const prettyDate = (isoTimeString) => {
    let date = new Date(Date.parse(isoTimeString));
    let day = (date.getUTCDate().toString().length == 1) ? '0' + date.getUTCDate() : date.getUTCDate();
    let month = (date.getUTCMonth().toString().length == 1) ? '0' + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1);
    let year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
}

// Parses ISO formatted time string into "hh:mm"
export const prettyTime = (isoTimeString) => {
    let date = new Date(Date.parse(isoTimeString));
    let hours = (date.getUTCHours().toString().length == 1) ? '0' + date.getUTCHours() : date.getUTCHours();
    let minutes = (parseInt(date.getUTCMinutes()) < 10) ? '0' + date.getUTCMinutes() : date.getUTCMinutes();
    return `${hours}:${minutes}`;
}

// Checks if user's location matches observation point's location.
const isValidLocation = (selectedObsPoint, obsPoints) => {
    let obsPoint = obsPoints.filter(o => o._id == selectedObsPoint)[0];
    let lat = obsPoint.latitude;
    let lon = obsPoint.longitude;
    
    let latFlag = true;
    let lonFlag = true;

    let latLimit = MAX_KM_DIST * (1 / 155); // Latitude to km
    let lonLimit = MAX_KM_DIST * 1 / (155 * Math.cos(lat * (Math.PI/180))); // Longitude to km

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            if(lat < parseFloat(pos.coords.latitude) + latLimit && lat > parseFloat(pos.coords.latitude) - latLimit) latFlag = false;
            if(lon < parseFloat(pos.coords.longitude) + lonLimit && lon > parseFloat(pos.coords.longitude) - lonLimit) lonFlag = false;            
        });
    } else {
        console.log("Geolocation is not supported");
    }

    // Complete validation if VALIDATE_LOCATION.value is set to true in config.
    if(VALIDATE_LOCATION.value === true) {
        (latFlag === false && lonFlag === false) ? true : false;
    } else {
        return true;
    }
}

// Validates add-observation-form data.
export const validateFormData = (formData, obsPoints) => {
    let isValid = (formData) => {
        let obsPointFlag = true;
        let temperatureFlag = true;
        let locationFlag = true;

        // Check that obs. point is selected.
        if(formData.obsPointID != '') {
            obsPointFlag = false;
        } else {
            return false;
        }

        // Check that temperature is correct.
        if(!isNaN(parseFloat(formData.temperature)) && isFinite(formData.temperature)) {
            // Check that given temperature is within configured limits.
             if(parseFloat(formData.temperature) <= MAX_TEMP && parseFloat(formData.temperature) >= MIN_TEMP) temperatureFlag = false;

        } else {
            return false;
        }

        // Check that user is at selected obs. point.
        if(isValidLocation(formData.obsPointID, obsPoints) === true) locationFlag = false;

        if(obsPointFlag === false && temperatureFlag === false && locationFlag === false) {
            return true;
        } else {
            return false;
        }
    }

    let promise = new Promise((resolve, reject) => {
        if(isValid(formData)) {
            resolve(formData);
        } else {
            reject('Form did not validate');
        }
    })

    return promise;
}

// Gets all observations from past 24 hours.
export const getObsFrom24Hours = (observation) => {
    let date = new Date();
    let obsDate = new Date(observation.dateTime);
    let diffMS = (Date.parse(date) - Date.parse(obsDate));
    let diffH = diffMS / 3600000;
    if( diffH <= 24) return observation;
}

// Finds maximum temperature of observations.
export const getMaxTemp = (observations) => {
	let max;
    let temp = Math.max.apply(Math, observations.map(o => parseInt(o.temperature)));
    (isFinite(temp)) ? max = temp : max = '-';
    return max;
}

// Finds minimum temperature of observations.
export const getMinTemp = (observations) => {
	let min;
    let temp = Math.min.apply(Math, observations.map(o => parseInt(o.temperature)));
    (isFinite(temp)) ? min = temp : min = '-';
    return min;
}

// Finds newest temperature observation.
export const getLatestTemp = (observations) => {
	let latest = '-';
    //latest = Math.max.apply(Math, observations.map(o => (Date.parse(o.dateTime) ? o.temperature : '-' )));
    latest = observations[0].temp;
    return latest;
}