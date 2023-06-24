import React, {useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import axios from "axios";
import serverAPI from "./util/server.api";

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


    return (
        <div className="App">
            <h2>Military Equipment</h2>
            <div className="Table" style={{height: 300, width: "fit-content"}}>
                <DataGrid rows={equipments} columns={columns}/>
            </div>
            <div className="button add" onClick={openAddModal}>Add</div>

            <div className="modal">
                {
                    addModal ?
                        <AddModal id="add-modal"></AddModal>
                        :
                        ""
                }
            </div>
        </div>
    );
}

function AddModal({}) {
    const [addModal, setAddModal] = useState(true);

    if (addModal) {
        document.querySelector("#add-modal").style.display = "flex"
    }

    const closeAddModal = () => {
        setAddModal(false);
    }
    return (
        <div className="modalContent">
            <span className="close" onClick={closeAddModal}>&times;</span>
            <p className="nameModal">Add equipment</p>
        </div>
    )
}

export default Main