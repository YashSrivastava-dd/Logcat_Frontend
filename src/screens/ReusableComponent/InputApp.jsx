import React from 'react'

function InputApp() {
    return (
        <div>
            <label
                for="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 "
            >
                First name
            </label>
            <input
                onChange={(e) =>
                    setNewUserData({ ...newUserData, firstName: e.target.value })
                }
                value={newUserData.firstName}
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Enter First Name"
                required
            />
        </div>
    )
}

export default InputApp