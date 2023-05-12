export function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

export function setCookieToday(name,value) {
    let expires = "";

    const today = new Date();
    const nextday = new Date(today);
    nextday.setDate(nextday.getDate() + 1);

    let dd = String(nextday.getDate()).padStart(2, '0');
    let mm = String(nextday.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = nextday.getFullYear();

    let tomorrow = new Date( '' + yyyy + '-' + mm + '-' + dd + 'T00:00:00');
    tomorrow.setTime(tomorrow.getTime());

    expires = "; expires=" + tomorrow.toUTCString();

        
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

export function getCookie(name) {
    try{
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for(let i=0;i < ca.length;i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    catch(e){
        return null;
    }
    
}

export function eraseCookie(name) {   
    document.cookie = name + "='null'; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = name + '=; Max-Age=-99999999;'; 
}
