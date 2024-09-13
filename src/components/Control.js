import React from 'react';
import Search from './Search';
import Sort from './Sort';

const Control = ({ onSearch, onSort, selectedSort }) => {
    return (
        <div className="row mt-3 ">
            {/* search */}
            <Search onSearch={onSearch} ></Search>
            {/* Sort */}
            <Sort onSort={onSort} selectedSort={selectedSort} ></Sort>

        </div>
    );
};

export default Control;