import React from "react";

interface WithdrawModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-30">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Are you sure you want to withdraw your application?</h3>
        <p className="text-gray-600 mb-6 text-sm">
          This action cannot be undone. The employer will be notified that you are no longer interested in this position.
        </p>
        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700">Yes, withdraw application</button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
