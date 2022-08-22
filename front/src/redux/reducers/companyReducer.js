const initialState = {
  requestingFetchCompanies: false,
  successfulFetchCompanies: false,
  errorFetchCompanies: false,
  companies: {},
  requestingCreateCompany: false,
  successfulCreateCompany: false,
  errorsCreateCompany: false,
  company: null,
  requestingReadCompany: false,
  successfulReadCompany: false,
  errorsReadCompany: false,
  rowEdited: null,
  requestingDeleteCompany: false,
  successfulDeleteCompany: false,
  errorsDeleteCompany: false,
  rowDeleted: null,
  requestingUpdateCompany: false,
  successfulUpdateCompany: false,
  errorsUpdateCompany: false,
  rowUpdated: null,
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_COMPANIES_REQUESTING":
      return {
        ...state,
        requestingFetchCompanies: true,
        successfulFetchCompanies: false,
        errorsFetchCompanies: false,
      };
    case "FETCH_COMPANY_SUCCESS":
      return {
        ...state,
        errorFetchCompanies: false,
        requestingFetchCompanies: false,
        successfulFetchCompanies: true,
        companies: action.value,
      };
    case "FETCH_COMPANY_ERROR":
      return {
        ...state,
        errorFetchCompanies: true,
        requestingFetchCompanies: false,
        successfulFetchCompanies: false,
      };
    case "CREATE_COMPANY_REQUESTING":
      return {
        ...state,
        requestingCreateCompany: true,
        successfulCreateCompany: false,
        errorsCreateCompany: false,
      };
    case "CREATE_COMPANY_SUCCESS":
      return {
        ...state,
        errorsCreateCompany: false,
        requestingCreateCompany: false,
        successfulCreateCompany: true,
        company: action.value,
      };
    case "CREATE_COMPANY_ERROR":
      return {
        ...state,
        errorsCreateCompany: true,
        requestingCreateCompany: false,
        successfulCreateCompany: false,
      };
    case "READ_COMPANY_REQUESTING":
      return {
        ...state,
        requestingReadCompany: true,
        successfulReadCompany: false,
        errorsReadCompany: false,
      };
    case "READ_COMPANY_SUCCESS":
      return {
        ...state,
        errorsReadCompany: false,
        requestingReadCompany: false,
        successfulReadCompany: true,
        rowEdited: action.value,
      };
    case "READ_COMPANY_ERROR":
      return {
        ...state,
        errorsReadCompany: true,
        requestingReadCompany: false,
        successfulReadCompany: false,
      };
    case "DELETE_COMPANY_REQUESTING":
      return {
        ...state,
        requestingDeleteCompany: true,
        successfulDeleteCompany: false,
        errorsDeleteCompany: false,
      };
    case "DELETE_COMPANY_SUCCESS":
      return {
        ...state,
        errorsDeleteCompany: false,
        requestingDeleteCompany: false,
        successfulDeleteCompany: true,
        rowDeleted: action.value,
      };
    case "DELETE_COMPANY_ERROR":
      return {
        ...state,
        errorsDeleteCompany: true,
        requestingDeleteCompany: false,
        successfulDeleteCompany: false,
      };
    case "UPDATE_COMPANY_REQUESTING":
      return {
        ...state,
        requestingUpdateCompany: true,
        successfulUpdateCompany: false,
        errorsUpdateCompany: false,
      };
    case "UPDATE_COMPANY_SUCCESS":
      return {
        ...state,
        errorsUpdateCompany: false,
        requestingUpdateCompany: false,
        successfulUpdateCompany: true,
        rowUpdated: action.value,
      };
    case "UPDATE_COMPANY_ERROR":
      return {
        ...state,
        errorsUpdateCompany: true,
        requestingUpdateCompany: false,
        successfulUpdateCompany: false,
      };
    case "RESET_COMPANY_FORM":
      return {
        ...state,
        requestingCreateCompany: false,
        successfulCreateCompany: false,
        errorsCreateCompany: false,
        company: null,
        requestingReadCompany: false,
        successfulReadCompany: false,
        errorsReadCompany: false,
        rowEdited: null,
        requestingDeleteCompany: false,
        successfulDeleteCompany: false,
        rowDeleted: null,
        requestingUpdateCompany: false,
        successfulUpdateCompany: false,
        errorsUpdateCompany: false,
        rowUpdated: null,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default companyReducer;
