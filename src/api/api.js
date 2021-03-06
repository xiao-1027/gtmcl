import axios from 'axios'
// var instance = axios.create();
// instance.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     console.log(response)
//     return response;
// }, function (error) {
//     // 对响应错误做点什么
//     console.log(error)
//     return Promise.reject(error);
// });
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
        if (window.sessionStorage.getItem("token")) {
            config.headers.Authorization = window.sessionStorage.getItem("token").token;
        }
        // console.log(config)
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// export const getdata = (name,age) => {return axios.post('/GetDealerData',{name:name, age:age,}).then(res=>JSON.parse(res.data))}
export const getdata1 = () => {return axios.post('http://datainfo.hzqnkj.com/uni/UniData/meun',)}
export const getbardata = () => {return axios.post('http://datainfo.hzqnkj.com/uni/UniData/bardata')}
export const getProjectList = () => {return axios.post('/getProjectList')}
export const getProjectItem = (key_id) => {return axios.post('/getProjectItem',{key_id:key_id})}
export const getGroupList = () => {return axios.post('/getGroupList')}
export const getGroupItem = (key_id) => {return axios.post('/getGroupItem',{key_id:key_id})}
export const getDealerList = (key_code) => {return axios.post('/getDealerList',{key_code:key_code})}
export const getDealerItem = (key_id) => {return axios.post('/getDealerItem',{key_id:key_id})}
export const addDealerItem = (group_code,dealer_code,dealer_name,dealer_fullname,address,server_ip,tv_number, tv_pwd,work_start,work_end,dealer_level,project_code) => {
    return axios.post('/addDealerItem',{group_code:group_code,dealer_code:dealer_code,dealer_name:dealer_name,dealer_fullname:dealer_fullname,address:address,server_ip:server_ip,tv_number:tv_number, tv_pwd:tv_pwd,work_start:work_start,work_end:work_end,dealer_level:dealer_level,project_code:project_code})}
export const editDealerItem = (group_code,dealer_id,dealer_code,dealer_name,dealer_fullname,address,server_ip,tv_number, tv_pwd,work_start,work_end,dealer_level,project_code) => {
    return axios.post('/editDealerItem',{group_code:group_code,dealer_id:dealer_id,dealer_code:dealer_code,dealer_name:dealer_name,dealer_fullname:dealer_fullname,address:address,server_ip:server_ip,tv_number:tv_number, tv_pwd:tv_pwd,work_start:work_start,work_end:work_end,dealer_level:dealer_level,project_code:project_code})}
export const deleteDealerItem = (dealer_id) => {return axios.post('/deleteDealerItem',{dealer_id:dealer_id})}
export const getDeviceList = (group_code,dealer_code) => {return axios.post('/getDeviceList',{group_code:group_code,dealer_code:dealer_code})}
export const getDeviceItem = (key_id) => {return axios.post('/getDeviceItem',{key_id:key_id})}
export const addDeviceItem = (group_code,dealer_code,device_type,device_type_ex,device_code,device_name,hall_device_code, device_model,device_ip,device_port,device_user,device_pwd,isc_code,project_code) => {
    return axios.post('/addDeviceItem',{group_code:group_code,dealer_code:dealer_code,device_type:device_type,device_type_ex:device_type_ex, device_code:device_code,device_name:device_name,hall_device_code:hall_device_code,device_model:device_model,device_ip:device_ip,device_port:device_port,device_user:device_user,device_pwd:device_pwd, isc_code:isc_code,project_code:project_code})}
export const editDeviceItem = (group_code,device_id,dealer_code,device_type,device_type_ex,device_code,device_name,hall_device_code, device_model,device_ip,device_port,device_user,device_pwd,isc_code,project_code) => {
    return axios.post('/editDeviceItem',{group_code:group_code,device_id:device_id,dealer_code:dealer_code,device_type:device_type,device_type_ex:device_type_ex, device_code:device_code,device_name:device_name,hall_device_code:hall_device_code,device_model:device_model,device_ip:device_ip,device_port:device_port,device_user:device_user,device_pwd:device_pwd, isc_code:isc_code,project_code:project_code})}
export const deleteDeviceItem = (device_id) => {return axios.post('/deleteDeviceItem',{device_id:device_id})}
// export const getMapList = () => {return service.post('/getMapList')}


export const getDealerDeviceHeartList = (group_code,dealer_Name) => {return axios.post('/getDealerDeviceHeartList',{group_code:group_code,dealer_Name:dealer_Name})}
export const getDealerHeartList = (group_code,dealer_Name) => {return axios.post('/getDealerHeartList',{group_code:group_code,dealer_Name:dealer_Name})}
export const getDealerAppVersionList = (group_code,dealer_Name,app_name) => {return axios.post('/getDealerAppVersionList',{group_code:group_code,dealer_Name:dealer_Name,app_name:app_name})}

