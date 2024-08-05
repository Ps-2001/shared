export const FIELDS_PATTERNS = {
    text: /./,
    tel: /^\+?7\d{10}$/,
    email: /^(?:(?:[^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(?:(?:[^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i,
    inn: /^\d{10}(?:\d{2})?$/,
    passportSeries: /^\d{4}$/,
    passportNumber: /^\d{6}$/,
    float: /^(0|[1-9]\d*)(\.\d+)?$/,
    time: /^(?:[01][0-9]|2[0-3]):[0-5][0-9]$/,
    dateText:/^\d{2}.\d{2}.\d{4}$/,
    // dateText:/^\d{4}-\d{2}-\d{2}$/,
}