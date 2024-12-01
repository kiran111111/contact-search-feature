import React, { useState } from 'react';

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
}

const contacts: Contact[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    // Add more contacts as needed
];

const Table: React.FC = () => {
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [filter, setFilter] = useState<string>('');

    const handleRowClick = (contact: Contact) => {
        setSelectedContact(contact);
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Filter by name"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.map(contact => (
                        <tr key={contact.id} onClick={() => handleRowClick(contact)}>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedContact && (
                <div>
                    <h2>Contact Details</h2>
                    <p>Name: {selectedContact.name}</p>
                    <p>Email: {selectedContact.email}</p>
                    <p>Phone: {selectedContact.phone}</p>
                </div>
            )}
        </div>
    );
};

export default Table;