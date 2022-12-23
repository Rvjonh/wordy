import axios from 'axios';

const url = process.env.REACT_APP_BACKEND_API_URL;

class WordyDataService{

    signup(data){
        return axios.post(`${url}signup/`, data);
    }

    login(data){
        return axios.post(`${url}login/`, data);
    }
    
    updataUser(data){
        return axios.patch(`${url}profile/`, data)
    }
    
    sendEmailPassword(data){
        return axios.post(`${url}password/`, data)
    }

    setNewPassword(data){
        return axios({
            url:`${url}password/`,
            method:"PUT",
            data:{
                token : data.token,
                newpassword: data.newpassword
            }
        })
    }
    
    verifyEmail(data, token){
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.post(`${url}email/`, data);
    }

    getNewVerifyEmailCode(data, token){
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.put(`${url}email/`, data);
    }
    
    //Control over user's data dictionaries and words ...
    
    postNewGroup(data, token){
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.post(`${url}group/`, data)
    }
    
    putNewGroup(data, token){
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.put(`${url}group/`, data)
    }

    deleteGroup(data, token){
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios({
            url:`${url}group/`,
            method:"DELETE",
            data:data
        })
    }
    
    getAllDiccionaries(token){
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.get(`${url}group/`)
    }
    
    //Grupo de diccionarios compartidos ...
    
    getAllSharedDiccionaries(data){
        return axios.get(url+`shared-group/${data}/`)
    }

}

export default new WordyDataService();