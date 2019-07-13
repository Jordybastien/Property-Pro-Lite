import responses from '../helpers/responses';
export const handleErrors = (req, res, next) => {
    return res.json({
        status: 405,
        message: 'Method not allowed',        
    });
};
export default handleErrors;