import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ searchKeyword, selectedSort }) => {
    const [listItem, setListItem] = useState([])
    const [filterName, setFilterName] = useState("")
    const [filterStaus, setFilterStaus] = useState(-1)
    const [filteredItems, setFilteredItems] = useState([]);

    function getItem() {
        fetch("http://localhost:4000/list")
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error()
            })
            .then(data => {
                setListItem(data)
                setFilteredItems(data); // Đặt danh sách ban đầu
            })
            .catch(error => {
                alert("Không có dữ liệu")
            })
    }
    function onChange(e) {
        const { name, value } = e.target;
        name === "filterName" ? setFilterName(value.toLowerCase())
            : setFilterStaus(Number(value));
    }

    useEffect(() => {
        // console.log("Filter Status:", filterStaus);
        // console.log("Filter Name:", filterName);
        // console.log("List items:", listItem);

        const filtered = listItem.filter(item => {
            // Log để kiểm tra giá trị của item.status
            // console.log("Item status:", item.status, "Filter status:", filterStaus);
            // Lọc
            const matchName = item.name.toLowerCase().includes(filterName) &&
                item.name.toLowerCase().includes(searchKeyword.toLowerCase()); // tìm kiếm theo tên
            const itemStatus = item.status === "true";

            const matchStatus = (filterStaus === -1) ||
                (filterStaus === 1 && itemStatus) ||
                (filterStaus === 0 && !itemStatus);
            return matchName && matchStatus;
        });
        // sắp xếp
        if (selectedSort.sortBy === 'name') {
            filtered.sort((a, b) => {
                if (a.name > b.name) return selectedSort.sortValue
                else if (a.name < b.name) return -selectedSort.sortValue
                else return 0;
            });
        }
        if (selectedSort.sortBy === 'status') {
            filtered.sort((a, b) => {
                const statusA = a.status === 'true' ? 1 : 0; // Chuyển đổi chuỗi thành số để cho dễ ss vì 
                //"t" >"f" trong bảng chữ cái nên t cần chuyển đổi thành số
                const statusB = b.status === 'true' ? 1 : 0; // Chuyển đổi chuỗi thành số
                // Nếu muốn "Kích Hoạt" (1) trước thì:
                return (statusB - statusA) * selectedSort.sortValue; // Đảo ngược thứ tự so với trước
            });
        }
        setFilteredItems(filtered);

    }, [filterName, filterStaus, listItem, searchKeyword, selectedSort]);

    useEffect(getItem, [])
    return (
        <table className="table table-bordered table-hover">
            <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng Thái</th>
                    <th className="text-center">Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input type="text"
                            className="form-control"
                            name="filterName"
                            value={filterName}
                            onChange={onChange}
                        />
                    </td>
                    <td>
                        <select className="form-control" name="filterStaus"
                            value={filterStaus}
                            onChange={onChange}
                        >
                            <option value={-1}>Tất Cả</option>
                            <option value={0}>Ẩn</option>
                            <option value={1}>Kích Hoạt</option>
                        </select>
                    </td>
                    <td></td>
                </tr>

                {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                        <TaskItem key={index} item={item} index={index} getItem={getItem} />
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center">Không tìm thấy</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default TaskList;