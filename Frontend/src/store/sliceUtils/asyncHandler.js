import toast from 'react-hot-toast';

const asyncHandler = (asyncFunction) => {
    return async (dispatch) => {
        try {
            return await asyncFunction(dispatch);
        } catch (error) {
            console.log(error);
            const match = error.response?.data.match(/<pre>(.*?)<\/pre>/s);
            const errorMessage = match ? match[1].split('<br>')[0].trim() : error.message || "An unexpected error occurred.";
            toast.error(errorMessage);
            throw error;
        }
    }
}

export default asyncHandler;