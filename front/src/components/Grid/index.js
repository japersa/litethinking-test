import React, {useState} from "react";
import {Pagination} from "react-bootstrap";
import {element} from "prop-types";

const Grid = ({
                  defaultValue,
                  cols,
                  data = [],
                  page,
                  pages,
                  onChangeRange,
                  onChangePage,
                  onChangeSearch,
                  actionsButton
              }) => {
    const [value, setValue] = useState(defaultValue);

    const onChangeValue = (event) => {
        setValue(event.target.value);
    };

    const ranges = [10, 25, 50, 100, 500];

    const showPaginationNumbers = (pageNumbers) => {
        let paginationNumbers = [];
        if (pageNumbers) {
            let showMax = 5;
            let endPage;
            let startPage;
            if (pageNumbers <= showMax) {
                startPage = 1;
                endPage = pageNumbers.length;
            } else {
                startPage = page;
                if (
                    startPage != pageNumbers.length &&
                    startPage + 1 != pageNumbers.length
                ) {
                    endPage = page + showMax - 1;
                } else {
                    endPage = pageNumbers.length;
                }
            }
            for (let i = startPage; i <= endPage; i++) {
                paginationNumbers.push(i);
            }
            return showRenderPageNumbers(paginationNumbers);
        }
    };

    const showRenderPageNumbers = (paginationNumbers) => {
        if (paginationNumbers) {
            let result = paginationNumbers.map((number) => {
                return (
                    <Pagination.Item
                        key={number}
                        active={number === page}
                        onClick={() => onChangePage(number)}
                    >
                        {number}
                    </Pagination.Item>
                );
            });
            return result;
        }
    };

    const onSubmit = (e) => {
        e.preventDefault()
        onChangeSearch(value)
    }

    const onEnter = (event) => event.key === 'Enter' && onSubmit(event)

    return (
        <div className="table-responsive">
            <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                { actionsButton &&
                    actionsButton.isVisible &&
                    actionsButton.buttons && actionsButton.buttons.length > 0 && (
                    <div className={'row mb-3 justify-content-start'}>
                        {actionsButton.buttons.map(element => {
                            if (element.isVisible) {
                                if (element.render) {
                                   if (React.isValidElement(element.render) || typeof element.render === 'string') {
                                       return (element.render)
                                   }
                                   if (typeof element.render === 'function') {
                                       return (element.render())
                                   }
                                }
                                return (
                                    <div className={'col-auto'}>
                                        <button className={'btn btn-sm '+element.classNames} onClick={element.onclick}>{element.label}</button>
                                    </div>
                                )
                            }
                        })
                        }

                    </div>
                ) }
                {onChangeRange && onChangeSearch && (
                    <div className="row mb-3">
                        <div className="col-sm-12 col-md-6">
                            <div className="dataTables_length" id="dataTable_length">
                                <label>
                                    Mostrar{" "}
                                    <select
                                        name="dataTable_length"
                                        aria-controls="dataTable"
                                        className="custom-select custom-select-sm form-control form-control-sm"
                                        onChange={(event) => {
                                            onChangeRange(event.target.value);
                                        }}
                                    >
                                        {ranges.map((elem, index) => (
                                            <option key={index} value={elem}>
                                                {elem}
                                            </option>
                                        ))}
                                    </select>{" "}
                                    registros
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                                <div id="dataTable_filter" className="dataTables_filter">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control small"
                                            placeholder="Buscar"
                                            aria-label="Search"
                                            aria-describedby="basic-addon2"
                                            onChange={onChangeValue}
                                            onKeyPress={e => onEnter(e)}
                                        />
                                        <div className="input-group-append">
                                            <button
                                                className="btn btn-primary"
                                                type="button"
                                                onClick={(e) => onSubmit(e)}
                                            >
                                                <i className="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                )}

                <table className={"table table-bordered dataTable"}>
                    <thead>
                    <tr>
                        {cols.map((headerItem, index) => (
                            <th className="text-nowrap" key={index}>
                                {typeof headerItem.title == "string"
                                    ? headerItem.title
                                    : headerItem.title()}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (item.isActive == false ?
                                <tr key={index} style={{
                                    backgroundColor: item.isActive == false ? '#6492ba' : '#fff',
                                    color: item.isActive == false ? '#fff' : '#858796'
                                }}>
                                    {cols.map((col, key) => (
                                        <td className="text-nowrap" key={key}>
                                            {col.render(item)}
                                        </td>
                                    ))}
                                </tr> :
                                <tr key={index}>
                                    {cols.map((col, key) => (
                                        <td className="text-nowrap" key={key}>
                                            {col.render(item)}
                                        </td>
                                    ))}
                                </tr>
                        ))
                    ) : (
                        <tr className="odd">
                            <td
                                valign="top"
                                colSpan={cols.length}
                                className="dataTables_empty"
                            >
                                No se encontraron registros
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                {pages  && (
                    <Pagination className="justify-content-center">
                        <Pagination.First onClick={() => onChangePage(1)}/>
                        <Pagination.Prev
                            onClick={() => onChangePage(page !== 1 ? page - 1 : 1)}
                        />
                        { pages !== 0 && showPaginationNumbers(pages)}
                        <Pagination.Next
                            onClick={() => onChangePage(page !== pages ? page + 1 : pages)}
                        />
                        <Pagination.Last onClick={() => onChangePage(pages)}/>
                    </Pagination>
                )}
            </div>
        </div>
    );
};

export default Grid;
