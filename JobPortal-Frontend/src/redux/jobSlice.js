import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    allJobs: [],
    singleJob: null,
    allAdminJobs: [],
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
    jobById: {},
  },

  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
      // console.log(action.payload);
    },

    setSingleJob(state, action) {
      state.singleJob = action.payload;
    },

    setAllAdminJobs(state, action) {
      state.allAdminJobs = action.payload;
    },
    searchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs(state, action) {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery(state, action) {
      state.searchedQuery = action.payload;
    },
    setJobById(state, action) {
      state.jobById = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setSearchedQuery,
  setAllAdminJobs,
  searchJobByText,
  setAllAppliedJobs,
  setJobById,
} = jobSlice.actions;

export default jobSlice.reducer;
