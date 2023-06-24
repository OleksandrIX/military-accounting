import React, {useEffect, useState} from "react";
import serverAPI from "./util/server.api";
import axios from "axios";
import {DataGrid} from '@mui/x-data-grid';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const columns = [
    {field: 'name', headerName: 'Name', width: 150},
    {field: 'type', headerName: 'Type', width: 150},
    {field: 'description', headerName: 'Description', width: 150},
    {field: 'country', headerName: 'Country', width: 150},
    {field: 'countOfEquipment', headerName: 'Count of equipment', width: 150},
    {field: 'date', headerName: 'Date', width: 150},
];

const getEquipments = async (url) => {
    return (await axios.get(url)).data;
};

const creatEquipment = async (url, data) => {
    return (await axios.post(url, data)).data;
}

function Main() {
    const [refreshTable, setRefreshTable] = useState(true);
    const [equipments, setEquipments] = useState([]);
    const [addModal, setAddModal] = useState(false);

    useEffect(() => {
        getEquipments(serverAPI.equipments)
            .then((data) => {
                if (refreshTable) {
                    setEquipments([]);
                    for (const equipment of data) {
                        setEquipments(prevState => [...prevState, equipment]);
                    }
                    setRefreshTable(false);
                }
            })
            .catch(e => console.log(e));
    }, [refreshTable]);

    const openAddModal = () => {
        setAddModal(true);
    }

    const closeAddModal = () => {
        setAddModal(false);
    }

    return (
        <div className="App">
            <h2>Military Equipment</h2>
            <div className="Table" style={{height: 300, width: "fit-content"}}>
                <DataGrid rows={equipments} columns={columns}/>
            </div>
            <Button onClick={openAddModal}>Open Add Modal</Button>
            <Modal open={addModal}
                   onClose={closeAddModal}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    background: 'white',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 2
                }}>
                    <AddModal closeModal={() => closeAddModal()}
                              refreshTable={() => setRefreshTable(true)}>
                    </AddModal>
                </Box>
            </Modal>
            <a href="/statistic">Statistic</a>
        </div>
    );
}

function AddModal({closeModal, refreshTable}) {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [country, setCountry] = useState("");
    const [countOfEquipment, setCountOfEquipment] = useState("");
    const [date, setDate] = useState("");

    const changeName = (event) => {
        setName(event.target.value);
    };

    const changeType = (event) => {
        setType(event.target.value);
    };

    const changeDescription = (event) => {
        setDescription(event.target.value);
    };

    const changeCountry = (event) => {
        setCountry(event.target.value);
    };

    const changeCountOfEquipment = (event) => {
        setCountOfEquipment(event.target.value);
    };

    const changeDate = (event) => {
        setDate(event.target.value);
    };

    const addEquipment = async (event) => {
        event.preventDefault();
        const data = {name, type, description, country, countOfEquipment, date};
        await creatEquipment(serverAPI.equipments, data);
        closeModal();
        refreshTable();
    };

    return (
        <div className="modalContent">
            <p className="nameModal">Add equipment</p>
            <form className="form" onSubmit={addEquipment}>
                <label htmlFor="name">
                    Name:
                    <input id="name" name="name" type="text"
                           value={name}
                           onChange={changeName}
                           required autoFocus={true}/>
                </label>
                <label htmlFor="type">
                    Type:
                    <input id="type" name="type" type="text"
                           value={type}
                           onChange={changeType}
                           required/>
                </label>
                <label htmlFor="description">
                    Description:
                    <input id="description" name="description" type="text"
                           value={description}
                           onChange={changeDescription}
                           required/>
                </label>
                <label htmlFor="country">
                    Country:
                    <input id="country" name="country" type="text"
                           value={country}
                           onChange={changeCountry}
                           required/>
                </label>
                <label htmlFor="countOfEquipment">
                    Count Of Equipment:
                    <input id="countOfEquipment" name="countOfEquipment" type="text"
                           value={countOfEquipment}
                           onChange={changeCountOfEquipment}
                           required/>
                </label>
                <label htmlFor="date">
                    Date:
                    <input id="date" name="date" type="date"
                           value={date}
                           onChange={changeDate}
                           required/>
                </label>
                <input className="button add" type="submit" value="Add"/>
            </form>
        </div>
    )
}

export default Main