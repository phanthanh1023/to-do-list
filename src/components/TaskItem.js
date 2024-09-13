import React from 'react';

const TaskItem = ({ item, index, getItem }) => {
    function deleteItem(id) {
        fetch("http://localhost:4000/list/" + id, {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error()
                }
                getItem();
            })
            .catch(error => {
                alert("Không xóa được Item")
            })
    }
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td className="text-center cursor-pointer">
                <span className={`badge ${item.status === "true" ? 'bg-success' : 'bg-danger'} `}>
                    {item.status === "true" ? 'Kích Hoạt' : 'Ẩn'}
                </span>
            </td>
            <td className="text-center">
                <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-warning mx-1 d-flex align-items-center">
                        <i className="bi bi-pencil me-1"></i>Sửa
                    </button>
                    <button type="button"
                        className="btn btn-danger mx-1 d-flex align-items-center"
                        onClick={() => deleteItem(item.id)}
                    >
                        <i className="bi bi-trash me-1"></i>Xóa
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default TaskItem;
