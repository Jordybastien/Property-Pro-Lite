class Responding {
    static response(res, statusCode, mess, data, error = false) {
      if(statusCode === 400 || statusCode === 401 || statusCode === 404 || statusCode === 409 || statusCode === 405){

        return res.status(statusCode).json({
          status: statusCode,
          error:mess
        });
     
      }else{

      
      if (error) {
        return res.status(statusCode).json({
          status: statusCode,
          error:mess
        });
      }
      return res.status(statusCode).json({
        status: statusCode,
        message: mess,
        data
      });
    }
    }
  }
  
  export default Responding;




  