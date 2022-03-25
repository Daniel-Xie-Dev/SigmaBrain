require('dotenv').config()

const {
    REACT_APP_API_KEY,
    REACT_APP_AUTH_DOMAIN,
    REACT_APP_PROJECT_ID,
    REACT_APP_STORAGE_BUCKET,
    REACT_APP_MESSAGING_SENDER_ID,
    REACT_APP_APP_ID,
    REACT_APP_MEASUREMENT_ID,
    REACT_APP_BASE_URL
} = process.env

const CONFIG = {
    api_key: REACT_APP_API_KEY,
    auth_domain: REACT_APP_AUTH_DOMAIN,
    project_id: REACT_APP_PROJECT_ID,
    storage_bucket: REACT_APP_STORAGE_BUCKET,
    messaging_sender_id: REACT_APP_MESSAGING_SENDER_ID,
    app_id: REACT_APP_APP_ID,
    measurement_id: REACT_APP_MEASUREMENT_ID,
    base_url: REACT_APP_BASE_URL
}

export default CONFIG