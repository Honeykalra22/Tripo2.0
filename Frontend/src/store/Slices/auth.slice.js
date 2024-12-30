import toast from "react-hot-toast";
import asyncHandler from "../sliceUtils/asyncHandler.js"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/axios.js";

const initialState = {
    userdata: null,
    status: null,
    loading: false,
}

export const registerUser = createAsyncThunk(
    "register",
    asyncHandler(async (data) => {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("username", data.username);
        formData.append("fullname", data.fullname);
        formData.append("mobile_no", data.mobile_no);

        const response = await axiosInstance.post("/user/register", formData , {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("data" ,response.data);
        toast.success("Sign Up Successful");
        return response.data;
    })
)

export const loginUser = createAsyncThunk(
    "login",
    asyncHandler(async (data) => {
        console.log(data);
        const response = await axiosInstance.post("/user/login", data);
        console.log(response.data);
        toast.success("Login Successful");
        return response.data.data?.user;
    })
)

export const logoutUser = createAsyncThunk(
    "logout",
    asyncHandler(async () => {
        const response = await axiosInstance.post("/user/logout");
        console.log(response.data);
        toast.success("Logout Successful");
        return response.data;
    })
)

export const updateProfile = createAsyncThunk(
    "updateUser",
    asyncHandler(async (data) => {
        const response = await axiosInstance.patch("/user/updateprofile", data);
        console.log(response.data);
        toast.success("Profile Updated");
        return response.data;
    })
)

export const getCurrentUser = createAsyncThunk(
    "getCurrentUser",
    asyncHandler(async () => {
        const response = await axiosInstance.get("/user/getCurrentUser");
        console.log(response.data);
        return response.data.data;
    })
)

export const updatePassword = createAsyncThunk(
    "newPassword",
    asyncHandler(async (data) => {
        const response = await axiosInstance.patch("/user/updatePassword", data);
        console.log(response.data);
        toast.success("Password Updated");
        return response.data;
    })
)

export const updateAvatar = createAsyncThunk(
    "newAvatar",
    asyncHandler(async (data) => {
        const formData = new FormData();
        formData.append("Avatar", data.avatar[0]);

        const response = await axiosInstance.post("/user/updateAvatar" ,formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log(response.data);
        toast.success("Avatar Updated");
        return response.data;
    })
)

export const getResultFromChatGPT = createAsyncThunk(
    "checklist",
    asyncHandler(async (data) => {
        const response = await axiosInstance.post("/itinerary/getResultFromChatGPT", data)
        console.log(response.data);
        toast.success('Check List is Updated')
        return response.data;
    })
)

const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userdata = action.payload;
        })
        builder.addCase(registerUser.rejected, (state) => {
            state.loading = false;
            toast.error("Sign Up Failed");
        })

        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
            state.userdata = action.payload;
        })

        builder.addCase(logoutUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.status = false;
            state.userdata = null;
        })

        builder.addCase(updateProfile.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.userdata = action.payload;
        })

        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userdata = action.payload;
            state.status = true;
        })
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.loading = false;
            state.status = false;
            state.userdata = null;
        })

        builder.addCase(updateAvatar.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateAvatar.fulfilled, (state, action) => {
            state.loading = false;
            state.userdata = action.payload;
        })
        builder.addCase(updateAvatar.rejected, (state) => {
            state.loading = false;
        })
        builder.addCase(getResultFromChatGPT.fulfilled, (state, action) => {
            state.loading = false;
            state.userdata = action.payload;
        })
        builder.addCase(getResultFromChatGPT.rejected, (state) => {
            state.loading = false;
        })
    }
})

export default authSlice.reducer;