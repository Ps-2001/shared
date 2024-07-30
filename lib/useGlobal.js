window.devLog = (fileName, msg) => {
    if (!__VUE_PROD_DEVTOOLS__) {
        console.log(
            '%c' + fileName, 'font-size: 20px; font-weight: bold; color: green;',
            // '%c' + msg, 'font-size: 20px;'
        )
    }
}
