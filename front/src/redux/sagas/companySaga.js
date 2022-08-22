import { call, put, takeLatest } from "redux-saga/effects";
import request from "../../utils/request";

function* getAllComapnies(payload) {
  try {
    yield put({
      type: "FETCH_COMPANIES_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/companies?page=${payload.value.page}&search=${payload.value.search}&offset=${payload.value.offset}`;
    const headers = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "HIDE_LOADING",
    });

    yield put({
      type: "FETCH_COMPANY_SUCCESS",
      value: response,
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "danger",
        title: "Falied load",
        message: "Falied load companies",
      },
    });
    yield put({
      type: "FETCH_COMPANY_ERROR",
    });
  }
}

function* postCompany(payload) {
  try {
    yield put({ type: "CREATE_COMPANY_REQUESTING" });
    yield put({
      type: "SHOW_LOADING",
    });
    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/companies`;

    const headers = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(payload.value),
    };

    const response = yield call(request, requestURL, headers);

    yield put({
      type: "HIDE_LOADING",
    });

    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "success",
        title: "Successful save",
        message: "Successful save person",
      },
    });

    yield put({
      type: "CREATE_COMPANY_SUCCESS",
      value: response,
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "danger",
        title: "Falied save",
        message: "Falied save person",
      },
    });
    yield put({
      type: "CREATE_COMPANY_ERROR",
    });
  }
}

function* getCompanyById(payload) {
  try {
    yield put({
      type: "READ_COMPANY_REQUESTING",
    });
    yield put({
      type: "SHOW_LOADING",
    });
    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/companies/${payload.value.id}`;

    const headers = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "HIDE_LOADING",
    });

    yield put({
      type: "READ_COMPANY_SUCCESS",
      value: response,
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "READ_COMPANY_ERROR",
    });
  }
}

function* deleteCompanyById(payload) {
  try {
    yield put({
      type: "DELETE_COMPANY_REQUESTING",
    });
    yield put({
      type: "SHOW_LOADING",
    });
    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/companies/${payload.value.idCompany}`;

    const headers = {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(payload.value),
    };

    const response = yield call(request, requestURL, headers);

    yield put({
      type: "HIDE_LOADING",
    });

    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "success",
        title: "Successful disable",
        message: "Successful disable person",
      },
    });

    yield put({
      type: "DELETE_COMPANY_SUCCESS",
      value: response,
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "danger",
        title: "Falied disable",
        message: "Falied disable person",
      },
    });
    yield put({
      type: "DELETE_COMPANY_ERROR",
    });
  }
}

function* updateCompany(payload) {
  try {
    yield put({
      type: "UPDATE_COMPANY_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/companies/${payload.value.id}`;

    const headers = {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(payload.value),
    };

    const response = yield call(request, requestURL, headers);

    yield put({
      type: "HIDE_LOADING",
    });

    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "success",
        title: "Successful update",
        message: "Successful update person",
      },
    });

    yield put({
      type: "UPDATE_COMPANY_SUCCESS",
      value: response,
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "danger",
        title: "Falied update",
        message: "Falied update person",
      },
    });
    yield put({
      type: "UPDATE_COMPANY_ERROR",
    });
  }
}

export function* watchCompany() {
  yield takeLatest("FETCH_COMPANIES_REQUEST", getAllComapnies);
  yield takeLatest("CREATE_COMPANY_REQUEST", postCompany);
  yield takeLatest("READ_COMPANY_REQUEST", getCompanyById);
  yield takeLatest("DELETE_COMPANY_REQUEST", deleteCompanyById);
  yield takeLatest("UPDATE_COMPANY_REQUEST", updateCompany);
}
