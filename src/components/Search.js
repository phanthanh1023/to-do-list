import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [keyword, setKeyword] = useState(""); // Quản lý từ khóa trong state

    const handleSearch = () => {
        onSearch(keyword); // Gọi hàm onSearch với từ khóa tìm kiếm
    };
    return (
        <div className="col-6">
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Nhập từ khóa..."
                    name="keyword"
                    className="form-control"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)} // Cập nhật từ khóa khi người dùng nhập
                />
                <span className="input-group-btn">
                    <button className="btn btn-primary" type="button" onClick={handleSearch}>
                        <i className="bi bi-search me-2"></i>Tìm
                    </button>
                </span>
            </div>
        </div>
    );
};

export default Search;
