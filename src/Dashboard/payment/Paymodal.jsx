import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import axios from 'axios';

const Paymodal = ({ isOpen, closeModal, employee, refreshData }) => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handlePayment = async () => {
    await axios.post('/api/payroll', {
      employeeId: employee._id,
      salary: employee.salary,
      month,
      year,
    });

    refreshData();         // Optional: Refresh payroll table in admin
    closeModal();
    alert('Payment request sent successfully.');
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <DialogTitle className="text-lg font-bold mb-4">
              Pay {employee?.name}
            </DialogTitle>

            <input
              type="text"
              value={employee?.salary}
              readOnly
              className="w-full mb-3 border rounded p-2 bg-gray-100"
            />

            <input
              type="number"
              placeholder="Month (1-12)"
              min="1"
              max="12"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full mb-3 border rounded p-2"
            />

            <input
              type="number"
              placeholder="Year (e.g. 2025)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full mb-3 border rounded p-2"
            />

            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                disabled={!month || !year}
                className={`px-4 py-2 rounded text-white ${
                  month && year ? 'bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
                }`}
                onClick={handlePayment}
              >
                Pay
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Paymodal;
