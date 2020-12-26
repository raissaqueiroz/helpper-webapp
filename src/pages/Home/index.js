import React, { useState, Fragment, useEffect  } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import { FaPencilAlt, FaRegTrashAlt, FaPlus, FaRegEye } from 'react-icons/fa';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

import {isEmpty, Notifications, phoneMask, cnpjMask, cepMask, dataNumberDB, cnpfCnpjMask } from '../../helpers';

import API from '../../services/api';

import './style.css';

export default function Home({ history }){
    const [loading, setLoading] = useState(true);


    // DEFININDO COLUNAS
    const [ columns, setColumns ] = useState([
        {
            key: "name",
            text: "Nome",
            className: "name",
            align: "left",
            sortable: true,
        },
        {
            key: "email",
            text: "E-mail",
            className: "email",
            align: "left",
            sortable: true
        },
        {
            key: "phone",
            text: "Telefone",
            className: "phone",
            sortable: true
        },
        {
            key: "action",
            text: "Action",
            className: "action",
            width: 200,
            align: "left",
            sortable: false,
            cell: record => { 
                return (
                    <Fragment>
                        <button
                            className="btn btn-success"
                            onClick={() => detailsRecord(record)}
                            style={{marginRight: '5px'}}>
                                
                            <FaRegEye style={{color: '#FFF'}} />
                        </button>
                        <button
                            className="btn btn-warning"
                            onClick={() => editRecord(record)}
                            style={{marginRight: '5px'}}>
                                
                            <FaPencilAlt style={{color: '#FFF'}} />
                        </button>
                        <button 
                            className="btn btn-danger" 
                            onClick={() => deleteRecord(record)}>
                           <FaRegTrashAlt />
                        </button>
                    </Fragment>
                );
            }
        }
    ]);

    const [config, setConfig] = useState({
        page_size: 5,
        length_menu: [ 5, 10, 15, 20 ],
        button: {
            excel: false,
            print: false,
            extra: true,
        },
        show_length_menu: false,
        show_first: false,
        show_last: false,
        show_info: false
    });

    const [extraButtons, setExtraButtons] = useState([
        {
            className:"btn btn-primary",
            title:"Adicionar Novo",
            children:[
                <span>
                    <FaPlus /> Cadastrar Novo
                </span>
            ],
            onClick:(event)=>{
                history.push('/register');
            },
        },
    ])

    const [records, setRecords] = useState([]);

    useEffect(() => {
        loadClients();
        setTimeout(() => setLoading(false), 100)
    }, []);

    async function loadClients(){
        try {
            const response = await API.get('/clients');

            response.data.map(index => index.phone = phoneMask(String(index.phone)))
            
            setRecords(response.data);

        } catch(error){
            Notifications('error', error.response.data.error);
            setLoading(false);
        } 
    }

    const editRecord = record => {
        history.push(`/edit/${record._id}`)
    }
    const detailsRecord = record => {
        history.push(`/details/${record._id}`)
    }

    const deleteRecord = async record => {
        setLoading(true);
        try {
            await API.delete(`/clients/${record._id}`);

            loadClients();
            
            Notifications('success', 'Cliente Deletado com Sucesso!');
            
            setLoading(false)

        } catch(error){
            Notifications('error', error.response.data.error);
            setLoading(false);
        }
        
    }

    if(loading) return <Loader />
    
    return(
        <section>
            <Header />
            <article>
                <ReactDatatable
                    config={config}
                    records={records}
                    columns={columns}
                    extraButtons={extraButtons}
                />
            </article>
            <Footer/>
        </section>
    );
}