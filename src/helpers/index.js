import React, { useState } from 'react';
import { NotificationManager } from 'react-notifications';

export const isEmpty = obj => {
    let state = false;
    for(var prop in obj) {
        if(obj[prop] == '' || obj[prop] == [] || obj[prop] == {})  state = true;
    }
    return state;
}
export const Notifications = (type, message, title=null) => {
	switch (type) {
		case 'info':
			return NotificationManager.info(message, '', 3000);
		case 'success':
			return NotificationManager.success(message, '', 3000);
		case 'warning':
			return NotificationManager.warning(message, '', 3000);
		case 'error':
			return (
				NotificationManager.error(message, '', 3000)
			);
		default:
			return (
				NotificationManager.error(message, 'Click aqui!', 5000, () => {
					alert('callback');
				})
			);
	}
	
}

export const FormataStringData = (data) => {
	const data_formatada = data.substr(6,4) + '-' + data.substr(3,2) + '-' + data.substr(0,2) + ' 00:00:00';
    return new Date(data_formatada);
}


export const phoneMask = value => {
    return value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/g,"($1) $2")
        // .replace(/(\d{3})(\d)/, '$1-$2')
        .replace(/(\d)(\d{4})$/,"$1-$2")
}


export const cnpjMask = value => {
    return value
		.replace(/\D/g,"")                           
		.replace(/^(\d{2})(\d)/,"$1.$2")             
		.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3") 
		.replace(/\.(\d{3})(\d)/,".$1/$2")           
		.replace(/(\d{4})(\d)/,"$1-$2") 
		
}

export const cpfMask = value => {
	return value
        .replace(/\D/g,"")                   
        .replace(/(\d{3})(\d)/,"$1.$2")      
        .replace(/(\d{3})(\d)/,"$1.$2")                                    
        .replace(/(\d{3})(\d{1,2})$/,"$1-$2") 
}

export const cnpfCnpjMask = value => {
    if(value.length < 15){
        return cpfMask(value);
    } else {
        return cnpjMask(value);
    }
}

export const cepMask = value => {
	return value
        .replace(/\D/g,"")
        .replace(/(\d{5})(\d)/,"$1-$2")
}

export const dataNumberDB = value => {
	return value
		.replace(/[^0-9]/g, '')
}
