'use client';
import React, {useState, useEffect} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Dialog} from 'primereact/dialog';
import {Checkbox} from 'primereact/checkbox';
import HttpClient from '@/util/HttpClient';

const ContactUsTable = () => {
    const [contacts, setContacts] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState(10);
    const [visible, setVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState('');
    const [updatedContacts, setUpdatedContacts] = useState([]);

    const fetchContacts = async (page = 0, size = 10) => {
        setLoading(true);
        try {
            const response = await HttpClient.get(`/contact?page=${page}&size=${size}`);
            const data = await response.json();

            const updatedData = data.content.map(contact => ({
                ...contact,
                read: false,
            }));

            setContacts(updatedData);
            setTotalRecords(data.totalElements);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchContacts(page, rows);
    }, [page, rows]);

    const onPaginatorChange = (event) => {
        setPage(event.page);
        setRows(event.rows);
    };

    // Checkbox değişim fonksiyonu
    const onReadChange = (contact) => {
        const updatedContact = {...contact, read: !contact.read};
        const updatedList = contacts.map((item) =>
            item.id === contact.id ? updatedContact : item
        );
        setContacts(updatedList);

        if (!updatedContacts.some((c) => c.id === updatedContact.id)) {
            setUpdatedContacts([...updatedContacts, updatedContact]);
        } else {
            setUpdatedContacts(
                updatedContacts.map((c) => (c.id === updatedContact.id ? updatedContact : c))
            );
        }
    };

    const saveChanges = async () => {
        try {
            await HttpClient.put('/contact/update-batch', updatedContacts.map(u=>u.id));
            alert('Changes saved successfully!');
            setUpdatedContacts([]);
            fetchContacts(page, rows);
        } catch (error) {
            console.error('Error saving changes:', error);
            alert('Failed to save changes.');
        }
    };

    // Mesaj kolonunun render fonksiyonu
    const messageBody = (data) => (
        <span onClick={() => {
            setSelectedMessage(data.message);
            setVisible(true);
        }}>
            {data.message}
        </span>
    );

    // Checkbox render fonksiyonu
    const readBody = (data) => (
        <Checkbox checked={data.read} onChange={() => onReadChange(data)}/>
    );

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Contact Us Records</h2>
            <DataTable
                value={contacts}
                paginator
                rows={rows}
                totalRecords={totalRecords}
                loading={loading}
                onPaginatorChange={onPaginatorChange}
            >
                <Column field="name" header="Name" sortable/>
                <Column field="email" header="Email" sortable/>
                <Column field="phone" header="Phone" sortable/>
                <Column field="subject" header="Subject" sortable/>
                <Column id="message" body={messageBody} field="message" header="Message"/>
                <Column field="createdAt" header="Created Date" sortable/>
                <Column header="Read" body={readBody}/>
            </DataTable>
            <button
                className="mt-4 p-2 bg-blue-500 text-white rounded"
                onClick={saveChanges}
                disabled={updatedContacts.length === 0}
            >
                Save Changes
            </button>
            <Dialog header="Message Details" visible={visible} style={{width: '50vw'}} onHide={() => setVisible(false)}>
                <p className="m-0">{selectedMessage}</p>
            </Dialog>
        </div>
    );
};

export default ContactUsTable;