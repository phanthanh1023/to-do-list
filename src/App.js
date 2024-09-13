import { useState } from 'react';
import './App.css';
import Control from './components/Control';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
    const [displayForm, setDisplayForm] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("")
    const [selectedSort, setSelectedSort] = useState({
        sortBy: "",
        sortValue: ""
    });
   
    //Search
    const onSearch = (keyword) => {
        setSearchKeyword(keyword) //cập nhật từ khóa tìm kiếm
        console.log(keyword)
    }
    // sort
    const onSort = (sortBy, sortValue) => {
        setSelectedSort({ sortBy, sortValue });
        console.log("Sort selected in App:", sortBy, sortValue);
    }

    return (
        <div className="container">
            <div className="text-center">
                <h1>Quản Lý Công Việc</h1><hr />
            </div>
            <div className="row">
                <div className={displayForm ? "col-4 mt-2" : ""}>
                    {displayForm ? <TaskForm onClose={() => setDisplayForm(!displayForm)} /> : ""}
                </div>
                <div className={displayForm ? "col-8 mt-2" : "col-12 mt-2"}>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setDisplayForm(!displayForm)}>
                        <i className="bi bi-plus-square me-2 cursor-pointer"></i>Thêm Công Việc
                    </button>
                   
                    <Control onSearch={onSearch} onSort={onSort} selectedSort={selectedSort} /> {/*truyền hàm tìm kiếm onSearch xuống control*/}
                    {/* list */}
                    <div className="row mt-3">
                        <div className="col-12">
                            <TaskList
                                searchKeyword={searchKeyword}
                                selectedSort={selectedSort}
                            /> {/* Truyền từ khóa tìm kiếm xuống TaskList */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
