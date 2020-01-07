import axios from 'axios';
import { saveAs } from 'file-saver';
import { GET_PDF, ADD_PDF, ADD_PDF_FAIL } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const createAndDownloadPDF2 = (pdf) => {
    axios.post('/api/pdf', pdf)
        .then(() => axios.get('/api/pdf', { responseType: 'blob' }))
        .then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

            saveAs(pdfBlob, 'novoPdf.pdf');
        })           
}

export const createAndDownloadPDF = (pdf) => (dispatch, getState) => {
    axios.post('/api/pdf', pdf, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_PDF,
            payload: res.data
        }))
        .then(() => axios.get('/api/pdf', { responseType: 'blob' })
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(pdfBlob, 'novoPdf.pdf');            
                dispatch({
                    type: GET_PDF,
                    payload: res.data
                })
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ADD_PDF_FAIL'))
            dispatch({
                type: ADD_PDF_FAIL
            })
        })       
}