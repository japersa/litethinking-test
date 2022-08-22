import React, { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Grid from "../../components/Grid";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";

const Company = ({
  reduxGetCompanies,
  companies,
  reduxGetCompany,
  company,
  reduxPostCompany,
  rowEdited,
  reduxDeleteCompany,
  rowDeleted,
  reduxPatchCompany,
  rowUpdated,
  reduxResetCompanyForm,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(10);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    reduxResetCompanyForm();
    setShow(false);
  };
  const handleShow = () => {
    reduxResetCompanyForm();
    reset();
    setShow(true);
  };
  const [search, setSearch] = useState("");

  const columns = [
    {
      title: "ID",
      render: (rowData) => {
        return <span>{rowData.idCompany}</span>;
      },
    },
    {
      title: "Nombre de la empresa",
      render: (rowData) => {
        return <span>{rowData.name}</span>;
      },
    },
    {
      title: "Dirección",
      render: (rowData) => {
        return <span>{rowData.address}</span>;
      },
    },
    {
      title: "NIT.",
      render: (rowData) => {
        return <span>{rowData.nit}</span>;
      },
    },
    {
      title: "Teléfono",
      render: (rowData) => {
        return <span>{rowData.phone}</span>;
      },
    },
    {
      title: "Opciones",
      render: (rowData) => {
        return (
          <>
            <button
              title="Editar"
              className="btn btn-primary btn-sm  btn-circle mr-2"
              type="button"
              onClick={(e) => handleOpen(rowData)}
            >
              <i className="fas fa-edit fa-xs"></i>
            </button>
            <button
              title="Borrar"
              className="btn btn-danger btn-sm btn-circle mr-2"
              type="button"
              onClick={(e) => handleDelete(rowData)}
            >
              <i className="fas fa-times-circle fa-xs"></i>
            </button>
          </>
        );
      },
    },
  ];

  const handleOpen = (row) => {
    reduxGetCompany({
      id: row.idCompany,
    });
  };

  useEffect(() => {
    if (rowEdited) {
      setShow(true);
      setValue("name", rowEdited.name);
      setValue("address", rowEdited.address);
      setValue("nit", rowEdited.nit);
      setValue("phone", rowEdited.phone);
      setValue("idCompany", rowEdited.idCompany);
    }
  }, [rowEdited]);

  const handleDelete = (row) => {
    reduxDeleteCompany(row);
  };

  useEffect(() => {
    reduxGetCompanies({
      page: 1,
      offset: offset,
      search: "",
    });
  }, []);

  useEffect(() => {
    reduxGetCompanies({
      page: currentPage,
      offset: offset,
      search: search,
    });
  }, [currentPage]);

  const onSubmit = (data) => {
    if (data.idCompany == "") {
      return;
    }
    if (rowEdited) {
      reduxPatchCompany({
        ...data,
        id: rowEdited.idCompany,
      });
    } else {
      reduxPostCompany(data);
    }
    reset();
    reduxResetCompanyForm();
    setShow(false);
  };

  useEffect(() => {
    if (company || rowUpdated || rowDeleted) {
      if (
        (company && company.message == undefined) ||
        (rowUpdated && rowUpdated.message == undefined) ||
        rowDeleted
      ) {
        reduxGetCompanies({
          page: currentPage,
          offset: offset,
          search: search,
        });
        reduxResetCompanyForm();
        setShow(false);
      }
    }
  }, [company, rowUpdated, rowDeleted]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          Litethinking.com
        </a>
      </nav>
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid mt-3">
              <div className="d-sm-flex align-items-center mb-1">
                <h1
                  className="h3 mb-0 text-gray-800 mr-3"
                  style={{ margin: "10px" }}
                >
                  Empresas
                </h1>
                <button
                  title="Nuevo"
                  className="btn btn-primary btn-sm"
                  type="button"
                  onClick={handleShow}
                >
                  Nuevo
                </button>
              </div>
              <div className="card shadow mb-4 mt-3">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Listado de empresas
                  </h6>
                </div>
                <div className="card-body">
                  <Grid
                    cols={columns}
                    data={
                      companies && Object.keys(companies).length > 0
                        ? companies.items
                        : []
                    }
                    page={
                      companies && Object.keys(companies).length > 0
                        ? Number(companies.page)
                        : currentPage
                    }
                    pages={
                      companies && Object.keys(companies).length > 0
                        ? Number(companies.totalPages)
                        : 0
                    }
                    onChangePage={(page) => setCurrentPage(page)}
                    onChangeRange={(value) => {
                      setOffset(value);
                      reduxGetCompanies({
                        page: 1,
                        offset: value,
                        search: search,
                      });
                    }}
                    defaultValue={search}
                    onChangeSearch={(value) => {
                      setSearch(value);
                      reduxGetCompanies({
                        page: 1,
                        offset: offset,
                        search: value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closeButton>
              <Modal.Title>
                {rowEdited ? "Editar" : "Registrar"} empresa
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col s12 col-md-12">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Nombre de la empresa
                    </label>
                    <input
                      id="name"
                      type="text"
                      className={`form-control form-control-user ${
                        errors.name && "is-invalid"
                      }`}
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <span className="invalid-feedback">
                        El Nombre de la empresa es requerido
                      </span>
                    )}
                  </div>
                </div>
                <div className="col s12 col-md-12">
                  <div className="form-group">
                    <label htmlFor="address" className="form-label">
                      Dirección
                    </label>
                    <input
                      id="address"
                      type="text"
                      className={`form-control form-control-user ${
                        errors.address && "is-invalid"
                      }`}
                      {...register("address", { required: true })}
                    />
                    {errors.address && (
                      <span className="invalid-feedback">
                        La Dirección. es requerida
                      </span>
                    )}
                  </div>
                </div>
                <div className="col s12 col-md-12">
                  <div className="form-group">
                    <label htmlFor="nit" className="form-label">
                      NIT.
                    </label>
                    <input
                      id="nit"
                      type="text"
                      className={`form-control form-control-user ${
                        errors.nit && "is-invalid"
                      }`}
                      {...register("nit", { required: true })}
                    />
                    {errors.nit && (
                      <span className="invalid-feedback">
                        El nit es requerido
                      </span>
                    )}
                  </div>
                </div>
                <div className="col s12 col-md-12">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Teléfono
                    </label>
                    <input
                      id="phone"
                      type="text"
                      className={`form-control form-control-user ${
                        errors.name && "is-invalid"
                      }`}
                      {...register("phone", { required: true })}
                    />
                    {errors.name && (
                      <span className="invalid-feedback">
                        El teléfono es requerido
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    companies: state.companyState.companies,
    company: state.companyState.company,
    rowEdited: state.companyState.rowEdited,
    rowDeleted: state.companyState.rowDeleted,
    rowUpdated: state.companyState.rowUpdated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxGetCompanies: (payload) =>
      dispatch({
        type: "FETCH_COMPANIES_REQUEST",
        value: payload,
      }),
    reduxPostCompany: (payload) =>
      dispatch({
        type: "CREATE_COMPANY_REQUEST",
        value: payload,
      }),
    reduxGetCompany: (payload) =>
      dispatch({
        type: "READ_COMPANY_REQUEST",
        value: payload,
      }),
    reduxDeleteCompany: (payload) =>
      dispatch({
        type: "DELETE_COMPANY_REQUEST",
        value: payload,
      }),
    reduxPatchCompany: (payload) =>
      dispatch({
        type: "UPDATE_COMPANY_REQUEST",
        value: payload,
      }),
    reduxResetCompanyForm: () =>
      dispatch({
        type: "RESET_COMPANY_FORM",
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
