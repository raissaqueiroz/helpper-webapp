import React, { useState, Fragment, useEffect  } from 'react';
import { Stepper, Step } from 'react-form-stepper';
import { FaPencilAlt, FaRegTrashAlt, FaPlus } from 'react-icons/fa';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

import {isEmpty, Notifications, phoneMask, cnpjMask, cepMask, dataNumberDB, cnpfCnpjMask } from '../../helpers';

import API from '../../services/api';
import viaCep from '../../services/viaCep';

import './style.css';

export default function Edit({ history, match }){
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(0);
    const [field, setField] = useState({
        name: '',
        email: '',
        phone: '',
        cpf_cnpj: '',
        address: {
            zip_code: '',
            street: '',
            number: '',
            city: '',
            state: '',
            neighborhood: '',
            complement: '',
        }
    });

    useEffect(() => {
        loadClient();
        setTimeout(() => setLoading(false), 100)
    }, []);

    async function loadClient(){
        try {
            const { data } = await API.get(`/clients/${match.params.id}`);
            
            data.phone =  phoneMask(String(data.phone));
            data.cpf_cnpj = cnpfCnpjMask(String(data.cpf_cnpj));
            data.address.zip_code =  cepMask(String(data.address.zip_code));
            
            
            setField({
                ...field,
                name: data.name,
                email: data.email,
                phone: data.phone,
                cpf_cnpj: data.cpf_cnpj,
                address: {
                    ...field.address,
                    ...data.address
                }
            });

        } catch(error){
            Notifications('error', error.response.data.error);
            setLoading(false);
        } 
    }

    async function handleSubmit(){
        
        setLoading(true);

        // Verificando Campos Obrigatórios
        if(isEmpty(field) || isEmpty({ ...field.address, complement: '*' })){
            Notifications('error', 'Por favor, preencha todos os campos!');
            setLoading(false)
        } else {
            // Removed Characteres Especiais
            const data = { ...field };

            data.cpf_cnpj = Number(data.cpf_cnpj.replace(/[^0-9]/g, ''));
            data.phone =  Number(data.phone.replace(/[^0-9]/g, ''));
            data.address.zip_code =  Number(data.address.zip_code.replace(/[^0-9]/g, ''));
            data.address.number = Number(data.address.number);

            try {
                await API.put(`/clients/${match.params.id}`, data);
                Notifications('success', 'Cliente Editado com Sucesso!');
                setTimeout(() => history.push('/'), 1000);                                
                
            } catch(error){
                Notifications('error', error.response.data.error);
                setLoading(false);
            } 
        }
    }

    if(loading) return <Loader />

    return(
        <section>
            <Header />
            <article className="register-form">
                <Stepper  activeStep={activeStep}>
                    <Step label="Dados Pessoais" />
                    <Step label="Endereço" />
                </Stepper>
                 {/* GERAL ESCRITÓRIO ADVOCACIA */}
                 <div className="mt-5 w-100 form-group row" style={(activeStep !== 0) ? {display: 'none'} : {}}>
                    <div className="col-sm-12 col-md-4 mb-3">
                        <input className="form-control" type="text" placeholder="Nome" name="name" value={field.name} onChange={e => setField({ ...field, name: e.target.value })} outline autoComplete="new-password"/>
                    </div>
                    <div className="col-sm-12 col-md-4 mb-3">
                        <input className="form-control"  type="email" placeholder="E-mail" name="email" value={field.email} onChange={e => setField({ ...field, email: e.target.value })} outline autoComplete="new-password"/>
                    </div>
                    <div className="col-sm-12 col-md-4 mb-3">
                        <input className="form-control"  type="text" placeholder="CPF/CNPJ" name="cpf_cnpj" value={field.cpf_cnpj} onChange={e => setField({ ...field, cpf_cnpj: cnpfCnpjMask(e.target.value) })} outline autoComplete="new-password" maxLength={18}/>
                    </div>
                    <div className="col-sm-12 col-md-4 mb-3">
                        <input className="form-control"  type="tel" placeholder="Telefone" name="phone" value={field.phone} onChange={e => setField({ ...field, phone: phoneMask(e.target.value) })} outline autoComplete="new-password" maxLength={15} />
                    </div> 
                </div>

                {/* ENDERECO */}
                <div className="mt-5 w-100 form-group row" style={(activeStep !== 1) ? {display: 'none'} : {}}>
                    <div className="col-sm-12 col-md-4 mb-3">
                        <input className="form-control" type="text" placeholder="CEP" name="address[zip_code]" value={field.address.zip_code} onBlur={valor => viaCep(valor, setField, field)} onChange={e => setField({ ...field, address: { ...field.address, zip_code: cepMask(e.target.value)}})}  outline autoComplete="new-password"/>
                    </div>
                    <div className="col-sm-12 col-md-4 mb-3">
                        <input className="form-control"  type="text" placeholder="Rua/Logradouro" value={field.address.street} onChange={e => setField({ ...field, address: { ...field.address, street: e.target.value}})} name="address[street]" outline autoComplete="new-password"/>
                    </div>
                    <div className=" col-sm-12 col-md-4 mb-3">
                        <input className="form-control"  type="text" placeholder="Bairro" value={field.address.neighborhood} onChange={e => setField({ ...field, address: { ...field.address, neighborhood: e.target.value}})} name="address[neighborhood]" outline autoComplete="new-password"/>
                    </div>
                    <div className="col-sm-12 col-md-4 mb-3">
                        <input className="form-control"  type="text" placeholder="Cidade" value={field.address.city} onChange={e => setField({ ...field, address: { ...field.address, city: e.target.value}})} name="address[city]" outline autoComplete="new-password"/>
                    </div>
                    <div className="col-sm-12 col-md-4 mb-3">
                        <input className="form-control"  type="text" placeholder="Estado" value={field.address.state} onChange={e => setField({ ...field, address: { ...field.address, state: e.target.value}})} name="address[state]" outline autoComplete="new-password"/>
                    </div>
                    <div className="col-sm-12 col-md-4 mb-3">
                        <input className="form-control"  type="number" placeholder="Numero" name="address[number]" value={field.address.number} onChange={e => setField({ ...field, address: { ...field.address, number: e.target.value}})} outline autoComplete="new-password"/>
                    </div>
                    <div className="col-sm-12 col-md-4 mb-3">
                        <input className="form-control"  type="text" placeholder="Complemento" name="address[complement]" value={field.address.complement} onChange={e => setField({ ...field, address: { ...field.address, complement: e.target.value}})} outline autoComplete="new-password"/>
                    </div>
                </div>
                <div className="form-group row d-flex justify-content-center mt-5" >
                    <button 
                        style={(activeStep <= 0) ?  {display: 'none'} : {} } 
                        type="button" 
                        className="btn btn-blue-grey btn-light-blue  col-sm-12 col-md-2" 
                        onClick={() => {
                            if(activeStep !== 0){
                                setActiveStep(activeStep - 1)
                            }
                        }}
                    >
                        Anterior
                    </button>
                    <button 
                        type="button" 
                        className="ml-5 btn btn-prox col-sm-12 col-md-2" 
                        onClick={() => {
                            if(activeStep !== 1){
                                setActiveStep(activeStep + 1)
                            } else {
                                // Validar e enviar
                                console.log('teste')
                                handleSubmit();
                            }
                        }}
                    >
                            {(activeStep < 1) ? 'Próximo' : 'Salvar'}
                    </button>
                </div>
            </article>
            <Footer/>
        </section>
    );
}