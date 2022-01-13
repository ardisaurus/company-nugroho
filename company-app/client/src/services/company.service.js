import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/company",
  headers: {
    "Content-type": "application/json",
  },
});

export const getCompanies = async () => {
  const response = await apiClient.get("/");
  return response.data;
};

export const getCompanyDetails = async (id) => {
  const response = await apiClient.get(`/${id}`);
  return response.data;
};

export const deleteCompany = async (id) => {
  const response = await apiClient.delete(`/${id}`);
  return response.data;
};

export const createCompany = async ({
  name,
  address,
  revenue,
  phoneNumber,
  phoneCode,
}) => {
  const response = await apiClient.post("/", {
    name,
    address,
    revenue,
    phone_number: phoneNumber,
    phone_code: phoneCode,
  });
  return response.data;
};

export const createOffice = async ({ name, lat, lng, startDate, company }) => {
  const response = await apiClient.put("/addoffice", {
    name,
    location_lat: lat,
    location_lng: lng,
    start_date: startDate,
    company_id: company,
  });
  return response.data;
};

export const deleteOffice = async ({ companyId, officeId }) => {
  const response = await apiClient.put("/deleteoffice", {
    company_id: companyId,
    office_id: officeId,
  });
  return response.data;
};
