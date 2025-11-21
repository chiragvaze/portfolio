import React, { useEffect, useState } from 'react';
import { messageAPI } from '../services/api';
import toast from 'react-hot-toast';
import { Mail, Trash2, Eye } from 'lucide-react';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const response = await messageAPI.getAll();
      setMessages(response.data);
    } catch (error) {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await messageAPI.updateStatus(id, 'read');
      toast.success('Marked as read');
      loadMessages();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        await messageAPI.delete(id);
        toast.success('Message deleted');
        setSelectedMessage(null);
        loadMessages();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 card max-h-[600px] overflow-y-auto">
          <h2 className="font-semibold mb-4">Inbox ({messages.length})</h2>
          {messages.map((msg) => (
            <div
              key={msg._id}
              onClick={() => setSelectedMessage(msg)}
              className={`p-4 border rounded-lg mb-2 cursor-pointer hover:bg-gray-50 ${
                msg.status === 'unread' ? 'bg-blue-50 border-blue-200' : ''
              } ${selectedMessage?._id === msg._id ? 'border-blue-500' : ''}`}
            >
              <div className="flex items-start justify-between mb-1">
                <p className="font-medium text-sm">{msg.name}</p>
                {msg.status === 'unread' && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
              </div>
              <p className="text-sm text-gray-600 truncate">{msg.subject}</p>
              <p className="text-xs text-gray-400 mt-1">{new Date(msg.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
          {messages.length === 0 && (
            <p className="text-gray-500 text-center py-8">No messages yet</p>
          )}
        </div>

        <div className="lg:col-span-2 card">
          {selectedMessage ? (
            <>
              <div className="border-b pb-4 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-xl font-semibold">{selectedMessage.subject}</h2>
                    <p className="text-sm text-gray-600">From: {selectedMessage.name} ({selectedMessage.email})</p>
                    <p className="text-xs text-gray-400">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    {selectedMessage.status === 'unread' && (
                      <button onClick={() => handleMarkAsRead(selectedMessage._id)} className="btn btn-secondary flex items-center gap-1">
                        <Eye size={16} /> Mark Read
                      </button>
                    )}
                    <button onClick={() => handleDelete(selectedMessage._id)} className="btn btn-danger flex items-center gap-1">
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="whitespace-pre-wrap text-gray-700">
                {selectedMessage.message}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Mail size={48} className="mx-auto mb-4 text-gray-400" />
              <p>Select a message to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
