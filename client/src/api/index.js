import axios from "axios";

const API = axios.create({
	baseURL: "https://pacific-garden-92293.herokuapp.com",
});

// API calls to REGISTER_PATIENT
// export const registerPatient = (form) =>
// 	API.post("/api/patient/setpatient", form);

export const loginUser = (credentials) => API.post("/auth/login", credentials);

export const preRegisterPatient = (form, access_token) => {
	// console.log(access_token, form);
	return API.post("/patient/register", form, {
		headers: {
			Authorization: "Bearer " + access_token,
		},
	});
};

export const getEmployeeProfile = (uid, access_token) => {
	// console.log(uid, access_token);
	return API.get(`/employee/profile/${uid}`, {
		headers: {
			Authorization: "Bearer " + access_token,
		},
	});
};

export const getPatientHistory = (access_token) => {
	return API.get("/employee/patients", {
		headers: {
			Authorization: "Bearer " + access_token,
		},
	});
};
