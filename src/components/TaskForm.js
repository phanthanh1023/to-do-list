import React, { useState } from 'react';

const TaskForm = ({ onClose }) => {
    const [name, setName] = useState(""); 
    const [status, setStatus] = useState("true"); 

    function handleOnChange(e) {
        const { name, value } = e.target; // Lấy tên và giá trị từ đối tượng e.target
        if (name === "name") {
            setName(value); // Cập nhật trạng thái cho tên
        } else if (name === "status") {
            // Cập nhật trạng thái cho status
            setStatus(value === "true"); // Chuyển đổi giá trị chuỗi thành boolean
        }
    }

    async function handleSubmit(e) {
        e.preventDefault(); // Ngăn chặn hành động mặc định của form
        const Item = {
            name,
            status// Lấy giá trị từ state status
        };

        // Kiểm tra nếu không có giá trị 'name'
        if (!Item.name) {
            alert("Vui lòng nhập tên");
            return;
        }
        console.log(Item); // Kiểm tra dữ liệu trước khi gửi
        try {
            const response = await fetch("http://localhost:4000/list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Đặt header Content-Type là JSON
                },
                body: JSON.stringify(Item), // Chuyển đổi đối tượng Item thành chuỗi JSON
            });

            if (response.ok) {
                onClose(); // Đóng form nếu thêm thành công
            } else {
                alert("Thêm Thất Bại");
            }
        } catch (error) {
            alert("Unable to connect to the server");
        }
    }
    return (
        <div className="card card-warning">
            <div className="card-header">
                <h3 className="card-title text-primary d-flex justify-content-between align-items-center">
                    Thêm Công Việc
                    <i className="bi bi-x-circle cursor-pointer" onClick={onClose}></i>
                </h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Tên:</label>
                        <input 
                            type="text" 
                            className="form-control mt-2" 
                            name="name" 
                            value={name} // Gán giá trị từ state
                            onChange={handleOnChange} // Cập nhật khi có thay đổi
                        />
                    </div>
                    <label className="mt-2">Trạng Thái:</label>
                    <select 
                        className="form-control mt-2" 
                        name="status" 
                        value={status} 
                        onChange={handleOnChange} // Cập nhật khi có thay đổi
                    >
                        <option value={true}>Kích hoạt</option>
                        <option value={false}>Ẩn</option>
                    </select>
                    <br />
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-warning me-3 d-flex align-items-center">
                            <i className="bi bi-floppy me-2"></i>Lưu Lại
                        </button>
                        <button type="reset" className="btn btn-danger d-flex align-items-center" onClick={onClose}>
                            <i className="bi bi-x-square me-2"></i>Hủy bỏ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
