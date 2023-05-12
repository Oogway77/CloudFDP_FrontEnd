export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function getLocalDate(utc) {
    
    // 2021-04-21T13:51:48.838Z TO 21-04-2021

    if (utc === null || utc === '' || utc === undefined) return '';

    let date = new Date(utc);
    let ye = date.getFullYear();
    let mo = date.getMonth()+1;
    mo = mo>=10?mo:('0'+mo);
    let da = date.getDate();
    da = da>=10?da:('0'+da);
    return  da + '-' + 
            mo + '-' + 
            ye + ' ';
}
export function getLocalDateTime(utc) {
    
    // 2021-04-21T13:51:48.838Z TO 21-04-2021 13:51
    
    if (utc === null || utc === '' || utc === undefined) return '';

    let date = new Date(utc);
    let ye = date.getFullYear();
    let mo = date.getMonth()+1;
    mo = mo>=10?mo:('0'+mo);
    let da = date.getDate();
    da = da>=10?da:('0'+da);
    let ho = date.getHours();
    ho = ho>=10?ho:('0'+ho);
    let mi = date.getMinutes();
    mi = mi>=10?mi:('0'+mi);
    // let se = date.getSeconds();
    // se = se>=10?se:('0'+se);
    return  da + '-' + 
            mo + '-' + 
            ye + ' ' + 
            ho + ':' + 
            mi + ' ';
}