import axios from 'axios';
import type {NewContact} from "../type.ts";

const API = axios.create({
    baseURL: process.env.API_URL,
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const login = (formData: any) => API.post('/auth/login', formData);
export const register = (formData: any) => API.post('/auth/register', formData);

export const fetchContacts = () => API.get('/contact/');
export const createContact = (newContact: NewContact) => API.post('/contact/', newContact);
export const deleteContact = (id: string) => API.delete(`/contact/${id}`);
export const patchContact = (id: string, contactData: Partial<NewContact>) => {
    return API.patch(`/contact/${id}`, contactData);
};
