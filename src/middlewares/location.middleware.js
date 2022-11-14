import ResponseWrapper from '../helpers/response.helpers';
import NodeGeocoder  from 'node-geocoder';


const locationMiddleware = async (req, res, next) => {
    const response = new ResponseWrapper(res);
    console.log(req.body);

    const options = {
        provider: 'google',
      
        // Optional depending on the providers
        // fetch: customFetchImplementation,
        apiKey: 'AIzaSyAghIOtgA6JfK6Yo7rrKFGeKahA9F-ls58',
        formatter: null // 'gpx', 'string', ...
      };
      
      try {
        const geocoder = NodeGeocoder(options);
  
        const data = await geocoder.reverse({lat:req.body.lat,lon:req.body.long});
        console.log(data[0].formattedAddress);
        req.body = {...req.body, place:data[0].formattedAddress}
        next();
    } catch (error) {
        // next();
        console.log('err',error);
      return response.internalServerError(error.message);
    }
  };

export default locationMiddleware;