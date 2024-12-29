import toast from 'react-hot-toast';

const asyncHandler = (asyncFunction) => {
    return async (dispatch) => {
        try {
            return await asyncFunction(dispatch);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.data?.message || "An Unexpected error occured")   
            throw error;
        }
    }
}

export default asyncHandler;