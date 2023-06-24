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

function Main() {
    const [equipments, setEquipments] = useState([]);
    const [addModal, setAddModal] = useState(false);

    useEffect(() => {
        getEquipments(serverAPI.equipments)
            .then((data) => {
                for (const equipment of data) {
                    setEquipments(prevState => [...prevState, equipment]);
                }
            })
            .catch(e => console.log(e));
    }, []);

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
                   onClose={closeAddModal}
            >
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
                    <AddModal></AddModal>
                </Box>
            </Modal>
            <a href="/statistic">Statistic</a>
        </div>
    );
}

function AddModal({}) {
    return (
        <div className="modalContent">
            <p className="nameModal">Add equipment</p>
            <form className="form">
                <label htmlFor="name">
                    Name:
                    <input id="name" name="name" type="text" required autoFocus={true}/>
                </label>
                <label htmlFor="type">
                    Type:
                    <input id="type" name="type" type="text" required/>
                </label>
                <label htmlFor="description">
                    Description:
                    <input id="description" name="description" type="text" required/>
                </label>
                <label htmlFor="country">
                    Country:
                    <input id="country" name="country" type="text" required/>
                </label>
                <label htmlFor="countOfEquipment">
                    Count Of Equipment:
                    <input id="countOfEquipment" name="countOfEquipment" type="text" required/>
                </label>
                <label htmlFor="date">
                    Date:
                    <input id="date" name="date" type="date" required/>
                </label>
                <input className="button add" type="submit" value="Add"/>
            </form>
        </div>
    )
}

export default Main