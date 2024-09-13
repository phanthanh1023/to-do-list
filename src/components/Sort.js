import React, { useState } from 'react';
const Sort = ({ selectedSort, onSort }) => {

    const onClick = (sortBy, sortValue) => {
        onSort(sortBy, sortValue)
    }
    return (
        <div className="col-6">
            <div className="dropdown">
                <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenu1"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true">
                    Sắp Xếp
                </button>

                <ul className="dropdown-menu" aria-labelledby='dropdownMenu1'>
                    <li onClick={() => onClick("name", 1)}>
                        <a role="button"
                            className={`p-3 ${(selectedSort.sortBy === "name" && selectedSort.sortValue === 1) ? 'sort_selected' : ""}`} >
                            <i className="bi bi-sort-alpha-down p-2">Tên A - Z</i>
                        </a>
                    </li>
                    <li onClick={() => onClick("name", -1)}>
                        <a role="button" className={`p-3  ${(selectedSort.sortBy === "name" && selectedSort.sortValue === -1) ? 'sort_selected' : ""}`}>
                            <i className="bi bi-sort-alpha-down-alt p-2">Tên Z -  A</i>
                        </a>
                    </li><hr />
                    <li className="divider" role="separator"></li>
                    <li onClick={() => onClick("status", 1)}>
                        <a role="button" className={`p-3 ${(selectedSort.sortBy === "status" && selectedSort.sortValue === 1) ? 'sort_selected' : ''}`}>
                            Trạng Thái Kích Hoạt
                        </a>
                    </li>
                    <li onClick={() => onClick("status", -1)}>
                        <a role="button" className={`p-3 ${(selectedSort.sortBy === "status" && selectedSort.sortValue === -1) ? 'sort_selected' : ""}`} >
                            Trạng Thái Ẩn
                        </a>
                    </li>
                </ul>
            </div>
        </div >
    );
};

export default Sort;